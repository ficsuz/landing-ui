<template>
    <div class="initiatives-page">
        <!-- Plenary sessions table -->
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <h1 class="section-title text-center mb-6">
                    {{ $t('resultsPage.initiativesPage.pageTitle') }}
                </h1>
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-2xl mx-auto text-center mb-12">
                    {{ $t('resultsPage.initiativesPage.intro') }}
                </p>

                <!-- Desktop table -->
                <div class="hidden md:block rounded-2xl border border-[#eef0f4] overflow-hidden">
                    <div class="grid items-center bg-[#f7f8fa] px-6 py-3 gap-6" style="grid-template-columns: 1.4fr 0.8fr 3fr 0.7fr">
                        <span class="text-[11px] font-bold text-[#8a94a6] uppercase tracking-wider">{{ $t('resultsPage.initiativesPage.colSession') }}</span>
                        <span class="text-[11px] font-bold text-[#8a94a6] uppercase tracking-wider">{{ $t('resultsPage.initiativesPage.colDocument') }}</span>
                        <span class="text-[11px] font-bold text-[#8a94a6] uppercase tracking-wider">{{ $t('resultsPage.initiativesPage.colGroups') }}</span>
                        <span class="text-[11px] font-bold text-[#8a94a6] uppercase tracking-wider text-right">{{ $t('resultsPage.initiativesPage.colInitiatives') }}</span>
                    </div>
                    <div
                        v-for="(row, i) in PLENARY_ROWS"
                        :key="i"
                        class="grid items-start bg-white px-6 py-6 gap-6 border-t border-[#eef0f4]"
                        style="grid-template-columns: 1.4fr 0.8fr 3fr 0.7fr"
                    >
                        <span class="font-bold text-[15px] text-[#1a1e2e]">{{ $t(row.sessionKey) }}</span>
                        <span class="text-[14px] text-[#444]">{{ $t(row.documentKey) }}</span>
                        <span class="text-[14px] text-[#444] leading-relaxed">{{ $t(row.groupsKey) }}</span>
                        <span class="text-right font-black text-[24px] text-[#1a1e2e] leading-none">{{ row.count }}</span>
                    </div>
                </div>

                <!-- Mobile cards -->
                <div class="flex flex-col gap-4 md:hidden">
                    <div
                        v-for="(row, i) in PLENARY_ROWS"
                        :key="i"
                        class="rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] p-5 flex flex-col gap-3"
                    >
                        <div class="flex items-start justify-between gap-3">
                            <span class="font-bold text-[15px] text-[#1a1e2e]">{{ $t(row.sessionKey) }}</span>
                            <span class="font-black text-[28px] text-[#1a1e2e] leading-none">{{ row.count }}</span>
                        </div>
                        <div v-if="$t(row.documentKey) !== '—'" class="text-[12px] font-semibold text-[#8a94a6] uppercase tracking-wide">
                            {{ $t(row.documentKey) }}
                        </div>
                        <p class="text-[13px] text-[#444] leading-relaxed">{{ $t(row.groupsKey) }}</p>
                        <div class="pt-2 border-t border-[#eef0f4]">
                            <span class="text-[11px] text-[#8a94a6] uppercase tracking-wider font-semibold">{{ $t('resultsPage.initiativesPage.colInitiatives') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Collected initiatives: category tabs + item list -->
        <section class="bg-white pb-16 md:pb-24">
            <div class="page-container">
                <h2 class="section-title text-center mb-3">
                    {{ $t('resultsPage.initiativesPage.collected.title') }}
                </h2>
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] text-center mb-10">
                    {{ $t('resultsPage.initiativesPage.collected.subtitle') }}&nbsp;<strong class="text-[#1a1e2e]">120</strong>
                </p>

                <!-- Category tabs -->
                <div ref="tabGridRef" class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                    <button
                        v-for="(cat, i) in CATEGORIES"
                        :key="i"
                        @click="activeTab = i"
                        class="rounded-2xl p-5 md:p-7 flex flex-col gap-3 text-left focus:outline-none"
                        :class="activeTab === i ? 'bg-[#1a1e2e]' : 'bg-[#f7f8fa] hover:bg-[#eaedf2]'"
                        :style="{
                            opacity: tabVisible ? 1 : 0,
                            transform: tabVisible ? 'translateY(0)' : 'translateY(28px)',
                            transition: 'opacity 0.5s, transform 0.5s, background-color 0.2s',
                            transitionDelay: tabVisible ? `${i * 55}ms` : '0ms',
                        }"
                    >
                        <span
                            class="font-black text-[clamp(36px,4.5vw,60px)] leading-none tabular-nums"
                            :class="activeTab === i ? 'text-white' : 'text-[#1a1e2e]'"
                        >
                            {{ display[i] }}
                        </span>
                        <span
                            class="text-[10px] font-bold uppercase tracking-[0.12em] leading-snug"
                            :class="activeTab === i ? 'text-white/60' : 'text-[#8a94a6]'"
                        >
                            {{ cat[lang] }}
                        </span>
                    </button>
                </div>

                <!-- Item list -->
                <Transition name="tab-fade" mode="out-in">
                    <div :key="activeTab" class="rounded-2xl border border-[#eef0f4] overflow-hidden">
                        <div class="flex items-center gap-4 bg-[#f7f8fa] px-5 md:px-7 py-3 border-b border-[#eef0f4]">
                            <span class="flex-1 text-[11px] font-bold text-[#8a94a6] uppercase tracking-wider">
                                {{ $t('resultsPage.initiativesPage.collected.colInitiative') }}
                            </span>
                            <span class="shrink-0 text-[11px] font-bold text-[#8a94a6] uppercase tracking-wider">
                                {{ $t('resultsPage.initiativesPage.collected.colSpeaker') }}
                            </span>
                        </div>
                        <div
                            v-for="(item, j) in CATEGORIES[activeTab].items"
                            :key="j"
                            class="flex items-start gap-4 px-5 md:px-7 py-4 border-b last:border-b-0 border-[#eef0f4] bg-white"
                        >
                            <span class="shrink-0 mt-0.5 w-7 h-7 rounded-lg bg-[#1a1e2e]/8 text-[#1a1e2e] text-[11px] font-bold flex items-center justify-center">
                                {{ String(j + 1).padStart(2, '0') }}
                            </span>
                            <span class="flex-1 text-[14px] text-[#1a1e2e] leading-snug">{{ item[lang] }}</span>
                            <span class="shrink-0 text-[11px] font-semibold text-[#505a63] bg-[#f7f8fa] border border-[#eef0f4] px-2.5 py-1 rounded-full whitespace-nowrap">
                                {{ item.speaker }}
                            </span>
                        </div>
                    </div>
                </Transition>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { PLENARY_ROWS, CATEGORIES } from './constants'

const { locale } = useI18n()
const lang = computed(() => {
    const l = locale.value
    return (l === 'ru' || l === 'uz' || l === 'en') ? l : 'en'
})

const activeTab = ref(0)
const display = ref(CATEGORIES.map(() => 0))
const tabVisible = ref(false)
const tabGridRef = ref<HTMLElement | null>(null)

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

function runCountUp() {
    const duration = 1200
    const start = performance.now()
    const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const e = easeOut(p)
        CATEGORIES.forEach((cat, i) => {
            display.value[i] = Math.round(e * cat.items.length)
        })
        if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
}

let obs: IntersectionObserver | null = null

onMounted(() => {
    if (!tabGridRef.value) return
    obs = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                tabVisible.value = true
                runCountUp()
                obs?.disconnect()
            }
        },
        { threshold: 0.1 }
    )
    obs.observe(tabGridRef.value)
})

onUnmounted(() => obs?.disconnect())
</script>

<style scoped>
.tab-fade-enter-active,
.tab-fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}
.tab-fade-enter-from {
    opacity: 0;
    transform: translateY(8px);
}
.tab-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
