<template>
    <div class="page-wrapper">
        <div class="page-header">
            <h1 class="page-title">Working Group Sessions</h1>
            <el-button type="primary" @click="showDialog = true">+ Add</el-button>
        </div>

        <el-table :data="items" v-loading="loading" class="w-full">
            <el-table-column type="index" label="№" width="60" />
            <el-table-column prop="title" label="Name" min-width="220" show-overflow-tooltip />
            <el-table-column prop="date" label="Date" min-width="140" />
            <el-table-column label="Actions" width="120" fixed="right" align="center">
                <template #default>
                    <div class="admin-actions">
                        <el-tooltip content="Edit" placement="top">
                            <el-button type="primary" :icon="Edit" circle plain size="small" @click="showDialog = true" />
                        </el-tooltip>
                        <el-tooltip content="Delete" placement="top">
                            <el-button type="danger" :icon="Delete" circle plain size="small" />
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-wrap" v-if="total > pageSize">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :current-page="page"
            />
        </div>

        <el-empty v-if="!loading && items.length === 0" description="No sessions available" class="py-16" />

        <el-dialog v-model="showDialog" title="Add session" width="560px">
            <el-form label-position="top">
                <el-form-item label="Name (UZ)"><el-input placeholder="Enter..." /></el-form-item>
                <el-form-item label="Name (RU)"><el-input placeholder="Enter..." /></el-form-item>
                <el-form-item label="Name (EN)"><el-input placeholder="Enter..." /></el-form-item>
                <el-form-item label="Date"><el-date-picker type="date" class="w-full" /></el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="showDialog = false">Cancel</el-button>
                <el-button type="primary">Save</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

const loading = ref(false)
const showDialog = ref(false)
const items = ref<any[]>([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
</script>

<style scoped>
.page-wrapper { padding: 24px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-title { font-size: 22px; font-weight: 600; color: #101828; margin: 0; }
.pagination-wrap { display: flex; justify-content: flex-end; margin-top: 20px; }
</style>
