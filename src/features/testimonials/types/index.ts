import type { ListParams } from '@/types/server/api.types'

export interface Testimonial {
    id: string
    fullName: string | null
    position: string | null
    captionId: string | null
    logoId: string | null
    videoSource: string | null
    order: number
    status: boolean
    createdAt: string
}

export type TestimonialListParams = ListParams

export interface TestimonialPayload {
    fullName?: string
    position?: string
    captionId?: string | null
    logoId?: string | null
    videoSource?: string
    order?: number
    status?: boolean
}
