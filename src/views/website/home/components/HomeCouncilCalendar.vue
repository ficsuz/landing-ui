<template>
    <section ref="sectionEl" class="bg-white py-16 md:py-24 overflow-hidden">
        <!-- Title -->
        <div class="text-center mb-12 md:mb-16 px-4">
            <h2
                class="section-title transition-all duration-700"
                :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
                {{ $t('councilCalendar.title') }}
            </h2>
        </div>

        <!-- Fan Carousel -->
        <div
            class="relative w-full flex items-center justify-center transition-opacity duration-700 delay-100"
            :class="visible ? 'opacity-100' : 'opacity-0'"
            :style="{ height: carouselHeight + 'px' }"
            @mouseenter="pause"
            @mouseleave="resume"
        >
            <div v-for="(event, i) in events" :key="i" class="absolute cursor-pointer select-none" :style="getCardStyle(i)" @click="goTo(i)">
                <div class="rounded-[20px] p-7 flex flex-col justify-center" :style="getInnerStyle(i)">
                    <p class="font-black text-[clamp(36px,3.5vw,56px)] leading-none text-[#1a1e2e] mb-2">
                        {{ event.year }}
                    </p>
                    <div
                        class="h-[3px] rounded-full mb-5"
                        :style="{
                            width: i === current ? '40px' : '28px',
                            backgroundColor: i === current ? '#1a1e2e' : '#c8ccd6',
                            transition: 'width 0.4s ease, background-color 0.4s ease',
                        }"
                    />
                    <p class="text-[11px] font-semibold tracking-[0.15em] uppercase mb-2" :style="{ color: i === current ? '#8a94a6' : '#b0b8c6' }">
                        {{ event.month }}
                    </p>
                    <p
                        class="font-medium leading-snug mb-5"
                        :style="{ fontSize: i === current ? '16px' : '13px', color: i === current ? '#1a1e2e' : '#8a94a6' }"
                    >
                        {{ event.description }}
                    </p>
                    <router-link
                        v-if="i === current"
                        :to="event.link"
                        class="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1a1e2e] hover:gap-3 transition-all duration-200"
                    >
                        {{ $t('common.learnMore') }}
                        <svg
                            width="14"
                            height="14"
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
                    <span v-else class="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#b0b8c6]">
                        {{ $t('common.learnMore') }}
                        <svg
                            width="12"
                            height="12"
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
        </div>

        <!-- Navigation arrows -->
        <div
            class="flex items-center justify-center gap-3 mt-8 transition-all duration-700 delay-200"
            :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
            <button
                class="w-12 h-12 rounded-full border border-[#d0d5dd] flex items-center justify-center text-[#1a1e2e] hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] transition-all duration-200"
                @click="prev"
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                class="w-12 h-12 rounded-full border border-[#d0d5dd] flex items-center justify-center text-[#1a1e2e] hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] transition-all duration-200"
                @click="next"
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </button>
        </div>

        <!-- All events button -->
        <div
            v-if="showLearnMore"
            class="flex justify-center mt-8 transition-all duration-700 delay-300"
            :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
            <AppLearnMore to="/events" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

withDefaults(defineProps<{ showLearnMore?: boolean }>(), { showLearnMore: true })

interface CalendarEvent {
    year: string
    month: string
    description: string
    link: string
}

const events: CalendarEvent[] = [
    { year: '2019', month: 'November', description: 'Establishment and intermediate session', link: '/events/2019' },
    { year: '2020', month: 'December', description: 'II Intermediate session held', link: '/events/2020' },
    { year: '2021', month: 'October', description: 'I Plenary Session held', link: '/events/2021' },
    { year: '2022', month: 'November', description: 'I Plenary Session held', link: '/events/2022' },
    { year: '2023', month: 'August', description: 'Intermediate session held', link: '/events/2023' },
    { year: '2024', month: 'September', description: 'Session held (PR-179)', link: '/events/2024' },
    { year: '2025', month: 'November', description: 'Intermediate session held', link: '/events/2025' },
]

const n = events.length
const current = ref(2)
const sectionEl = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | null = null
let timer: ReturnType<typeof setInterval> | null = null
let paused = false

const cardWidth = ref(300)
const carouselHeight = ref(420)
const gaps = ref({ step1: 240, step2: 440 })

// Fan step config (offset from center: -2, -1, 0, +1, +2)
const stepCfg = {
    0: { scale: 1, opacity: 1, y: 0, zIndex: 5 },
    1: { scale: 0.86, opacity: 0.8, y: 10, zIndex: 3 },
    2: { scale: 0.72, opacity: 0.55, y: 20, zIndex: 1 },
}

const getOffset = (i: number) => {
    // Circular offset: shortest path around the ring
    let d = i - current.value
    if (d > n / 2) d -= n
    if (d < -n / 2) d += n
    return d
}

const getCardStyle = (i: number) => {
    const d = getOffset(i)
    const abs = Math.abs(d)

    if (abs > 2) {
        // Hidden beyond visible range — snap to the edge invisibly
        const sign = d > 0 ? 1 : -1
        return {
            width: cardWidth.value + 'px',
            transform: `translateX(${sign * (gaps.value.step2 + cardWidth.value)}px) scale(0.6)`,
            opacity: '0',
            zIndex: '0',
            pointerEvents: 'none' as const,
            transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
        }
    }

    const cfg = stepCfg[abs as 0 | 1 | 2]
    const x = d === 0 ? 0 : (d > 0 ? 1 : -1) * (abs === 1 ? gaps.value.step1 : gaps.value.step2)

    return {
        width: cardWidth.value + 'px',
        transform: `translateX(${x}px) translateY(${cfg.y}px) scale(${cfg.scale})`,
        opacity: String(cfg.opacity),
        zIndex: String(cfg.zIndex),
        pointerEvents: 'auto' as const,
        transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease',
    }
}

const getInnerStyle = (i: number) => {
    const isCenter = i === current.value
    return {
        width: cardWidth.value + 'px',
        height: '360px',
        backgroundColor: isCenter ? '#ffffff' : '#f2f3f6',
        boxShadow: isCenter ? '0 8px 48px rgba(0,0,0,0.13)' : 'none',
        transition: 'background-color 0.4s ease, box-shadow 0.4s ease',
    }
}

const goTo = (i: number) => {
    current.value = i
}
const next = () => {
    current.value = (current.value + 1) % n
}
const prev = () => {
    current.value = (current.value - 1 + n) % n
}
const pause = () => {
    paused = true
}
const resume = () => {
    paused = false
}

const measure = () => {
    const w = window.innerWidth
    if (w < 640) {
        cardWidth.value = Math.min(240, w - 48)
        carouselHeight.value = 420
        gaps.value = { step1: cardWidth.value * 0.72, step2: cardWidth.value * 1.35 }
    } else if (w < 1024) {
        cardWidth.value = 260
        carouselHeight.value = 420
        gaps.value = { step1: 210, step2: 390 }
    } else {
        cardWidth.value = 320
        carouselHeight.value = 420
        gaps.value = { step1: 260, step2: 480 }
    }
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
    measure()
    window.addEventListener('resize', measure)
    timer = setInterval(() => {
        if (!paused) next()
    }, 4000)

    if (sectionEl.value) {
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
    }
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
    window.removeEventListener('resize', measure)
    observer?.disconnect()
})
</script>
