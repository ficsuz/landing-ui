<template>
    <div class="page-wrapper">
        <div class="page-header">
            <h1 class="page-title">Special Projects</h1>
            <el-button type="primary" @click="openCreate">+ Add</el-button>
        </div>

        <div class="blog-grid" v-loading="store.loading">
            <div v-for="row in store.items" :key="row.id" class="blog-card">
                <div class="blog-card__video">
                    <iframe
                        v-if="row.link"
                        :src="getEmbedUrl(row.link)"
                        allow="autoplay; fullscreen"
                        allowfullscreen
                        frameborder="0"
                    />
                    <div v-else class="blog-card__video--empty">No video</div>
                </div>
                <div class="blog-card__body">
                    <div class="blog-card__top">
                        <span class="blog-card__order">#{{ row.order }}</span>
                        <el-tag :type="row.status ? 'success' : 'info'" size="small">
                            {{ row.status ? 'Published' : 'Hidden' }}
                        </el-tag>
                    </div>
                    <h3 class="blog-card__title">{{ resolveTranslation(row.title) }}</h3>
                    <a v-if="row.link" :href="row.link" target="_blank" rel="noopener" class="blog-card__link">
                        {{ row.link }}
                    </a>
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

        <el-empty v-if="!store.loading && store.items.length === 0" description="No special projects yet" class="py-16" />

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

        <el-dialog v-model="showDialog" :title="editing ? 'Edit special project' : 'Add special project'" width="min(760px, 92vw)" top="5vh">
            <el-form label-position="top" class="flex flex-col gap-1">
                <el-form-item label="Title">
                    <TranslationField v-model="form.title" class="w-full" placeholder="Enter title" />
                </el-form-item>
                <el-form-item label="Video link (YouTube)">
                    <el-input v-model="form.link" placeholder="https://www.youtube.com/watch?v=..." class="w-full" />
                </el-form-item>
                <div class="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                    <el-form-item label="Order">
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
import { getEmbedUrl } from '@/utils/media'
import { useSpecialProjectsStore } from '@/features/specialProjects/store'
import type { SpecialProject, SpecialProjectPayload } from '@/features/specialProjects/types'
import type { Translation } from '@/types/server/api.types'

const store = useSpecialProjectsStore()
const { locale } = useI18n()

const page = ref(1)
const pageSize = ref(12)
const showDialog = ref(false)
const saving = ref(false)
const editing = ref<SpecialProject | null>(null)

interface FormState {
    title: Translation
    link: string
    order: number
    status: boolean
}

const emptyForm = (): FormState => ({
    title: { uz: '', ru: '', en: '' },
    link: '',
    order: 0,
    status: true,
})

const form = reactive(emptyForm())

function resolveTranslation(t: Translation | null | undefined) {
    if (!t) return ''
    return t[locale.value as keyof Translation] || t.uz || ''
}

async function loadList() {
    await store.fetchAll({ page: page.value, limit: pageSize.value, sortBy: 'order', order: 'asc' })
}

function onPageChange(p: number) { page.value = p; loadList() }

function openCreate() {
    editing.value = null
    Object.assign(form, emptyForm())
    showDialog.value = true
}

function openEdit(row: SpecialProject) {
    editing.value = row
    Object.assign(form, {
        title: { ...row.title },
        link: row.link || '',
        order: row.order ?? 0,
        status: row.status,
    })
    showDialog.value = true
}

async function handleSubmit() {
    if (!form.link.trim()) {
        ElMessage.warning('Video link is required')
        return
    }
    saving.value = true
    try {
        const payload: SpecialProjectPayload = {
            title: form.title,
            link: form.link.trim(),
            order: form.order,
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

async function handleDelete(row: SpecialProject) {
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
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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

.blog-card__video { position: relative; width: 100%; aspect-ratio: 16/9; background: #000; flex-shrink: 0; }
.blog-card__video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.blog-card__video--empty { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #8a94a6; font-size: 13px; background: #f7f8fa; }

.blog-card__body { padding: 16px 18px; display: flex; flex-direction: column; flex: 1; }
.blog-card__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.blog-card__order { font-size: 13px; font-weight: 700; color: #8a94a6; }
.blog-card__title {
    font-size: 15px; font-weight: 600; color: #101828; margin: 0 0 8px; line-height: 1.45;
    display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.blog-card__link {
    font-size: 12px; color: #4361ee; margin: 0 0 8px; word-break: break-all;
    display: -webkit-box; -webkit-line-clamp: 1; line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
}
.blog-card__actions { margin-top: auto; padding-top: 12px; display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #f4f5f7; }
.pagination-wrap { display: flex; justify-content: flex-end; margin-top: 20px; }
</style>
