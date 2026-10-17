import request from '@/services/api'
import type { ApiResponse } from '@/types/server/user.types'
import type { PaginatedResponse } from '@/types/server/api.types'
import type { WorkingGroupSession, WorkingGroupSessionListParams, WorkingGroupSessionPayload } from '../types'

const BASE_URL = '/v1/working-group-sessions'

export const workingGroupSessionsService = {
    getAll(params: WorkingGroupSessionListParams = {}): Promise<PaginatedResponse<WorkingGroupSession>> {
        return request.get(BASE_URL, { params })
    },
    getOne(id: string): Promise<ApiResponse<WorkingGroupSession>> {
        return request.get(`${BASE_URL}/${id}`)
    },
    create(payload: WorkingGroupSessionPayload): Promise<ApiResponse<WorkingGroupSession>> {
        return request.post(BASE_URL, payload)
    },
    update(id: string, payload: Partial<WorkingGroupSessionPayload>): Promise<ApiResponse<WorkingGroupSession>> {
        return request.put(`${BASE_URL}/${id}`, payload)
    },
    remove(id: string): Promise<ApiResponse<null>> {
        return request.delete(`${BASE_URL}/${id}`)
    },
}

export default workingGroupSessionsService
