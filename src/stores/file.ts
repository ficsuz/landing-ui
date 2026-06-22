import { defineStore } from 'pinia';
import request from '../services/api';
import type { ApiResponse } from '@/types/server/user.types';

export interface UploadedFile {
    id: string;
    name: string;
    type: string;
    size: number;
    bucketName: string;
    createdAt: string;
}

export const useFileStore = defineStore('file', {
    actions: {
        async uploadFile(file: File): Promise<ApiResponse<UploadedFile>> {
            const formData = new FormData();
            formData.append('file', file, file.name);
            return request.post('/v1/files/upload', formData);
        },

        async downloadById(fileId: string): Promise<Blob> {
            return request.get(`/v1/files/${fileId}`, { responseType: 'blob' });
        },
    },
});
