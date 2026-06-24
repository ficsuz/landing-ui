import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import type { Translation } from '@/types/server/api.types'

const LOCALE_KEY = 'locale'
const SUPPORTED = ['uz', 'ru', 'en'] as const
export type AppLocale = (typeof SUPPORTED)[number]

function getSavedLocale(): AppLocale {
    const saved = localStorage.getItem(LOCALE_KEY) as AppLocale | null
    return saved && SUPPORTED.includes(saved) ? saved : 'uz'
}

export const i18n = createI18n({
    legacy: false,
    locale: getSavedLocale(),
    fallbackLocale: 'uz',
    globalInjection: true,
    messages,
})

export function setLocale(locale: AppLocale) {
    i18n.global.locale.value = locale
    localStorage.setItem(LOCALE_KEY, locale)
    document.documentElement.lang = locale
}

export function resolveTranslation(t: Translation | null | undefined, locale: string): string {
    if (!t) return ''
    return t[locale as keyof Translation] || t.uz || ''
}
