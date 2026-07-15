import type { Translation, ListParams } from '@/types/server/api.types'

export interface Meeting {
    id: string
    title: Translation
    content: Translation | null
    subject: Translation | null
    imageIds: string[]
    date: string | null
    status: number
    createdAt: string
}

export type MeetingListParams = ListParams

export interface MeetingPayload {
    title: Translation
    content?: Translation
    subject?: Translation
    imageIds?: string[]
    date?: string | null
    status?: number
}
