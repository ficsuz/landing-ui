import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { applyHead, type HeadData } from '@/utils/seo'
import { getCurrentHead } from '@/router/guards/seo.guard'

export type SeoOverrides = Partial<Omit<HeadData, 'locale' | 'path'>>

/**
 * Overrides the route's default head with content loaded on the page
 * (article title, excerpt, cover image…). Pass a getter; it is re-applied whenever
 * the content or the language changes. Return null while the content is loading.
 */
export function useSeo(source: () => SeoOverrides | null | undefined) {
    const route = useRoute()

    watch(
        [source, () => route.fullPath],
        ([overrides]) => {
            const base = getCurrentHead()
            if (!base || !overrides) return
            applyHead({ ...base, ...overrides })
        },
        { immediate: true, flush: 'post', deep: true }
    )
}
