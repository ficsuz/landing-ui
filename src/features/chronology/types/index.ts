import type { Translation, ListParams } from '@/types/server/api.types'

export interface Chronology {
    id: string
    title: Translation
    description: Translation | null
    date: string | null
    order: number
    status: number
    createdAt: string
}

export type ChronologyListParams = ListParams

export interface ChronologyPayload {
    title: Translation
    description?: Translation
    date?: string | null
    order?: number
    status?: number
}
