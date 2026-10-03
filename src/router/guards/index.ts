import authGuard from './auth.guard'
import roleGuard from './role.guard'
import { setupLoadingGuard } from './loading.guard'
import { setupSeoGuard } from './seo.guard'
import { setupLocaleGuard } from './locale.guard'
import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export function setupRouterGuards(router: Router) {
    // Global loading indicator on every navigation (registered first so it
    // starts before auth/role checks and finishes via afterEach/onError).
    setupLoadingGuard(router)

    // Syncs the i18n locale with the URL prefix (/ru, /en) before pages render.
    setupLocaleGuard(router)

    router.beforeEach(async (to, from, next) => {
        await authGuard(to, from, next)
    })

    router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
        roleGuard(to, from, next)
    })

    // Updates <title>, description, canonical, hreflang, OG/Twitter tags and JSON-LD per route.
    setupSeoGuard(router)
}

export default {
    authGuard,
    roleGuard,
    setupLoadingGuard,
    setupSeoGuard,
    setupLocaleGuard,
    setupRouterGuards,
}
