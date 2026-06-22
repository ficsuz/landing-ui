import request from '@/services/api'
import type { ApiResponse } from '@/types/server/user.types'
import type { PaginatedResponse } from '@/types/server/api.types'
import type { CouncilMember, MemberListParams, MemberPayload } from '../types'

const BASE_URL = '/v1/council'

export const membersService = {
    getAll(params: MemberListParams = {}): Promise<PaginatedResponse<CouncilMember>> {
        return request.get(BASE_URL, { params })
    },
    getOne(id: string): Promise<ApiResponse<CouncilMember>> {
        return request.get(`${BASE_URL}/${id}`)
    },
    create(payload: MemberPayload): Promise<ApiResponse<CouncilMember>> {
        return request.post(BASE_URL, payload)
    },
    update(id: string, payload: Partial<MemberPayload>): Promise<ApiResponse<CouncilMember>> {
        return request.put(`${BASE_URL}/${id}`, payload)
    },
    remove(id: string): Promise<ApiResponse<null>> {
        return request.delete(`${BASE_URL}/${id}`)
    },
}

export default membersService
