<template>
    <section ref="sectionEl" class="bg-white py-16 md:py-24 overflow-hidden">
        <!-- Title -->
        <div class="text-center mb-12 md:mb-16 px-4">
            <h2 class="section-title transition-all duration-700" :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'">
                {{ t('councilCalendar.title') }}
            </h2>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center" :style="{ height: carouselHeight + 'px' }" aria-busy="true">
            <div class="rounded-[20px] bg-[#f7f8fa] animate-pulse" :style="{ width: cardWidth + 'px', height: CARD_HEIGHT + 'px' }" />
        </div>

        <!-- Error -->
        <div v-else-if="loadFailed" class="page-container">
            <div role="alert" class="max-w-[640px] mx-auto rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] px-6 py-12 text-center">
                <p class="text-[#505a63] mb-5">{{ t('eventsPage.calendar.loadError') }}</p>
                <button
                    type="button"
                    class="inline-flex rounded-full border border-[#d0d5dd] bg-white px-7 py-3 font-semibold text-[#1a1e2e] hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] transition-all duration-200"
                    @click="load"
                >
                    {{ t('eventsPage.calendar.retry') }}
                </button>
            </div>
        </div>

        <!-- Empty -->
        <div v-else-if="!slides.length" class="page-container">
            <p class="max-w-[640px] mx-auto rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] px-6 py-12 text-center text-[#505a63]">
                {{ t('councilCalendar.empty') }}
            </p>
        </div>

        <template v-else>
            <!-- Fan carousel: past events on the left, upcoming on the right, nearest one in the centre -->
            <div
                class="relative w-full flex items-center justify-center transition-opacity duration-700 delay-100"
                :class="visible ? 'opacity-100' : 'opacity-0'"
                :style="{ height: carouselHeight + 'px' }"
                role="region"
                aria-roledescription="carousel"
                :aria-label="t('councilCalendar.title')"
                @touchstart.passive="onTouchStart"
                @touchend.passive="onTouchEnd"
            >
                <article
                    v-for="(slide, i) in slides"
                    :key="slide.day"
                    class="absolute select-none"
                    :class="{ 'cursor-pointer': i !== current }"
                    :style="getCardStyle(i)"
                    :aria-hidden="Math.abs(i - current) > 2 || undefined"
                    @click="goTo(i)"
                >
                    <div
                        class="rounded-[20px] p-6 md:p-7 flex flex-col transition-[background-color,box-shadow] duration-500"
                        :class="i === current ? 'bg-white shadow-[0_8px_48px_rgba(0,0,0,0.13)]' : 'bg-[#f2f3f6]'"
                        :style="{ height: CARD_HEIGHT + 'px' }"
                    >
                        <!-- Date -->
                        <header class="flex items-start justify-between gap-3">
                            <time
                                :datetime="slide.day"
                                class="font-black text-[clamp(44px,4vw,60px)] leading-none tabular-nums transition-colors duration-500"
                                :class="i !== current && slide.status === 'past' ? 'text-[#b0b8c6]' : 'text-[#1a1e2e]'"
                            >
                                {{ slide.dayNumber }}
                            </time>
                            <span
                                class="inline-flex items-center gap-1.5 shrink-0 mt-1 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase whitespace-nowrap"
                                :class="BADGE_CLASS[slide.status]"
                            >
                                <span v-if="slide.status === 'today'" class="pulse relative w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
                                {{ slide.badge }}
                            </span>
                        </header>
                        <p class="mt-2 text-[13px] font-medium text-[#8a94a6]">{{ slide.dateLabel }}</p>

                        <div
                            class="h-[3px] rounded-full mt-4 mb-5 transition-all duration-500"
                            :class="i === current ? 'w-10 bg-[#1a1e2e]' : 'w-7 bg-[#c8ccd6]'"
                        />

                        <!-- One event that day: full details -->
                        <template v-if="slide.events.length === 1">
                            <p class="text-[11px] font-bold tracking-widest uppercase mb-2" :class="i === current ? 'text-[#4361ee]' : 'text-[#b0b8c6]'">
                                {{ slide.events[0].typeLabel }}
                            </p>
                            <h3 class="font-bold text-[16px] leading-snug line-clamp-3 mb-3" :class="i === current ? 'text-[#1a1e2e]' : 'text-[#8a94a6]'">
                                {{ slide.events[0].title }}
                            </h3>
                            <ul class="space-y-1.5 text-[13px] leading-snug" :class="i === current ? 'text-[#8a94a6]' : 'text-[#b0b8c6]'">
                                <li class="flex items-start gap-2">
                                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :aria-label="t('eventsPage.calendar.time')">
                                        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                                    </svg>
                                    <span class="tabular-nums">{{ slide.events[0].time }}</span>
                                </li>
                                <li v-if="slide.events[0].location" class="flex items-start gap-2">
                                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :aria-label="t('eventsPage.calendar.location')">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span class="line-clamp-2">{{ slide.events[0].location }}</span>
                                </li>
                            </ul>
                        </template>

                        <!-- Several events that day: compact list, the rest are on the events page -->
                        <template v-else>
                            <ul>
                                <li
                                    v-for="(ev, k) in slide.events.slice(0, MAX_EVENTS_PER_CARD)"
                                    :key="ev.id"
                                    :class="k ? 'mt-3 pt-3 border-t' : ''"
                                    :style="{ borderColor: i === current ? '#eef0f4' : '#e2e5ea' }"
                                >
                                    <p class="text-[11px] font-bold tracking-widest uppercase mb-1" :class="i === current ? 'text-[#4361ee]' : 'text-[#b0b8c6]'">
                                        <span class="tabular-nums">{{ ev.startTime }}</span> · {{ ev.typeLabel }}
                                    </p>
                                    <h3 class="font-bold text-[15px] leading-snug line-clamp-2" :class="i === current ? 'text-[#1a1e2e]' : 'text-[#8a94a6]'">
                                        {{ ev.title }}
                                    </h3>
                                </li>
                            </ul>
                            <p
                                v-if="slide.events.length > MAX_EVENTS_PER_CARD"
                                class="mt-3 text-[13px] font-semibold"
                                :class="i === current ? 'text-[#505a63]' : 'text-[#b0b8c6]'"
                            >
                                {{ t('councilCalendar.moreEvents', { n: slide.events.length - MAX_EVENTS_PER_CARD }, slide.events.length - MAX_EVENTS_PER_CARD) }}
                            </p>
                        </template>

                        <!-- Opens the calendar page filtered to this day -->
                        <router-link
                            v-if="i === current"
                            :to="{ path: '/events', query: { date: slide.day } }"
                            class="mt-auto pt-4 inline-flex items-center gap-1.5 self-start text-[14px] font-semibold text-[#1a1e2e] hover:gap-3 transition-all duration-200"
                        >
                            {{ t('common.learnMore') }}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </router-link>
                        <span v-else class="mt-auto pt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#b0b8c6]">
                            {{ t('common.learnMore') }}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </article>
            </div>

            <!-- Navigation arrows -->
            <div
                v-if="slides.length > 1"
                class="flex items-center justify-center gap-3 mt-8 transition-all duration-700 delay-200"
                :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            >
                <button type="button" class="w-12 h-12 rounded-full border border-[#d0d5dd] flex items-center justify-center text-[#1a1e2e] transition-all duration-200 enabled:hover:bg-[#1a1e2e] enabled:hover:text-white enabled:hover:border-[#1a1e2e] disabled:opacity-40 disabled:cursor-not-allowed" :disabled="current === 0" :aria-label="t('councilCalendar.prev')" @click="prev">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <button type="button" class="w-12 h-12 rounded-full border border-[#d0d5dd] flex items-center justify-center text-[#1a1e2e] transition-all duration-200 enabled:hover:bg-[#1a1e2e] enabled:hover:text-white enabled:hover:border-[#1a1e2e] disabled:opacity-40 disabled:cursor-not-allowed" :disabled="current === slides.length - 1" :aria-label="t('councilCalendar.next')" @click="next">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </template>

        <!-- All events button -->
        <div
            v-if="showLearnMore"
            class="flex justify-center mt-8 transition-all duration-700 delay-300"
            :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
            <AppLearnMore to="/events" :label="t('councilCalendar.allEvents')" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppLearnMore from '@/components/website/AppLearnMore.vue'
