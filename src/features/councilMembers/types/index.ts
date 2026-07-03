import type { Translation, ListParams } from '@/types/server/api.types'

export type MemberType = 'EXECUTIVE_BOARD' | 'FULL' | 'OBSERVER'

export interface MemberCompany {
    id: string
    name: Translation
    description: Translation | null
    logoId: string | null
    link: string | null
    type: MemberType
    order: number
    status: boolean
    createdAt: string
}

export interface MemberCompanyListParams extends ListParams {
    type?: MemberType
}

export interface MemberCompanyPayload {
    name: Translation
    description?: Translation
    logoId?: string | null
    link?: string
    type?: MemberType
    order?: number
    status?: boolean
}