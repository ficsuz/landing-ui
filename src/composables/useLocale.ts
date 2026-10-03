import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { setLocale, localizePath, stripLocale, type AppLocale } from '@/utils/i18n'
import { localeOptions } from '@/constants/navigation.constants'

export function useLocale() {
    const { locale } = useI18n()
    const route = useRoute()
    const router = useRouter()

    const currentLocale = computed(() => locale.value as AppLocale)

    /** Current route path without the locale prefix (`/ru/media` → `/media`). */
    const basePath = computed(() => stripLocale(route.path))

    /** Prefixes an absolute in-app path with the current locale: `/media` → `/ru/media`. */
    function localePath(path: string): string {
        return localizePath(path, currentLocale.value)
    }

    /** On the website, switching language navigates to the same page in that language's URL. */
    function switchLocale(code: AppLocale) {
        setLocale(code)
        const isWebsiteRoute = route.matched.some((r) => r.path.startsWith('/:locale'))
        if (isWebsiteRoute) {
            router.push({ path: localizePath(route.path, code), query: route.query, hash: route.hash })
        }
    }

    return {
        currentLocale,
        localeOptions,
        basePath,
        localePath,
        switchLocale,
    }
}
