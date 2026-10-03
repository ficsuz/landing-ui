import type { Router, RouteLocationRaw } from 'vue-router'
import { i18n, localizePath, localeFromPath, DEFAULT_LOCALE, type AppLocale } from '@/utils/i18n'

/** Paths that never carry a language prefix. */
const UNLOCALIZED = /^\/(admin|api|assets)(\/|$|\?|#)/

function currentLocale(): AppLocale {
    return i18n.global.locale.value as AppLocale
}

/** Adds the current language prefix to an absolute path that has none: `/events` → `/ru/events`. */
function localizeRawPath(path: string): string {
    if (!path.startsWith('/') || UNLOCALIZED.test(path)) return path
    // Already language-specific (`/ru/...`, `/en/...`) — respect it.
    if (localeFromPath(path) !== DEFAULT_LOCALE) return path
    return localizePath(path, currentLocale())
}

function localizeLocation(to: RouteLocationRaw): RouteLocationRaw {
    if (typeof to === 'string') return localizeRawPath(to)
    if (to && typeof to === 'object' && 'path' in to && typeof to.path === 'string') {
        return { ...to, path: localizeRawPath(to.path) }
    }
    // Named routes inherit the current :locale param on their own.
    return to
}

/**
 * Makes every in-app link keep the active language: plain paths passed to
 * <router-link to="/events">, router.push('/media') or router.replace({ path }) are
 * prefixed with the current locale (/ru/events, /en/media). The rendered href is
 * localized too, so crawlers follow links within the same language.
 *
 * The language switcher sets the new locale before navigating, so its target path is
 * localized for the language being switched to.
 */
export function setupLocalizedLinks(router: Router) {
    const resolve = router.resolve.bind(router)
    const push = router.push.bind(router)
    const replace = router.replace.bind(router)

    router.resolve = ((to: RouteLocationRaw, currentLocation?: Parameters<Router['resolve']>[1]) =>
        resolve(localizeLocation(to), currentLocation)) as Router['resolve']
    router.push = (to) => push(localizeLocation(to))
    router.replace = (to) => replace(localizeLocation(to))
}

export default setupLocalizedLinks
