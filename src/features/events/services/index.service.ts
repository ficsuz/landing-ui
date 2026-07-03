import request from '@/services/api'
import type { ApiResponse } from '@/types/server/user.types'
import type { PaginatedResponse } from '@/types/server/api.types'
import type { EventItem, EventListParams, EventPayload } from '../types'

const BASE_URL = '/v1/events'

export const eventsService = {
    getAll(params: EventListParams = {}): Promise<PaginatedResponse<EventItem>> {
        return request.get(BASE_URL, { params })
    },
    getOne(id: string): Promise<ApiResponse<EventItem>> {
        return request.get(`${BASE_URL}/${id}`)
    },
    create(payload: EventPayload): Promise<ApiResponse<EventItem>> {
        return request.post(BASE_URL, payload)
    },
    update(id: string, payload: Partial<EventPayload>): Promise<ApiResponse<EventItem>> {
        return request.put(`${BASE_URL}/${id}`, payload)
    },
    remove(id: string): Promise<ApiResponse<null>> {
        return request.delete(`${BASE_URL}/${id}`)
    },
}

export default eventsService
