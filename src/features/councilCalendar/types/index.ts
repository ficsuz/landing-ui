import type { Translation, ListParams } from '@/types/server/api.types'

export interface CouncilCalendar {
    id: string
    title: Translation
    description: Translation | null
    date: string | null
    order: number
    status: number
    createdAt: string
}

export type CouncilCalendarListParams = ListParams

export interface CouncilCalendarPayload {
    title: Translation
    description?: Translation
    date?: string | null
    order?: number
    status?: number
}
