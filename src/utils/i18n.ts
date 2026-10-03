import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import type { Translation } from '@/types/server/api.types'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type AppLocale } from '@/constants/seo.constants'

export type { AppLocale }
export { DEFAULT_LOCALE, SUPPORTED_LOCALES }

const LOCALE_KEY = 'locale'

export function isAppLocale(value: unknown): value is AppLocale {
    return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

/** The language the visitor last picked explicitly (null on first visit / for crawlers). */
export function getSavedLocale(): AppLocale | null {
    try {
        const saved = localStorage.getItem(LOCALE_KEY)
        return isAppLocale(saved) ? saved : null
    } catch {
        return null
    }
}

/**
 * The URL is the source of truth for the language (`/` = uz, `/ru/...`, `/en/...`),
 * so the initial locale is read from the path — that way every language has its own
 * indexable URL and a shared link always opens in the language it was shared in.
 */
function getInitialLocale(): AppLocale {
    const path = window.location.pathname
    // The admin panel has no locale in its URLs — it keeps the saved preference.
    if (path === '/admin' || path.startsWith('/admin/')) return getSavedLocale() ?? DEFAULT_LOCALE
    return localeFromPath(path)
}

export const i18n = createI18n({
    legacy: false,
    locale: getInitialLocale(),
    fallbackLocale: DEFAULT_LOCALE,
    globalInjection: true,
    messages,
})

/** Applies a locale to i18n + <html lang>. `remember` stores it as the visitor's preference. */
export function setLocale(locale: AppLocale, remember = true) {
    i18n.global.locale.value = locale
    document.documentElement.lang = locale
    if (remember) {
        try {
            localStorage.setItem(LOCALE_KEY, locale)
        } catch {
            /* storage unavailable (private mode) — URL still carries the locale */
        }
    }
}

/** `/ru/media` → `ru`, `/media` → `uz` */
export function localeFromPath(path: string): AppLocale {
    const first = path.split('/')[1]
    return isAppLocale(first) && first !== DEFAULT_LOCALE ? first : DEFAULT_LOCALE
}

/** `/ru/media` → `/media`, `/en` → `/` */
export function stripLocale(path: string): string {
    const first = path.split('/')[1]
    if (isAppLocale(first) && first !== DEFAULT_LOCALE) {
        return path.slice(first.length + 1) || '/'
    }
    return path
}

/** `/media` + `ru` → `/ru/media`; the default locale has no prefix. Hash/query are kept. */
export function localizePath(path: string, locale: AppLocale): string {
    if (!path.startsWith('/')) return path
    const clean = stripLocale(path)
    if (locale === DEFAULT_LOCALE) return clean
    // `/`, `/#hash`, `/?q` → `/ru`, `/ru#hash`, `/ru?q` (no trailing slash on the locale root)
    return /^\/(?=[#?]|$)/.test(clean) ? `/${locale}${clean.slice(1)}` : `/${locale}${clean}`
}

export function resolveTranslation(t: Translation | null | undefined, locale: string): string {
    if (!t) return ''
    return t[locale as keyof Translation] || t.uz || ''
}