import { useCalendarEventsStore } from '@/features/calendarEvents/store'
import { dayOf, toEntry } from '@/features/calendarEvents/composables/useEventsCalendar'
import { useCalendarFormat } from '@/features/calendarEvents/composables/useCalendarFormat'
import { EVENT_TYPE_MAP } from '@/features/calendarEvents/constants'
import { diffDays, toKey, weekdayOf } from '@/features/calendarEvents/utils/date'
import type { CalendarEntry } from '@/features/calendarEvents/types'
import { resolveTranslation } from '@/utils/i18n'

withDefaults(defineProps<{ showLearnMore?: boolean }>(), { showLearnMore: true })

/** How many days the slider holds, and how many of them may be past ones. */
const MAX_SLIDES = 10
const PAST_SLIDES = 2
/** A day with more events lists this many and links to the rest. */
const MAX_EVENTS_PER_CARD = 2
const CARD_HEIGHT = 400
const SWIPE_THRESHOLD = 40

type SlideStatus = 'today' | 'upcoming' | 'past'

const BADGE_CLASS: Record<SlideStatus, string> = {
    today: 'bg-[#1a1e2e] text-white',
    upcoming: 'bg-[#eff4ff] text-[#4361ee]',
    past: 'bg-[#eef0f4] text-[#8a94a6]',
}

