import { defineStore } from 'pinia'
import { ref } from 'vue'
import { eventsService } from '../services/index.service'
import type { EventItem, EventPayload, EventListParams } from '../types'

export const useEventsStore = defineStore('events', () => {
    const items   = ref<EventItem[]>([])
    const current = ref<EventItem | null>(null)
    const total   = ref(0)
    const loading = ref(false)
    const error   = ref<string | null>(null)

    async function fetchAll(params: EventListParams = {}) {
        loading.value = true
        error.value   = null
        try {
            const res = await eventsService.getAll(params)
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

    async function fetchOne(id: string) {
        loading.value = true
        error.value   = null
        try {
            const res = await eventsService.getOne(id)
            current.value = res.data ?? null
            return res.data
        } catch (e: any) {
            error.value = e?.message ?? 'Error'
            throw e
        } finally {
            loading.value = false
        }
    }

    async function createItem(payload: EventPayload) {
        const res = await eventsService.create(payload)
        if (res.success && res.data) items.value.unshift(res.data)
        return res
    }

    async function updateItem(id: string, payload: Partial<EventPayload>) {
        const res = await eventsService.update(id, payload)
        if (res.success && res.data) {
            const idx = items.value.findIndex(i => i.id === id)
            if (idx !== -1) items.value[idx] = res.data
        }
        return res
    }

    async function deleteItem(id: string) {
        const res = await eventsService.remove(id)
        if (res.success) items.value = items.value.filter(i => i.id !== id)
        return res
    }

    return { items, current, total, loading, error, fetchAll, fetchOne, createItem, updateItem, deleteItem }
})
