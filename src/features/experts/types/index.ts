import type { Translation, ListParams } from '@/types/server/api.types'

export type ExpertType = 'INTERNATIONAL' | 'UZBEK' | 'LOCAL'

export interface Expert {
    id: string
    type: ExpertType
    fullName: Translation
    position: Translation
    bio: Translation | null
    imageId: string | null
    email: string | null
    phone: string | null
    order: number
    status: boolean
    createdAt: string
}

export interface ExpertListParams extends ListParams {
    type?: ExpertType
}

export interface ExpertPayload {
    type?: ExpertType
    fullName: Translation
    position: Translation
    bio?: Translation
    imageId?: string | null
    email?: string
    phone?: string
    order?: number
    status?: boolean
}