const { t, locale } = useI18n()
const { months, weekdays, countdown, timeRange } = useCalendarFormat()
const store = useCalendarEventsStore()

const todayKey = toKey(new Date())

// ---- Data ----
const entries = computed(() =>
    store.calendar
        .filter((e) => e.status === 1)
        .map(toEntry)
        .sort((a, b) => a.start.localeCompare(b.start)),
)

/** One slide per day (same grouping as the events page), events in time order. */
const days = computed(() => {
    const map = new Map<string, CalendarEntry[]>()
    for (const e of entries.value) {
        const key = dayOf(e)
        if (!map.has(key)) map.set(key, [])
        map.get(key)!.push(e)
    }
    return [...map.entries()].map(([day, events]) => ({ day, events }))
})

/** Index of the first day today or later; -1 when every day is in the past. */
const firstUpcoming = computed(() => days.value.findIndex((d) => d.day >= todayKey))

/** Window of up to MAX_SLIDES days: a couple of past ones, then upcoming (filled with past if few are upcoming). */
const windowStart = computed(() => {
    const n = days.value.length
    const first = firstUpcoming.value === -1 ? n : firstUpcoming.value
    return Math.max(0, Math.min(first - PAST_SLIDES, n - MAX_SLIDES))
})

const slides = computed(() =>
    days.value.slice(windowStart.value, windowStart.value + MAX_SLIDES).map(({ day, events }) => {
        const [year, month] = day.split('-').map(Number)
        const status: SlideStatus = day === todayKey ? 'today' : day < todayKey ? 'past' : 'upcoming'
        const badge =
            status === 'today'
                ? t('eventsPage.calendar.today')
                : status === 'past'
                  ? t('eventsPage.calendar.past')
                  : countdown(diffDays(todayKey, day))
        return {
            day,
            dayNumber: Number(day.slice(8)),
            dateLabel: `${months.value[month - 1]} ${year} · ${weekdays.value[weekdayOf(day)]}`,
            status,
            badge,
            events: events.map((entry) => ({
                id: entry.id,
                typeLabel: t(EVENT_TYPE_MAP[entry.type]?.labelKey ?? 'eventsPage.calendar.types.event'),
                title: resolveTranslation(entry.title, locale.value),
                location: resolveTranslation(entry.location, locale.value),
                time: timeRange(entry),
                startTime: entry.start.slice(11),
            })),
        }
    }),
)

/** Centre on the nearest upcoming event, or on the latest one when all are past. */
const initialIndex = computed(() => (firstUpcoming.value === -1 ? slides.value.length - 1 : firstUpcoming.value - windowStart.value))

