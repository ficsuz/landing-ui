<template>
    <div class="page-wrapper">
        <div class="page-header">
            <h1 class="page-title">Weekly Results (Events)</h1>
            <el-button type="primary" @click="openCreate">+ Add</el-button>
        </div>

        <div class="event-grid" v-loading="store.loading">
            <div v-for="row in store.items" :key="row.id" class="event-card">
                <div class="event-card__image">
                    <img :src="getMediaUrl(row.previewImageId) || defaultImage" alt="" />
                    <div class="event-card__dates">
                        <span v-if="row.startDate">{{ fmtDate(row.startDate) }}</span>
                        <span v-if="row.startDate && row.endDate"> – </span>
                        <span v-if="row.endDate">{{ fmtDate(row.endDate) }}</span>
                    </div>
                </div>
                <div class="event-card__body">
                    <h3 class="event-card__title">{{ resolveTranslation(row.title) }}</h3>
                    <div class="event-card__actions">
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

        <el-empty v-if="!store.loading && store.items.length === 0" description="No events yet" class="py-16" />

        <div class="pagination-wrap" v-if="store.total > pageSize">
            <el-pagination
                background layout="prev, pager, next"
                :total="store.total" :page-size="pageSize" :current-page="page"
                @current-change="onPageChange"
            />
        </div>

        <el-dialog v-model="showDialog" :title="editing ? 'Edit event' : 'Add event'" width="min(760px, 92vw)" top="5vh">
            <el-form label-position="top" class="flex flex-col gap-1">
                <el-form-item label="Title">
                    <TranslationField v-model="form.title" class="w-full" placeholder="Enter title" />
                </el-form-item>
                <el-form-item label="Content">
                    <TranslationField v-model="form.content" type="textarea" :rows="5" class="w-full" placeholder="Enter content" />
                </el-form-item>
                <el-form-item label="Cover image (preview)">
                    <FileUploader v-model="form.previewImageId" />
                </el-form-item>
                <el-form-item label="Additional image">
                    <FileUploader v-model="form.imageId" />
                </el-form-item>
                <div class="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                    <el-form-item label="Start date">
                        <el-date-picker v-model="form.startDate" type="date" placeholder="Start" value-format="YYYY-MM-DD" class="!w-full" />
                    </el-form-item>
                    <el-form-item label="End date">
                        <el-date-picker v-model="form.endDate" type="date" placeholder="End" value-format="YYYY-MM-DD" class="!w-full" />
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
import { useEventsStore } from '@/features/events/store'
import { getMediaUrl } from '@/utils/media'
import defaultImage from '@/assets/images/hero/about-blog.jpg'
import type { EventItem, EventPayload } from '@/features/events/types'
import type { Translation } from '@/types/server/api.types'

const store = useEventsStore()
const { locale } = useI18n()

const page = ref(1)
const pageSize = ref(12)
const showDialog = ref(false)
const saving = ref(false)
const editing = ref<EventItem | null>(null)

interface FormState {
    title: Translation
    content: Translation
    previewImageId: string | null
    imageId: string | null
    startDate: string | null
    endDate: string | null
}

const emptyForm = (): FormState => ({
    title: { uz: '', ru: '', en: '' },
    content: { uz: '', ru: '', en: '' },
    previewImageId: null,
    imageId: null,
    startDate: null,
    endDate: null,
})

const form = reactive(emptyForm())

function resolveTranslation(t: Translation | null | undefined) {
    if (!t) return ''
    return t[locale.value as keyof Translation] || t.uz || ''
}

function fmtDate(iso?: string | null) {
    if (!iso) return ''
    const d = new Date(iso)
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('ru-RU').replace(/\//g, '.')
}

async function loadList() {
    await store.fetchAll({ page: page.value, limit: pageSize.value, sortBy: 'startDate', order: 'desc' })
}

function onPageChange(p: number) { page.value = p; loadList() }

function openCreate() {
    editing.value = null
    Object.assign(form, emptyForm())
    showDialog.value = true
}

function openEdit(row: EventItem) {
    editing.value = row
    Object.assign(form, {
        title: { ...row.title },
        content: row.content ? { ...row.content } : { uz: '', ru: '', en: '' },
        previewImageId: row.previewImageId,
        imageId: row.imageId,
        startDate: row.startDate ? row.startDate.slice(0, 10) : null,
        endDate: row.endDate ? row.endDate.slice(0, 10) : null,
    })
    showDialog.value = true
}

async function handleSubmit() {
    saving.value = true
    try {
        const payload: EventPayload = {
            title: form.title,
            content: form.content,
            previewImageId: form.previewImageId || undefined,
            imageId: form.imageId || undefined,
            startDate: form.startDate || undefined,
            endDate: form.endDate || undefined,
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

async function handleDelete(row: EventItem) {
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

.event-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    min-height: 120px;
}

.event-card {
    border: 1px solid #eef0f4;
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.2s, transform 0.2s;
}
.event-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.09); transform: translateY(-2px); }

.event-card__image {
    position: relative;
    width: 100%;
    aspect-ratio: 3 / 4;
    background: #1a1e2e;
    flex-shrink: 0;
    overflow: hidden;
}
.event-card__image img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.3s ease;
}
.event-card:hover .event-card__image img { transform: scale(1.04); }

.event-card__dates {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    background: linear-gradient(to top, rgba(26,30,46,0.85) 0%, transparent 100%);
    padding: 24px 12px 10px;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    letter-spacing: 0.03em;
}

.event-card__body { padding: 12px 14px 14px; display: flex; flex-direction: column; flex: 1; }
.event-card__title {
    font-size: 14px; font-weight: 600; color: #101828; margin: 0 0 8px; line-height: 1.4; flex: 1;
    display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.event-card__actions { display: flex; justify-content: flex-end; gap: 8px; padding-top: 10px; border-top: 1px solid #f4f5f7; }
.pagination-wrap { display: flex; justify-content: flex-end; margin-top: 20px; }
</style>
