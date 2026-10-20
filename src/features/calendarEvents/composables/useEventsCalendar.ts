import { computed, inject, onMounted, onUnmounted, provide, ref, watch, type InjectionKey } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCalendarEventsStore } from '../store'
import { EVENT_TYPES } from '../constants'
import type { CalendarDay, CalendarEntry, CalendarEvent, CalendarEventType, DateMode, DayStatus, EventTiming } from '../types'
import { addMonths, diffDays, fromApiDate, isDayKey, isMonthKey, monthOf, parseDateTime, toKey, weekdayOf } from '../utils/date'

const dayOf = (e: CalendarEntry) => e.start.slice(0, 10)
const TYPE_VALUES = EVENT_TYPES.map((t) => t.value)

const toEntry = (e: CalendarEvent): CalendarEntry => ({
    id: e.id,
    type: e.type,
    title: e.title,
    location: e.location,
    organizer: e.organizer,
    start: fromApiDate(e.startDate),
    end: fromApiDate(e.endDate),
})

/**
 * Shared state of the calendar plan page: type + date filters, the month being
 * viewed, and today / next / past classification. Filters live in the URL
 * (`?m=2026-10&type=plenary,meeting&from=…&to=…` or `&date=…`) so a filtered
 * view can be shared or bookmarked.
 */
