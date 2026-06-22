import type { Translation, ListParams } from '@/types/server/api.types'

export interface NewsItem {
    id: string
    title: Translation
    content: Translation | null
    imageId: string | null
    date: string | null
    status: number
    otherLink: string | null
    createdAt: string
}

export type NewsListParams = ListParams

export interface NewsPayload {
    title: Translation
    content?: Translation
    imageId?: string | null
    date?: string | null
    status?: number
    otherLink?: string | null
}
