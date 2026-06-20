import { defineStore } from 'pinia'
import { ref } from 'vue'
import { newsService } from '../services/index.service'
import type { NewsItem } from '../types'

export const useNewsStore = defineStore('news', () => {
    const items     = ref<NewsItem[]>([])
    const total     = ref(0)
    const loading   = ref(false)
    const error     = ref<string | null>(null)
    const page      = ref(1)
    const category  = ref('all')
    const PAGE_SIZE = 9

    async function fetchItems(reset = false) {
        if (reset) {
            items.value = []
            page.value  = 1
        }
        loading.value = true
        error.value   = null
        try {
            const res = await newsService.getAll({
                page: page.value,
                limit: PAGE_SIZE,
                category: category.value !== 'all' ? category.value : undefined,
            })
            items.value.push(...res.data.data)
            total.value = res.data.total
            page.value++
        } catch (e: any) {
            error.value = e?.message ?? 'Error'
        } finally {
            loading.value = false
        }
    }

    function setCategory(cat: string) {
        category.value = cat
        fetchItems(true)
    }

    const hasMore    = () => items.value.length < total.value
    const featured   = () => items.value.find(i => i.isFeatured) ?? items.value[0] ?? null
    const gridItems  = () => {
        const f = featured()
        return f ? items.value.filter(i => i.id !== f.id) : items.value
    }

    return { items, total, loading, error, category, fetchItems, setCategory, hasMore, featured, gridItems }
})
