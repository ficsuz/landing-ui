import { defineStore } from 'pinia'
import { ref } from 'vue'
import { blogService } from '../services/index.service'
import type { Blog, BlogPayload, BlogListParams } from '../types'

export const useBlogStore = defineStore('blog', () => {
    const items   = ref<Blog[]>([])
    const current = ref<Blog | null>(null)
    const total   = ref(0)
    const loading = ref(false)
    const error   = ref<string | null>(null)

    async function fetchAll(params: BlogListParams = {}) {
        loading.value = true
        error.value   = null
        try {
            const res = await blogService.getAll(params)
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
            const res = await blogService.getOne(id)
            current.value = res.data ?? null
            return res.data
        } catch (e: any) {
            error.value = e?.message ?? 'Error'
            throw e
        } finally {
            loading.value = false
        }
    }

    async function createItem(payload: BlogPayload) {
        const res = await blogService.create(payload)
        if (res.success && res.data) {
            items.value.unshift(res.data)
        }
        return res
    }

    async function updateItem(id: string, payload: Partial<BlogPayload>) {
        const res = await blogService.update(id, payload)
        if (res.success && res.data) {
            const idx = items.value.findIndex(i => i.id === id)
            if (idx !== -1) items.value[idx] = res.data
        }
        return res
    }

    async function deleteItem(id: string) {
        const res = await blogService.remove(id)
        if (res.success) {
            items.value = items.value.filter(i => i.id !== id)
        }
        return res
    }

    return { items, current, total, loading, error, fetchAll, fetchOne, createItem, updateItem, deleteItem }
})
