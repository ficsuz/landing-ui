import { RouteRecordRaw } from 'vue-router'

const mediaRoutes: RouteRecordRaw[] = [
    {
        path: 'media/blitz-interview',
        name: 'admin-blitz-interview',
        component: () => import('@/views/admin/media/blitz-interview/Index.vue'),
        meta: { title: 'Blitz-intervyu', roles: ['super_admin', 'admin'] },
    },
    {
        path: 'media/reports',
        name: 'admin-reports',
        component: () => import('@/views/admin/media/reports/Index.vue'),
        meta: { title: 'Hisobotlar', roles: ['super_admin', 'admin'] },
    },
]

export default mediaRoutes
