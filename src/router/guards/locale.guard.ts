import type { Router } from 'vue-router'
import { i18n, setLocale, isAppLocale, localeFromPath, hasLocalePrefix, DEFAULT_LOCALE } from '@/utils/i18n'

/**
 * Keeps the active i18n locale in sync with the URL (`/uz/...`, `/ru/...`, `/en/...`).
 * The URL is the only source of truth for the website language: a link always opens
 * in the language it points to (no redirects based on a remembered preference), which
 * is predictable for visitors and what search engines expect.
 */
export function setupLocaleGuard(router: Router) {
    router.beforeEach((to) => {
        // `/` and old unprefixed links (`/media`, `/events/meetings/5`) → the Uzbek version.
        if (to.name === 'not-found' && !hasLocalePrefix(to.path) && !to.path.startsWith('/admin')) {
            const path = to.path === '/' ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${to.path}`
            return { path, query: to.query, hash: to.hash, replace: true }
        }

        // Unknown /uz/..., /ru/... and /en/... URLs render the 404 page in that language.
        if (to.name === 'not-found' && !to.path.startsWith('/admin')) {
            setLocale(localeFromPath(to.path), false)
            return true
        }

        const isWebsiteRoute = to.matched.some((r) => r.path.startsWith('/:locale'))
        if (!isWebsiteRoute) return true

        const urlLocale = isAppLocale(to.params.locale) ? to.params.locale : DEFAULT_LOCALE
        if (i18n.global.locale.value !== urlLocale || document.documentElement.lang !== urlLocale) {
            setLocale(urlLocale)
        }
        return true
    })
}

export default setupLocaleGuard
