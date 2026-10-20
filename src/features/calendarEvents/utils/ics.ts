import type { CalendarEntry } from '../types'
import { toApiDate } from './date'

const stamp = (iso: string) => iso.replace(/[-:]/g, '').replace(/\.\d{3}/, '')

const escape = (s: string) => s.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, '\\n')

/** Downloads a single-event .ics file the viewer can open in any calendar app. */
export function downloadIcs(event: CalendarEntry, text: { title: string; location: string; organizer: string }) {
    const body = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//FIC Uzbekistan//Calendar//EN',
        'BEGIN:VEVENT',
        `UID:${event.id}@fics.uz`,
        `DTSTAMP:${stamp(new Date().toISOString())}`,
        `DTSTART:${stamp(toApiDate(event.start))}`,
        `DTEND:${stamp(toApiDate(event.end))}`,
        `SUMMARY:${escape(text.title)}`,
        `LOCATION:${escape(text.location)}`,
        `DESCRIPTION:${escape(text.organizer)}`,
        'END:VEVENT',
        'END:VCALENDAR',
    ].join('\r\n')

    const url = URL.createObjectURL(new Blob([body], { type: 'text/calendar;charset=utf-8' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `fic-${event.start.slice(0, 10)}.ics`
    a.click()
    URL.revokeObjectURL(url)
}
