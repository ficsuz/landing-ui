import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { useUserStore } from '../../stores'
import router from '../../router'

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean }
// Marker set on the rejected error once we have redirected to login, so the
// outermost toast interceptor stays silent (see error.interceptor).
type RedirectedError = AxiosError & { __authRedirected?: boolean }

// Attach the current access token to every outgoing request. Runs on the retry
// too, so a replayed request automatically picks up a freshly refreshed token.
export const setupAuthRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const store = useUserStore()
      const isAuthEndpoint = config.url?.includes('/auth/login') || config.url?.includes('/auth/refresh')
      if (store.token && !isAuthEndpoint) {
        config.headers['Authorization'] = `Bearer ${store.token}`
      }
      return config
    },
    (error) => Promise.reject(error),
  )
}

// Single-flight refresh: when the access token expires, many in-flight requests
// can 401 at once. We must refresh exactly once and let every waiter reuse that
// same result instead of each firing its own refresh (a refresh storm).
let refreshInFlight: Promise<boolean> | null = null

const refreshOnce = (): Promise<boolean> => {
  if (!refreshInFlight) {
    const store = useUserStore()
    refreshInFlight = store
      .refreshToken()
      .then((res) => Boolean(res?.success))
      .catch(() => false)
      .finally(() => {
        refreshInFlight = null
      })
  }
  return refreshInFlight
}

// A 401 on the auth endpoints themselves is a genuine credential failure, not an
// expired access token — never try to refresh (or we would loop) on those.
export const isAuthEndpoint = (url = ''): boolean =>
  url.includes('/auth/login') || url.includes('/auth/refresh') || url.includes('/auth/logout')

// Clear the session and redirect to login, tagging the error so the toast
// interceptor does not fire (an expired session bounces every in-flight request
// at once — one redirect, no wall of red toasts). router.push is a no-op when
// already on the login route and resetToken is idempotent, so N calls are safe.
const bounceToLogin = (error: AxiosError): void => {
  const store = useUserStore()
  store.resetToken()
  ;(error as RedirectedError).__authRedirected = true
  router.push('/admin/login')
}

// On 401, transparently refresh the access token once and replay the original
// request. Only if there is no refresh token, the refresh fails, or we already
// retried do we clear the session and redirect to login.
export const setupAuthResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const original = error.config as RetriableConfig | undefined
      const store = useUserStore()

      const canRefresh =
        error.response?.status === 401 &&
        !!original &&
        !original._retry &&
        !isAuthEndpoint(original.url) &&
        !!store.refresh_token

      if (!canRefresh) {
        // Unrecoverable auth failure on a protected route → drop the session.
        if (error.response?.status === 401 && original && !isAuthEndpoint(original.url)) {
          bounceToLogin(error)
        }
        return Promise.reject(error)
      }

      original!._retry = true
      const refreshed = await refreshOnce()
      if (!refreshed) {
        bounceToLogin(error)
        return Promise.reject(error)
      }

      // Replay with the refreshed token (re-attached by the request interceptor).
      return instance(original!)
    },
  )
}
