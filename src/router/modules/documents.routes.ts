import { RouteRecordRaw } from 'vue-router'

const documentsRoutes: RouteRecordRaw[] = [
    {
        path: 'documents',
        name: 'admin-documents',
        component: () => import('@/views/admin/documents/Index.vue'),
        meta: { title: 'Documents', roles: ['super_admin', 'admin'] },
    },
    {
        path: 'documents/categories',
        name: 'admin-document-categories',
        component: () => import('@/views/admin/documents/categories/Index.vue'),
        meta: { title: 'Document Categories', roles: ['super_admin', 'admin'] },
    },
]

export default documentsRoutes
