<template>
    <section ref="sectionEl" class="bg-[#f7f8fa] py-16 md:py-24">
        <div class="page-container">
            <!-- Title -->
            <h2
                class="section-title text-center mb-12 md:mb-16 transition-all duration-700"
                :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
                {{ $t('keyFigures.title') }}
            </h2>

            <!-- Cards -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-10 md:mb-14">
                <div
                    v-for="(stat, i) in stats"
                    :key="i"
                    class="group bg-white rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col gap-2 md:gap-3 cursor-default transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]"
                    :class="[
                        { 'col-span-2 md:col-span-1': i === stats.length - 1 },
                        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                    ]"
                    :style="{ transitionDelay: visible ? `${i * 80}ms` : '0ms' }"
                >
                    <span class="font-black text-[clamp(26px,3.5vw,54px)] text-[#1a1e2e] leading-none tabular-nums">
                        {{ displayValues[i] }}{{ stat.suffix }}
                    </span>
                    <span class="text-[12px] sm:text-[13px] md:text-[14px] text-[#8a94a6] leading-snug font-medium">
                        {{ $t(stat.labelKey) }}
                    </span>
                    <div
                        class="mt-auto h-0.5 w-6 sm:w-8 rounded-full bg-[#e5e7eb] transition-all duration-300 group-hover:w-10 sm:group-hover:w-12 group-hover:bg-[#1a1e2e]"
                    />
                </div>
            </div>

            <!-- CTA -->
            <div
                class="flex justify-center transition-all duration-700 delay-500"
                :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
                <router-link
                    to="/results"
                    class="inline-flex items-center gap-2.5 border border-[#d0d5dd] text-[#1a1e2e] font-semibold text-[15px] px-8 py-3.5 rounded-full transition-all duration-200 hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] hover:shadow-md"
                >
                    {{ $t('common.learnMore') }}
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const stats = [
    { value: 43, suffix: '', labelKey: 'keyFigures.councilMembers' },
    { value: 85, suffix: '', labelKey: 'keyFigures.activeCompanies' },
    { value: 19, suffix: '', labelKey: 'keyFigures.countries' },
    { value: 16, suffix: '', labelKey: 'keyFigures.workingGroups' },
    { value: 120, suffix: '+', labelKey: 'keyFigures.initiatives' },
]

const displayValues = ref(stats.map(() => 0))
const visible = ref(false)
const sectionEl = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

const runCountUp = () => {
    const duration = 1600
    const start = performance.now()
    const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = easeOutCubic(progress)
        stats.forEach((stat, i) => {
            displayValues.value[i] = Math.round(eased * stat.value)
        })
        if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
}

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
        { root, threshold: 0.15 }
    )
    observer.observe(sectionEl.value)
})

onUnmounted(() => {
    observer?.disconnect()
})
</script>
