import request from '@/services/api'
import type { ApiResponse } from '@/types/server/user.types'
import type { PaginatedResponse } from '@/types/server/api.types'
import type { TeamMember, TeamListParams, TeamPayload } from '../types'

const BASE_URL = '/v1/team'

export const teamService = {
    getAll(params: TeamListParams = {}): Promise<PaginatedResponse<TeamMember>> {
        return request.get(BASE_URL, { params })
    },
    getOne(id: string): Promise<ApiResponse<TeamMember>> {
        return request.get(`${BASE_URL}/${id}`)
    },
    create(payload: TeamPayload): Promise<ApiResponse<TeamMember>> {
        return request.post(BASE_URL, payload)
    },
    update(id: string, payload: Partial<TeamPayload>): Promise<ApiResponse<TeamMember>> {
        return request.put(`${BASE_URL}/${id}`, payload)
    },
    remove(id: string): Promise<ApiResponse<null>> {
        return request.delete(`${BASE_URL}/${id}`)
    },
}

export default teamService
