// Calendar dates are handled as local `YYYY-MM-DD` keys so comparisons are plain
// string comparisons and nothing shifts with the viewer's timezone.

/** Tashkent is UTC+5 all year (no DST). */
export const TASHKENT_OFFSET_MS = 5 * 3_600_000

export const pad = (n: number): string => String(n).padStart(2, '0')

export function toKey(d: Date): string {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function fromKey(key: string): Date {
    const [y, m, d] = key.split('-').map(Number)
    return new Date(y, m - 1, d)
}

export function addDays(key: string, days: number): string {
    const d = fromKey(key)
    d.setDate(d.getDate() + days)
    return toKey(d)
}

/** Whole days from `a` to `b` (positive when `b` is later). */
export function diffDays(a: string, b: string): number {
    return Math.round((fromKey(b).getTime() - fromKey(a).getTime()) / 86_400_000)
}

/** `YYYY-MM` of a day key. */
export const monthOf = (key: string): string => key.slice(0, 7)

export function addMonths(month: string, delta: number): string {
    const [y, m] = month.split('-').map(Number)
    const d = new Date(y, m - 1 + delta, 1)
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`
}

export function daysInMonth(month: string): number {
    const [y, m] = month.split('-').map(Number)
    return new Date(y, m, 0).getDate()
}

/** Monday-first weekday index: 0 = Monday … 6 = Sunday. */
export function weekdayOf(key: string): number {
    return (fromKey(key).getDay() + 6) % 7
}

/** `YYYY-MM-DDTHH:mm` → local Date. */
export function parseDateTime(value: string): Date {
    const [date, time = '00:00'] = value.split('T')
    const [h, min] = time.split(':').map(Number)
    const d = fromKey(date)
    d.setHours(h, min, 0, 0)
    return d
}

/** API ISO datetime → Tashkent wall-clock `YYYY-MM-DDTHH:mm`. */
export function fromApiDate(iso: string): string {
    return new Date(Date.parse(iso) + TASHKENT_OFFSET_MS).toISOString().slice(0, 16)
}

/** Tashkent wall-clock `YYYY-MM-DDTHH:mm` → API ISO datetime. */
export function toApiDate(wallClock: string): string {
    const [date, time = '00:00'] = wallClock.split('T')
    const [y, m, d] = date.split('-').map(Number)
    const [h, min] = time.split(':').map(Number)
    return new Date(Date.UTC(y, m - 1, d, h, min) - TASHKENT_OFFSET_MS).toISOString()
}

export const isDayKey = (v: unknown): v is string => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)
export const isMonthKey = (v: unknown): v is string => typeof v === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(v)