const loaded = ref(store.calendar.length > 0)
const loadFailed = ref(false)
const loading = computed(() => store.calendarLoading && !loaded.value)

// ---- Carousel state ----
const current = ref(0)
let interacted = false

const sectionEl = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | null = null

const cardWidth = ref(320)
const carouselHeight = ref(CARD_HEIGHT + 60)
const gaps = ref({ step1: 260, step2: 480 })

// Fan step config (offset from centre: 0, ±1, ±2)
const stepCfg = {
    0: { scale: 1, opacity: 1, y: 0, zIndex: 5 },
    1: { scale: 0.86, opacity: 0.8, y: 10, zIndex: 3 },
    2: { scale: 0.72, opacity: 0.55, y: 20, zIndex: 1 },
}

const getCardStyle = (i: number) => {
    // Linear (not circular) so the cards always read in date order.
    const d = i - current.value
    const abs = Math.abs(d)
    const sign = d > 0 ? 1 : -1

    if (abs > 2) {
        // Beyond the visible range — park invisibly at the edge
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
    const x = d === 0 ? 0 : sign * (abs === 1 ? gaps.value.step1 : gaps.value.step2)

    return {
        width: cardWidth.value + 'px',
        transform: `translateX(${x}px) translateY(${cfg.y}px) scale(${cfg.scale})`,
        opacity: String(cfg.opacity),
        zIndex: String(cfg.zIndex),
        pointerEvents: 'auto' as const,
        transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease',
    }
}

const goTo = (i: number) => {
    interacted = true
    current.value = Math.min(Math.max(i, 0), slides.value.length - 1)
}
const next = () => goTo(current.value + 1)
const prev = () => goTo(current.value - 1)

// Keep the index valid if the list changes after a refetch
watch(
    () => slides.value.length,
    (n) => {
        if (current.value > n - 1) current.value = Math.max(0, n - 1)
    },
)

// ---- Swipe (mobile) ----
let touchStartX = 0
let touchStartY = 0
const onTouchStart = (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
}
const onTouchEnd = (e: TouchEvent) => {
    const dx = touchStartX - e.changedTouches[0].clientX
    const dy = touchStartY - e.changedTouches[0].clientY
    // Ignore taps and vertical scrolls
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return
    if (dx > 0) next()
    else prev()
}

const measure = () => {
    const w = window.innerWidth
    if (w < 768) {
        cardWidth.value = Math.min(270, w - 48)
        gaps.value = { step1: cardWidth.value * 0.72, step2: cardWidth.value * 1.35 }
    } else if (w < 1024) {
        cardWidth.value = 290
        gaps.value = { step1: 230, step2: 420 }
    } else {
        cardWidth.value = 340
        gaps.value = { step1: 280, step2: 510 }
    }
}

async function load() {
    loadFailed.value = false
    try {
        await store.fetchCalendar()
        loaded.value = true
        // Don't yank the slider back if the visitor already moved it (cached data case)
        if (!interacted) current.value = Math.max(0, initialIndex.value)
    } catch {
        if (!loaded.value) loadFailed.value = true
    }
}

onMounted(() => {
    measure()
    window.addEventListener('resize', measure)

    // Data cached from the /events page — show it right away, refresh in the background
    if (loaded.value) current.value = Math.max(0, initialIndex.value)
    load()

    if (sectionEl.value && 'IntersectionObserver' in window) {
        observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    visible.value = true
                    observer?.disconnect()
                }
            },
            { threshold: 0.1 },
        )
        observer.observe(sectionEl.value)
    } else {
        visible.value = true
    }
})

onUnmounted(() => {
    window.removeEventListener('resize', measure)
    observer?.disconnect()
})
</script>

<style scoped lang="scss">
.icon {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
    margin-top: 1px;
}

// Same pulse as the "today" badge on the events page.
.pulse::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: rgba(34, 197, 94, 0.28);
    animation: dot-ping 1.6s ease-out infinite;
}

@keyframes dot-ping {
    0% {
        transform: scale(0.8);
        opacity: 1;
    }
    100% {
        transform: scale(2.4);
        opacity: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .pulse::before {
        animation: none;
    }
}
</style>
