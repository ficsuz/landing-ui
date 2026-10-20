<template>
    <article
        class="flex flex-col h-full rounded-2xl p-5 md:p-6 transition-shadow duration-300"
        :class="theme.card"
        :aria-current="day.status === 'today' ? 'date' : undefined"
    >
        <!-- Date -->
        <header class="flex items-start justify-between gap-3">
            <div>
                <time :datetime="day.key" class="block font-black text-[clamp(32px,3vw,44px)] leading-none tabular-nums" :class="theme.number">
                    {{ day.key.slice(8) }}
                </time>
                <span class="block mt-2 text-[13px] font-medium" :class="theme.weekday">{{ weekdays[day.weekday] }}</span>
            </div>

            <span v-if="badge" class="inline-flex items-center gap-1.5 shrink-0 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase whitespace-nowrap" :class="badge.class">
                <span v-if="day.status === 'today'" class="pulse relative w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
                {{ badge.text }}
            </span>
        </header>

        <div class="mt-4 h-0.5 rounded-full" :class="theme.line" />

        <!-- Events -->
        <div
            v-for="(event, i) in day.events"
            :key="event.id"
            class="flex flex-col"
            :class="i === 0 ? 'mt-5' : 'mt-5 pt-5 border-t border-[#eef0f4]'"
        >
            <p class="text-[11px] font-bold tracking-widest uppercase mb-2" :class="theme.label">
                {{ t(EVENT_TYPE_MAP[event.type].labelKey) }}
            </p>

            <h4 class="font-bold text-[15px] leading-snug mb-3" :class="theme.title">
                {{ resolveTranslation(event.title, locale) }}
            </h4>

            <ul class="space-y-1.5 text-[13px] leading-snug" :class="theme.meta">
                <li class="flex items-start gap-2">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :aria-label="t('eventsPage.calendar.time')">
                        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                    </svg>
                    <span class="tabular-nums">{{ timeRange(event) }}</span>
                    <span v-if="timingOf(event) === 'live'" class="inline-flex items-center gap-1.5 ml-1 font-semibold text-[#1a1e2e]">
                        <span class="pulse relative w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
                        {{ t('eventsPage.calendar.live') }}
                    </span>
                    <span v-else-if="timingOf(event) === 'ended'" class="ml-1 text-[#b0b8c6]">· {{ t('eventsPage.calendar.ended') }}</span>
                </li>
                <li class="flex items-start gap-2">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :aria-label="t('eventsPage.calendar.location')">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{{ resolveTranslation(event.location, locale) }}</span>
                </li>
                <li class="flex items-start gap-2">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :aria-label="t('eventsPage.calendar.organizer')">
                        <circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
                    </svg>
                    <span>{{ resolveTranslation(event.organizer, locale) }}</span>
                </li>
            </ul>

            <div v-if="canAdd(event)" class="pt-4">
                <button
                    type="button"
                    class="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#4361ee] bg-[#eff4ff] px-4 py-2 rounded-full hover:bg-[#4361ee] hover:text-white transition-colors duration-200"
                    @click="addToCalendar(event)"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    {{ t('eventsPage.calendar.addToCalendar') }}
                </button>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { resolveTranslation } from '@/utils/i18n'
import { useEventsCalendar } from '@/features/calendarEvents/composables/useEventsCalendar'
import { useCalendarFormat } from '@/features/calendarEvents/composables/useCalendarFormat'
import { EVENT_TYPE_MAP } from '@/features/calendarEvents/constants'
import { downloadIcs } from '@/features/calendarEvents/utils/ics'
import type { CalendarDay, CalendarEntry, EventTiming } from '@/features/calendarEvents/types'

const props = defineProps<{ day: CalendarDay }>()

const { t, locale } = useI18n()
const { eventTiming, daysUntil } = useEventsCalendar()
const { weekdays, timeRange, countdown } = useCalendarFormat()

// Same card for every day; state is shown with the site's own tokens:
// today = navy outline, next = blue accent, upcoming = plain, past = muted grey.
const CARD = 'bg-white border border-[#eef0f4] shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.11)]'
const THEMES = {
    today: {
        card: 'bg-white border border-[#1a1e2e] shadow-[0_8px_32px_rgba(0,0,0,0.11)]',
        number: 'text-[#1a1e2e]',
        weekday: 'text-[#8a94a6]',
        line: 'w-10 bg-[#1a1e2e]',
        label: 'text-[#4361ee]',
        title: 'text-[#1a1e2e]',
        meta: 'text-[#8a94a6]',
    },
    next: { card: CARD, number: 'text-[#1a1e2e]', weekday: 'text-[#8a94a6]', line: 'w-8 bg-[#4361ee]', label: 'text-[#4361ee]', title: 'text-[#1a1e2e]', meta: 'text-[#8a94a6]' },
    upcoming: { card: CARD, number: 'text-[#1a1e2e]', weekday: 'text-[#8a94a6]', line: 'w-6 bg-[#e5e7eb]', label: 'text-[#4361ee]', title: 'text-[#1a1e2e]', meta: 'text-[#8a94a6]' },
    past: {
        card: 'bg-[#f2f3f6] border border-transparent',
        number: 'text-[#b0b8c6]',
        weekday: 'text-[#b0b8c6]',
        line: 'w-6 bg-[#e5e7eb]',
        label: 'text-[#b0b8c6]',
        title: 'text-[#8a94a6]',
        meta: 'text-[#b0b8c6]',
    },
} as const

const theme = computed(() => THEMES[props.day.status])

const badge = computed(() => {
    switch (props.day.status) {
        case 'today':
            return { text: t('eventsPage.calendar.today'), class: 'bg-[#1a1e2e] text-white' }
        case 'next':
            return { text: countdown(daysUntil(props.day.key)), class: 'bg-[#eff4ff] text-[#4361ee]' }
        case 'past':
            return { text: t('eventsPage.calendar.past'), class: 'bg-white text-[#8a94a6]' }
        default:
            return null
    }
})

/** Live / ended state is only shown on today's card. */
const timingOf = (event: CalendarEntry): EventTiming | null => (props.day.status === 'today' ? eventTiming(event) : null)

const canAdd = (event: CalendarEntry) => props.day.status !== 'past' && eventTiming(event) !== 'ended'

function addToCalendar(event: CalendarEntry) {
    downloadIcs(event, {
        title: resolveTranslation(event.title, locale.value),
        location: resolveTranslation(event.location, locale.value),
        organizer: resolveTranslation(event.organizer, locale.value),
    })
}
</script>

<style scoped lang="scss">
.icon {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
    margin-top: 1px;
}

// Same pulse as the site's "coming soon" badge (WebEmptyState).
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
