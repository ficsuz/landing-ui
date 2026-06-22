import { RouteRecordRaw } from 'vue-router'

const expertsRoutes: RouteRecordRaw[] = [
    {
        path: 'experts',
        name: 'admin-experts',
        component: () => import('@/views/admin/experts/Index.vue'),
        meta: { title: 'Ekspertlar', roles: ['super_admin', 'admin'] },
    },
]

export default expertsRoutes
