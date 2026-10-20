<template>
    <div class="rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] px-6 py-12 md:py-16 text-center">
        <p class="font-bold text-[17px] text-[#1a1e2e]">
            {{ isFiltered ? t('eventsPage.calendar.emptyFiltered') : t('eventsPage.calendar.emptyMonth') }}
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <button v-if="!nextMatch && prevMatch" type="button" :class="pill" @click="goToEvent(prevMatch)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                {{ t('eventsPage.calendar.lastEvent', { date: dateOf(prevMatch) }) }}
            </button>
            <button v-if="nextMatch" type="button" :class="pill" @click="goToEvent(nextMatch)">
                {{ t('eventsPage.calendar.nextEvent', { date: dateOf(nextMatch) }) }}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
            <button
                v-if="isFiltered"
                type="button"
                class="text-[14px] font-semibold text-[#8a94a6] hover:text-[#1a1e2e] underline-offset-4 hover:underline"
                @click="resetFilters"
            >
                {{ t('eventsPage.calendar.resetFilters') }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useEventsCalendar } from '@/features/calendarEvents/composables/useEventsCalendar'
import { useCalendarFormat } from '@/features/calendarEvents/composables/useCalendarFormat'
import type { CalendarEntry } from '@/features/calendarEvents/types'

const { t } = useI18n()
const { nextMatch, prevMatch, isFiltered, todayKey, goToEvent, resetFilters } = useEventsCalendar()
const { dayMonth } = useCalendarFormat()

const dateOf = (e: CalendarEntry) => dayMonth(e.start.slice(0, 10), e.start.slice(0, 4) !== todayKey.value.slice(0, 4))

const pill =
    'inline-flex items-center gap-2 border border-[#d0d5dd] text-[#1a1e2e] font-semibold text-[15px] px-7 py-3 rounded-full transition-all duration-200 hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e]'
</script>
