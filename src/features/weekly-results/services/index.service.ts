import api from '@/services/api'
import type { WeeklyResultsResponse } from '../types'

export const weeklyResultsService = {
    getAll(page: number, limit: number) {
        return api.get<WeeklyResultsResponse>('/weekly-results', { params: { page, limit } })
    },
}
