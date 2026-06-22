<template>
    <div class="page-wrapper">
        <div class="page-header">
            <h1 class="page-title">Experts</h1>
            <el-button type="primary" @click="openCreate">+ Add</el-button>
        </div>

        <el-tabs v-model="activeType" @tab-change="onTabChange">
            <el-tab-pane label="International Advisory Group" name="INTERNATIONAL" />
            <el-tab-pane label="Uzbek Experts" name="UZBEK" />
        </el-tabs>

        <el-table :data="expertsStore.items" v-loading="expertsStore.loading" class="w-full">
            <el-table-column type="index" label="№" width="90" />
            <el-table-column label="Name" min-width="240" show-overflow-tooltip>
                <template #default="{ row }">{{ resolveTranslation(row.fullName) }}</template>
            </el-table-column>
            <el-table-column label="Position" min-width="280" show-overflow-tooltip>
                <template #default="{ row }">{{ resolveTranslation(row.position) }}</template>
            </el-table-column>
            <el-table-column prop="order" label="Order" width="120" align="center" />
            <el-table-column label="Status" width="130" align="center">
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
                            <el-button type="primary" :icon="Edit" circle plain size="small" @click="openEdit(row as Expert)" />
                        </el-tooltip>
                        <el-tooltip content="Delete" placement="top">
                            <el-button type="danger" :icon="Delete" circle plain size="small" @click="handleDelete(row as Expert)" />
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-empty v-if="!expertsStore.loading && expertsStore.items.length === 0" description="No experts available" class="py-16" />

        <div class="pagination-wrap" v-if="expertsStore.total > pageSize">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="expertsStore.total"
                :page-size="pageSize"
                :current-page="page"
                @current-change="onPageChange"
            />
        </div>

        <el-dialog v-model="showDialog" :title="editing ? 'Edit expert' : 'Add expert'" width="640px">
            <el-form label-position="top" class="w-full">
                <el-form-item label="Type">
                    <el-select v-model="form.type" class="w-full">
                        <el-option label="International Advisory Group" value="INTERNATIONAL" />
                        <el-option label="Uzbek Experts" value="UZBEK" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Name">
                    <TranslationField v-model="form.fullName" placeholder="Enter name" />
                </el-form-item>
                <el-form-item label="Position">
                    <TranslationField v-model="form.position" placeholder="Enter position" />
                </el-form-item>
                <el-form-item label="Bio">
                    <TranslationField v-model="form.bio" type="textarea" placeholder="Short description" />
                </el-form-item>
                <el-form-item label="Image">
                    <ImageUploader v-model="form.imageId" />
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="form.email" placeholder="email@example.com" />
                </el-form-item>
                <el-form-item label="Phone">
                    <el-input v-model="form.phone" placeholder="+998901234567" />
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
import { Edit, Delete } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import TranslationField from '@/components/admin/TranslationField.vue'
import ImageUploader from '@/components/admin/ImageUploader.vue'
import { useExpertsStore } from '@/features/experts/store'
import type { Expert, ExpertPayload, ExpertType } from '@/features/experts/types'
import type { Translation } from '@/types/server/api.types'

const expertsStore = useExpertsStore()
const { locale } = useI18n()

const page = ref(1)
const pageSize = ref(12)

const activeType = ref<ExpertType>('INTERNATIONAL')
const showDialog = ref(false)
const saving = ref(false)
const editing = ref<Expert | null>(null)

interface ExpertFormState {
    type: ExpertType
    fullName: Translation
    position: Translation
    bio: Translation
    imageId: string | null
    email: string
    phone: string
    order: number
    status: boolean
}

const emptyForm = (): ExpertFormState => ({
    type: activeType.value,
    fullName: { uz: '', ru: '', en: '' },
    position: { uz: '', ru: '', en: '' },
    bio: { uz: '', ru: '', en: '' },
    imageId: null,
    email: '',
    phone: '',
    order: 0,
    status: true,
})

const form = reactive(emptyForm())

function resolveTranslation(t: Translation | null | undefined) {
    if (!t) return ''
    return t[locale.value as keyof Translation] || t.uz || ''
}

async function loadList() {
    await expertsStore.fetchAll({ type: activeType.value, page: page.value, limit: pageSize.value, sortBy: 'order', order: 'asc' })
}

function onPageChange(p: number) {
    page.value = p
    loadList()
}

function onTabChange() {
    page.value = 1
    loadList()
}

function openCreate() {
    editing.value = null
    Object.assign(form, emptyForm())
    showDialog.value = true
}

function openEdit(row: Expert) {
    editing.value = row
    Object.assign(form, {
        type: row.type,
        fullName: { ...row.fullName },
        position: { ...row.position },
        bio: row.bio ? { ...row.bio } : { uz: '', ru: '', en: '' },
        imageId: row.imageId,
        email: row.email || '',
        phone: row.phone || '',
        order: row.order,
        status: row.status,
    })
    showDialog.value = true
}

async function handleSubmit() {
    saving.value = true
    try {
        const payload: ExpertPayload = {
            type: form.type,
            fullName: form.fullName,
            position: form.position,
            bio: form.bio,
            imageId: form.imageId || undefined,
            email: form.email || undefined,
            phone: form.phone || undefined,
            order: form.order,
            status: form.status,
        }

        const res = editing.value ? await expertsStore.updateItem(editing.value.id, payload) : await expertsStore.createItem(payload)

        if (res.success) {
            ElMessage.success('Saved')
            showDialog.value = false
            loadList()
        }
    } finally {
        saving.value = false
    }
}

async function handleDelete(row: Expert) {
    try {
        await ElMessageBox.confirm(`Delete "${resolveTranslation(row.fullName)}"?`, 'Warning', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning',
        })
        const res = await expertsStore.deleteItem(row.id)
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
.pagination-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
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
</style>
