import type { Translation, ListParams } from '@/types/server/api.types'

export interface CouncilMember {
    id: string
    fullName: Translation
    position: Translation
    photoId: string | null
    order: number
    createdAt: string
}

export type MemberListParams = ListParams

export interface MemberPayload {
    fullName: Translation
    position: Translation
    photoId?: string | null
    order?: number
}
