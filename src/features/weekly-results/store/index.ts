import { defineStore } from 'pinia'
import { ref } from 'vue'
import { weeklyResultsService } from '../services/index.service'
import type { WeeklyResult } from '../types'

export const useWeeklyResultsStore = defineStore('weeklyResults', () => {
    const items = ref<WeeklyResult[]>([])
    const total = ref(0)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const page = ref(1)
    const limit = 10

    async function fetchItems(reset = false) {
        if (reset) {
            items.value = []
            page.value = 1
        }
        loading.value = true
        error.value = null
        try {
            const res = await weeklyResultsService.getAll(page.value, limit)
            items.value.push(...res.data.data)
            total.value = res.data.total
            page.value++
        } catch (e: any) {
            error.value = e?.message ?? 'Error'
        } finally {
            loading.value = false
        }
    }

    const hasMore = () => items.value.length < total.value

    return { items, total, loading, error, fetchItems, hasMore }
})
