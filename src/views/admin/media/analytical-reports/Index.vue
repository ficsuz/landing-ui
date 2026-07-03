<template>
    <div class="page-wrapper">
        <div class="page-header">
            <h1 class="page-title">New Approaches — Analytical Reports</h1>
            <el-button type="primary" @click="openCreate">+ Add</el-button>
        </div>

        <div v-loading="reportsStore.loading" class="report-grid">
            <div
                v-for="row in reportsStore.items"
                :key="row.id"
                class="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#eef0f4] shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.11)] hover:-translate-y-1 transition-all duration-300"
            >
                <!-- Image -->
                <div class="relative overflow-hidden aspect-[16/10] bg-[#eef0f4] shrink-0">
                    <img
                        v-if="getMediaUrl(row.previewImageId)"
                        :src="getMediaUrl(row.previewImageId)!"
                        :alt="resolveTranslation(row.title)"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c8cdd6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                    </div>

                    <!-- Status badge -->
                    <span
                        class="absolute top-3 left-3 text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                        :class="row.status ? 'bg-[#1a1e2e] text-white' : 'bg-white/80 text-[#8a94a6]'"
                    >
                        {{ row.status ? 'Published' : 'Hidden' }}
                    </span>

                    <!-- PDF download hover overlay -->
                    <a
                        v-if="reportFile(row)"
                        :href="reportFile(row)"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="absolute inset-0 flex items-center justify-center bg-[rgba(26,30,46,0)] opacity-0 group-hover:bg-[rgba(26,30,46,0.38)] group-hover:opacity-100 transition-all duration-250 z-10"
                        title="Download PDF"
                        @click.stop
                    >
                        <span class="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.18)] scale-75 group-hover:scale-100 transition-transform duration-250">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1e2e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </span>
                    </a>
                </div>

                <!-- Body -->
                <div class="flex flex-col flex-1 p-5">
                    <!-- Date -->
                    <span v-if="row.date" class="text-[12px] text-[#8a94a6] flex items-center gap-1.5 mb-2">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {{ formatDate(row.date) }}
                    </span>

                    <!-- Title -->
                    <h3 class="font-bold text-[15px] text-[#1a1e2e] leading-snug line-clamp-2 flex-1">
                        {{ resolveTranslation(row.title) || '—' }}
                    </h3>

                    <!-- Description -->
                    <p v-if="resolveTranslation(row.description)" class="mt-2 text-[13px] text-[#667085] leading-relaxed line-clamp-2">
                        {{ resolveTranslation(row.description) }}
                    </p>

                    <!-- Actions -->
                    <div class="mt-4 pt-3 border-t border-[#f4f5f7] flex justify-end gap-2">
                        <el-tooltip content="Edit" placement="top">
                            <el-button type="primary" :icon="Edit" circle plain @click="openEdit(row)" />
                        </el-tooltip>
                        <el-tooltip content="Delete" placement="top">
                            <el-button type="danger" :icon="Delete" circle plain @click="handleDelete(row)" />
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </div>

        <el-empty v-if="!reportsStore.loading && reportsStore.items.length === 0" description="No reports available" class="py-16" />

        <div class="pagination-wrap" v-if="reportsStore.total > pageSize">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="reportsStore.total"
                :page-size="pageSize"
                :current-page="page"
                @current-change="onPageChange"
            />
        </div>

        <el-dialog
            v-model="showDialog"
            :title="editing ? 'Edit report' : 'Add report'"
            width="min(720px, 92vw)"
            top="6vh"
        >
            <el-form label-position="top" class="flex flex-col gap-1">
                <el-form-item label="Title">
                    <TranslationField v-model="form.title" class="w-full" placeholder="Enter title" />
                </el-form-item>
                <el-form-item label="Description">
                    <TranslationField v-model="form.description" class="w-full" type="textarea" placeholder="Enter description" />
                </el-form-item>
                <el-form-item label="Cover image">
                    <FileUploader v-model="form.previewImageId" />
                </el-form-item>
                <el-form-item label="File (PDF)">
                    <FileUploader v-model="form.fileId" accept="application/pdf" />
                </el-form-item>
                <div class="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                    <el-form-item label="Date">
                        <el-date-picker v-model="form.date" type="date" placeholder="Select date" value-format="YYYY-MM-DD" class="!w-full" />
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
import FileUploader from '@/components/admin/FileUploader.vue'
import { useAnalyticalReportsStore } from '@/features/analyticalReports/store'
import { getMediaUrl } from '@/utils/media'
import type { AnalyticalReport, AnalyticalReportPayload } from '@/features/analyticalReports/types'
import type { Translation } from '@/types/server/api.types'

const reportsStore = useAnalyticalReportsStore()
const { locale } = useI18n()

const page = ref(1)
const pageSize = ref(10)

const showDialog = ref(false)
const saving = ref(false)
const editing = ref<AnalyticalReport | null>(null)

interface ReportFormState {
    title: Translation
    description: Translation
    previewImageId: string | null
    fileId: string | null
    date: string | null
    status: number
}

const emptyForm = (): ReportFormState => ({
    title: { uz: '', ru: '', en: '' },
    description: { uz: '', ru: '', en: '' },
    previewImageId: null,
    fileId: null,
    date: null,
    status: 1,
})

const form = reactive(emptyForm())

function resolveTranslation(t: Translation | null | undefined) {
    if (!t) return ''
    return t[locale.value as keyof Translation] || t.uz || ''
}

function formatDate(iso?: string | null) {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleDateString('en-GB').replace(/\//g, '.')
}

function reportFile(row: AnalyticalReport) {
    return row.fileId ? getMediaUrl(row.fileId) : ''
}

async function loadList() {
    await reportsStore.fetchAll({ page: page.value, limit: pageSize.value, sortBy: 'date', order: 'desc' })
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

function openEdit(row: AnalyticalReport) {
    editing.value = row
    Object.assign(form, {
        title: { ...row.title },
        description: row.description ? { ...row.description } : { uz: '', ru: '', en: '' },
        previewImageId: row.previewImageId,
        fileId: row.fileId,
        date: row.date ? row.date.slice(0, 10) : null,
        status: row.status,
    })
    showDialog.value = true
}

async function handleSubmit() {
    saving.value = true
    try {
        const payload: AnalyticalReportPayload = {
            title: form.title,
            description: form.description,
            previewImageId: form.previewImageId || undefined,
            fileId: form.fileId || undefined,
            date: form.date || undefined,
            status: form.status,
        }

        const res = editing.value
            ? await reportsStore.updateItem(editing.value.id, payload)
            : await reportsStore.createItem(payload)

        if (res.success) {
            ElMessage.success('Saved')
            showDialog.value = false
            loadList()
        }
    } finally {
        saving.value = false
    }
}

async function handleDelete(row: AnalyticalReport) {
    try {
        await ElMessageBox.confirm(`Delete "${resolveTranslation(row.title)}"?`, 'Warning', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning',
        })
        const res = await reportsStore.deleteItem(row.id)
        if (res.success) {
            ElMessage.success('Deleted')
            loadList()
        }
    } catch {
        // cancelled
    }
}

onMounted(loadList)
</script>

<style scoped>
.page-wrapper { padding: 24px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-title { font-size: 22px; font-weight: 600; color: #101828; margin: 0; }

.report-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    min-height: 120px;
}

.pagination-wrap { display: flex; justify-content: flex-end; margin-top: 20px; }
</style>
