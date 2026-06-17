import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, type AppLocale } from '@/utils/i18n'
import { localeOptions } from '@/constants/navigation.constants'

export function useLocale() {
    const { locale } = useI18n()

    const currentLocale = computed(() => locale.value as AppLocale)

    function switchLocale(code: AppLocale) {
        setLocale(code)
    }

    return {
        currentLocale,
        localeOptions,
        switchLocale,
    }
}
