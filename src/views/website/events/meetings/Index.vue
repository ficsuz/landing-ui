<template>
    <div class="meetings-page">
        <section class="bg-[#f7f8fa] py-12 md:py-16">
            <div class="page-container">
                <div v-loading="meetingsStore.loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <router-link
                        v-for="m in publishedMeetings"
                        :key="m.id"
                        :to="{ name: 'events-meetings-detail', params: { id: m.id } }"
                        class="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#eef0f4] shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.11)] hover:-translate-y-1 transition-all duration-300"
                    >
                        <!-- Image -->
                        <div class="relative overflow-hidden aspect-[16/10] bg-[#eef0f4] shrink-0">
                            <img
                                v-if="getMediaUrl(m.imageId)"
                                :src="getMediaUrl(m.imageId)"
                                :alt="resolveTranslation(m.title, locale)"
                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div v-else class="w-full h-full flex items-center justify-center">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c8cdd6" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                </svg>
                            </div>

                            <!-- Download icon (rasm markazida, doim ko'rinadi, linkka ta'sir qilmaydi) -->
                            <button
                                v-if="getMediaUrl(m.imageId)"
                                type="button"
                                :title="$t('common.download')"
                                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.18)] text-[#1a1e2e] hover:bg-white hover:scale-105 transition-all duration-300"
                                @click.stop.prevent="downloadImage(m)"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                            </button>
                        </div>

                        <!-- Body -->
                        <div class="flex flex-col flex-1 p-5 md:p-6">
                            <p v-if="resolveTranslation(m.subject, locale)" class="text-[11px] font-bold tracking-widest uppercase text-[#4361ee] mb-2">
                                {{ resolveTranslation(m.subject, locale) }}
                            </p>

                            <h3 class="font-bold text-[16px] md:text-[17px] text-[#1a1e2e] leading-snug line-clamp-3 flex-1">
                                {{ resolveTranslation(m.title, locale) }}
                            </h3>

                            <!-- Footer: date + arrow -->
                            <div class="mt-4 pt-4 border-t border-[#eef0f4] flex items-center justify-between">
                                <span class="text-[14px] text-[#8a94a6] flex items-center gap-1.5">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    {{ formatDate(m.date || m.createdAt) }}
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

                <WebEmptyState
                    v-if="!meetingsStore.loading && publishedMeetings.length === 0"
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
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import WebEmptyState from '@/components/website/WebEmptyState.vue'
import { useMeetingsStore } from '@/features/meetings/store'
import type { Translation } from '@/types/server/api.types'
import { resolveTranslation } from '@/utils/i18n'
import { getMediaUrl } from '@/utils/media'

const { locale } = useI18n()
const meetingsStore = useMeetingsStore()

const publishedMeetings = computed(() => meetingsStore.items.filter((m) => m.status === 1))

async function downloadImage(m: { imageId: string | null; title: Translation }) {
    const url = getMediaUrl(m.imageId)
    if (!url) return
    try {
        const res = await fetch(url)
        const blob = await res.blob()
        const objectUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = objectUrl
        a.download = resolveTranslation(m.title, locale.value) || 'meeting'
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(objectUrl)
    } catch {
        window.open(url, '_blank')
    }
}

function formatDate(iso?: string | null) {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleDateString('en-GB').replace(/\//g, '.')
}

onMounted(() => {
    meetingsStore.fetchAll({ limit: 100, sortBy: 'date', order: 'desc' })
})
</script>
