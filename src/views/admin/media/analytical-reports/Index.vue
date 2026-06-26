<template>
    <div class="page-wrapper">
        <div class="page-header">
            <h1 class="page-title">New Approaches — Analytical Reports</h1>
            <el-button type="primary" @click="openCreate">+ Add</el-button>
        </div>

        <div class="report-grid" v-loading="reportsStore.loading">
            <div v-for="row in reportsStore.items" :key="row.id" class="report-card">
                <div class="report-card__image">
                    <img :src="defaultImage" alt="" />
                    <el-tag :type="row.status ? 'success' : 'info'" size="small" class="report-card__status">
                        {{ row.status ? 'Published' : 'Hidden' }}
                    </el-tag>
                </div>
                <div class="report-card__body">
                    <h3 class="report-card__title">{{ resolveTranslation(row.title) }}</h3>
                    <div class="report-card__actions">
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
                <el-form-item label="Cover image">
                    <FileUploader v-model="form.imageId" />
                </el-form-item>
                <el-form-item label="File (PDF)">
                    <TranslatedFileUploader v-model="form.file" />
                </el-form-item>
                <div class="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                    <el-form-item label="Order number">
                        <el-input-number v-model="form.order" :min="0" class="!w-full" />
                    </el-form-item>
                    <el-form-item label="Status">
                        <el-switch v-model="form.status" active-text="Published" inactive-text="Hidden" />
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
import TranslatedFileUploader from '@/components/admin/TranslatedFileUploader.vue'
import { useAnalyticalReportsStore } from '@/features/analyticalReports/store'
import defaultImage from '@/assets/images/hero/about-blog.jpg'
import type { AnalyticalReport, AnalyticalReportPayload, TranslatedFile } from '@/features/analyticalReports/types'
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
    imageId: string | null
    file: TranslatedFile
    order: number
    status: boolean
}

const emptyForm = (): ReportFormState => ({
    title: { uz: '', ru: '', en: '' },
    imageId: null,
    file: { uz: null, ru: null, en: null },
    order: 0,
    status: true,
})

const form = reactive(emptyForm())

function resolveTranslation(t: Translation | null | undefined) {
    if (!t) return ''
    return t[locale.value as keyof Translation] || t.uz || ''
}

async function loadList() {
    await reportsStore.fetchAll({ page: page.value, limit: pageSize.value, sortBy: 'order', order: 'asc' })
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
        imageId: row.imageId,
        file: { ...row.file },
        order: row.order,
        status: row.status,
    })
    showDialog.value = true
}

async function handleSubmit() {
    saving.value = true
    try {
        const payload: AnalyticalReportPayload = {
            title: form.title,
            imageId: form.imageId || undefined,
            file: form.file,
            order: form.order,
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
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
    min-height: 120px;
}

.report-card {
    border: 1px solid #eef0f4;
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    display: flex;
    flex-direction: column;
}

.report-card:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.09);
    transform: translateY(-2px);
}

.report-card__image {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    background: #f7f8fa;
}

.report-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.report-card__status {
    position: absolute;
    top: 10px;
    right: 10px;
}

.report-card__body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.report-card__title {
    font-size: 15px;
    font-weight: 600;
    color: #101828;
    margin: 0 0 8px;
    line-height: 1.45;
    min-height: calc(1.45em * 2);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.report-card__actions {
    margin-top: 14px;
    padding-top: 12px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    border-top: 1px solid #f4f5f7;
}
.pagination-wrap { display: flex; justify-content: flex-end; margin-top: 20px; }
</style>
