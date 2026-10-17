import { defineStore } from 'pinia'
import { ref } from 'vue'
import { workingGroupSessionsService } from '../services/index.service'
import { useMeetingsStore } from '@/features/meetings/store'
import type { Meeting } from '@/features/meetings/types'
import type { Translation } from '@/types/server/api.types'
import type {
    WorkingGroupSession,
    WorkingGroupSessionPayload,
    WorkingGroupSessionListParams,
    MoveResult,
} from '../types'

const cloneTranslation = (t: Translation | null | undefined): Translation => ({
    uz: t?.uz ?? '',
    ru: t?.ru ?? '',
    en: t?.en ?? '',
})

// Meetings and sessions share one payload shape — copy only the writable fields.
function toPayload(item: Meeting | WorkingGroupSession): WorkingGroupSessionPayload {
    return {
        title: cloneTranslation(item.title),
        subject: cloneTranslation(item.subject),
        content: cloneTranslation(item.content),
        imageIds: Array.isArray(item.imageIds) ? [...item.imageIds] : [],
        date: item.date ? item.date.slice(0, 10) : undefined,
        status: item.status,
    }
}

export const useWorkingGroupSessionsStore = defineStore('workingGroupSessions', () => {
    const items   = ref<WorkingGroupSession[]>([])
    const current = ref<WorkingGroupSession | null>(null)
    const total   = ref(0)
    const loading = ref(false)
    const error   = ref<string | null>(null)

    async function fetchAll(params: WorkingGroupSessionListParams = {}) {
        loading.value = true
        error.value   = null
        try {
            const res = await workingGroupSessionsService.getAll(params)
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
            const res = await workingGroupSessionsService.getOne(id)
            current.value = res.data ?? null
            return res.data
        } catch (e: any) {
            error.value = e?.message ?? 'Error'
            throw e
        } finally {
            loading.value = false
        }
    }

    async function createItem(payload: WorkingGroupSessionPayload) {
        const res = await workingGroupSessionsService.create(payload)
        if (res.success && res.data) {
            items.value.unshift(res.data)
        }
        return res
    }

    async function updateItem(id: string, payload: Partial<WorkingGroupSessionPayload>) {
        const res = await workingGroupSessionsService.update(id, payload)
        if (res.success && res.data) {
            const idx = items.value.findIndex(i => i.id === id)
            if (idx !== -1) items.value[idx] = res.data
        }
        return res
    }

    async function deleteItem(id: string) {
        const res = await workingGroupSessionsService.remove(id)
        if (res.success) {
            items.value = items.value.filter(i => i.id !== id)
        }
        return res
    }

    // Moving = create the copy first, then remove the original. If the copy fails
    // this throws and nothing has changed; if only the removal fails the record
    // exists in both places and 'copied' is returned so the UI can say so.
    async function moveFromMeeting(meeting: Meeting): Promise<MoveResult> {
        const meetingsStore = useMeetingsStore()
        const created = await createItem(toPayload(meeting))
        if (!created.success) throw new Error(created.message || 'Error')
        try {
            const removed = await meetingsStore.deleteItem(meeting.id)
            return removed.success ? 'moved' : 'copied'
        } catch {
            return 'copied'
        }
    }

    async function moveToMeetings(session: WorkingGroupSession): Promise<MoveResult> {
        const meetingsStore = useMeetingsStore()
        const created = await meetingsStore.createItem(toPayload(session))
        if (!created.success) throw new Error(created.message || 'Error')
        try {
            const removed = await deleteItem(session.id)
            return removed.success ? 'moved' : 'copied'
        } catch {
            return 'copied'
        }
    }

    return {
        items, current, total, loading, error,
        fetchAll, fetchOne, createItem, updateItem, deleteItem,
        moveFromMeeting, moveToMeetings,
    }
})
