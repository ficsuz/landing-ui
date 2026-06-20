import { RouteRecordRaw } from 'vue-router'

const eventsRoutes: RouteRecordRaw[] = [
    {
        path: 'events/meetings',
        name: 'admin-meetings',
        component: () => import('@/views/admin/events/meetings/Index.vue'),
        meta: { title: 'Uchrashuvlar', roles: ['super_admin', 'admin'] },
    },
    {
        path: 'events/weekly-results',
        name: 'admin-weekly-results',
        component: () => import('@/views/admin/events/weekly-results/Index.vue'),
        meta: { title: 'Haftalik natijalar', roles: ['super_admin', 'admin'] },
    },
    {
        path: 'events/working-group',
        name: 'admin-working-group',
        component: () => import('@/views/admin/events/working-group/Index.vue'),
        meta: { title: 'Ishchi guruhlar', roles: ['super_admin', 'admin'] },
    },
    {
        path: 'events/plenary',
        name: 'admin-plenary',
        component: () => import('@/views/admin/events/plenary/Index.vue'),
        meta: { title: 'Plenara sessiyalari', roles: ['super_admin', 'admin'] },
    },
]

export default eventsRoutes
