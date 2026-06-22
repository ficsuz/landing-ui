<template>
    <el-tabs v-model="activeTab" class="translation-field">
        <el-tab-pane v-for="locale in locales" :key="locale.key" :label="locale.label" :name="locale.key">
            <el-input
                class="w-full"
                :model-value="modelValue[locale.key]"
                :type="type"
                :rows="type === 'textarea' ? rows : undefined"
                :placeholder="placeholder"
                @update:model-value="(val: string) => emit('update:modelValue', { ...modelValue, [locale.key]: val })"
            />
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Translation } from '@/types/server/api.types'

withDefaults(defineProps<{
    modelValue: Translation
    type?: 'text' | 'textarea'
    rows?: number
    placeholder?: string
}>(), {
    type: 'text',
    rows: 4,
})

const emit = defineEmits<{ 'update:modelValue': [value: Translation] }>()

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
