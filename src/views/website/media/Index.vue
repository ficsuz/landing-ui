<template>
    <div class="news-page bg-white">
        <div class="page-container py-12 md:py-16">
            <!-- Title -->
            <div class="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                <h1 class="font-black text-[clamp(28px,4vw,44px)] leading-[1.1] text-[#1a1e2e] uppercase mb-4">
                    {{ $t('mediaPage.newsTitle') }}
                </h1>
                <p class="text-[clamp(14px,1.2vw,16px)] text-[#8a94a6] leading-relaxed">
                    {{ $t('mediaPage.newsIntro') }}
                </p>
            </div>

            <!-- Loading skeleton -->
            <div v-if="newsStore.loading && !publishedItems.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div v-for="n in 6" :key="n" class="rounded-2xl border border-[#eef0f4] overflow-hidden animate-pulse">
                    <div class="aspect-[16/10] bg-[#eef0f4]"></div>
                    <div class="p-4 space-y-2">
                        <div class="h-4 bg-[#eef0f4] rounded w-3/4"></div>
                        <div class="h-3 bg-[#eef0f4] rounded w-full"></div>
                        <div class="h-3 bg-[#eef0f4] rounded w-1/2"></div>
                    </div>
                </div>
            </div>

            <!-- Empty state -->
            <div v-else-if="!publishedItems.length" class="py-24 text-center text-[#8a94a6]">
                {{ $t('common.noData') }}
            </div>

            <template v-else>
                <!-- News grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <article
                        v-for="item in publishedItems"
                        :key="item.id"
                        class="group bg-white rounded-2xl flex flex-col cursor-pointer border border-[#eef0f4] shadow-[0_2px_16px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:border-transparent"
                        @click="openItem(item)"
                    >
                        <!-- Image -->
                        <div class="relative overflow-hidden aspect-[16/10] lg:h-[480px] shrink-0 bg-[#eef0f4] [transform:translateZ(0)]">
                            <img
                                v-if="getMediaUrl(item.imageId)"
                                :src="getMediaUrl(item.imageId)"
                                :alt="resolveTranslation(item.title, locale)"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        <!-- Content -->
                        <div class="flex flex-col flex-1 px-5 pt-5 pb-4 gap-2">
                            <h3
                                class="font-bold text-[16px] text-[#1a1e2e] leading-snug min-h-[44px] line-clamp-2 group-hover:text-[#2563eb] transition-colors duration-200"
                            >
                                {{ resolveTranslation(item.title, locale) }}
                            </h3>
                            <p class="text-[13px] text-[#8a94a6] leading-relaxed min-h-[42px] line-clamp-2 flex-1">
                                {{ excerpt(item) }}
                            </p>
                            <div class="flex items-center justify-between pt-4 border-t border-[#eef0f4] mt-auto">
                                <span class="text-[12px] text-[#b0b8c6] font-medium">{{ formatDate(item.date) }}</span>
                                <span class="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1a1e2e] group-hover:text-[#2563eb] transition-all duration-200">
                                    {{ $t('common.learnMore') }}
                                    <svg class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </article>
                </div>

                <!-- Load more -->
                <div v-if="newsStore.hasMore()" class="flex justify-center mt-10">
                    <button
                        :disabled="newsStore.loading"
                        class="inline-flex items-center gap-2 border border-[#d0d5dd] text-[#1a1e2e] font-semibold text-[15px] px-7 py-3 rounded-full transition-all duration-200 hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] disabled:opacity-50"
                        @click="newsStore.fetchItems()"
                    >
                        {{ $t('common.loadMore') }}
                    </button>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useNewsStore } from '@/features/news/store'
import type { NewsItem } from '@/features/news/types'
import { resolveTranslation } from '@/utils/i18n'
import { getMediaUrl } from '@/utils/media'

const { locale } = useI18n()
const newsStore = useNewsStore()

const publishedItems = computed(() => newsStore.items.filter((i) => i.status === 1))

function excerpt(item: NewsItem, length = 140): string {
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
    }
}

onMounted(() => {
    newsStore.fetchItems(true)
})
</script>
