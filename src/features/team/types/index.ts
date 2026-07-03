import type { Translation, ListParams } from '@/types/server/api.types'

export interface TeamMember {
    id: string
    fullName: Translation
    position: Translation
    bio: Translation | null
    photoId: string | null
    email: string | null
    phone: string | null
    order: number
    status: boolean
    createdAt: string
}

export type TeamListParams = ListParams

export interface TeamPayload {
    fullName: Translation
    position: Translation
    bio?: Translation
    photoId?: string | null
    email?: string
    phone?: string
    order?: number
    status?: boolean
}
