import type { Translation, ListParams } from '@/types/server/api.types'

export type TranslatedFile = Record<keyof Translation, string | null>

export interface AnalyticalReport {
    id: string
    title: Translation
    imageId: string | null
    file: TranslatedFile
    order: number
    status: boolean
    createdAt: string
}

export type AnalyticalReportListParams = ListParams

export interface AnalyticalReportPayload {
    title: Translation
    imageId?: string | null
    file: TranslatedFile
    order?: number
    status?: boolean
}
