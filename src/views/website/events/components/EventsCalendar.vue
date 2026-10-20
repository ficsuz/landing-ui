<template>
    <section class="bg-white py-16 md:py-24">
        <div class="page-container">
            <h2 class="section-title mb-8 md:mb-12">{{ t('councilCalendar.title') }}</h2>

            <EventsCalendarFilter class="mb-8 md:mb-12" />
            <EventsMonthNav class="mb-6 md:mb-8" />

            <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5" aria-busy="true">
                <div v-for="i in 4" :key="i" class="h-[280px] rounded-2xl bg-[#f7f8fa] animate-pulse" />
            </div>

            <div v-else-if="loadFailed" role="alert" class="rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] px-6 py-12 md:py-16 text-center">
                <p class="text-[#505a63] mb-5">{{ t('eventsPage.calendar.loadError') }}</p>
                <button type="button" class="inline-flex rounded-full border border-[#d0d5dd] bg-white px-7 py-3 font-semibold text-[#1a1e2e] hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] transition-all duration-200" @click="reload">
                    {{ t('eventsPage.calendar.retry') }}
                </button>
            </div>

            <div v-else-if="monthDays.length" ref="gridRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                <EventsDayCard v-for="day in monthDays" :key="day.key" :day="day" />
            </div>

            <EventsEmptyMonth v-else />
        </div>
    </section>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import EventsCalendarFilter from './EventsCalendarFilter.vue'
import EventsMonthNav from './EventsMonthNav.vue'
import EventsEmptyMonth from './EventsEmptyMonth.vue'
import EventsDayCard from './EventsDayCard.vue'
import { provideEventsCalendar } from '@/features/calendarEvents/composables/useEventsCalendar'

const { t } = useI18n()
const { loading, loadFailed, reload, monthDays } = provideEventsCalendar()

const gridRef = ref<HTMLElement | null>(null)
const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Re-run the entrance only when the visible set of days changes (month or filters).
watch(
    () => monthDays.value.map((d) => `${d.key}:${d.events.length}`).join('|'),
    async () => {
        await nextTick()
        if (reduceMotion || !gridRef.value) return
        gsap.fromTo(
            gridRef.value.children,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: 'power3.out', clearProps: 'transform,opacity' },
        )
    },
    { immediate: true },
)
</script>
