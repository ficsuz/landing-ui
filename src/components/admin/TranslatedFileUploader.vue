<template>
    <el-tabs v-model="activeTab" class="translation-field">
        <el-tab-pane v-for="locale in locales" :key="locale.key" :label="locale.label" :name="locale.key">
            <FileUploader
                :model-value="modelValue[locale.key]"
                accept="application/pdf"
                @update:model-value="(val: string | null) => emit('update:modelValue', { ...modelValue, [locale.key]: val })"
            />
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileUploader from './FileUploader.vue'
import type { Translation } from '@/types/server/api.types'

type TranslatedFile = Record<keyof Translation, string | null>

defineProps<{ modelValue: TranslatedFile }>()
const emit = defineEmits<{ 'update:modelValue': [value: TranslatedFile] }>()

const locales: { key: keyof Translation; label: string }[] = [
    { key: 'uz', label: 'Uzbek' },
    { key: 'ru', label: 'Russian' },
    { key: 'en', label: 'English' },
]
const activeTab = ref<keyof Translation>('uz')
</script>

<style scoped>
.translation-field :deep(.el-tabs__header) {
    margin-bottom: 8px;
}
</style>
