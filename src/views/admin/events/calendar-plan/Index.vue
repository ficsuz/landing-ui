<template>
    <div class="page-wrapper">
        <div class="page-header">
            <h1 class="page-title">Calendar Plan</h1>
            <el-button type="primary" @click="openCreate">+ Add</el-button>
        </div>

        <el-table :data="store.items" v-loading="store.loading" class="w-full">
            <el-table-column type="index" label="№" width="60" />
            <el-table-column label="Date" width="160">
                <template #default="{ row }">
                    <div class="whitespace-nowrap font-medium">{{ formatDate(row.startDate) }}</div>
                    <div class="whitespace-nowrap text-[12px] text-[#667085]">{{ formatTime(row.startDate) }} – {{ formatTime(row.endDate) }}</div>
                </template>
            </el-table-column>
            <el-table-column label="Type" width="230">
                <template #default="{ row }">
                    <el-tag size="small" effect="plain">{{ typeLabel(row.type) }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Title" min-width="280" show-overflow-tooltip>
                <template #default="{ row }">{{ resolveTranslation(row.title) }}</template>
            </el-table-column>
            <el-table-column label="Status" width="150" align="center">
                <template #default="{ row }">
                    <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small">
                        {{ row.status === 1 ? 'Published' : 'Hidden' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Actions" width="110" fixed="right" align="center">
                <template #default="{ row }">
                    <div class="admin-actions">
                        <el-tooltip content="Edit" placement="top">
                            <el-button type="primary" :icon="Edit" circle plain size="small" @click="openEdit(row)" />
                        </el-tooltip>
                        <el-tooltip content="Delete" placement="top">
                            <el-button type="danger" :icon="Delete" circle plain size="small" @click="handleDelete(row)" />
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-empty v-if="!store.loading && store.items.length === 0" description="No calendar events yet" class="py-16" />

        <div class="pagination-wrap" v-if="store.total > pageSize">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="store.total"
                :page-size="pageSize"
                :current-page="page"
                @current-change="onPageChange"
            />
        </div>

        <el-dialog v-model="showDialog" :title="editing ? 'Edit event' : 'Add event'" width="min(760px, 92vw)" top="5vh">
            <el-form label-position="top" class="flex flex-col gap-1">
                <div class="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                    <el-form-item label="Type" required>
                        <el-select v-model="form.type" class="!w-full">
                            <el-option v-for="t in EVENT_TYPES" :key="t.value" :label="t.label" :value="t.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Status">
                        <el-switch v-model="form.status" :active-value="1" :inactive-value="0" active-text="Published" inactive-text="Hidden" />
                    </el-form-item>
                </div>
                <div class="grid grid-cols-1 gap-x-5 md:grid-cols-3">
                    <el-form-item label="Date" required>
                        <el-date-picker v-model="form.date" type="date" placeholder="Select date" value-format="YYYY-MM-DD" format="DD.MM.YYYY" class="!w-full" />
                    </el-form-item>
                    <el-form-item label="Start time (Tashkent)" required>
                        <el-time-picker v-model="form.start" placeholder="10:00" format="HH:mm" value-format="HH:mm" class="!w-full" />
                    </el-form-item>
                    <el-form-item label="End time (Tashkent)" required>
                        <el-time-picker v-model="form.end" placeholder="12:00" format="HH:mm" value-format="HH:mm" class="!w-full" />
                    </el-form-item>
                </div>
                <el-form-item label="Title" required>
                    <TranslationField v-model="form.title" class="w-full" placeholder="Enter event title" />
                </el-form-item>
                <el-form-item label="Location">
                    <TranslationField v-model="form.location" class="w-full" placeholder="e.g. Hilton Tashkent City" />
                </el-form-item>
                <el-form-item label="Organizer">
                    <TranslationField v-model="form.organizer" class="w-full" placeholder="e.g. Council Secretariat" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="flex justify-end gap-3">
                    <el-button @click="showDialog = false">Cancel</el-button>
                    <el-button type="primary" :loading="saving" @click="handleSubmit">Save</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import TranslationField from '@/components/admin/TranslationField.vue'
import { useCalendarEventsStore } from '@/features/calendarEvents/store'
import { EVENT_TYPES, EVENT_TYPE_MAP } from '@/features/calendarEvents/constants'
import { fromApiDate, toApiDate } from '@/features/calendarEvents/utils/date'
import type { CalendarEvent, CalendarEventPayload, CalendarEventType } from '@/features/calendarEvents/types'
import type { Translation } from '@/types/server/api.types'

const store = useCalendarEventsStore()
const { locale } = useI18n()

const page = ref(1)
const pageSize = ref(20)
const showDialog = ref(false)
const saving = ref(false)
const editing = ref<CalendarEvent | null>(null)

interface FormState {
    type: CalendarEventType
    title: Translation
    location: Translation
    organizer: Translation
    date: string | null
    start: string | null
    end: string | null
    status: number
}

const emptyTranslation = (): Translation => ({ uz: '', ru: '', en: '' })

const emptyForm = (): FormState => ({
    type: 'wgSession',
    title: emptyTranslation(),
    location: emptyTranslation(),
    organizer: emptyTranslation(),
    date: null,
    start: null,
    end: null,
    status: 1,
})

const form = reactive(emptyForm())

function resolveTranslation(t: Translation | null | undefined) {
    if (!t) return ''
    return t[locale.value as keyof Translation] || t.uz || ''
}

const typeLabel = (type: CalendarEventType) => EVENT_TYPE_MAP[type]?.label ?? type

// Dates are stored in UTC and shown in Tashkent time.
function formatDate(iso?: string | null) {
    if (!iso) return '—'
    const [y, m, d] = fromApiDate(iso).slice(0, 10).split('-')
    return `${d}.${m}.${y}`
}

function formatTime(iso?: string | null) {
    return iso ? fromApiDate(iso).slice(11, 16) : '—'
}

async function loadList() {
    await store.fetchAll({ page: page.value, limit: pageSize.value, sortBy: 'startDate', order: 'desc' })
}

function onPageChange(p: number) {
    page.value = p
    loadList()
}

function openCreate() {
    editing.value = null
    Object.assign(form, emptyForm())
    showDialog.value = true
}

function openEdit(row: CalendarEvent) {
    editing.value = row
    const start = fromApiDate(row.startDate)
    Object.assign(form, {
        type: row.type,
        title: { ...row.title },
        location: row.location ? { ...row.location } : emptyTranslation(),
        organizer: row.organizer ? { ...row.organizer } : emptyTranslation(),
        date: start.slice(0, 10),
        start: start.slice(11, 16),
        end: fromApiDate(row.endDate).slice(11, 16),
        status: row.status,
    })
    showDialog.value = true
}

function validate(): string | null {
    if (!form.title.uz.trim()) return 'Enter the title (UZ)'
    if (!form.date || !form.start || !form.end) return 'Select the date, start and end time'
    if (form.end <= form.start) return 'End time must be after the start time'
    return null
}

async function handleSubmit() {
    const problem = validate()
    if (problem) {
        ElMessage.warning(problem)
        return
    }
    saving.value = true
    try {
        const payload: CalendarEventPayload = {
            type: form.type,
            title: form.title,
            location: form.location,
            organizer: form.organizer,
            startDate: toApiDate(`${form.date}T${form.start}`),
            endDate: toApiDate(`${form.date}T${form.end}`),
            status: form.status,
        }
        const res = editing.value ? await store.updateItem(editing.value.id, payload) : await store.createItem(payload)
        if (res.success) {
            ElMessage.success('Saved')
            showDialog.value = false
            loadList()
        }
    } finally {
        saving.value = false
    }
}

async function handleDelete(row: CalendarEvent) {
    try {
        await ElMessageBox.confirm(`Delete "${resolveTranslation(row.title)}"?`, 'Warning', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning',
        })
        const res = await store.deleteItem(row.id)
        if (res.success) {
            ElMessage.success('Deleted')
            loadList()
        }
    } catch {}
}

onMounted(loadList)
</script>

<style scoped>
.page-wrapper {
    padding: 24px;
}
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}
.page-title {
    font-size: 22px;
    font-weight: 600;
    color: #101828;
    margin: 0;
}
.admin-actions {
    display: flex;
    gap: 8px;
    justify-content: center;
}
.pagination-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
</style>
