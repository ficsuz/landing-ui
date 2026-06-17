import { RouteRecordRaw } from 'vue-router';

const coursesRoutes: RouteRecordRaw[] = [
  {
    path: 'courses',
    name: 'courses',
    component: () => import('../../views/courses/Index.vue'),
    meta: {
      title: 'Kurslar',
      icon: 'courses',
      roles: ['super_admin', 'admin']
    }
  },
];

export default coursesRoutes;
