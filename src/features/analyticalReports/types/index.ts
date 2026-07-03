import type { Translation, ListParams } from '@/types/server/api.types'

export interface AnalyticalReport {
    id: string
    title: Translation
    description: Translation | null
    previewImageId: string | null
    fileId: string | null
    date: string | null
    status: number
    createdAt: string
}

export type AnalyticalReportListParams = ListParams

export interface AnalyticalReportPayload {
    title: Translation
    description?: Translation
    previewImageId?: string | null
    fileId?: string | null
    date?: string | null
    status?: number
}
