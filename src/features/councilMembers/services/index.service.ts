import request from '@/services/api'
import type { ApiResponse } from '@/types/server/user.types'
import type { PaginatedResponse } from '@/types/server/api.types'
import type { MemberCompany, MemberCompanyListParams, MemberCompanyPayload } from '../types'

const BASE_URL = '/v1/members'

export const councilMembersService = {
    getAll(params: MemberCompanyListParams = {}): Promise<PaginatedResponse<MemberCompany>> {
        return request.get(BASE_URL, { params })
    },
    getOne(id: string): Promise<ApiResponse<MemberCompany>> {
        return request.get(`${BASE_URL}/${id}`)
    },
    create(payload: MemberCompanyPayload): Promise<ApiResponse<MemberCompany>> {
        return request.post(BASE_URL, payload)
    },
    update(id: string, payload: Partial<MemberCompanyPayload>): Promise<ApiResponse<MemberCompany>> {
        return request.put(`${BASE_URL}/${id}`, payload)
    },
    remove(id: string): Promise<ApiResponse<null>> {
        return request.delete(`${BASE_URL}/${id}`)
    },
}

export default councilMembersService
