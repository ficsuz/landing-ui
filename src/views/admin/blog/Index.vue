<template>
    <div class="page-wrapper">
        <div class="page-header">
            <h1 class="page-title">Blog / Articles</h1>
            <el-button type="primary" @click="openCreate">+ Add</el-button>
        </div>

        <div class="blog-grid" v-loading="store.loading">
            <div v-for="row in store.items" :key="row.id" class="blog-card">
                <div class="blog-card__image">
                    <img :src="getMediaUrl(row.imageId) || defaultImage" alt="" />
                    <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small" class="blog-card__status">
                        {{ row.status === 1 ? 'Published' : 'Hidden' }}
                    </el-tag>
                </div>
                <div class="blog-card__body">
                    <span v-if="row.date" class="blog-card__date">{{ formatDate(row.date) }}</span>
                    <p v-if="row.subject" class="blog-card__subject">{{ resolveTranslation(row.subject) }}</p>
                    <h3 class="blog-card__title">{{ resolveTranslation(row.title) }}</h3>
                    <div class="blog-card__actions">
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

        <el-empty v-if="!store.loading && store.items.length === 0" description="No articles yet" class="py-16" />

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

        <el-dialog v-model="showDialog" :title="editing ? 'Edit article' : 'Add article'" width="min(760px, 92vw)" top="5vh">
            <el-form label-position="top" class="flex flex-col gap-1">
                <el-form-item label="Title">
                    <TranslationField v-model="form.title" class="w-full" placeholder="Enter title" />
                </el-form-item>
                <el-form-item label="Subject / Category">
                    <TranslationField v-model="form.subject" class="w-full" placeholder="e.g. Economy, Law" />
                </el-form-item>
                <el-form-item label="Content">
                    <TranslationField v-model="form.content" type="textarea" :rows="6" class="w-full" placeholder="Enter content" />
                </el-form-item>
                <el-form-item label="Cover image">
                    <FileUploader v-model="form.imageId" />
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
import { useBlogStore } from '@/features/blog/store'
import { getMediaUrl } from '@/utils/media'
import defaultImage from '@/assets/images/hero/about-blog.jpg'
import type { Blog, BlogPayload } from '@/features/blog/types'
import type { Translation } from '@/types/server/api.types'

const store = useBlogStore()
const { locale } = useI18n()

const page = ref(1)
const pageSize = ref(12)
const showDialog = ref(false)
const saving = ref(false)
const editing = ref<Blog | null>(null)

interface FormState {
    title: Translation
    subject: Translation
    content: Translation
    imageId: string | null
    date: string | null
    status: number
}

const emptyForm = (): FormState => ({
    title: { uz: '', ru: '', en: '' },
    subject: { uz: '', ru: '', en: '' },
    content: { uz: '', ru: '', en: '' },
    imageId: null,
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
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB').replace(/\//g, '.')
}

async function loadList() {
    await store.fetchAll({ page: page.value, limit: pageSize.value, sortBy: 'date', order: 'desc' })
}

function onPageChange(p: number) { page.value = p; loadList() }

function openCreate() {
    editing.value = null
    Object.assign(form, emptyForm())
    showDialog.value = true
}

function openEdit(row: Blog) {
    editing.value = row
    Object.assign(form, {
        title: { ...row.title },
        subject: row.subject ? { ...row.subject } : { uz: '', ru: '', en: '' },
        content: row.content ? { ...row.content } : { uz: '', ru: '', en: '' },
        imageId: row.imageId,
        date: row.date ? row.date.slice(0, 10) : null,
        status: row.status,
    })
    showDialog.value = true
}

async function handleSubmit() {
    saving.value = true
    try {
        const payload: BlogPayload = {
            title: form.title,
            subject: form.subject,
            content: form.content,
            imageId: form.imageId || undefined,
            date: form.date || undefined,
            status: form.status,
        }
        const res = editing.value
            ? await store.updateItem(editing.value.id, payload)
            : await store.createItem(payload)
        if (res.success) {
            ElMessage.success('Saved')
            showDialog.value = false
            loadList()
        }
    } finally {
        saving.value = false
    }
}

async function handleDelete(row: Blog) {
    try {
        await ElMessageBox.confirm(`Delete "${resolveTranslation(row.title)}"?`, 'Warning', {
            confirmButtonText: 'Yes', cancelButtonText: 'No', type: 'warning',
        })
        const res = await store.deleteItem(row.id)
        if (res.success) { ElMessage.success('Deleted'); loadList() }
    } catch {}
}

onMounted(loadList)
</script>

<style scoped>
.page-wrapper { padding: 24px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-title { font-size: 22px; font-weight: 600; color: #101828; margin: 0; }

.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
    min-height: 120px;
}

.blog-card {
    border: 1px solid #eef0f4;
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    transition: box-shadow 0.2s, transform 0.2s;
    display: flex;
    flex-direction: column;
}
.blog-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.09); transform: translateY(-2px); }

.blog-card__image { position: relative; width: 100%; aspect-ratio: 16/10; background: #f7f8fa; flex-shrink: 0; }
.blog-card__image img { width: 100%; height: 100%; object-fit: cover; display: block; }
.blog-card__status { position: absolute; top: 10px; right: 10px; }

.blog-card__body { padding: 14px 16px 16px; display: flex; flex-direction: column; flex: 1; }
.blog-card__date { font-size: 12px; color: #8a94a6; font-weight: 600; margin-bottom: 4px; display: block; }
.blog-card__subject { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #4361ee; margin: 0 0 6px; }
.blog-card__title {
    font-size: 15px; font-weight: 600; color: #101828; margin: 0 0 8px; line-height: 1.45;
    display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.blog-card__actions { margin-top: auto; padding-top: 12px; display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #f4f5f7; }
.pagination-wrap { display: flex; justify-content: flex-end; margin-top: 20px; }
</style>
