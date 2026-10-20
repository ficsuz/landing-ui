import type { CalendarEventType } from '../types'

/** Display order of the type filter; `label` is the admin panel name. */
export const EVENT_TYPES: { value: CalendarEventType; labelKey: string; label: string }[] = [
    { value: 'plenary', labelKey: 'eventsPage.calendar.types.plenary', label: 'Plenary session' },
    { value: 'interim', labelKey: 'eventsPage.calendar.types.interim', label: 'Interim session' },
    { value: 'wgSession', labelKey: 'eventsPage.calendar.types.wgSession', label: 'Working group session' },
    { value: 'meeting', labelKey: 'eventsPage.calendar.types.meeting', label: 'Meeting' },
]

export const EVENT_TYPE_MAP = Object.fromEntries(EVENT_TYPES.map((t) => [t.value, t])) as Record<
    CalendarEventType,
    (typeof EVENT_TYPES)[number]
>
