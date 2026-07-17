<template>
    <div class="multi-uploader">
        <div class="multi-uploader__grid">
            <div v-for="(id, i) in modelValue" :key="id" class="multi-uploader__item">
                <img :src="getMediaUrl(id)" class="multi-uploader__img" alt="" />
                <button type="button" class="multi-uploader__remove" @click="removeAt(i)">
                    <el-icon><Close /></el-icon>
                </button>
                <span class="multi-uploader__index">{{ i + 1 }}</span>
            </div>

            <el-upload
                v-if="modelValue.length < max"
                class="multi-uploader__add"
                :auto-upload="false"
                :show-file-list="false"
                accept="image/*"
                :on-change="onChange"
            >
                <div class="multi-uploader__add-inner">
                    <el-icon v-if="!uploading"><Plus /></el-icon>
                    <el-icon v-else class="is-loading"><Loading /></el-icon>
                    <span class="multi-uploader__add-text">{{ uploading ? 'Uploading…' : 'Add image' }}</span>
                </div>
            </el-upload>
        </div>
        <p class="multi-uploader__hint">
            <template v-if="Number.isFinite(max)">{{ modelValue.length }} / {{ max }} images</template>
            <template v-else>{{ modelValue.length }} images</template>
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Close, Loading } from '@element-plus/icons-vue'
import { ElMessage, type UploadFile } from 'element-plus'
import { useFileStore } from '@/stores'
import { getMediaUrl } from '@/utils/media'

const props = withDefaults(defineProps<{ modelValue: string[]; max?: number }>(), {
    max: 4,
})
const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>()

const fileStore = useFileStore()
const uploading = ref(false)

const onChange = async (file: UploadFile) => {
    const raw = file.raw as File
    if (!raw) return
    if (props.modelValue.length >= props.max) return

    uploading.value = true
    try {
        const response = await fileStore.uploadFile(raw)
        if (response.success && response.data) {
            emit('update:modelValue', [...props.modelValue, response.data.id])
        }
    } catch {
        ElMessage.error('Failed to upload image')
    } finally {
        uploading.value = false
    }
}

function removeAt(i: number) {
    const next = [...props.modelValue]
    next.splice(i, 1)
    emit('update:modelValue', next)
}
</script>

<style scoped>
.multi-uploader__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}
.multi-uploader__item {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #eef0f4;
    background: #f7f8fa;
}
.multi-uploader__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
.multi-uploader__remove {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: rgba(26, 30, 46, 0.75);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    transition: background 0.2s;
}
.multi-uploader__remove:hover { background: #d92d20; }
.multi-uploader__index {
    position: absolute;
    bottom: 5px;
    left: 5px;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
    background: rgba(26, 30, 46, 0.7);
    padding: 1px 7px;
    border-radius: 999px;
}
.multi-uploader__add :deep(.el-upload) {
    width: 120px;
    height: 120px;
}
.multi-uploader__add-inner {
    width: 120px;
    height: 120px;
    border: 1px dashed #c8cdd6;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: #8a94a6;
    transition: border-color 0.2s, color 0.2s;
}
.multi-uploader__add-inner:hover { border-color: #1a1e2e; color: #1a1e2e; }
.multi-uploader__add-text { font-size: 12px; }
.multi-uploader__hint { margin-top: 8px; font-size: 12px; color: #8a94a6; }
</style>
