<template>
    <div class="results-page">
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <!-- Intro -->
                <div class="rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] p-6 md:p-8 mb-16">
                    <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed">
                        {{ $t('resultsPage.overviewIntro') }}
                    </p>
                </div>

                <!-- Platform for Investors -->
                <div ref="platformRef" class="mb-20">
                    <h2 class="section-title mb-8">
                        {{ $t('resultsPage.platformTitle') }}
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div
                            v-for="(stat, i) in platformStats"
                            :key="i"
                            class="rounded-2xl p-6 md:p-8 flex flex-col gap-3"
                            :class="[
                                stat.dark ? 'bg-[#f7f8fa]' : 'border border-[#eef0f4] bg-[#f7f8fa]',
                                platformVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                            ]"
                            :style="{ transition: 'opacity 0.55s, transform 0.55s', transitionDelay: platformVisible ? `${i * 75}ms` : '0ms' }"
                        >
                            <span
                                class="font-black text-[clamp(36px,4.5vw,60px)] leading-none tabular-nums"
                                :class="stat.dark ? 'text-[#1a1e2e]' : 'text-[#1a1e2e]'"
                            >
                                <template v-if="stat.type === 'multiplier'">×{{ platformDisplay[i] }}</template>
                                <template v-else-if="stat.type === 'range'">{{ stat.rangeStart }} → {{ platformDisplay[i] }}</template>
                                <template v-else>{{ platformDisplay[i] }}{{ stat.suffix ?? '' }}</template>
                            </span>
                            <span class="text-[13px] leading-snug text-[#8a94a6]">
                                {{ $t(stat.labelKey) }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Development of Investment Environment -->
                <div ref="investRef" class="mb-20">
                    <h2 class="section-title mb-8">
                        {{ $t('resultsPage.investEnvTitle') }}
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div
                            v-for="(stat, i) in investStats"
                            :key="i"
                            class="rounded-2xl p-6 md:p-8 flex flex-col gap-3"
                            :class="[
                                stat.dark ? 'bg-[#f7f8fa]' : 'border border-[#eef0f4] bg-[#f7f8fa]',
                                investVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                            ]"
                            :style="{ transition: 'opacity 0.55s, transform 0.55s', transitionDelay: investVisible ? `${i * 75}ms` : '0ms' }"
                        >
                            <span
                                class="font-black text-[clamp(36px,4.5vw,60px)] leading-none tabular-nums"
                                :class="stat.dark ? 'text-[#1a1e2e]' : 'text-[#1a1e2e]'"
                            >
                                <template v-if="stat.type === 'range'">{{ stat.rangeStart }} → {{ investDisplay[i] }}</template>
                                <template v-else>{{ investDisplay[i] }}{{ stat.suffix ?? '' }}</template>
                            </span>
                            <span class="text-[13px] leading-snug text-[#8a94a6]">
                                {{ $t(stat.labelKey) }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Legal Acts -->
                <div class="mb-20">
                    <h2 class="section-title mb-3">
                        {{ $t('resultsPage.legalActs.title') }}
                    </h2>
                    <p class="text-[clamp(14px,1.1vw,16px)] text-[#8a94a6] mb-10">{{ $t('resultsPage.legalActs.subtitle') }}</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div
                            v-for="(act, i) in legalActs"
                            :key="i"
                            class="flex items-center gap-4 rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] px-5 py-4"
                        >
                            <span class="shrink-0 w-9 h-9 rounded-xl bg-[#1a1e2e] text-white text-[12px] font-bold flex items-center justify-center">
                                {{ String(i + 1).padStart(2, '0') }}
                            </span>
                            <span class="text-[14px] text-[#1a1e2e] leading-snug font-medium">{{ $t(act.labelKey) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Strategic Initiative -->

                <!-- Analytical Reports -->
                <div class="mb-10">
                    <h2 class="section-title mb-10">
                        {{ $t('resultsPage.reports.title') }}
                    </h2>
                    <div v-loading="reportsStore.loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                        <router-link
                            v-for="report in publishedReports"
                            :key="report.id"
                            :to="{ name: 'media-reports' }"
                            class="group flex flex-col"
                        >
                            <!-- Cover image -->
                            <div
                                class="rounded-2xl overflow-hidden aspect-[3/4] relative shadow-[0_2px_16px_rgba(0,0,0,0.10)] group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-shadow duration-300 bg-[#eef0f4]"
                            >
                                <img
                                    v-if="getMediaUrl(report.previewImageId)"
                                    :src="getMediaUrl(report.previewImageId)"
                                    :alt="resolveTranslation(report.title)"
                                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <span
                                    class="absolute bottom-3 left-3 text-[11px] font-semibold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg"
                                >
                                    {{ formatDate(report.createdAt) }}
                                </span>
                            </div>
                            <!-- Title + link -->
                            <div class="pt-3 flex flex-col flex-1">
                                <p class="text-[13px] font-bold text-[#1a1e2e] leading-snug line-clamp-2">{{ resolveTranslation(report.title) }}</p>
                                <span
                                    class="mt-auto pt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-[#8a94a6] group-hover:text-[#1a1e2e] group-hover:gap-2 transition-all duration-200"
                                >
                                    {{ $t('common.learnMore') }}
                                    <svg
                                        width="11"
                                        height="11"
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
                        </router-link>
                    </div>
                    <el-empty
                        v-if="!reportsStore.loading && publishedReports.length === 0"
                        :description="$t('common.noData')"
                        class="py-6"
                    />
                </div>
                <div class="mb-10">
                    <div
                        class="flex flex-col md:flex-row items-center md:items-start gap-6 rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] p-6 md:p-8 border-l-[3px] border-l-[#1a1e2e]"
                    >
                        <div class="shrink-0 flex items-center justify-center">
                            <img :src="imgRaicLogo" alt="RAIC-CAC" class="w-[100px] md:w-[120px] object-contain" />
                        </div>
                        <div class="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
                            <span class="text-[11px] font-black uppercase tracking-[0.14em] text-[#1a1e2e]">
                                {{ $t('resultsPage.strategic.badge') }}
                            </span>
                            <p class="text-[clamp(14px,1.2vw,17px)] text-[#444] leading-relaxed">
                                {{ $t('resultsPage.strategic.description') }}
                            </p>
                            <router-link
                                :to="{ name: 'results-regional-alliance' }"
                                class="mt-1 inline-flex items-center gap-2 border border-[#d0d5dd] text-[#1a1e2e] font-semibold text-[15px] px-7 py-3 rounded-full transition-all duration-200 hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e]"
                            >
                                {{ $t('common.learnMore') }}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAnalyticalReportsStore } from '@/features/analyticalReports/store'
import { getMediaUrl } from '@/utils/media'
import type { Translation } from '@/types/server/api.types'

import imgRaicLogo from '@/assets/documents/raic.png'

const { locale } = useI18n()
const reportsStore = useAnalyticalReportsStore()

const publishedReports = computed(() => reportsStore.items.filter((r) => r.status))

function resolveTranslation(t: Translation | null | undefined) {
    if (!t) return ''
    return t[locale.value as keyof Translation] || t.uz || ''
}

function formatDate(iso?: string) {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleDateString('en-GB').replace(/\//g, '.')
}

interface StatItem {
    type: 'simple' | 'range' | 'multiplier'
    value: number
    rangeStart?: number
    suffix?: string
    labelKey: string
    dark?: boolean
}

const platformStats: StatItem[] = [
    { type: 'multiplier', value: 5, labelKey: 'resultsPage.platform.s1' },
    { type: 'range', value: 85, rangeStart: 54, labelKey: 'resultsPage.platform.s2' },
    { type: 'simple', value: 43, labelKey: 'resultsPage.platform.s3', dark: true },
    { type: 'simple', value: 19, labelKey: 'resultsPage.platform.s4' },
    { type: 'simple', value: 4, labelKey: 'resultsPage.platform.s5' },
    { type: 'simple', value: 23, labelKey: 'resultsPage.platform.s6' },
]

const investStats: StatItem[] = [
    { type: 'range', value: 16, rangeStart: 5, labelKey: 'resultsPage.investEnv.s1' },
    { type: 'simple', value: 50, suffix: '+', labelKey: 'resultsPage.investEnv.s2' },
    { type: 'simple', value: 120, labelKey: 'resultsPage.investEnv.s3', dark: true },
    { type: 'simple', value: 8, labelKey: 'resultsPage.investEnv.s4' },
    { type: 'simple', value: 3, labelKey: 'resultsPage.investEnv.s5' },
    { type: 'simple', value: 5, labelKey: 'resultsPage.investEnv.s6' },
]

const legalActs = [
    { labelKey: 'resultsPage.legalActs.a1' },
    { labelKey: 'resultsPage.legalActs.a2' },
    { labelKey: 'resultsPage.legalActs.a3' },
    { labelKey: 'resultsPage.legalActs.a4' },
    { labelKey: 'resultsPage.legalActs.a5' },
    { labelKey: 'resultsPage.legalActs.a6' },
    { labelKey: 'resultsPage.legalActs.a7' },
    { labelKey: 'resultsPage.legalActs.a8' },
]


const platformDisplay = ref(platformStats.map(() => 0))
const investDisplay = ref(investStats.map(() => 0))
const platformVisible = ref(false)
const investVisible = ref(false)
const platformRef = ref<HTMLElement | null>(null)
const investRef = ref<HTMLElement | null>(null)

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

function runCountUp(targets: StatItem[], display: typeof platformDisplay) {
    const duration = 1400
    const start = performance.now()
    const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const e = easeOut(p)
        targets.forEach((s, i) => {
            display.value[i] = Math.round(e * s.value)
        })
        if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
}

function makeObserver(el: HTMLElement, visibleRef: typeof platformVisible, targets: StatItem[], display: typeof platformDisplay) {
    const obs = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                visibleRef.value = true
                runCountUp(targets, display)
                obs.disconnect()
            }
        },
        { threshold: 0.15 }
    )
    obs.observe(el)
    return obs
}

let obsA: IntersectionObserver | null = null
let obsB: IntersectionObserver | null = null

onMounted(() => {
    if (platformRef.value) obsA = makeObserver(platformRef.value, platformVisible, platformStats, platformDisplay)
    if (investRef.value) obsB = makeObserver(investRef.value, investVisible, investStats, investDisplay)
    reportsStore.fetchAll({ limit: 10, sortBy: 'date', order: 'desc' })
})

onUnmounted(() => {
    obsA?.disconnect()
    obsB?.disconnect()
})
</script>
