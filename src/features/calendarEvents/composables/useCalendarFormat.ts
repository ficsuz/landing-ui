import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CalendarEntry } from '../types'
import { fromKey } from '../utils/date'

/** Locale-aware month / weekday names and date strings for the calendar UI. */
export function useCalendarFormat() {
    const { t, tm, rt } = useI18n()

    const list = (key: string) => computed(() => (tm(`eventsPage.calendar.${key}`) as any[]).map((i) => rt(i)))

    const months = list('months')
    const monthsGenitive = list('monthsGenitive')
    const monthsShort = list('monthsShort')
    const weekdays = list('weekdays')
    const weekdaysShort = list('weekdaysShort')

    /** `2026-11-12` → "12-noyabr" / "12 ноября" / "12 November" (+ year on request). */
    function dayMonth(key: string, withYear = false): string {
        const d = fromKey(key)
        const s = t('eventsPage.calendar.dayFormat', { day: d.getDate(), month: monthsGenitive.value[d.getMonth()] })
        return withYear ? `${s} ${d.getFullYear()}` : s
    }

    /** `2026-11-12` → "12 Noy". */
    function shortDate(key: string): string {
        const d = fromKey(key)
        return `${d.getDate()} ${monthsShort.value[d.getMonth()]}`
    }

    /** `2026-10` → "Oktabr 2026". */
    function monthTitle(month: string): string {
        const [y, m] = month.split('-').map(Number)
        return `${months.value[m - 1]} ${y}`
    }

    function countdown(days: number): string {
        return days === 1 ? t('eventsPage.calendar.tomorrow') : t('eventsPage.calendar.inDays', { n: days })
    }

    const timeRange = (e: CalendarEntry) => `${e.start.slice(11)} – ${e.end.slice(11)}`

    return { months, monthsShort, weekdays, weekdaysShort, dayMonth, shortDate, monthTitle, countdown, timeRange }
}
