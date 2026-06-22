<template>
    <div class="page-wrapper">
        <div class="page-header">
            <h1 class="page-title">News</h1>
            <el-button type="primary" @click="openCreate">+ Add</el-button>
        </div>

        <div class="news-grid" v-loading="newsStore.loading">
            <div v-for="row in newsStore.items" :key="row.id" class="news-card">
                <div class="news-card__image">
                    <img :src="defaultImage" alt="" />
                    <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small" class="news-card__status">
                        {{ row.status === 1 ? 'Published' : 'Draft' }}
                    </el-tag>
                </div>
                <div class="news-card__body">
                    <h3 class="news-card__title">{{ resolveTranslation(row.title) }}</h3>
                    <p class="news-card__date">{{ formatDate(row.date) }}</p>
                    <div class="news-card__actions">
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

        <el-empty v-if="!newsStore.loading && newsStore.items.length === 0" description="No news available" class="py-16" />

        <div class="pagination-wrap" v-if="newsStore.total > pageSize">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="newsStore.total"
                :page-size="pageSize"
                :current-page="page"
                @current-change="onPageChange"
            />
        </div>

        <el-dialog
            v-model="showDialog"
            :title="editing ? 'Edit news' : 'Add news'"
            class="news-dialog"
            width="min(720px, 92vw)"
            top="6vh"
        >
            <el-form label-position="top" class="flex flex-col gap-1">
                <el-form-item label="Title">
                    <TranslationField v-model="form.title" class="w-full" placeholder="Enter title" />
                </el-form-item>
                <el-form-item label="Text">
                    <TranslationField v-model="form.content" type="textarea" :rows="6" class="w-full" placeholder="Enter text" />
                </el-form-item>
                <el-form-item label="Image">
                    <ImageUploader v-model="form.imageId" />
                </el-form-item>
                <div class="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                    <el-form-item label="Date">
                        <el-date-picker v-model="form.date" type="date" class="!w-full" placeholder="Select date" />
                    </el-form-item>
                    <el-form-item label="Status">
                        <el-switch
                            v-model="form.status"
                            :active-value="1"
                            :inactive-value="0"
                            active-text="Published"
                            inactive-text="Draft"
                        />
                    </el-form-item>
                </div>
                <el-form-item label="Link (optional)">
                    <el-input v-model="form.otherLink" class="w-full" placeholder="https://..." />
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
import ImageUploader from '@/components/admin/ImageUploader.vue'
import { useNewsStore } from '@/features/news/store'
import defaultImage from '@/assets/images/hero/about-blog.jpg'
import type { NewsItem, NewsPayload } from '@/features/news/types'
import type { Translation } from '@/types/server/api.types'

const newsStore = useNewsStore()
const { locale } = useI18n()

const page = ref(1)
const pageSize = ref(10)

const showDialog = ref(false)
const saving = ref(false)
const editing = ref<NewsItem | null>(null)

interface NewsFormState {
    title: Translation
    content: Translation
    imageId: string | null
    date?: Date
    otherLink: string
    status: number
}

const emptyForm = (): NewsFormState => ({
    title: { uz: '', ru: '', en: '' },
    content: { uz: '', ru: '', en: '' },
    imageId: null,
    date: undefined,
    otherLink: '',
    status: 0,
})

const form = reactive(emptyForm())

function resolveTranslation(t: Translation | null | undefined) {
    if (!t) return ''
    return t[locale.value as keyof Translation] || t.uz || ''
}

function formatDate(date: string | null) {
    if (!date) return '—'
    return new Date(date).toLocaleDateString('uz-UZ')
}

async function loadList() {
    await newsStore.fetchAll({ page: page.value, limit: pageSize.value })
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

function openEdit(row: NewsItem) {
    editing.value = row
    Object.assign(form, {
        title: { ...row.title },
        content: row.content ? { ...row.content } : { uz: '', ru: '', en: '' },
        imageId: row.imageId,
        date: row.date ? new Date(row.date) : undefined,
        otherLink: row.otherLink || '',
        status: row.status,
    })
    showDialog.value = true
}

async function handleSubmit() {
    saving.value = true
    try {
        const payload: NewsPayload = {
            title: form.title,
            content: form.content,
            imageId: form.imageId || undefined,
            date: form.date ? new Date(form.date).toISOString() : undefined,
            otherLink: form.otherLink || undefined,
            status: form.status,
        }

        const res = editing.value
            ? await newsStore.updateItem(editing.value.id, payload)
            : await newsStore.createItem(payload)

        if (res.success) {
            ElMessage.success('Saved')
            showDialog.value = false
            loadList()
        }
    } finally {
        saving.value = false
    }
}

async function handleDelete(row: NewsItem) {
    try {
        await ElMessageBox.confirm(`Delete "${resolveTranslation(row.title)}"?`, 'Warning', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning',
        })
        const res = await newsStore.deleteItem(row.id)
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

.news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
    min-height: 120px;
}

.news-card {
    border: 1px solid #eef0f4;
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    display: flex;
    flex-direction: column;
}

.news-card:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.09);
    transform: translateY(-2px);
}

.news-card__image {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    background: #f7f8fa;
}

.news-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.news-card__status {
    position: absolute;
    top: 10px;
    right: 10px;
}

.news-card__body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.news-card__title {
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

.news-card__date {
    font-size: 13px;
    color: #8a94a6;
    margin: 0;
}

.news-card__actions {
    margin-top: 14px;
    padding-top: 12px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    border-top: 1px solid #f4f5f7;
}
.pagination-wrap { display: flex; justify-content: flex-end; margin-top: 20px; }
</style>

<style>
.news-dialog {
    border-radius: 16px;
    overflow: hidden;
}
.news-dialog .el-dialog__header {
    margin-right: 0;
    padding: 20px 24px;
    border-bottom: 1px solid #eef0f4;
}
.news-dialog .el-dialog__title {
    font-size: 18px;
    font-weight: 600;
    color: #101828;
}
.news-dialog .el-dialog__body {
    padding: 20px 24px;
    max-height: 70vh;
    overflow-y: auto;
}
.news-dialog .el-dialog__footer {
    padding: 16px 24px;
    border-top: 1px solid #eef0f4;
}
</style>
