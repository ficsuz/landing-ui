import request from '@/services/api'
import type { ApiResponse } from '@/types/server/user.types'
import type { PaginatedResponse } from '@/types/server/api.types'
import type { DocumentItem, DocumentListParams, DocumentPayload } from '../types'

const BASE_URL = '/v1/documents'

export const documentsService = {
    getAll(params: DocumentListParams = {}): Promise<PaginatedResponse<DocumentItem>> {
        return request.get(BASE_URL, { params })
    },
    getOne(id: string): Promise<ApiResponse<DocumentItem>> {
        return request.get(`${BASE_URL}/${id}`)
    },
    create(payload: DocumentPayload): Promise<ApiResponse<DocumentItem>> {
        return request.post(BASE_URL, payload)
    },
    update(id: string, payload: Partial<DocumentPayload>): Promise<ApiResponse<DocumentItem>> {
        return request.put(`${BASE_URL}/${id}`, payload)
    },
    remove(id: string): Promise<ApiResponse<null>> {
        return request.delete(`${BASE_URL}/${id}`)
    },
}

export default documentsService
