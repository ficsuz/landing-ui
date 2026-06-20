<template>
    <div class="page-wrapper">
        <div class="page-header">
            <h1 class="page-title">Hisobotlar</h1>
            <el-button type="primary" @click="showDialog = true">+ Qo'shish</el-button>
        </div>

        <el-table :data="items" v-loading="loading" class="w-full">
            <el-table-column type="index" label="№" width="60" />
            <el-table-column prop="title" label="Sarlavha" min-width="220" show-overflow-tooltip />
            <el-table-column prop="date" label="Sana" width="140" />
            <el-table-column prop="file" label="Fayl" width="160">
                <template #default="{ row }">
                    <el-button v-if="row.file" type="primary" link size="small">Yuklab olish</el-button>
                    <span v-else class="text-gray-400 text-sm">Yo'q</span>
                </template>
            </el-table-column>
            <el-table-column label="Amallar" width="140" fixed="right">
                <template #default>
                    <el-button type="primary" link>Tahrirlash</el-button>
                    <el-button type="danger" link>O'chirish</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-empty v-if="!loading && items.length === 0" description="Hisobotlar mavjud emas" class="py-16" />

        <el-dialog v-model="showDialog" title="Hisobot qo'shish" width="560px">
            <el-form label-position="top">
                <el-form-item label="Sarlavha (UZ)"><el-input placeholder="Kiriting..." /></el-form-item>
                <el-form-item label="Sarlavha (RU)"><el-input placeholder="Введите..." /></el-form-item>
                <el-form-item label="Sarlavha (EN)"><el-input placeholder="Enter..." /></el-form-item>
                <el-form-item label="Sana"><el-date-picker type="date" class="w-full" /></el-form-item>
                <el-form-item label="Fayl (PDF)"><el-upload drag accept=".pdf"><div class="el-upload__text">PDF faylni shu yerga tashlang yoki <em>tanlang</em></div></el-upload></el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="showDialog = false">Bekor qilish</el-button>
                <el-button type="primary">Saqlash</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
const showDialog = ref(false)
const items = ref<any[]>([])
</script>

<style scoped>
.page-wrapper { padding: 24px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-title { font-size: 22px; font-weight: 600; color: #101828; margin: 0; }
</style>
