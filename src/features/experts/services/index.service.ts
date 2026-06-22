import request from '@/services/api'
import type { ApiResponse } from '@/types/server/user.types'
import type { PaginatedResponse } from '@/types/server/api.types'
import type { Expert, ExpertListParams, ExpertPayload } from '../types'

const BASE_URL = '/v1/experts'

export const expertsService = {
    getAll(params: ExpertListParams = {}): Promise<PaginatedResponse<Expert>> {
        return request.get(BASE_URL, { params })
    },
    getOne(id: string): Promise<ApiResponse<Expert>> {
        return request.get(`${BASE_URL}/${id}`)
    },
    create(payload: ExpertPayload): Promise<ApiResponse<Expert>> {
        return request.post(BASE_URL, payload)
    },
    update(id: string, payload: Partial<ExpertPayload>): Promise<ApiResponse<Expert>> {
        return request.put(`${BASE_URL}/${id}`, payload)
    },
    remove(id: string): Promise<ApiResponse<null>> {
        return request.delete(`${BASE_URL}/${id}`)
    },
}

export default expertsService
