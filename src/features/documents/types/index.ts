import type { Translation, ListParams } from '@/types/server/api.types'
import type { DocumentCategory } from '@/features/documentCategories/types'

export type TranslatedFile = Record<keyof Translation, string | null>

export interface DocumentItem {
    id: string
    title: Translation
    categoryId: string
    category?: DocumentCategory | null
    file: TranslatedFile
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
    file: TranslatedFile
    order?: number
    status?: boolean
}
