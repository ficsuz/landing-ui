<template>
    <section ref="sectionEl" class="bg-white py-16 md:py-24">
        <div class="page-container">
            <!-- Header -->
            <div class="text-center mb-12 md:mb-16">
                <h2
                    class="section-title mb-4 transition-all duration-700"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
                >
                    {{ $t('investments.title') }}
                </h2>
                <p
                    class="text-[clamp(13px,1.2vw,16px)] text-[#8a94a6] font-medium transition-all duration-700 delay-100"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
                >
                    {{ $t('investments.subtitle') }}
                </p>
            </div>

            <!-- 3x3 grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12 md:mb-16">
                <div
                    v-for="(stat, i) in stats"
                    :key="i"
                    class="flex flex-col gap-3 p-6 md:p-8 border border-[#eef0f4] rounded-2xl transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] cursor-default"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                    :style="{ transitionDelay: visible ? `${i * 70}ms` : '0ms' }"
                >
                    <span class="font-black text-[clamp(28px,3vw,44px)] text-[#1a1e2e] leading-none tabular-nums">
                        {{ formatDisplay(stat, animatedValues[i]) }}
                    </span>
                    <div class="h-px bg-[#eef0f4] w-full" />
                    <span class="text-[13px] text-[#8a94a6] leading-snug font-medium">
                        {{ $t(stat.labelKey) }}
                    </span>
                </div>
            </div>

            <!-- CTA -->
            <div
                class="flex justify-center transition-all duration-700 delay-500"
                :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            >
                <AppLearnMore to="/results/investments" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppLearnMore from '@/components/website/AppLearnMore.vue'

interface Stat {
    prefix?: string
    num: number | null  // null = non-numeric, no count-up (e.g. "BB")
    suffix?: string
    decimals?: number
    labelKey: string
}

// API tayyor bo'lganda: onMounted ichida stats.value = await fetchInvestmentStats()
const stats: Stat[] = [
    { prefix: '>$', num: 135,  suffix: ' bn',  labelKey: 'investments.gdp' },
    { num: 7.7,                suffix: '%',   decimals: 1, labelKey: 'investments.gdpGrowth' },
    { prefix: '~$', num: 42,   suffix: ' bn',  labelKey: 'investments.foreignInflow' },
    { num: null,                              labelKey: 'investments.rating' },
    { prefix: '$',  num: 55,   suffix: ' bn',  labelKey: 'investments.reserves' },
    { num: 7.3,                suffix: '%',   decimals: 1, labelKey: 'investments.inflation' },
    { prefix: '+',  num: 23,   suffix: '%',   labelKey: 'investments.exportGrowth' },
    { num: 31.9,               suffix: '%',   decimals: 1, labelKey: 'investments.totalInvestment' },
    { num: 4.8,                suffix: '%',   decimals: 1, labelKey: 'investments.unemployment' },
]

const animatedValues = ref<number[]>(stats.map(() => 0))

const formatDisplay = (stat: Stat, animated: number): string => {
    if (stat.num === null) return 'BB'
    const n = stat.decimals !== undefined
        ? animated.toFixed(stat.decimals)
        : Math.round(animated)
    return `${stat.prefix ?? ''}${n}${stat.suffix ?? ''}`
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

const runCountUp = () => {
    const duration = 1800
    const start = performance.now()
    const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = easeOutCubic(progress)
        stats.forEach((stat, i) => {
            if (stat.num !== null) {
                animatedValues.value[i] = stat.num * eased
            }
        })
        if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
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
    if (!sectionEl.value) return
    const root = getScrollParent(sectionEl.value)
    observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                visible.value = true
                runCountUp()
                observer?.disconnect()
            }
        },
        { root, threshold: 0.1 },
    )
    observer.observe(sectionEl.value)
})

onUnmounted(() => {
    observer?.disconnect()
})
</script>
