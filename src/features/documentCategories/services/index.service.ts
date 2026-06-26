import request from '@/services/api'
import type { ApiResponse } from '@/types/server/user.types'
import type { PaginatedResponse } from '@/types/server/api.types'
import type { DocumentCategory, DocumentCategoryListParams, DocumentCategoryPayload } from '../types'

const BASE_URL = '/v1/document-categories'

export const documentCategoriesService = {
    getAll(params: DocumentCategoryListParams = {}): Promise<PaginatedResponse<DocumentCategory>> {
        return request.get(BASE_URL, { params })
    },
    getOne(id: string): Promise<ApiResponse<DocumentCategory>> {
        return request.get(`${BASE_URL}/${id}`)
    },
    create(payload: DocumentCategoryPayload): Promise<ApiResponse<DocumentCategory>> {
        return request.post(BASE_URL, payload)
    },
    update(id: string, payload: Partial<DocumentCategoryPayload>): Promise<ApiResponse<DocumentCategory>> {
        return request.put(`${BASE_URL}/${id}`, payload)
    },
    remove(id: string): Promise<ApiResponse<null>> {
        return request.delete(`${BASE_URL}/${id}`)
    },
}

export default documentCategoriesService
