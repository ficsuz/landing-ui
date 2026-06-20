import { RouteRecordRaw } from 'vue-router'

const membersRoutes: RouteRecordRaw[] = [
    {
        path: 'members',
        name: 'admin-members',
        component: () => import('@/views/admin/members/Index.vue'),
        meta: { title: "A'zolar", roles: ['super_admin', 'admin'] },
    },
]

export default membersRoutes
