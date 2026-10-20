import type { Translation, ListParams } from '@/types/server/api.types'

export type CalendarEventType = 'plenary' | 'interim' | 'wgSession' | 'meeting'

/**
 * Calendar plan entry as returned by `GET /v1/calendar-events`.
 * `startDate` / `endDate` are ISO 8601 UTC datetimes (Tashkent is UTC+5, no DST).
 * `status`: 1 — published on the website, 0 — hidden.
 */
export interface CalendarEvent {
    id: string
    type: CalendarEventType
    title: Translation
    location: Translation
    organizer: Translation
    startDate: string
    endDate: string
    status: number
    createdAt: string
}

export type CalendarEventListParams = ListParams

export interface CalendarEventPayload {
    type: CalendarEventType
    title: Translation
    location: Translation
    organizer: Translation
    startDate: string
    endDate: string
    status?: number
}

/** Website view model: `start` / `end` are Tashkent wall-clock times, `YYYY-MM-DDTHH:mm`. */
export interface CalendarEntry {
    id: string
    type: CalendarEventType
    title: Translation
    location: Translation
    organizer: Translation
    start: string
    end: string
}

/** Where a day sits relative to today — drives the card's colour treatment. */
export type DayStatus = 'today' | 'next' | 'upcoming' | 'past'

/** Live state of a single event that happens today. */
export type EventTiming = 'live' | 'ended' | 'scheduled'

export interface CalendarDay {
    key: string
    weekday: number
    events: CalendarEntry[]
    status: DayStatus
}

export type DateMode = 'single' | 'range'
