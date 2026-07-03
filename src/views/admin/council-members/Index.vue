<template>
    <div class="page-wrapper">
        <div class="page-header">
            <h1 class="page-title">Council Members (Company Logos)</h1>
            <el-button type="primary" @click="openCreate">+ Add</el-button>
        </div>

        <!-- Type filter -->
        <div class="flex gap-2 mb-6 flex-wrap">
            <el-button
                v-for="opt in typeOptions"
                :key="opt.value"
                :type="filterType === opt.value ? 'primary' : 'default'"
                round
                @click="filterType = opt.value"
            >
                {{ opt.label }}
            </el-button>
        </div>

        <div class="members-grid" v-loading="store.loading">
            <div v-for="row in filteredItems" :key="row.id" class="member-card">
                <div class="member-card__logo">
                    <img v-if="row.logoId" :src="getMediaUrl(row.logoId)" alt="" />
                    <span v-else class="member-card__logo-placeholder">No logo</span>
                    <el-tag :type="row.status ? 'success' : 'info'" size="small" class="member-card__status">
                        {{ row.status ? 'Active' : 'Hidden' }}
                    </el-tag>
                </div>
                <div class="member-card__body">
                    <span class="member-card__type">{{ typeLabel(row.type) }}</span>
                    <h3 class="member-card__name">{{ resolveTranslation(row.name) }}</h3>
                    <p v-if="row.link" class="member-card__link">{{ row.link }}</p>
                    <div class="member-card__actions">
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

        <el-empty v-if="!store.loading && filteredItems.length === 0" description="No members yet" class="py-16" />

        <div class="pagination-wrap" v-if="store.total > pageSize">
            <el-pagination
                background layout="prev, pager, next"
                :total="store.total" :page-size="pageSize" :current-page="page"
                @current-change="onPageChange"
            />
        </div>

        <el-dialog v-model="showDialog" :title="editing ? 'Edit company' : 'Add company'" width="min(720px, 92vw)" top="6vh">
            <el-form label-position="top" class="flex flex-col gap-1">
                <el-form-item label="Company name">
                    <TranslationField v-model="form.name" class="w-full" placeholder="Enter company name" />
                </el-form-item>
                <el-form-item label="Description">
                    <TranslationField v-model="form.description" type="textarea" :rows="3" class="w-full" placeholder="Enter description" />
                </el-form-item>
                <el-form-item label="Logo">
                    <FileUploader v-model="form.logoId" />
                </el-form-item>
                <div class="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                    <el-form-item label="Website link">
                        <el-input v-model="form.link" placeholder="https://..." class="!w-full" />
                    </el-form-item>
                    <el-form-item label="Type">
                        <el-select v-model="form.type" class="!w-full">
                            <el-option v-for="opt in typeOptions.slice(1)" :key="opt.value" :label="opt.label" :value="opt.value" />
                        </el-select>
                    </el-form-item>
                </div>
                <div class="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                    <el-form-item label="Order">
                        <el-input-number v-model="form.order" :min="0" class="!w-full" />
                    </el-form-item>
                    <el-form-item label="Status">
                        <el-switch v-model="form.status" active-text="Active" inactive-text="Hidden" />
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
import { reactive, ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import TranslationField from '@/components/admin/TranslationField.vue'
import FileUploader from '@/components/admin/FileUploader.vue'
import { useCouncilMembersStore } from '@/features/councilMembers/store'
import { getMediaUrl } from '@/utils/media'
import type { MemberCompany, MemberCompanyPayload, MemberType } from '@/features/councilMembers/types'
import type { Translation } from '@/types/server/api.types'

const store = useCouncilMembersStore()
const { locale } = useI18n()

const page = ref(1)
const pageSize = ref(50)
const showDialog = ref(false)
const saving = ref(false)
const editing = ref<MemberCompany | null>(null)
const filterType = ref('')

const typeOptions = [
    { value: '', label: 'All' },
    { value: 'EXECUTIVE_BOARD', label: 'Executive Board' },
    { value: 'FULL', label: 'Full Member' },
    { value: 'OBSERVER', label: 'Observer' },
]

const filteredItems = computed(() =>
    filterType.value ? store.items.filter(i => i.type === filterType.value) : store.items
)

function typeLabel(type: MemberType) {
    return typeOptions.find(o => o.value === type)?.label ?? type
}

interface FormState {
    name: Translation
    description: Translation
    logoId: string | null
    link: string
    type: MemberType
    order: number
    status: boolean
}

const emptyForm = (): FormState => ({
    name: { uz: '', ru: '', en: '' },
    description: { uz: '', ru: '', en: '' },
    logoId: null,
    link: '',
    type: 'FULL',
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

function openEdit(row: MemberCompany) {
    editing.value = row
    Object.assign(form, {
        name: { ...row.name },
        description: row.description ? { ...row.description } : { uz: '', ru: '', en: '' },
        logoId: row.logoId,
        link: row.link || '',
        type: row.type,
        order: row.order,
        status: row.status,
    })
    showDialog.value = true
}

async function handleSubmit() {
    saving.value = true
    try {
        const payload: MemberCompanyPayload = {
            name: form.name,
            description: form.description,
            logoId: form.logoId || undefined,
            link: form.link || undefined,
            type: form.type,
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

async function handleDelete(row: MemberCompany) {
    try {
        await ElMessageBox.confirm(`Delete "${resolveTranslation(row.name)}"?`, 'Warning', {
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

.members-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 18px;
    min-height: 120px;
}

.member-card {
    border: 1px solid #eef0f4;
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 10px rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.2s, transform 0.2s;
}
.member-card:hover { box-shadow: 0 6px 18px rgba(0,0,0,0.08); transform: translateY(-2px); }

.member-card__logo {
    position: relative;
    width: 100%;
    aspect-ratio: 3/2;
    background: #f7f8fa;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
}
.member-card__logo img { max-width: 100%; max-height: 100%; object-fit: contain; }
.member-card__logo-placeholder { font-size: 12px; color: #c5cad6; }
.member-card__status { position: absolute; top: 8px; right: 8px; }

.member-card__body { padding: 12px 14px 14px; display: flex; flex-direction: column; flex: 1; }
.member-card__type { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: #4361ee; margin-bottom: 4px; }
.member-card__name {
    font-size: 14px; font-weight: 600; color: #101828; margin: 0 0 4px; line-height: 1.4;
    display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.member-card__link { font-size: 11px; color: #8a94a6; margin: 0 0 8px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.member-card__actions { margin-top: auto; padding-top: 10px; display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #f4f5f7; }
.pagination-wrap { display: flex; justify-content: flex-end; margin-top: 20px; }
</style>
