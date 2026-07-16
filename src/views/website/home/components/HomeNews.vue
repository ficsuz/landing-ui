<template>
    <section ref="sectionEl" class="bg-[#1a1e2e] py-16 md:py-24">
        <div class="page-container">
            <!-- Header -->
            <div
                class="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between mb-10 md:mb-14 transition-all duration-700"
                :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
                <h2 class="section-title text-white">{{ $t('news.title') }}</h2>
                <router-link
                    to="/media"
                    class="inline-flex items-center gap-2 shrink-0 whitespace-nowrap border border-white/30 text-white text-[14px] font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:bg-white hover:text-[#1a1e2e]"
                >
                    {{ $t('news.allNews') }}
                </router-link>
            </div>

            <!-- Loading skeleton -->
            <div v-if="newsStore.loading && !news.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div v-for="n in 3" :key="n" class="rounded-2xl bg-white/5 p-3 animate-pulse">
                    <div class="aspect-[16/10] rounded-xl bg-white/10"></div>
                    <div class="px-2 pt-4 pb-2 space-y-2">
                        <div class="h-4 bg-white/10 rounded w-3/4"></div>
                        <div class="h-3 bg-white/10 rounded w-full"></div>
                    </div>
                </div>
            </div>

            <!-- Grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <article
                    v-for="(item, i) in news"
                    :key="item.id"
                    class="group bg-white rounded-2xl flex flex-col cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-3"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
                    :style="{ transitionDelay: visible ? `${i * 100}ms` : '0ms' }"
                    @click="openItem(item)"
                >
                    <!-- Image -->
                    <div
                        class="relative overflow-hidden rounded-xl md:aspect-[16/10] lg:h-[480px] bg-[#eef0f4] [transform:translateZ(0)]"
                        :class="getMediaUrl(item.imageId) ? '' : 'aspect-[16/10]'"
                    >
                        <img
                            v-if="getMediaUrl(item.imageId)"
                            :src="getMediaUrl(item.imageId)"
                            :alt="resolveTranslation(item.title, locale)"
                            class="w-full h-auto md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    <!-- Content -->
                    <div class="flex flex-col flex-1 px-2 pt-5 pb-3">
                        <h3
                            class="font-bold text-[15px] text-[#1a1e2e] leading-snug mb-2 min-h-[42px] line-clamp-2 group-hover:text-[#2563eb] transition-colors duration-200"
                        >
                            {{ resolveTranslation(item.title, locale) }}
                        </h3>
                        <p class="text-[13px] text-[#8a94a6] leading-relaxed min-h-[42px] line-clamp-2 mb-4 flex-1">
                            {{ excerpt(item) }}
                        </p>

                        <!-- Footer -->
                        <div class="flex items-center justify-between pt-4 border-t border-[#eef0f4]">
                            <span class="text-[12px] text-[#b0b8c6] font-medium">{{ formatDate(item.date) }}</span>
                            <span
                                class="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1a1e2e] group-hover:text-[#2563eb] transition-all duration-200"
                            >
                                {{ $t('common.learnMore') }}
                                <svg
                                    class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useNewsStore } from '@/features/news/store'
import type { NewsItem } from '@/features/news/types'
import { resolveTranslation } from '@/utils/i18n'
import { getMediaUrl } from '@/utils/media'

const { locale } = useI18n()
const router = useRouter()
const newsStore = useNewsStore()

const news = computed(() => newsStore.items.filter((i) => i.status === 1).slice(0, 3))

function excerpt(item: NewsItem, length = 100): string {
    const text = resolveTranslation(item.content, locale.value)
    return text.length > length ? `${text.slice(0, length).trim()}…` : text
}

function formatDate(date: string | null): string {
    if (!date) return ''
    return new Date(date).toLocaleDateString(locale.value)
}

function openItem(item: NewsItem) {
    if (item.otherLink) {
        window.open(item.otherLink, '_blank', 'noopener')
    } else {
        router.push('/media')
    }
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
    newsStore.fetchAll({ page: 1, limit: 3 })

    if (!sectionEl.value) return
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
})

onUnmounted(() => {
    observer?.disconnect()
})
</script>
