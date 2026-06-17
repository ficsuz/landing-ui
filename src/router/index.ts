import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import adminRoutes from './modules';
import websiteRoutes from './modules/website.routes';
import { setupRouterGuards } from './guards';

const routes: RouteRecordRaw[] = [
  // Public website (FIC)
  {
    path: '/',
    component: () => import('../layouts/WebsiteLayout.vue'),
    children: [
      ...websiteRoutes
    ]
  },

  // Admin panel login
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/auth/Index.vue'),
    meta: { isPublic: true }
  },

  // Admin panel (protected)
  {
    path: '/admin',
    component: () => import('../layouts/MainLayout.vue'),
    redirect: '/admin/courses',
    children: [
      ...adminRoutes
    ]
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/static/404NotFoundView.vue'),
    meta: { isPublic: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, top: 100, behavior: 'smooth' };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

setupRouterGuards(router);

export default router;
