import { defineStore } from 'pinia'
import { ref } from 'vue'
import { analyticalReportsService } from '../services/index.service'
import type { AnalyticalReport, AnalyticalReportPayload, AnalyticalReportListParams } from '../types'

export const useAnalyticalReportsStore = defineStore('analyticalReports', () => {
    const items   = ref<AnalyticalReport[]>([])
    const total   = ref(0)
    const loading = ref(false)
    const error   = ref<string | null>(null)

    async function fetchAll(params: AnalyticalReportListParams = {}) {
        loading.value = true
        error.value   = null
        try {
            const res = await analyticalReportsService.getAll(params)
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

    async function createItem(payload: AnalyticalReportPayload) {
        const res = await analyticalReportsService.create(payload)
        if (res.success && res.data) {
            items.value.unshift(res.data)
        }
        return res
    }

    async function updateItem(id: string, payload: Partial<AnalyticalReportPayload>) {
        const res = await analyticalReportsService.update(id, payload)
        if (res.success && res.data) {
            const idx = items.value.findIndex(i => i.id === id)
            if (idx !== -1) items.value[idx] = res.data
        }
        return res
    }

    async function deleteItem(id: string) {
        const res = await analyticalReportsService.remove(id)
        if (res.success) {
            items.value = items.value.filter(i => i.id !== id)
        }
        return res
    }

    return { items, total, loading, error, fetchAll, createItem, updateItem, deleteItem }
})
