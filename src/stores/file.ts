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
            // Uploads are large POSTs and are never auto-retried, so override the
            // short 15s global timeout with a generous cap — a slow/mobile
            // connection must not be aborted mid-transfer.
            return request.post('/v1/files/upload', formData, { timeout: 120000 });
        },

        async downloadById(fileId: string): Promise<Blob> {
            // A large blob download can legitimately exceed 15s; give it room.
            // Binary responses are excluded from auto-retry (see retry.interceptor)
            // so a timeout fails cleanly instead of restarting the download.
            return request.get(`/v1/files/${fileId}`, { responseType: 'blob', timeout: 60000 });
        },
    },
});
