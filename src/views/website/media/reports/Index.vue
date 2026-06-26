<template>
    <div class="reports-page">
        <section class="bg-white py-12 md:py-16">
            <div class="page-container">
                <h1 class="section-title mb-8 text-center">{{ $t('mediaPage.reportsTitle') }}</h1>

                <!-- Quote -->
                <blockquote class="text-[clamp(16px,1.4vw,20px)] text-[#444] italic leading-relaxed max-w-3xl mb-12 border-l-4 border-[#1a1e2e]/20 pl-5">
                    "{{ $t('mediaPage.reportsPage.quote') }}"
                </blockquote>

                <!-- NEW APPROACHES section -->
                <div class="mb-16 md:mb-20">
                    <p class="text-[11px] font-bold tracking-widest uppercase text-[#8a94a6] mb-2">
                        {{ $t('mediaPage.reportsPage.newApproaches.label') }}
                    </p>
                    <h2 class="font-black text-[clamp(20px,2.2vw,32px)] leading-tight text-[#1a1e2e] uppercase mb-8">
                        {{ $t('mediaPage.reportsPage.newApproaches.title') }}
                    </h2>

                    <div v-loading="reportsStore.loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                        <component
                            :is="reportFile(rep) ? 'a' : 'div'"
                            v-for="rep in publishedReports"
                            :key="rep.id"
                            :href="reportFile(rep) || undefined"
                            :target="reportFile(rep) ? '_blank' : undefined"
                            :rel="reportFile(rep) ? 'noopener noreferrer' : undefined"
                            class="group flex flex-col gap-3 hover:-translate-y-1.5 transition-transform duration-300"
                        >
                            <!-- Cover image -->
                            <div
                                class="relative rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.10)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-shadow duration-300 [transform:translateZ(0)] aspect-[3/4] bg-[#eef0f4]"
                            >
                                <img
                                    v-if="getMediaUrl(rep.imageId)"
                                    :src="getMediaUrl(rep.imageId)"
                                    :alt="resolveTranslation(rep.title)"
                                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                                <!-- Hover download overlay -->
                                <div
                                    v-if="reportFile(rep)"
                                    class="absolute inset-0 bg-[#1a1e2e]/0 group-hover:bg-[#1a1e2e]/40 transition-all duration-300 flex items-center justify-center"
                                >
                                    <div
                                        class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#1a1e2e"
                                            stroke-width="2.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Title below -->
                            <p
                                class="text-[13px] font-semibold text-[#1a1e2e] leading-snug line-clamp-2 group-hover:text-[#2563eb] transition-colors duration-200 px-0.5"
                            >
                                {{ resolveTranslation(rep.title) }}
                            </p>
                        </component>
                    </div>

                    <el-empty
                        v-if="!reportsStore.loading && publishedReports.length === 0"
                        :description="$t('common.noData')"
                        class="py-10"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElEmpty } from 'element-plus'
import { useAnalyticalReportsStore } from '@/features/analyticalReports/store'
import { getMediaUrl } from '@/utils/media'
import type { AnalyticalReport, TranslatedFile } from '@/features/analyticalReports/types'
import type { Translation } from '@/types/server/api.types'

const { locale } = useI18n()
const reportsStore = useAnalyticalReportsStore()

const publishedReports = computed(() => reportsStore.items.filter((r) => r.status))

function resolveTranslation(t: Translation | null | undefined) {
    if (!t) return ''
    return t[locale.value as keyof Translation] || t.uz || ''
}

function reportFile(rep: AnalyticalReport) {
    const id = rep.file?.[locale.value as keyof TranslatedFile] || rep.file?.uz || rep.file?.en || rep.file?.ru
    return id ? getMediaUrl(id) : ''
}

onMounted(() => {
    reportsStore.fetchAll({ limit: 50, sortBy: 'order', order: 'asc' })
})
</script>
