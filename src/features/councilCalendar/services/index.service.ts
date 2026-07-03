import request from '@/services/api'
import type { ApiResponse } from '@/types/server/user.types'
import type { PaginatedResponse } from '@/types/server/api.types'
import type { CouncilCalendar, CouncilCalendarListParams, CouncilCalendarPayload } from '../types'

const BASE_URL = '/v1/council-calendar'

export const councilCalendarService = {
    getAll(params: CouncilCalendarListParams = {}): Promise<PaginatedResponse<CouncilCalendar>> {
        return request.get(BASE_URL, { params })
    },
    getOne(id: string): Promise<ApiResponse<CouncilCalendar>> {
        return request.get(`${BASE_URL}/${id}`)
    },
    create(payload: CouncilCalendarPayload): Promise<ApiResponse<CouncilCalendar>> {
        return request.post(BASE_URL, payload)
    },
    update(id: string, payload: Partial<CouncilCalendarPayload>): Promise<ApiResponse<CouncilCalendar>> {
        return request.put(`${BASE_URL}/${id}`, payload)
    },
    remove(id: string): Promise<ApiResponse<null>> {
        return request.delete(`${BASE_URL}/${id}`)
    },
}

export default councilCalendarService
