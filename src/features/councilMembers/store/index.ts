import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { councilMembersService } from '../services/index.service'
import type { MemberCompany, MemberCompanyPayload, MemberCompanyListParams, MemberType } from '../types'

export const useCouncilMembersStore = defineStore('councilMembers', () => {
    const items   = ref<MemberCompany[]>([])
    const total   = ref(0)
    const loading = ref(false)
    const error   = ref<string | null>(null)

    const publicMembers = ref<MemberCompany[] | null>(null)
    const publicLoading = ref(false)
    const publicError = ref(false)

    const publicMembersByType = computed(() => {
        const groups: Record<MemberType, MemberCompany[]> = { EXECUTIVE_BOARD: [], FULL: [], OBSERVER: [] }
        publicMembers.value?.forEach((member) => groups[member.type]?.push(member))
        return groups
    })

    async function fetchPublicMembers() {
        if (publicLoading.value) return
        publicLoading.value = true
        publicError.value = false
        const published: MemberCompany[] = []
        let page = 1
        try {
            while (true) {
                const res = await councilMembersService.getAll({ page, limit: 100, sortBy: 'order', order: 'asc' })
                published.push(...res.data.filter((member) => member.status))
                if (page >= res.meta.pagination.lastPage) break
                page += 1
            }
            publicMembers.value = published
        } catch {
            publicError.value = true
        } finally {
            publicLoading.value = false
        }
    }

    async function fetchAll(params: MemberCompanyListParams = {}) {
        loading.value = true
        error.value   = null
        try {
            const res = await councilMembersService.getAll(params)
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

    async function createItem(payload: MemberCompanyPayload) {
        const res = await councilMembersService.create(payload)
        if (res.success && res.data) items.value.unshift(res.data)
        return res
    }

    async function updateItem(id: string, payload: Partial<MemberCompanyPayload>) {
        const res = await councilMembersService.update(id, payload)
        if (res.success && res.data) {
            const idx = items.value.findIndex(i => i.id === id)
            if (idx !== -1) items.value[idx] = res.data
        }
        return res
    }

    async function deleteItem(id: string) {
        const res = await councilMembersService.remove(id)
        if (res.success) items.value = items.value.filter(i => i.id !== id)
        return res
    }

    return {
        items, total, loading, error, fetchAll, createItem, updateItem, deleteItem,
        publicMembers, publicLoading, publicError, publicMembersByType, fetchPublicMembers,
    }
})
