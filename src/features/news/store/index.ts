import { defineStore } from 'pinia'
import { ref } from 'vue'
import { newsService } from '../services/index.service'
import type { NewsItem, NewsPayload } from '../types'

export const useNewsStore = defineStore('news', () => {
    const items   = ref<NewsItem[]>([])
    const total   = ref(0)
    const loading = ref(false)
    const error   = ref<string | null>(null)
    const page    = ref(1)
    const PAGE_SIZE = 9

    async function fetchItems(reset = false) {
        if (reset) {
            items.value = []
            page.value  = 1
        }
        loading.value = true
        error.value   = null
        try {
            const res = await newsService.getAll({ page: page.value, limit: PAGE_SIZE })
            items.value.push(...res.data)
            total.value = res.meta.pagination.total
            page.value++
        } catch (e: any) {
            error.value = e?.message ?? 'Error'
        } finally {
            loading.value = false
        }
    }

    async function fetchAll(params: { page?: number; limit?: number; search?: string } = {}) {
        loading.value = true
        error.value   = null
        try {
            const res = await newsService.getAll(params)
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

    async function createItem(payload: NewsPayload) {
        const res = await newsService.create(payload)
        if (res.success && res.data) {
            items.value.unshift(res.data)
        }
        return res
    }

    async function updateItem(id: string, payload: Partial<NewsPayload>) {
        const res = await newsService.update(id, payload)
        if (res.success && res.data) {
            const idx = items.value.findIndex(i => i.id === id)
            if (idx !== -1) items.value[idx] = res.data
        }
        return res
    }

    async function deleteItem(id: string) {
        const res = await newsService.remove(id)
        if (res.success) {
            items.value = items.value.filter(i => i.id !== id)
        }
        return res
    }

    const hasMore = () => items.value.length < total.value

    return { items, total, loading, error, fetchItems, fetchAll, createItem, updateItem, deleteItem, hasMore }
})
