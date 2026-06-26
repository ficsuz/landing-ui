<template>
    <div class="page-wrapper">
        <div class="page-header">
            <h1 class="page-title">Blitz Interview</h1>
            <el-button type="primary" @click="openCreate">+ Add</el-button>
        </div>

        <div class="card-grid" v-loading="testimonialsStore.loading">
            <div v-for="row in testimonialsStore.items" :key="row.id" class="b-card">
                <div class="b-card__image">
                    <img :src="defaultImage" alt="" />
                    <span class="b-card__play"><el-icon :size="18"><VideoPlay /></el-icon></span>
                    <el-tag :type="row.status ? 'success' : 'info'" size="small" class="b-card__status">
                        {{ row.status ? 'Published' : 'Hidden' }}
                    </el-tag>
                </div>
                <div class="b-card__body">
                    <h3 class="b-card__title">{{ row.fullName || '—' }}</h3>
                    <p class="b-card__position">{{ row.position || '' }}</p>
                    <div class="b-card__actions">
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

        <el-empty v-if="!testimonialsStore.loading && testimonialsStore.items.length === 0" description="No blitz interviews available" class="py-16" />

        <div class="pagination-wrap" v-if="testimonialsStore.total > pageSize">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="testimonialsStore.total"
                :page-size="pageSize"
                :current-page="page"
                @current-change="onPageChange"
            />
        </div>

        <el-dialog v-model="showDialog" :title="editing ? 'Edit blitz interview' : 'Add blitz interview'" width="560px">
            <el-form label-position="top">
                <el-form-item label="Name"><el-input v-model="form.fullName" placeholder="Full name" /></el-form-item>
                <el-form-item label="Position"><el-input v-model="form.position" placeholder="Position" /></el-form-item>
                <el-form-item label="Video link"><el-input v-model="form.videoSource" placeholder="https://youtu.be/..." /></el-form-item>
                <el-form-item label="Cover image (thumbnail)">
                    <FileUploader v-model="form.captionId" />
                </el-form-item>
                <el-form-item label="Logo (optional)">
                    <FileUploader v-model="form.logoId" />
                </el-form-item>
                <el-form-item label="Order number">
                    <el-input-number v-model="form.order" :min="0" class="w-full" />
                </el-form-item>
                <el-form-item label="Status">
                    <el-switch v-model="form.status" active-text="Published" inactive-text="Hidden" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="showDialog = false">Cancel</el-button>
                <el-button type="primary" :loading="saving" @click="handleSubmit">Save</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { VideoPlay, Edit, Delete } from '@element-plus/icons-vue'
import FileUploader from '@/components/admin/FileUploader.vue'
import { useTestimonialsStore } from '@/features/testimonials/store'
import defaultImage from '@/assets/images/hero/about-blog.jpg'
import type { Testimonial, TestimonialPayload } from '@/features/testimonials/types'

const testimonialsStore = useTestimonialsStore()

const page = ref(1)
const pageSize = ref(12)

const showDialog = ref(false)
const saving = ref(false)
const editing = ref<Testimonial | null>(null)

interface TestimonialFormState {
    fullName: string
    position: string
    videoSource: string
    captionId: string | null
    logoId: string | null
    order: number
    status: boolean
}

const emptyForm = (): TestimonialFormState => ({
    fullName: '',
    position: '',
    videoSource: '',
    captionId: null,
    logoId: null,
    order: 0,
    status: true,
})

const form = reactive(emptyForm())

async function loadList() {
    await testimonialsStore.fetchAll({ page: page.value, limit: pageSize.value, sortBy: 'order', order: 'asc' })
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

function openEdit(row: Testimonial) {
    editing.value = row
    Object.assign(form, {
        fullName: row.fullName || '',
        position: row.position || '',
        videoSource: row.videoSource || '',
        captionId: row.captionId,
        logoId: row.logoId,
        order: row.order,
        status: row.status,
    })
    showDialog.value = true
}

async function handleSubmit() {
    saving.value = true
    try {
        const payload: TestimonialPayload = {
            fullName: form.fullName,
            position: form.position,
            videoSource: form.videoSource,
            captionId: form.captionId || undefined,
            logoId: form.logoId || undefined,
            order: form.order,
            status: form.status,
        }

        const res = editing.value
            ? await testimonialsStore.updateItem(editing.value.id, payload)
            : await testimonialsStore.createItem(payload)

        if (res.success) {
            ElMessage.success('Saved')
            showDialog.value = false
            loadList()
        }
    } finally {
        saving.value = false
    }
}

async function handleDelete(row: Testimonial) {
    try {
        await ElMessageBox.confirm(`Delete "${row.fullName}"?`, 'Warning', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning',
        })
        const res = await testimonialsStore.deleteItem(row.id)
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
.pagination-wrap { display: flex; justify-content: flex-end; margin-top: 20px; }

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
    min-height: 120px;
}

.b-card {
    border: 1px solid #eef0f4;
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    display: flex;
    flex-direction: column;
}

.b-card:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.09);
    transform: translateY(-2px);
}

.b-card__image {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    background: #f7f8fa;
}

.b-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.b-card__play {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    background: rgba(25, 28, 31, 0.55);
    color: #fff;
    backdrop-filter: blur(2px);
}

.b-card__status {
    position: absolute;
    top: 10px;
    right: 10px;
}

.b-card__body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.b-card__title {
    font-size: 15px;
    font-weight: 600;
    color: #101828;
    margin: 0 0 4px;
    line-height: 1.4;
}

.b-card__position {
    font-size: 13px;
    color: #8a94a6;
    margin: 0;
    min-height: calc(1.45em * 2);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.b-card__actions {
    margin-top: 14px;
    padding-top: 12px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    border-top: 1px solid #f4f5f7;
}
</style>
