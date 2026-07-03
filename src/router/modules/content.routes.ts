import { RouteRecordRaw } from 'vue-router'

const contentRoutes: RouteRecordRaw[] = [
    {
        path: 'team',
        name: 'admin-team',
        component: () => import('@/views/admin/team/Index.vue'),
        meta: { title: 'Team', roles: ['super_admin', 'admin'] },
    },
    {
        path: 'chronology',
        name: 'admin-chronology',
        component: () => import('@/views/admin/chronology/Index.vue'),
        meta: { title: 'Chronology', roles: ['super_admin', 'admin'] },
    },
    {
        path: 'council-calendar',
        name: 'admin-council-calendar',
        component: () => import('@/views/admin/council-calendar/Index.vue'),
        meta: { title: 'Council Calendar', roles: ['super_admin', 'admin'] },
    },
    {
        path: 'council-members',
        name: 'admin-council-members',
        component: () => import('@/views/admin/council-members/Index.vue'),
        meta: { title: "Council Members (Logos)", roles: ['super_admin', 'admin'] },
    },
]

export default contentRoutes
