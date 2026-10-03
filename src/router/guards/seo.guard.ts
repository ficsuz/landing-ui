import type { Router, RouteLocationNormalized } from 'vue-router'
import { isAppLocale, stripLocale, localeFromPath, DEFAULT_LOCALE } from '@/utils/i18n'
import { applyHead, resolvePageSeo, t, type HeadData } from '@/utils/seo'

let currentHead: HeadData | null = null

/** Head defaults of the current route — `useSeo()` merges its content-specific data on top. */
export function getCurrentHead(): HeadData | null {
    return currentHead
}

function headForRoute(to: RouteLocationNormalized): HeadData {
    const isWebsiteRoute = to.matched.some((r) => r.path.startsWith('/:locale'))
    const path = stripLocale(to.path)

    if (!isWebsiteRoute) {
        const isNotFound = to.name === 'not-found'
        return {
            locale: isNotFound ? localeFromPath(to.path) : DEFAULT_LOCALE,
            path,
            title: isNotFound ? t('notFound.title') : to.meta.title || 'Admin',
            noindex: true,
        }
    }

    const locale = isAppLocale(to.params.locale) ? to.params.locale : DEFAULT_LOCALE
    const { title, description } = resolvePageSeo(to.name as string | undefined, to.meta.titleKey, to.meta.title)
    return { locale, path, title, description }
}

/**
 * Keeps <title>, description, canonical, hreflang alternates, Open Graph / Twitter
 * tags and JSON-LD in sync with the active route and language.
 */
export function setupSeoGuard(router: Router) {
    router.afterEach((to, _from, failure) => {
        if (failure) return
        currentHead = headForRoute(to)
        applyHead(currentHead)
    })
}

export default setupSeoGuard
