import { RouteRecordRaw } from 'vue-router'

const blogRoutes: RouteRecordRaw[] = [
    {
        path: 'blog',
        name: 'admin-blog',
        component: () => import('@/views/admin/blog/Index.vue'),
        meta: { title: 'Blog / Articles', roles: ['super_admin', 'admin'] },
    },
]

export default blogRoutes
