import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { useUserStore } from '../../stores'
import router from '../../router'

export const setupAuthRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const store = useUserStore()
      if (store.token) {
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
