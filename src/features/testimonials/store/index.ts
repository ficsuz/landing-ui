import { defineStore } from 'pinia'
import { ref } from 'vue'
import { testimonialsService } from '../services/index.service'
import type { Testimonial, TestimonialPayload, TestimonialListParams } from '../types'

export const useTestimonialsStore = defineStore('testimonials', () => {
    const items   = ref<Testimonial[]>([])
    const total   = ref(0)
    const loading = ref(false)
    const error   = ref<string | null>(null)

    async function fetchAll(params: TestimonialListParams = {}) {
        loading.value = true
        error.value   = null
        try {
            const res = await testimonialsService.getAll(params)
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

    // Many rows share the same `order`, and the API sorts by that single column, so
    // LIMIT/OFFSET pages overlap: some rows land on two pages and others on none.
    // Page through by the unique `id` instead and apply the display order here.
    async function fetchAllOrdered() {
        loading.value = true
        error.value   = null
        try {
            const all: Testimonial[] = []
            let page = 1
            let lastPage = 1
            do {
                // 100 is the API's maximum page size
                const res = await testimonialsService.getAll({ page, limit: 100, sortBy: 'id', order: 'desc' })
                all.push(...res.data)
                lastPage = res.meta.pagination.lastPage
                page++
            } while (page <= lastPage)

            items.value = all.sort((a, b) => a.order - b.order || b.createdAt.localeCompare(a.createdAt))
            total.value = all.length
        } catch (e: any) {
            error.value = e?.message ?? 'Error'
            throw e
        } finally {
            loading.value = false
        }
    }

    async function createItem(payload: TestimonialPayload) {
        const res = await testimonialsService.create(payload)
        if (res.success && res.data) {
            items.value.unshift(res.data)
        }
        return res
    }

    async function updateItem(id: string, payload: Partial<TestimonialPayload>) {
        const res = await testimonialsService.update(id, payload)
        if (res.success && res.data) {
            const idx = items.value.findIndex(i => i.id === id)
            if (idx !== -1) items.value[idx] = res.data
        }
        return res
    }

    async function deleteItem(id: string) {
        const res = await testimonialsService.remove(id)
        if (res.success) {
            items.value = items.value.filter(i => i.id !== id)
        }
        return res
    }

    return { items, total, loading, error, fetchAll, fetchAllOrdered, createItem, updateItem, deleteItem }
})
