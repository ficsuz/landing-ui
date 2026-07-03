<template>
    <section ref="sectionEl" class="bg-[#f7f8fa] py-16 md:py-24">
        <!-- Header -->
        <div class="page-container text-center mb-10 md:mb-14">
            <h2
                class="section-title mb-5 transition-all duration-700"
                :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
                {{ $t('articles.title') }}
            </h2>
        </div>

        <!-- Cards grid -->
        <div class="page-container">
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                <router-link
                    v-for="(article, i) in articles"
                    :key="article.id"
                    :to="{ name: 'media-analytics-detail', params: { id: article.id } }"
                    class="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#eef0f4] shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.11)] hover:-translate-y-1 transition-all duration-300"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                    :style="{ transitionDelay: visible ? `${i * 80}ms` : '0ms' }"
                >
                    <!-- Image -->
                    <div class="relative overflow-hidden aspect-[16/10] bg-[#eef0f4] shrink-0">
                        <img
                            :src="getMediaUrl(article.imageId)"
                            :alt="resolveTranslation(article.title, locale)"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <!-- Subject badge -->
                        <span
                            v-if="article.subject"
                            class="absolute top-3 left-3 text-[11px] font-bold tracking-widest uppercase bg-[#1a1e2e] text-white px-2.5 py-1 rounded-full"
                        >
                            {{ resolveTranslation(article.subject, locale) }}
                        </span>
                    </div>

                    <!-- Body -->
                    <div class="flex flex-col flex-1 p-5 md:p-6">
                        <h3 class="font-bold text-[16px] md:text-[17px] text-[#1a1e2e] leading-snug line-clamp-3 flex-1">
                            {{ resolveTranslation(article.title, locale) }}
                        </h3>

                        <!-- Footer: date + arrow -->
                        <div class="mt-4 pt-4 border-t border-[#eef0f4] flex items-center justify-between">
                            <span class="text-[12px] text-[#8a94a6] flex items-center gap-1.5">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                {{ formatDate(article.date || article.createdAt) }}
                            </span>
                            <span class="w-8 h-8 rounded-full flex items-center justify-center bg-[#f7f8fa] group-hover:bg-[#1a1e2e] transition-colors duration-300">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-[#8a94a6] group-hover:text-white transition-colors duration-300">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

        <!-- Learn more -->
        <div
            class="flex justify-center transition-all duration-700 delay-500"
            :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
            <AppLearnMore to="/media/analytics" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AppLearnMore from '@/components/website/AppLearnMore.vue'
import { useBlogStore } from '@/features/blog/store'
import { resolveTranslation } from '@/utils/i18n'
import { getMediaUrl } from '@/utils/media'

const { locale } = useI18n()
const blogStore = useBlogStore()

const articles = computed(() => blogStore.items.filter((b) => b.status === 1).slice(0, 6))

function formatDate(iso?: string | null) {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleDateString('en-GB').replace(/\//g, '.')
}

const sectionEl = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | null = null

const getScrollParent = (el: HTMLElement): Element => {
    let parent = el.parentElement
    while (parent && parent !== document.documentElement) {
        const { overflowY } = window.getComputedStyle(parent)
        if (overflowY === 'auto' || overflowY === 'scroll') return parent
        parent = parent.parentElement
    }
    return document.documentElement
}

onMounted(() => {
    blogStore.fetchAll({ limit: 6, sortBy: 'date', order: 'desc' })
    if (sectionEl.value) {
        const root = getScrollParent(sectionEl.value)
        observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    visible.value = true
                    observer?.disconnect()
                }
            },
            { root, threshold: 0.1 }
        )
        observer.observe(sectionEl.value)
    }
})

onUnmounted(() => {
    observer?.disconnect()
})
</script>
