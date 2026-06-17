import { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'

const extractErrorMessage = (error: any): string => {
  const data = error.response?.data
  if (!data) return 'Xatolik yuz berdi'

  if (data.error?.details && Array.isArray(data.error.details)) {
    return data.error.details.join('. ')
  }
  if (data.message) return data.message
  if (data.error?.message) return data.error.message
  if (typeof data.error === 'string') return data.error

  return 'Xatolik yuz berdi'
}

export const setupErrorResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      ElMessage({
        message: extractErrorMessage(error),
        type: 'error',
        duration: 5000,
      })
      return Promise.reject(error)
    }
  )
}
