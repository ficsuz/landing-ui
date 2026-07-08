import axios from 'axios'
import {
    setupResponseUnwrapInterceptor,
    setupErrorToastInterceptor,
} from './interceptors/error.interceptor'
import {
    setupAuthRequestInterceptor,
    setupAuthResponseInterceptor,
} from './interceptors/auth.interceptor'
import { setupRetryInterceptor } from './interceptors/retry.interceptor'

// Create axios instance with base configuration.
// timeout: the backend occasionally hangs a request for 10–20s; a 15s cap fails
// fast and lets the retry interceptor replay idempotent GETs instead of leaving
// the request "pending" for a full minute.
const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 15000,
})

// Request interceptor: attach the bearer token.
setupAuthRequestInterceptor(request)

// Response interceptors run in REGISTRATION order, so register them innermost →
// outermost. The order is load-bearing:
//   1) unwrap  — hand callers response.data
//   2) refresh — on 401, refresh the token once and replay the request
//   3) retry   — replay idempotent GETs that timed out / hit a transient error
//   4) toast   — surface a message only for errors that survived (2) and (3)
setupResponseUnwrapInterceptor(request)
setupAuthResponseInterceptor(request)
setupRetryInterceptor(request)
setupErrorToastInterceptor(request)

export default request
