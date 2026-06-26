<template>
    <div class="page-wrapper">
        <div class="page-header">
            <h1 class="page-title">Document Categories</h1>
            <el-button type="primary" @click="openCreate">+ Add</el-button>
        </div>

        <el-table :data="store.items" v-loading="store.loading" class="w-full">
            <el-table-column type="index" label="№" width="60" />
            <el-table-column label="Name" min-width="240" show-overflow-tooltip>
                <template #default="{ row }">{{ resolveTranslation(row.name) }}</template>
            </el-table-column>
            <el-table-column prop="order" label="Order" width="100" align="center" />
            <el-table-column label="Status" width="120" align="center">
                <template #default="{ row }">
                    <el-tag :type="row.status ? 'success' : 'info'" size="small">
                        {{ row.status ? 'Published' : 'Hidden' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Actions" width="120" fixed="right" align="center">
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

        <el-empty v-if="!store.loading && store.items.length === 0" description="No categories available" class="py-16" />

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

        <el-dialog v-model="showDialog" :title="editing ? 'Edit category' : 'Add category'" width="min(620px, 92vw)" top="8vh">
            <el-form label-position="top" class="flex flex-col gap-1">
                <el-form-item label="Name">
                    <TranslationField v-model="form.name" class="w-full" placeholder="Enter name" />
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
import { useDocumentCategoriesStore } from '@/features/documentCategories/store'
import type { DocumentCategory, DocumentCategoryPayload } from '@/features/documentCategories/types'
import type { Translation } from '@/types/server/api.types'

const store = useDocumentCategoriesStore()
const { locale } = useI18n()

const page = ref(1)
const pageSize = ref(10)

const showDialog = ref(false)
const saving = ref(false)
const editing = ref<DocumentCategory | null>(null)

interface CategoryFormState {
    name: Translation
    order: number
    status: boolean
}

const emptyForm = (): CategoryFormState => ({
    name: { uz: '', ru: '', en: '' },
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

function onPageChange(p: number) {
    page.value = p
    loadList()
}

function openCreate() {
    editing.value = null
    Object.assign(form, emptyForm())
    showDialog.value = true
}

function openEdit(row: DocumentCategory) {
    editing.value = row
    Object.assign(form, {
        name: { ...row.name },
        order: row.order,
        status: row.status,
    })
    showDialog.value = true
}

async function handleSubmit() {
    saving.value = true
    try {
        const payload: DocumentCategoryPayload = {
            name: form.name,
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

async function handleDelete(row: DocumentCategory) {
    try {
        await ElMessageBox.confirm(`Delete "${resolveTranslation(row.name)}"?`, 'Warning', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning',
        })
        const res = await store.deleteItem(row.id)
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
.admin-actions { display: flex; gap: 8px; justify-content: center; }
.pagination-wrap { display: flex; justify-content: center; margin-top: 24px; }
</style>
