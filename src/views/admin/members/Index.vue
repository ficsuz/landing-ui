<template>
    <div class="page-wrapper">
        <div class="page-header">
            <h1 class="page-title">Members</h1>
            <el-button type="primary" @click="openCreate">+ Add</el-button>
        </div>

        <el-table :data="membersStore.items" v-loading="membersStore.loading" class="w-full">
            <el-table-column type="index" label="№" width="90" />
            <el-table-column label="Name" min-width="240" show-overflow-tooltip>
                <template #default="{ row }">{{ resolveTranslation(row.fullName) }}</template>
            </el-table-column>
            <el-table-column label="Position" min-width="280" show-overflow-tooltip>
                <template #default="{ row }">{{ resolveTranslation(row.position) }}</template>
            </el-table-column>
            <el-table-column prop="order" label="Order" width="120" align="center" />
            <el-table-column label="Actions" width="120" fixed="right" align="center">
                <template #default="{ row }">
                    <div class="admin-actions">
                        <el-tooltip content="Edit" placement="top">
                            <el-button type="primary" :icon="Edit" circle plain size="small" @click="openEdit(row as CouncilMember)" />
                        </el-tooltip>
                        <el-tooltip content="Delete" placement="top">
                            <el-button type="danger" :icon="Delete" circle plain size="small" @click="handleDelete(row as CouncilMember)" />
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-empty v-if="!membersStore.loading && membersStore.items.length === 0" description="No members available" class="py-16" />

        <div class="pagination-wrap" v-if="membersStore.total > pageSize">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="membersStore.total"
                :page-size="pageSize"
                :current-page="page"
                @current-change="onPageChange"
            />
        </div>

        <el-dialog v-model="showDialog" :title="editing ? 'Edit member' : 'Add member'" width="600px">
            <el-form label-position="top" class="w-full">
                <el-form-item label="Name">
                    <TranslationField v-model="form.fullName" placeholder="Enter name" />
                </el-form-item>
                <el-form-item label="Position">
                    <TranslationField v-model="form.position" placeholder="Enter position" />
                </el-form-item>
                <el-form-item label="Image">
                    <FileUploader v-model="form.photoId" />
                </el-form-item>
                <el-form-item label="Order number">
                    <el-input-number v-model="form.order" :min="0" class="w-full" />
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
import FileUploader from '@/components/admin/FileUploader.vue'
import { useMembersStore } from '@/features/members/store'
import type { CouncilMember, MemberPayload } from '@/features/members/types'
import type { Translation } from '@/types/server/api.types'

const membersStore = useMembersStore()
const { locale } = useI18n()

const page = ref(1)
const pageSize = ref(12)

const showDialog = ref(false)
const saving = ref(false)
const editing = ref<CouncilMember | null>(null)

interface MemberFormState {
    fullName: Translation
    position: Translation
    photoId: string | null
    order: number
}

const emptyForm = (): MemberFormState => ({
    fullName: { uz: '', ru: '', en: '' },
    position: { uz: '', ru: '', en: '' },
    photoId: null,
    order: 0,
})

const form = reactive(emptyForm())

function resolveTranslation(t: Translation | null | undefined) {
    if (!t) return ''
    return t[locale.value as keyof Translation] || t.uz || ''
}

async function loadList() {
    await membersStore.fetchAll({ page: page.value, limit: pageSize.value, sortBy: 'order', order: 'asc' })
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

function openEdit(row: CouncilMember) {
    editing.value = row
    Object.assign(form, {
        fullName: { ...row.fullName },
        position: { ...row.position },
        photoId: row.photoId,
        order: row.order,
    })
    showDialog.value = true
}

async function handleSubmit() {
    saving.value = true
    try {
        const payload: MemberPayload = {
            fullName: form.fullName,
            position: form.position,
            photoId: form.photoId || undefined,
            order: form.order,
        }

        const res = editing.value ? await membersStore.updateItem(editing.value.id, payload) : await membersStore.createItem(payload)

        if (res.success) {
            ElMessage.success('Saved')
            showDialog.value = false
            loadList()
        }
    } finally {
        saving.value = false
    }
}

async function handleDelete(row: CouncilMember) {
    try {
        await ElMessageBox.confirm(`Delete "${resolveTranslation(row.fullName)}"?`, 'Warning', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning',
        })
        const res = await membersStore.deleteItem(row.id)
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
.pagination-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
</style>
