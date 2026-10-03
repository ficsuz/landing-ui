import type { Router } from 'vue-router'
import { i18n, setLocale, getSavedLocale, isAppLocale, localizePath, localeFromPath, DEFAULT_LOCALE } from '@/utils/i18n'

/**
 * Keeps the active i18n locale in sync with the URL (`/`, `/ru/...`, `/en/...`).
 * On the very first page load, a visitor who previously picked another language
 * is sent to that language's URL; crawlers have no saved preference, so they
 * always get the page they asked for.
 */
export function setupLocaleGuard(router: Router) {
    let isInitialNavigation = true

    router.beforeEach((to) => {
        const isWebsiteRoute = to.matched.some((r) => r.path.startsWith('/:locale'))
        const firstLoad = isInitialNavigation
        isInitialNavigation = false

        // Unknown /ru/... and /en/... URLs render the 404 page in that language.
        if (to.name === 'not-found' && !to.path.startsWith('/admin')) {
            setLocale(localeFromPath(to.path), false)
            return true
        }

        if (!isWebsiteRoute) return true

        const urlLocale = isAppLocale(to.params.locale) ? to.params.locale : DEFAULT_LOCALE

        if (firstLoad && !to.params.locale) {
            const saved = getSavedLocale()
            if (saved && saved !== DEFAULT_LOCALE) {
                return { path: localizePath(to.path, saved), query: to.query, hash: to.hash, replace: true }
            }
        }

        if (i18n.global.locale.value !== urlLocale || document.documentElement.lang !== urlLocale) {
            // Only remember a language the visitor navigated to themselves, not the default one
            // they landed on from search — otherwise a uz search result would wipe their choice.
            setLocale(urlLocale, !firstLoad || urlLocale !== DEFAULT_LOCALE)
        }
        return true
    })
}

export default setupLocaleGuard
