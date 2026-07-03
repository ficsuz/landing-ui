<template>
    <div class="page-wrapper">
        <div class="page-header">
            <h1 class="page-title">Council Calendar</h1>
            <el-button type="primary" @click="openCreate">+ Add</el-button>
        </div>

        <el-table :data="store.items" v-loading="store.loading" class="w-full">
            <el-table-column type="index" label="№" width="60" />
            <el-table-column label="Title" min-width="260" show-overflow-tooltip>
                <template #default="{ row }">{{ resolveTranslation(row.title) }}</template>
            </el-table-column>
            <el-table-column label="Description" min-width="280" show-overflow-tooltip>
                <template #default="{ row }">{{ resolveTranslation(row.description) || '—' }}</template>
            </el-table-column>
            <el-table-column label="Date" width="150" align="center">
                <template #default="{ row }">{{ formatDate(row.date) }}</template>
            </el-table-column>
            <el-table-column prop="order" label="Order" width="120" align="center" />
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

        <el-dialog v-model="showDialog" :title="editing ? 'Edit event' : 'Add event'" width="min(720px, 92vw)" top="6vh">
            <el-form label-position="top" class="flex flex-col gap-1">
                <el-form-item label="Title">
                    <TranslationField v-model="form.title" class="w-full" placeholder="Enter event title" />
                </el-form-item>
                <el-form-item label="Description">
                    <TranslationField v-model="form.description" type="textarea" :rows="4" class="w-full" placeholder="Enter description" />
                </el-form-item>
                <div class="grid grid-cols-1 gap-x-5 md:grid-cols-3">
                    <el-form-item label="Date">
                        <el-date-picker v-model="form.date" type="date" placeholder="Select date" value-format="YYYY-MM-DD" class="!w-full" />
                    </el-form-item>
                    <el-form-item label="Order">
                        <el-input-number v-model="form.order" :min="0" class="!w-full" />
                    </el-form-item>
                    <el-form-item label="Status">
                        <el-switch v-model="form.status" :active-value="1" :inactive-value="0" active-text="Published" inactive-text="Hidden" />
                    </el-form-item>
                </div>
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
import { useCouncilCalendarStore } from '@/features/councilCalendar/store'
import type { CouncilCalendar, CouncilCalendarPayload } from '@/features/councilCalendar/types'
import type { Translation } from '@/types/server/api.types'

const store = useCouncilCalendarStore()
const { locale } = useI18n()

const page = ref(1)
const pageSize = ref(20)
const showDialog = ref(false)
const saving = ref(false)
const editing = ref<CouncilCalendar | null>(null)

interface FormState {
    title: Translation
    description: Translation
    date: string | null
    order: number
    status: number
}

const emptyForm = (): FormState => ({
    title: { uz: '', ru: '', en: '' },
    description: { uz: '', ru: '', en: '' },
    date: null,
    order: 0,
    status: 1,
})

const form = reactive(emptyForm())

function resolveTranslation(t: Translation | null | undefined) {
    if (!t) return ''
    return t[locale.value as keyof Translation] || t.uz || ''
}

function formatDate(iso?: string | null) {
    if (!iso) return '—'
    const d = new Date(iso)
    return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString('en-GB').replace(/\//g, '.')
}

async function loadList() {
    await store.fetchAll({ page: page.value, limit: pageSize.value, sortBy: 'date', order: 'asc' })
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

function openEdit(row: any) {
    editing.value = row
    Object.assign(form, {
        title: { ...row.title },
        description: row.description ? { ...row.description } : { uz: '', ru: '', en: '' },
        date: row.date ? row.date.slice(0, 10) : null,
        order: row.order,
        status: row.status,
    })
    showDialog.value = true
}

async function handleSubmit() {
    saving.value = true
    try {
        const payload: CouncilCalendarPayload = {
            title: form.title,
            description: form.description,
            date: form.date || undefined,
            order: form.order,
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

async function handleDelete(row: any) {
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
