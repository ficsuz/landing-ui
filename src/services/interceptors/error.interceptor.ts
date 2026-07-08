import { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'
import { isAuthEndpoint } from './auth.interceptor'

const extractErrorMessage = (error: any): string => {
  const data = error.response?.data
  if (!data) return 'Xatolik yuz berdi'

  if (data.error?.details && Array.isArray(data.error.details)) {
    return data.error.details
      .flatMap((d: any) => (Array.isArray(d?.messages) ? d.messages : [d]))
      .join('. ')
  }
  if (data.message) return data.message
  if (data.error?.message) return data.error.message
  if (typeof data.error === 'string') return data.error

  return 'Xatolik yuz berdi'
}

// Unwrap the API envelope so callers receive `response.data` directly. This must
// be the FIRST-registered response interceptor so it runs innermost (closest to
// the transport); the refresh/retry interceptors registered after it operate on
// the raw error before it ever reaches the user.
export const setupResponseUnwrapInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error),
  )
}

// Surface a toast for any error that survived refresh + retry. Registered LAST
// so it runs outermost: a request that was transparently recovered (token
// refreshed, GET retried) never reaches here, so no spurious error is shown.
export const setupErrorToastInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Stay silent when the auth interceptor already redirected to login (a
      // single expired session bounces every in-flight request — one redirect,
      // not a wall of toasts) and for the internal auth endpoints themselves.
      const redirected = (error as { __authRedirected?: boolean })?.__authRedirected
      if (!redirected && !isAuthEndpoint(error?.config?.url)) {
        ElMessage({
          message: extractErrorMessage(error),
          type: 'error',
          duration: 5000,
        })
      }
      return Promise.reject(error)
    },
  )
}
