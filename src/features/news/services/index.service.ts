import api from '@/services/api'
import type { NewsResponse } from '../types'

export const newsService = {
    getAll(params: { page?: number; limit?: number; category?: string }) {
        return api.get<NewsResponse>('/news', { params })
    },
}
