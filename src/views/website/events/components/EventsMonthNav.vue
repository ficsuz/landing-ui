<template>
    <div>
        <div class="flex items-end justify-between gap-4">
            <div class="min-w-0">
                <h3 class="font-extrabold uppercase text-[clamp(20px,2.5vw,32px)] leading-tight text-[#1a1e2e]" aria-live="polite">
                    {{ monthTitle(month) }}
                </h3>
                <p class="mt-1 text-[13px] text-[#8a94a6]">{{ t('eventsPage.calendar.eventsCount', { n: monthEvents.length }, monthEvents.length) }}</p>
            </div>

            <div class="flex items-center gap-2 shrink-0">
                <button
                    v-if="month !== currentMonth"
                    type="button"
                    class="hidden md:inline-flex items-center h-11 px-5 rounded-full border border-[#d0d5dd] text-[14px] font-semibold text-[#1a1e2e] hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] transition-all duration-200"
                    @click="goToday"
                >
                    {{ t('eventsPage.calendar.today') }}
                </button>
                <button type="button" class="round-btn" :aria-label="t('eventsPage.calendar.prevMonth')" @click="shiftMonth(-1)">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                </button>
                <button type="button" class="round-btn" :aria-label="t('eventsPage.calendar.nextMonth')" @click="shiftMonth(1)">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
            </div>
        </div>

        <!-- Month strip of the viewed year -->
        <nav ref="stripRef" :aria-label="t('eventsPage.calendar.monthsLabel')" class="no-scrollbar mt-5 flex gap-1 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 py-2 border-y border-[#eef0f4]">
            <button
                v-for="(name, i) in monthsShort"
                :key="i"
                type="button"
                class="relative flex-1 min-w-[60px] h-10 rounded-full text-[13px] font-medium transition-colors duration-200"
                :class="monthClass(i)"
                :data-active="keyOf(i) === month || undefined"
                :aria-current="keyOf(i) === month ? 'date' : undefined"
                @click="setMonth(keyOf(i))"
            >
                {{ name }}<sup v-if="monthCounts[i]" class="ml-0.5 text-[10px] tabular-nums" :class="keyOf(i) === month ? 'text-white/55' : 'text-[#8a94a6]'">{{ monthCounts[i] }}</sup>
                <span v-if="keyOf(i) === currentMonth && keyOf(i) !== month" class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1a1e2e]" aria-hidden="true" />
            </button>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useEventsCalendar } from '@/features/calendarEvents/composables/useEventsCalendar'
import { useCalendarFormat } from '@/features/calendarEvents/composables/useCalendarFormat'
import { pad } from '@/features/calendarEvents/utils/date'

const { t } = useI18n()
const { month, currentMonth, year, monthEvents, monthCounts, setMonth, shiftMonth, goToday } = useEventsCalendar()
const { monthsShort, monthTitle } = useCalendarFormat()

const stripRef = ref<HTMLElement | null>(null)

const keyOf = (i: number) => `${year.value}-${pad(i + 1)}`

function monthClass(i: number) {
    if (keyOf(i) === month.value) return 'bg-[#1a1e2e] text-white'
    return monthCounts.value[i] ? 'text-[#1a1e2e] hover:bg-[#f2f3f6]' : 'text-[#c8ccd6] hover:bg-[#f7f8fa] hover:text-[#8a94a6]'
}

// Keep the active month visible when the strip scrolls horizontally (mobile).
watch(
    month,
    async () => {
        await nextTick()
        const el = stripRef.value?.querySelector<HTMLElement>('[data-active]')
        const strip = stripRef.value
        if (el && strip && strip.scrollWidth > strip.clientWidth) {
            strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' })
        }
    },
    { immediate: true },
)
</script>

<style scoped>
.round-btn {
    width: 44px;
    height: 44px;
    border-radius: 999px;
    border: 1px solid #d0d5dd;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1a1e2e;
    transition: all 0.2s;
}
.round-btn:hover {
    background: #1a1e2e;
    border-color: #1a1e2e;
    color: #fff;
}
.no-scrollbar {
    scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>
