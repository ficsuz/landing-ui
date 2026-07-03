import type { Translation, ListParams } from '@/types/server/api.types'

export interface EventItem {
    id: string
    title: Translation
    content: Translation | null
    previewImageId: string | null
    imageId: string | null
    startDate: string | null
    endDate: string | null
    createdAt: string
}

export type EventListParams = ListParams

export interface EventPayload {
    title: Translation
    content?: Translation
    previewImageId?: string | null
    imageId?: string | null
    startDate?: string | null
    endDate?: string | null
}
