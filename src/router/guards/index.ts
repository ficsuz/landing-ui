import authGuard from './auth.guard'
import roleGuard from './role.guard'
import { setupLoadingGuard } from './loading.guard'
import { setupSeoGuard } from './seo.guard'
import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export function setupRouterGuards(router: Router) {
  // Global loading indicator on every navigation (registered first so it
  // starts before auth/role checks and finishes via afterEach/onError).
  setupLoadingGuard(router)

  router.beforeEach(async (to, from, next) => {
    await authGuard(to, from, next)
  })

  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    roleGuard(to, from, next)
  })

  // Updates <title>, meta description, canonical and OG/Twitter tags per route.
  setupSeoGuard(router)
}

export default {
  authGuard,
  roleGuard,
  setupLoadingGuard,
  setupSeoGuard,
  setupRouterGuards
}
