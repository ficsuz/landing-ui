import { RouteRecordRaw } from 'vue-router'

const newsRoutes: RouteRecordRaw[] = [
    {
        path: 'news',
        name: 'admin-news',
        component: () => import('@/views/admin/news/Index.vue'),
        meta: { title: 'Yangiliklar', roles: ['super_admin', 'admin'] },
    },
]

export default newsRoutes
