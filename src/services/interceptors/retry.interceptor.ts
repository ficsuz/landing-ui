import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

type CountedConfig = InternalAxiosRequestConfig & { _retryCount?: number }

// Only replay requests that are safe to repeat (no side effects).
const IDEMPOTENT_METHODS = ['get', 'head', 'options']
// Never auto-retry binary transfers — a retry restarts a large download from
// scratch (no range-resume), so a timeout there should fail cleanly instead.
const BINARY_RESPONSE_TYPES = ['blob', 'arraybuffer', 'stream']
const MAX_RETRIES = 2

// Retry only transient failures: a timeout (ECONNABORTED), a network error with
// no response at all, or a gateway/unavailable status from an overloaded backend.
// A real 4xx (validation, not-found, auth) is returned to the caller untouched.
const isTransient = (error: AxiosError): boolean => {
  if (error.code === 'ECONNABORTED') return true
  if (!error.response) return true
  return [502, 503, 504].includes(error.response.status)
}

// The backend occasionally hangs a request for 10–20s; the 15s client timeout
// aborts it, and this replays the (idempotent) request instead of leaving the
// user with a failed page. Registered after the refresh interceptor so a 401 is
// handled there first and never counted as a transient failure.
export const setupRetryInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config = error.config as CountedConfig | undefined
      const method = (config?.method ?? 'get').toLowerCase()
      const responseType = (config?.responseType ?? '') as string

      if (
        !config ||
        !IDEMPOTENT_METHODS.includes(method) ||
        BINARY_RESPONSE_TYPES.includes(responseType) ||
        !isTransient(error)
      ) {
        return Promise.reject(error)
      }

      config._retryCount = config._retryCount ?? 0
      if (config._retryCount >= MAX_RETRIES) {
        return Promise.reject(error)
      }

      config._retryCount += 1
      const backoffMs = 300 * 2 ** (config._retryCount - 1) // 300ms, then 600ms
      await new Promise((resolve) => setTimeout(resolve, backoffMs))
      return instance(config)
    },
  )
}