function createEventsCalendar() {
    const store = useCalendarEventsStore()
    const route = useRoute()
    const router = useRouter()

    // Ticks every 30s so "live" / "ended" labels update while the page is open.
    const now = ref(new Date())
    let clock: ReturnType<typeof setInterval> | undefined
    const todayKey = computed(() => toKey(now.value))
    const currentMonth = computed(() => monthOf(todayKey.value))

    const loaded = ref(false)
    const loadFailed = ref(false)

    // ---- State (initialised from the URL) ----
    const q = route.query
    const types = ref<CalendarEventType[]>(
        String(q.type ?? '')
            .split(',')
            .filter((v): v is CalendarEventType => TYPE_VALUES.includes(v as CalendarEventType)),
    )
    const single = isDayKey(q.date) ? q.date : null
    const dateFrom = ref<string | null>(single ?? (isDayKey(q.from) ? q.from : null))
    const dateTo = ref<string | null>(single ?? (isDayKey(q.to) ? q.to : dateFrom.value))
    const dateMode = ref<DateMode>(dateFrom.value && dateFrom.value !== dateTo.value ? 'range' : 'single')
    const month = ref<string>(isMonthKey(q.m) ? q.m : dateFrom.value ? monthOf(dateFrom.value) : monthOf(toKey(new Date())))

    // ---- Derived lists ----
    const sorted = computed(() =>
        store.calendar
            .filter((e) => e.status === 1)
            .map(toEntry)
            .sort((a, b) => a.start.localeCompare(b.start)),
    )
    const inDateRange = (e: CalendarEntry) => {
        if (!dateFrom.value) return true
        const d = dayOf(e)
        return d >= dateFrom.value && d <= (dateTo.value ?? dateFrom.value)
    }
    const typeFiltered = computed(() => sorted.value.filter((e) => !types.value.length || types.value.includes(e.type)))
    const filtered = computed(() => typeFiltered.value.filter(inDateRange))

    /** First day after today that has an event (respecting the type filter). */
    const nextDayKey = computed(() => typeFiltered.value.find((e) => dayOf(e) > todayKey.value)?.start.slice(0, 10) ?? null)

    function dayStatus(key: string): DayStatus {
        if (key === todayKey.value) return 'today'
        if (key < todayKey.value) return 'past'
        return key === nextDayKey.value ? 'next' : 'upcoming'
    }

    function eventTiming(e: CalendarEntry): EventTiming {
        const t = now.value.getTime()
        if (t >= parseDateTime(e.end).getTime()) return 'ended'
        if (t >= parseDateTime(e.start).getTime()) return 'live'
        return 'scheduled'
    }

    const daysUntil = (key: string) => diffDays(todayKey.value, key)

    const monthEvents = computed(() => filtered.value.filter((e) => monthOf(dayOf(e)) === month.value))

    const monthDays = computed<CalendarDay[]>(() => {
        const map = new Map<string, CalendarEntry[]>()
        for (const e of monthEvents.value) {
            const k = dayOf(e)
            if (!map.has(k)) map.set(k, [])
            map.get(k)!.push(e)
        }
        return [...map.entries()].map(([key, events]) => ({ key, events, weekday: weekdayOf(key), status: dayStatus(key) }))
    })

    const year = computed(() => Number(month.value.slice(0, 4)))

    /** Matching events per month of the viewed year — feeds the month strip. */
    const monthCounts = computed(() => {
        const counts = Array<number>(12).fill(0)
        for (const e of filtered.value) {
            if (Number(e.start.slice(0, 4)) === year.value) counts[Number(e.start.slice(5, 7)) - 1]++
        }
        return counts
    })

    /** Per-type counts for the viewed month (date filter applied, type filter not). */
    const typeCounts = computed(() => {
        const counts = Object.fromEntries(TYPE_VALUES.map((v) => [v, 0])) as Record<CalendarEventType, number>
        for (const e of sorted.value) {
            if (monthOf(dayOf(e)) === month.value && inDateRange(e)) counts[e.type]++
        }
        return counts
    })

    const nextMatch = computed(() => filtered.value.find((e) => monthOf(dayOf(e)) > month.value) ?? null)
    const prevMatch = computed(() => [...filtered.value].reverse().find((e) => monthOf(dayOf(e)) < month.value) ?? null)

    /** Days that have an event of the selected types — dots in the date picker. */
    const eventDays = computed(() => new Set(typeFiltered.value.map(dayOf)))

    const hasTypeFilter = computed(() => types.value.length > 0)
    const hasDateFilter = computed(() => dateFrom.value !== null)
    const isFiltered = computed(() => hasTypeFilter.value || hasDateFilter.value)

    // ---- Actions ----
    const setMonth = (m: string) => (month.value = m)
    const shiftMonth = (delta: number) => (month.value = addMonths(month.value, delta))
    const goToday = () => (month.value = currentMonth.value)
    const goToEvent = (e: CalendarEntry | null) => e && (month.value = monthOf(dayOf(e)))

    function toggleType(type: CalendarEventType) {
        types.value = types.value.includes(type) ? types.value.filter((t) => t !== type) : [...types.value, type]
    }
    const clearTypes = () => (types.value = [])

    function setDate(mode: DateMode, from: string, to: string = from) {
        const [a, b] = from <= to ? [from, to] : [to, from]
        dateMode.value = a === b ? 'single' : mode
        dateFrom.value = a
        dateTo.value = b
        month.value = monthOf(a)
    }
    function clearDate() {
        dateFrom.value = null
        dateTo.value = null
    }
    function resetFilters() {
        clearTypes()
        clearDate()
    }

    async function load() {
        loadFailed.value = false
        try {
            await store.fetchCalendar()
            loaded.value = true
        } catch {
            loadFailed.value = true
        }
    }

    // ---- URL sync ----
    watch([types, dateFrom, dateTo, month], () => {
        const query: Record<string, string | undefined> = { ...(route.query as Record<string, string>) }
        query.m = month.value === currentMonth.value ? undefined : month.value
        query.type = types.value.length ? types.value.join(',') : undefined
        const isSingle = dateFrom.value && dateFrom.value === dateTo.value
        query.date = isSingle ? dateFrom.value! : undefined
        query.from = !isSingle && dateFrom.value ? dateFrom.value : undefined
        query.to = !isSingle && dateTo.value ? dateTo.value : undefined
        router.replace({ query, hash: route.hash })
    })

    onMounted(() => {
        load()
        clock = setInterval(() => (now.value = new Date()), 30_000)
    })
    onUnmounted(() => clearInterval(clock))

    return {
        loading: computed(() => store.calendarLoading && !loaded.value),
        loadFailed,
        reload: load,
        todayKey,
        currentMonth,
        month,
        year,
        types,
        dateMode,
        dateFrom,
        dateTo,
        monthDays,
        monthEvents,
        monthCounts,
        typeCounts,
        nextMatch,
        prevMatch,
        eventDays,
        hasTypeFilter,
        hasDateFilter,
        isFiltered,
        dayStatus,
        eventTiming,
        daysUntil,
        setMonth,
        shiftMonth,
        goToday,
        goToEvent,
        toggleType,
        clearTypes,
        setDate,
        clearDate,
        resetFilters,
    }
}

export type EventsCalendar = ReturnType<typeof createEventsCalendar>

const KEY: InjectionKey<EventsCalendar> = Symbol('eventsCalendar')

/** Call once in the page section; child components read it with `useEventsCalendar()`. */
export function provideEventsCalendar(): EventsCalendar {
    const calendar = createEventsCalendar()
    provide(KEY, calendar)
    return calendar
}

export function useEventsCalendar(): EventsCalendar {
    const calendar = inject(KEY)
    if (!calendar) throw new Error('useEventsCalendar() must be used inside provideEventsCalendar()')
    return calendar
}
