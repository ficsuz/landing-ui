import { defineStore } from 'pinia';
import request from '../services/api';

export const useFileStore = defineStore('file', {
    actions: {
        async uploadFile(file: File): Promise<{ id: string; url: string }> {
            const formData = new FormData();
            formData.append('file', file, file.name);
            return request.post('/v1/files/upload', formData);
        },

        async downloadById(fileId: string): Promise<Blob> {
            return request.get(`/v1/files/${fileId}`, { responseType: 'blob' });
        },
    },
});
