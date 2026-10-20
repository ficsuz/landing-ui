<template>
    <div ref="rootRef" class="relative">
        <button
            type="button"
            class="inline-flex items-center gap-2 h-10 pl-4 rounded-full border text-[14px] font-medium whitespace-nowrap transition-all duration-200"
            :class="[hasValue ? 'bg-[#1a1e2e] text-white border-[#1a1e2e] pr-2' : 'bg-white text-[#1a1e2e] border-[#d0d5dd] hover:border-[#1a1e2e] pr-4']"
            aria-haspopup="dialog"
            :aria-expanded="open"
            @click="toggle"
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span>{{ label }}</span>
            <span
                v-if="hasValue"
                role="button"
                tabindex="0"
                :aria-label="t('eventsPage.calendar.clear')"
                class="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/15 transition-colors"
                @click.stop="emit('clear')"
                @keydown.enter.stop.prevent="emit('clear')"
            >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                </svg>
            </span>
        </button>

        <Transition name="picker">
            <div
                v-if="open"
                role="dialog"
                :aria-label="t('eventsPage.calendar.date')"
                class="absolute z-30 top-full mt-2 left-0 lg:left-auto lg:right-0 w-[min(344px,calc(100vw-32px))] bg-white rounded-2xl border border-[#eef0f4] shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-4"
            >
                <!-- Single day / period -->
                <div class="grid grid-cols-2 p-1 rounded-full bg-[#f2f3f6] mb-4">
                    <button
                        v-for="m in modes"
                        :key="m.value"
                        type="button"
                        class="h-8 rounded-full text-[13px] font-semibold transition-all duration-200"
                        :class="mode === m.value ? 'bg-white text-[#1a1e2e] shadow-[0_2px_12px_rgba(0,0,0,0.08)]' : 'text-[#8a94a6] hover:text-[#1a1e2e]'"
                        :aria-pressed="mode === m.value"
                        @click="setMode(m.value)"
                    >
                        {{ m.label }}
                    </button>
                </div>

                <!-- Month header -->
                <div class="flex items-center justify-between mb-1">
                    <button type="button" class="nav-btn" :aria-label="t('eventsPage.calendar.prevMonth')" @click="view = addMonths(view, -1)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                    <span class="font-semibold text-[15px] text-[#1a1e2e]">{{ monthTitle(view) }}</span>
                    <button type="button" class="nav-btn" :aria-label="t('eventsPage.calendar.nextMonth')" @click="view = addMonths(view, 1)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                </div>

                <!-- Weekdays -->
                <div class="grid grid-cols-7">
                    <span v-for="w in weekdaysShort" :key="w" class="h-8 flex items-center justify-center text-[11px] font-semibold uppercase tracking-wide text-[#8a94a6]">
                        {{ w }}
                    </span>
                </div>

                <!-- Days -->
                <div class="grid grid-cols-7 gap-y-1" @mouseleave="hoverKey = null">
                    <template v-for="cell in cells" :key="cell.id">
                        <span v-if="!cell.key" />
                        <div v-else class="h-10" :class="bandClass(cell.key)">
                            <button
                                type="button"
                                class="relative mx-auto flex items-center justify-center w-10 h-10 rounded-full text-[14px] tabular-nums transition-colors duration-150"
                                :class="cellClass(cell.key)"
                                :aria-label="dayMonth(cell.key, true)"
                                :aria-pressed="isEndpoint(cell.key)"
                                @click="pick(cell.key)"
                                @mouseenter="hoverKey = cell.key"
                            >
                                {{ cell.day }}
                                <span
                                    v-if="eventDays.has(cell.key)"
                                    class="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                                    :class="isEndpoint(cell.key) ? 'bg-white' : 'bg-[#1a1e2e]'"
                                />
                            </button>
                        </div>
                    </template>
                </div>

                <p v-if="draftFrom" class="mt-3 text-center text-[13px] text-[#8a94a6]">{{ t('eventsPage.calendar.pickEnd') }}</p>

                <!-- Presets -->
                <div class="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-[#eef0f4]">
                    <button
                        v-for="p in presets"
                        :key="p.key"
                        type="button"
                        class="h-8 px-3 rounded-full border border-[#eef0f4] text-[13px] font-medium text-[#1a1e2e] hover:border-[#1a1e2e] hover:text-[#1a1e2e] transition-colors"
                        @click="applyPreset(p)"
                    >
                        {{ t(`eventsPage.calendar.presets.${p.key}`) }}
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useEventsCalendar } from '@/features/calendarEvents/composables/useEventsCalendar'
import { useCalendarFormat } from '@/features/calendarEvents/composables/useCalendarFormat'
import { addDays, addMonths, daysInMonth, monthOf, pad, weekdayOf } from '@/features/calendarEvents/utils/date'
import type { DateMode } from '@/features/calendarEvents/types'

const emit = defineEmits<{ (e: 'update', mode: DateMode, from: string, to: string): void; (e: 'clear'): void }>()

const { t } = useI18n()
const { todayKey, month, dateMode, dateFrom, dateTo, eventDays } = useEventsCalendar()
const { weekdaysShort, monthTitle, dayMonth, shortDate } = useCalendarFormat()

