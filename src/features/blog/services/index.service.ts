import request from '@/services/api'
import type { ApiResponse } from '@/types/server/user.types'
import type { PaginatedResponse } from '@/types/server/api.types'
import type { Blog, BlogListParams, BlogPayload } from '../types'

const BASE_URL = '/v1/blogs'

export const blogService = {
    getAll(params: BlogListParams = {}): Promise<PaginatedResponse<Blog>> {
        return request.get(BASE_URL, { params })
    },
    getOne(id: string): Promise<ApiResponse<Blog>> {
        return request.get(`${BASE_URL}/${id}`)
    },
    create(payload: BlogPayload): Promise<ApiResponse<Blog>> {
        return request.post(BASE_URL, payload)
    },
    update(id: string, payload: Partial<BlogPayload>): Promise<ApiResponse<Blog>> {
        return request.put(`${BASE_URL}/${id}`, payload)
    },
    remove(id: string): Promise<ApiResponse<null>> {
        return request.delete(`${BASE_URL}/${id}`)
    },
}

export default blogService
