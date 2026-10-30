import { defineStore } from 'pinia'
import { ref } from 'vue'
import { meetingsService } from '../services/index.service'
import type { Meeting, MeetingPayload, MeetingListParams } from '../types'

export const useMeetingsStore = defineStore('meetings', () => {
    const items   = ref<Meeting[]>([])
    const current = ref<Meeting | null>(null)
    const total   = ref(0)
    const loading = ref(false)
    const error   = ref<string | null>(null)

    async function fetchAll(params: MeetingListParams = {}) {
        loading.value = true
        error.value   = null
        try {
            const res = await meetingsService.getAll(params)
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

    // The API's date sort has no unique tie-breaker: offset pages can repeat
    // one meeting and skip another. Read all pages by ID, then order by date
    // before either UI paginates. Keep the previous list if any request fails.
    async function fetchAllOrdered(): Promise<Meeting[]> {
        loading.value = true
        error.value = null
        try {
            const all = new Map<string, Meeting>()
            let page = 1
            let lastPage = 1
            let expectedTotal = 0
            do {
                const res = await meetingsService.getAll({ page, limit: 100, sortBy: 'id', order: 'desc' })
                for (const meeting of res.data) all.set(meeting.id, meeting)
                expectedTotal = res.meta.pagination.total
                lastPage = res.meta.pagination.lastPage
                page++
            } while (page <= lastPage)

            // Concurrent changes must not leave a silently incomplete list.
            if (all.size !== expectedTotal) throw new Error('Incomplete meetings response')

            const ordered = [...all.values()].sort((a, b) =>
                (b.date || b.createdAt).localeCompare(a.date || a.createdAt) || b.id.localeCompare(a.id),
            )
            items.value = ordered
            total.value = ordered.length
            return ordered
        } catch (e: any) {
            error.value = e?.message ?? 'Error'
            throw e
        } finally {
            loading.value = false
        }
    }

    async function fetchOne(id: string) {
        loading.value = true
        error.value   = null
        try {
            const res = await meetingsService.getOne(id)
            current.value = res.data ?? null
            return res.data
        } catch (e: any) {
            error.value = e?.message ?? 'Error'
            throw e
        } finally {
            loading.value = false
        }
    }

    async function createItem(payload: MeetingPayload) {
        const res = await meetingsService.create(payload)
        if (res.success && res.data) {
            items.value.unshift(res.data)
        }
        return res
    }

    async function updateItem(id: string, payload: Partial<MeetingPayload>) {
        const res = await meetingsService.update(id, payload)
        if (res.success && res.data) {
            const idx = items.value.findIndex(i => i.id === id)
            if (idx !== -1) items.value[idx] = res.data
        }
        return res
    }

    async function deleteItem(id: string) {
        const res = await meetingsService.remove(id)
        if (res.success) {
            items.value = items.value.filter(i => i.id !== id)
        }
        return res
    }

    return { items, current, total, loading, error, fetchAll, fetchAllOrdered, fetchOne, createItem, updateItem, deleteItem }
})
