import request from '@/services/api'
import type { ApiResponse } from '@/types/server/user.types'
import type { PaginatedResponse } from '@/types/server/api.types'
import type { CalendarEvent, CalendarEventListParams, CalendarEventPayload } from '../types'

const BASE_URL = '/v1/calendar-events'

export const calendarEventsService = {
    getAll(params: CalendarEventListParams = {}): Promise<PaginatedResponse<CalendarEvent>> {
        return request.get(BASE_URL, { params })
    },
    getOne(id: string): Promise<ApiResponse<CalendarEvent>> {
        return request.get(`${BASE_URL}/${id}`)
    },
    create(payload: CalendarEventPayload): Promise<ApiResponse<CalendarEvent>> {
        return request.post(BASE_URL, payload)
    },
    update(id: string, payload: Partial<CalendarEventPayload>): Promise<ApiResponse<CalendarEvent>> {
        return request.put(`${BASE_URL}/${id}`, payload)
    },
    remove(id: string): Promise<ApiResponse<null>> {
        return request.delete(`${BASE_URL}/${id}`)
    },
}

export default calendarEventsService
