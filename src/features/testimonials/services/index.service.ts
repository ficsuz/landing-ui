import request from '@/services/api'
import type { ApiResponse } from '@/types/server/user.types'
import type { PaginatedResponse } from '@/types/server/api.types'
import type { Testimonial, TestimonialListParams, TestimonialPayload } from '../types'

const BASE_URL = '/v1/testimonials'

export const testimonialsService = {
    getAll(params: TestimonialListParams = {}): Promise<PaginatedResponse<Testimonial>> {
        return request.get(BASE_URL, { params })
    },
    getOne(id: string): Promise<ApiResponse<Testimonial>> {
        return request.get(`${BASE_URL}/${id}`)
    },
    create(payload: TestimonialPayload): Promise<ApiResponse<Testimonial>> {
        return request.post(BASE_URL, payload)
    },
    update(id: string, payload: Partial<TestimonialPayload>): Promise<ApiResponse<Testimonial>> {
        return request.put(`${BASE_URL}/${id}`, payload)
    },
    remove(id: string): Promise<ApiResponse<null>> {
        return request.delete(`${BASE_URL}/${id}`)
    },
}

export default testimonialsService
