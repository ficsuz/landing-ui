import type { Translation, ListParams } from '@/types/server/api.types'

// Same shape as a Meeting, so an existing meeting can be moved here as-is.
export interface WorkingGroupSession {
    id: string
    title: Translation
    content: Translation | null
    subject: Translation | null
    imageIds: string[]
    date: string | null
    status: number
    createdAt: string
}

export type WorkingGroupSessionListParams = ListParams

export interface WorkingGroupSessionPayload {
    title: Translation
    content?: Translation
    subject?: Translation
    imageIds?: string[]
    date?: string | null
    status?: number
}

/** 'moved' — copied and the original removed; 'copied' — copied, but the original could not be removed. */
export type MoveResult = 'moved' | 'copied'
