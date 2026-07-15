import request from '@/services/api'
import type { ApiResponse } from '@/types/server/user.types'
import type { PaginatedResponse } from '@/types/server/api.types'
import type { SpecialProject, SpecialProjectListParams, SpecialProjectPayload } from '../types'

const BASE_URL = '/v1/special-projects'

export const specialProjectsService = {
    getAll(params: SpecialProjectListParams = {}): Promise<PaginatedResponse<SpecialProject>> {
        return request.get(BASE_URL, { params })
    },
    getOne(id: string): Promise<ApiResponse<SpecialProject>> {
        return request.get(`${BASE_URL}/${id}`)
    },
    create(payload: SpecialProjectPayload): Promise<ApiResponse<SpecialProject>> {
        return request.post(BASE_URL, payload)
    },
    update(id: string, payload: Partial<SpecialProjectPayload>): Promise<ApiResponse<SpecialProject>> {
        return request.put(`${BASE_URL}/${id}`, payload)
    },
    remove(id: string): Promise<ApiResponse<null>> {
        return request.delete(`${BASE_URL}/${id}`)
    },
}

export default specialProjectsService
