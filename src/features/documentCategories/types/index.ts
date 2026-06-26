import type { Translation, ListParams } from '@/types/server/api.types'

export interface DocumentCategory {
    id: string
    name: Translation
    order: number
    status: boolean
    createdAt: string
}

export type DocumentCategoryListParams = ListParams

export interface DocumentCategoryPayload {
    name: Translation
    order?: number
    status?: boolean
}
