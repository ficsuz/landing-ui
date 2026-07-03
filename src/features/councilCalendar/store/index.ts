import { defineStore } from 'pinia'
import { ref } from 'vue'
import { councilCalendarService } from '../services/index.service'
import type { CouncilCalendar, CouncilCalendarPayload, CouncilCalendarListParams } from '../types'

export const useCouncilCalendarStore = defineStore('councilCalendar', () => {
    const items   = ref<CouncilCalendar[]>([])
    const total   = ref(0)
    const loading = ref(false)
    const error   = ref<string | null>(null)

    async function fetchAll(params: CouncilCalendarListParams = {}) {
        loading.value = true
        error.value   = null
        try {
            const res = await councilCalendarService.getAll(params)
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

    async function createItem(payload: CouncilCalendarPayload) {
        const res = await councilCalendarService.create(payload)
        if (res.success && res.data) items.value.unshift(res.data)
        return res
    }

    async function updateItem(id: string, payload: Partial<CouncilCalendarPayload>) {
        const res = await councilCalendarService.update(id, payload)
        if (res.success && res.data) {
            const idx = items.value.findIndex(i => i.id === id)
            if (idx !== -1) items.value[idx] = res.data
        }
        return res
    }

    async function deleteItem(id: string) {
        const res = await councilCalendarService.remove(id)
        if (res.success) items.value = items.value.filter(i => i.id !== id)
        return res
    }

    return { items, total, loading, error, fetchAll, createItem, updateItem, deleteItem }
})