const rootRef = ref<HTMLElement | null>(null)
const open = ref(false)
const mode = ref<DateMode>(dateMode.value)
const view = ref(month.value)
const draftFrom = ref<string | null>(null)
const hoverKey = ref<string | null>(null)

const hasValue = computed(() => dateFrom.value !== null)

const label = computed(() => {
    if (!dateFrom.value) return t('eventsPage.calendar.date')
    if (dateFrom.value === dateTo.value) {
        return dayMonth(dateFrom.value, dateFrom.value.slice(0, 4) !== todayKey.value.slice(0, 4))
    }
    return `${shortDate(dateFrom.value)} – ${shortDate(dateTo.value!)}`
})

const modes = computed(() => [
    { value: 'single' as const, label: t('eventsPage.calendar.singleDay') },
    { value: 'range' as const, label: t('eventsPage.calendar.period') },
])

/** 7-column month grid; leading blanks align the 1st with its weekday. */
const cells = computed(() => {
    const first = `${view.value}-01`
    const blanks = Array.from({ length: weekdayOf(first) }, (_, i) => ({ id: `b${i}`, key: null, day: 0 }))
    const days = Array.from({ length: daysInMonth(view.value) }, (_, i) => ({ id: `${view.value}-${pad(i + 1)}`, key: `${view.value}-${pad(i + 1)}`, day: i + 1 }))
    return [...blanks, ...days]
})

/** Range currently shown: the draft (with hover preview) or the committed one. */
const shownRange = computed<[string, string] | null>(() => {
    if (draftFrom.value) {
        const end = hoverKey.value ?? draftFrom.value
        return draftFrom.value <= end ? [draftFrom.value, end] : [end, draftFrom.value]
    }
    if (dateFrom.value && mode.value === dateMode.value) return [dateFrom.value, dateTo.value ?? dateFrom.value]
    return null
})

const isEndpoint = (key: string) => !!shownRange.value && (key === shownRange.value[0] || key === shownRange.value[1])

function bandClass(key: string) {
    const r = shownRange.value
    if (!r || r[0] === r[1] || key < r[0] || key > r[1]) return ''
    if (key === r[0]) return 'bg-[linear-gradient(to_right,transparent_50%,#f2f3f6_50%)]'
    if (key === r[1]) return 'bg-[linear-gradient(to_left,transparent_50%,#f2f3f6_50%)]'
    return 'bg-[#f2f3f6]'
}

function cellClass(key: string) {
    if (isEndpoint(key)) return 'bg-[#1a1e2e] text-white font-semibold'
    const today = key === todayKey.value ? 'ring-1 ring-inset ring-[#1a1e2e]/40 ' : ''
    return today + (eventDays.value.has(key) ? 'text-[#1a1e2e] font-semibold hover:bg-[#eef0f4]' : 'text-[#505a63] hover:bg-[#f2f3f6]')
}

function setMode(m: DateMode) {
    mode.value = m
    draftFrom.value = null
}

function pick(key: string) {
    if (mode.value === 'single') {
        emit('update', 'single', key, key)
        open.value = false
        return
    }
    if (!draftFrom.value) {
        draftFrom.value = key
        return
    }
    emit('update', 'range', draftFrom.value, key)
    draftFrom.value = null
    open.value = false
}

interface Preset {
    key: 'today' | 'thisWeek' | 'thisMonth' | 'next30'
}
const presets: Preset[] = [{ key: 'today' }, { key: 'thisWeek' }, { key: 'thisMonth' }, { key: 'next30' }]

function applyPreset(p: Preset) {
    const today = todayKey.value
    if (p.key === 'today') emit('update', 'single', today, today)
    if (p.key === 'thisWeek') {
        const monday = addDays(today, -weekdayOf(today))
        emit('update', 'range', monday, addDays(monday, 6))
    }
    if (p.key === 'thisMonth') {
        const m = monthOf(today)
        emit('update', 'range', `${m}-01`, `${m}-${pad(daysInMonth(m))}`)
    }
    if (p.key === 'next30') emit('update', 'range', today, addDays(today, 29))
    open.value = false
}

function toggle() {
    if (open.value) {
        open.value = false
        return
    }
    mode.value = dateMode.value
    view.value = dateFrom.value ? monthOf(dateFrom.value) : month.value
    draftFrom.value = null
    open.value = true
}

function onPointerDown(e: PointerEvent) {
    if (rootRef.value && !rootRef.value.contains(e.target as Node)) open.value = false
}
function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') open.value = false
}

watch(open, (isOpen) => {
    const method = isOpen ? 'addEventListener' : 'removeEventListener'
    document[method]('pointerdown', onPointerDown as EventListener)
    document[method]('keydown', onKeydown as EventListener)
})
onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', onPointerDown as EventListener)
    document.removeEventListener('keydown', onKeydown as EventListener)
})
</script>

<style scoped lang="scss">
.nav-btn {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1a1e2e;
    transition: background-color 0.2s;

    &:hover {
        background: #f2f3f6;
    }
}

.picker-enter-active,
.picker-leave-active {
    transition: opacity 0.18s ease, transform 0.18s ease;
}
.picker-enter-from,
.picker-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
</style>
