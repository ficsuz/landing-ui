<template>
    <div class="meetings-page">
        <section class="bg-[#f7f8fa] py-12 md:py-16">
            <div class="page-container">
                <div ref="listRef" v-loading="loading" :aria-busy="loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[120px]">
                    <router-link
                        v-for="m in publishedMeetings"
                        :key="m.id"
                        :to="{ name: 'events-meetings-detail', params: { id: m.id } }"
                        class="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#eef0f4] shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.11)] hover:-translate-y-1 transition-all duration-300"
                    >
                        <!-- Image slider -->
                        <div class="relative overflow-hidden aspect-[16/10] shrink-0 transition-transform duration-1500 group-hover:scale-105">
                            <CardImageSlider :image-ids="m.imageIds" :alt="resolveTranslation(m.title, locale)" />
                        </div>

                        <!-- Body -->
                        <div class="flex flex-col flex-1 p-5 md:p-6">
                            <p
                                v-if="resolveTranslation(m.subject, locale)"
                                class="text-[11px] font-bold tracking-widest uppercase text-[#4361ee] mb-2"
                            >
                                {{ resolveTranslation(m.subject, locale) }}
                            </p>

                            <h3 class="font-bold text-[16px] md:text-[17px] text-[#1a1e2e] leading-snug line-clamp-3 flex-1">
                                {{ resolveTranslation(m.title, locale) }}
                            </h3>

                            <!-- Footer: date + arrow -->
                            <div class="mt-4 pt-4 border-t border-[#eef0f4] flex items-center justify-between">
                                <span class="text-[14px] text-[#8a94a6] flex items-center gap-1.5">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    {{ formatDate(m.date || m.createdAt) }}
                                </span>
                                <span
                                    class="w-8 h-8 rounded-full flex items-center justify-center bg-[#f7f8fa] group-hover:bg-[#1a1e2e] transition-colors duration-300"
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="text-[#8a94a6] group-hover:text-white transition-colors duration-300"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </router-link>
                </div>

                <div v-if="loadFailed" role="alert" class="py-12 text-center">
                    <p class="text-[#505a63] mb-5">{{ $t('eventsPage.meetingsPage.loadError') }}</p>
                    <button type="button" :disabled="loading" class="inline-flex rounded-full border border-[#d0d5dd] px-7 py-3 font-semibold text-[#1a1e2e] disabled:opacity-50" @click="loadMeetings">
                        {{ $t('eventsPage.meetingsPage.retry') }}
                    </button>
                </div>

                <WebEmptyState
                    v-if="!loading && !loadFailed && publishedMeetings.length === 0"
                    :title="$t('eventsPage.meetingsPage.emptyTitle')"
                    :text="$t('eventsPage.meetingsPage.emptyText')"
                >
                    <template #icon>
                        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="8" width="20" height="20" rx="5" stroke="currentColor" stroke-width="2" />
                            <path d="M13 14v8M9 18h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            <path d="M25 12h2a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            <path d="M29 16v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </template>
                </WebEmptyState>

                <nav v-if="totalPages > 1" class="meetings-pagination" :aria-label="$t('eventsPage.meetingsPage.paginationLabel')">
                    <template v-for="(item, index) in pageItems" :key="`${item}-${index}`">
                        <span v-if="item === 'ellipsis'" class="meetings-pagination__ellipsis" aria-hidden="true">…</span>
                        <button
                            v-else
                            type="button"
                            class="meetings-pagination__page"
                            :class="{ 'is-active': item === page }"
                            :aria-current="item === page ? 'page' : undefined"
                            :aria-label="$t('eventsPage.meetingsPage.pageLabel', { page: item })"
                            :disabled="loading"
                            @click="changePage(item)"
                        >
                            {{ item }}
                        </button>
                    </template>
                </nav>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import WebEmptyState from '@/components/website/WebEmptyState.vue'
import CardImageSlider from '@/components/website/CardImageSlider.vue'
import { useMeetingsStore } from '@/features/meetings/store'
import { resolveTranslation } from '@/utils/i18n'
import type { Meeting } from '@/features/meetings/types'

const { locale } = useI18n()
const meetingsStore = useMeetingsStore()
const route = useRoute()
const router = useRouter()
const PAGE_SIZE = 12
const meetings = ref<Meeting[]>([])
const loading = ref(false)
const loadFailed = ref(false)
const totalPages = ref(0)
const listRef = ref<HTMLElement | null>(null)
let requestId = 0

const page = computed(() => {
    const value = Number(route.query.page)
    return Number.isSafeInteger(value) && value > 0 ? value : 1
})

const publishedMeetings = computed(() => meetings.value.filter((m) => m.status === 1))

const pageItems = computed<(number | 'ellipsis')[]>(() => {
    const last = totalPages.value
    if (last <= 8) return Array.from({ length: last }, (_, i) => i + 1)
    const start = Math.max(2, Math.min(page.value - 2, last - 5))
    const end = Math.min(last - 1, Math.max(page.value + 2, 6))
    const items: (number | 'ellipsis')[] = [1]
    if (start > 2) items.push('ellipsis')
    for (let i = start; i <= end; i++) items.push(i)
    if (end < last - 1) items.push('ellipsis')
    items.push(last)
    return items
})

function changePage(value: number) {
    if (loading.value || value === page.value) return
    router.push({ query: { ...route.query, page: value === 1 ? undefined : String(value) }, hash: route.hash })
}

async function loadMeetings() {
    const id = ++requestId
    const requestedPage = page.value
    loading.value = true
    loadFailed.value = false
    meetings.value = []
    try {
        const res = await meetingsStore.fetchAll({ page: requestedPage, limit: PAGE_SIZE, sortBy: 'date', order: 'desc' })
        if (id !== requestId) return
        const pagination = res.meta.pagination
        totalPages.value = pagination.lastPage
        const lastValidPage = Math.max(1, pagination.lastPage)
        if (requestedPage > lastValidPage) {
            await router.replace({ query: { ...route.query, page: lastValidPage === 1 ? undefined : String(lastValidPage) }, hash: route.hash })
            return
        }
        meetings.value = res.data
        await nextTick()
        if (requestedPage > 1) listRef.value?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    } catch {
        if (id === requestId) loadFailed.value = true
    } finally {
        if (id === requestId) loading.value = false
    }
}

watch(page, loadMeetings, { immediate: true })
onBeforeUnmount(() => { requestId++ })

function formatDate(iso?: string | null) {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleDateString('en-GB').replace(/\//g, '.')
}

</script>

<style scoped lang="scss">
.meetings-pagination {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 32px;

    &__page {
        width: 28px;
        height: 28px;
        border-radius: 999px;
        color: #333;
        font-size: 14px;
        transition: background-color 0.2s, color 0.2s;

        &:hover:not(:disabled) { background: #eef0f4; }
        &.is-active { background: #191c1f; color: #fff; font-weight: 700; }
        &:disabled { cursor: default; }
        &:focus-visible { outline: 2px solid #191c1f; outline-offset: 3px; }
    }

    &__ellipsis { width: 28px; text-align: center; color: #333; font-size: 18px; }

    @media (min-width: 768px) {
        gap: 8px;
    }
}

[aria-busy] { scroll-margin-top: 100px; }
</style>
