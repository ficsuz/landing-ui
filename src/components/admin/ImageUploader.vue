<template>
    <div class="image-uploader">
        <div v-if="previewUrl" class="preview">
            <img :src="previewUrl" class="preview-img" />
            <el-button type="danger" link @click="clear">Delete</el-button>
        </div>
        <el-upload
            v-else
            :auto-upload="false"
            :show-file-list="false"
            accept="image/*"
            :on-change="onChange"
        >
            <el-button :icon="Plus" type="primary" plain :loading="uploading">Upload image</el-button>
        </el-upload>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, type UploadFile } from 'element-plus'
import { useFileStore } from '@/stores'

const props = defineProps<{ modelValue: string | null }>()
const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>()

const fileStore = useFileStore()
const uploading = ref(false)
const previewUrl = ref<string | null>(null)

function revoke() {
    if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value)
        previewUrl.value = null
    }
}

async function loadPreview(fileId: string) {
    try {
        const blob = await fileStore.downloadById(fileId)
        revoke()
        previewUrl.value = URL.createObjectURL(blob)
    } catch {
        revoke()
    }
}

watch(() => props.modelValue, (id) => {
    if (id) loadPreview(id)
    else revoke()
}, { immediate: true })

const onChange = async (file: UploadFile) => {
    const raw = file.raw as File
    if (!raw) return

    uploading.value = true
    try {
        const response = await fileStore.uploadFile(raw)
        if (response.success && response.data) {
            emit('update:modelValue', response.data.id)
        }
    } catch {
        ElMessage.error('Failed to upload image')
    } finally {
        uploading.value = false
    }
}

function clear() {
    emit('update:modelValue', null)
}

onBeforeUnmount(revoke)
</script>

<style scoped>
.preview-img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    display: block;
    margin-bottom: 8px;
}
</style>
