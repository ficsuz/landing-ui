<template>
    <div class="reports-page">
        <section class="bg-white py-12 md:py-16">
            <div class="page-container">
                <!-- Title -->
                <div class="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <h1 class="section-title mb-4">{{ $t('mediaPage.reportsTitle') }}</h1>
                    <p class="text-[clamp(15px,1.3vw,18px)] text-[#505a63] leading-relaxed italic">
                        "{{ $t('mediaPage.reportsPage.quote') }}"
                    </p>
                </div>

                <!-- NEW APPROACHES section -->
                <div class="mb-16 md:mb-20">
                    <p class="text-[11px] font-bold tracking-widest uppercase text-[#8a94a6] mb-2">
                        {{ $t('mediaPage.reportsPage.newApproaches.label') }}
                    </p>
                    <h2 class="font-black text-[clamp(20px,2.2vw,32px)] leading-tight text-[#1a1e2e] uppercase mb-8">
                        {{ $t('mediaPage.reportsPage.newApproaches.title') }}
                    </h2>

                    <div v-loading="reportsStore.loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        <div
                            v-for="rep in publishedReports"
                            :key="rep.id"
                            class="group flex flex-col rounded-2xl bg-white border border-[#eef0f4] shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_36px_rgba(0,0,0,0.11)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                            <!-- Cover image -->
                            <div class="relative aspect-[3/4] bg-[#eef0f4] overflow-hidden shrink-0">
                                <img
                                    v-if="getMediaUrl(rep.previewImageId)"
                                    :src="getMediaUrl(rep.previewImageId)"
                                    :alt="resolveTranslation(rep.title)"
                                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                                <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#e4e8ef]">
                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#b0b8c6" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                    <span class="text-[10px] font-bold tracking-widest text-[#b0b8c6] uppercase">PDF</span>
                                </div>
                            </div>

                            <!-- Body -->
                            <div class="flex flex-col flex-1 p-4 gap-2">
                                <p class="text-[13px] md:text-[14px] font-bold text-[#1a1e2e] leading-snug flex-1">
                                    {{ resolveTranslation(rep.title) }}
                                </p>
                                <div class="flex items-center justify-between gap-2 mt-2">
                                    <span v-if="rep.date" class="text-[13px] text-[#8a94a6] font-medium shrink-0">
                                        {{ formatDate(rep.date) }}
                                    </span>
                                    <a
                                        v-if="reportFile(rep)"
                                        :href="reportFile(rep)"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#4361ee] bg-[#eff4ff] px-4 py-2 rounded-full hover:bg-[#4361ee] hover:text-white transition-all duration-200 no-underline shrink-0"
                                    >
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        {{ $t('resultsPage.documentsPage.downloadLabel') }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <el-empty v-if="!reportsStore.loading && publishedReports.length === 0" :description="$t('common.noData')" class="py-10" />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAnalyticalReportsStore } from '@/features/analyticalReports/store'
import { getMediaUrl } from '@/utils/media'
import type { AnalyticalReport } from '@/features/analyticalReports/types'
import type { Translation } from '@/types/server/api.types'

const { locale } = useI18n()
const reportsStore = useAnalyticalReportsStore()

const publishedReports = computed(() => reportsStore.items.filter((r) => r.status))

function resolveTranslation(t: Translation | null | undefined) {
    if (!t) return ''
    return t[locale.value as keyof Translation] || t.uz || ''
}

function reportFile(rep: AnalyticalReport) {
    return rep.fileId ? getMediaUrl(rep.fileId) : ''
}

function formatDate(iso?: string | null) {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleDateString('en-GB').replace(/\//g, '.')
}


onMounted(() => {
    reportsStore.fetchAll({ limit: 50, sortBy: 'date', order: 'desc' })
})
</script>
