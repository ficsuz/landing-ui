import { defineStore } from 'pinia'
import { ref } from 'vue'
import { calendarEventsService } from '../services/index.service'
import type { CalendarEvent, CalendarEventPayload, CalendarEventListParams } from '../types'

const CALENDAR_PAGE_SIZE = 100

export const useCalendarEventsStore = defineStore('calendarEvents', () => {
    // Admin table (one page at a time)
    const items   = ref<CalendarEvent[]>([])
    const total   = ref(0)
    const loading = ref(false)
    const error   = ref<string | null>(null)

    // Website calendar (every event — the page filters by month itself)
    const calendar        = ref<CalendarEvent[]>([])
    const calendarLoading = ref(false)

    async function fetchAll(params: CalendarEventListParams = {}) {
        loading.value = true
        error.value   = null
        try {
            const res = await calendarEventsService.getAll(params)
            items.value = res.data
            total.value = res.meta.pagination.total
            return res
        } catch (e: any) {
            error.value = e?.message ?? 'Error'
            throw e
        } finally {
            loading.value = false
        }
    }

    /** Loads all pages for the public calendar. */
    async function fetchCalendar() {
        calendarLoading.value = true
        error.value = null
        try {
            const params = { limit: CALENDAR_PAGE_SIZE, sortBy: 'startDate', order: 'asc' as const }
            const first = await calendarEventsService.getAll({ ...params, page: 1 })
            const rest = await Promise.all(
                Array.from({ length: Math.max(0, first.meta.pagination.lastPage - 1) }, (_, i) =>
                    calendarEventsService.getAll({ ...params, page: i + 2 }),
                ),
            )
            calendar.value = [first, ...rest].flatMap((r) => r.data)
        } catch (e: any) {
            error.value = e?.message ?? 'Error'
            throw e
        } finally {
            calendarLoading.value = false
        }
    }

    async function createItem(payload: CalendarEventPayload) {
        const res = await calendarEventsService.create(payload)
        if (res.success && res.data) items.value.unshift(res.data)
        return res
    }

    async function updateItem(id: string, payload: Partial<CalendarEventPayload>) {
        const res = await calendarEventsService.update(id, payload)
        if (res.success && res.data) {
            const idx = items.value.findIndex(i => i.id === id)
            if (idx !== -1) items.value[idx] = res.data
        }
        return res
    }

    async function deleteItem(id: string) {
        const res = await calendarEventsService.remove(id)
        if (res.success) items.value = items.value.filter(i => i.id !== id)
        return res
    }

    return { items, total, loading, error, calendar, calendarLoading, fetchAll, fetchCalendar, createItem, updateItem, deleteItem }
})
