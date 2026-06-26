import request from '@/services/api'
import type { ApiResponse } from '@/types/server/user.types'
import type { PaginatedResponse } from '@/types/server/api.types'
import type { AnalyticalReport, AnalyticalReportListParams, AnalyticalReportPayload } from '../types'

// "Reports" API — admin surface: "New Approaches — Analytical Reports"
const BASE_URL = '/v1/reports'

export const analyticalReportsService = {
    getAll(params: AnalyticalReportListParams = {}): Promise<PaginatedResponse<AnalyticalReport>> {
        return request.get(BASE_URL, { params })
    },
    getOne(id: string): Promise<ApiResponse<AnalyticalReport>> {
        return request.get(`${BASE_URL}/${id}`)
    },
    create(payload: AnalyticalReportPayload): Promise<ApiResponse<AnalyticalReport>> {
        return request.post(BASE_URL, payload)
    },
    update(id: string, payload: Partial<AnalyticalReportPayload>): Promise<ApiResponse<AnalyticalReport>> {
        return request.put(`${BASE_URL}/${id}`, payload)
    },
    remove(id: string): Promise<ApiResponse<null>> {
        return request.delete(`${BASE_URL}/${id}`)
    },
}

export default analyticalReportsService
