import type { Translation, ListParams } from '@/types/server/api.types'
import type { DocumentCategory } from '@/features/documentCategories/types'

export interface DocumentItem {
    id: string
    title: Translation
    categoryId: string
    category?: DocumentCategory | null
    fileId: string | null
    date: string | null
    order: number
    status: boolean
    createdAt: string
}

export interface DocumentListParams extends ListParams {
    categoryId?: string
}

export interface DocumentPayload {
    title: Translation
    categoryId: string
    fileId?: string | null
    date?: string | null
    order?: number
    status?: boolean
}
