import request from '@/services/api'
import type { ApiResponse } from '@/types/server/user.types'
import type { PaginatedResponse } from '@/types/server/api.types'
import type { Meeting, MeetingListParams, MeetingPayload } from '../types'

const BASE_URL = '/v1/meetings'

export const meetingsService = {
    getAll(params: MeetingListParams = {}): Promise<PaginatedResponse<Meeting>> {
        return request.get(BASE_URL, { params })
    },
    getOne(id: string): Promise<ApiResponse<Meeting>> {
        return request.get(`${BASE_URL}/${id}`)
    },
    create(payload: MeetingPayload): Promise<ApiResponse<Meeting>> {
        return request.post(BASE_URL, payload)
    },
    update(id: string, payload: Partial<MeetingPayload>): Promise<ApiResponse<Meeting>> {
        return request.put(`${BASE_URL}/${id}`, payload)
    },
    remove(id: string): Promise<ApiResponse<null>> {
        return request.delete(`${BASE_URL}/${id}`)
    },
}

export default meetingsService
