import { defineStore } from 'pinia'
import { ref } from 'vue'
import { membersService } from '../services/index.service'
import type { CouncilMember, MemberPayload, MemberListParams } from '../types'

export const useMembersStore = defineStore('members', () => {
    const items   = ref<CouncilMember[]>([])
    const total   = ref(0)
    const loading = ref(false)
    const error   = ref<string | null>(null)

    async function fetchAll(params: MemberListParams = {}) {
        loading.value = true
        error.value   = null
        try {
            const res = await membersService.getAll(params)
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

    async function createItem(payload: MemberPayload) {
        const res = await membersService.create(payload)
        if (res.success && res.data) {
            items.value.unshift(res.data)
        }
        return res
    }

    async function updateItem(id: string, payload: Partial<MemberPayload>) {
        const res = await membersService.update(id, payload)
        if (res.success && res.data) {
            const idx = items.value.findIndex(i => i.id === id)
            if (idx !== -1) items.value[idx] = res.data
        }
        return res
    }

    async function deleteItem(id: string) {
        const res = await membersService.remove(id)
        if (res.success) {
            items.value = items.value.filter(i => i.id !== id)
        }
        return res
    }

    return { items, total, loading, error, fetchAll, createItem, updateItem, deleteItem }
})
