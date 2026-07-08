import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { useUserStore } from '../../stores'
import router from '../../router'

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
    (error) => Promise.reject(error)
  )
}

export const setupAuthResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const store = useUserStore()
      if (error.response?.status === 401) {
        store.resetToken()
        router.push('/admin/login')
      }
      return Promise.reject(error)
    }
  )
}
