import type { Translation, ListParams } from '@/types/server/api.types'

export interface SpecialProject {
    id: string
    title: Translation
    link: string
    order: number
    status: boolean
    createdAt: string
}

export type SpecialProjectListParams = ListParams

export interface SpecialProjectPayload {
    title: Translation
    link: string
    order?: number
    status?: boolean
}
