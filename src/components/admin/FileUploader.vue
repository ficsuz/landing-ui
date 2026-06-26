<template>
    <div class="file-uploader">
        <div v-if="modelValue" class="preview">
            <img v-if="isImage" :src="previewUrl!" class="preview-img" />
            <div v-else class="file-row">
                <a class="file-link" @click.prevent="openFile">📄 {{ fileName || 'View file' }}</a>
            </div>
            <el-button type="danger" link @click="clear">Delete</el-button>
        </div>
        <el-upload
            v-else
            :auto-upload="false"
            :show-file-list="false"
            :accept="accept"
            :on-change="onChange"
        >
            <el-button :icon="Plus" type="primary" plain :loading="uploading">{{ buttonText }}</el-button>
        </el-upload>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, type UploadFile } from 'element-plus'
import { useFileStore } from '@/stores'

const props = withDefaults(defineProps<{ modelValue: string | null; accept?: string }>(), {
    accept: 'image/*',
})
const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>()

const fileStore = useFileStore()
const uploading = ref(false)
const fileName = ref<string | null>(null)
const previewUrl = ref<string | null>(null)
const isImage = ref(false)

const buttonText = computed(() => (props.accept.startsWith('image') ? 'Upload image' : 'Upload file'))

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
        isImage.value = blob.type.startsWith('image/')
        previewUrl.value = URL.createObjectURL(blob)
    } catch {
        revoke()
    }
}

watch(() => props.modelValue, (id) => {
    if (id) loadPreview(id)
    else revoke()
}, { immediate: true })

function openFile() {
    if (previewUrl.value) window.open(previewUrl.value, '_blank', 'noopener')
}

const onChange = async (file: UploadFile) => {
    const raw = file.raw as File
    if (!raw) return

    uploading.value = true
    try {
        const response = await fileStore.uploadFile(raw)
        if (response.success && response.data) {
            fileName.value = response.data.name
            emit('update:modelValue', response.data.id)
        }
    } catch {
        ElMessage.error('Failed to upload file')
    } finally {
        uploading.value = false
    }
}

function clear() {
    fileName.value = null
    revoke()
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
.file-row {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}
.file-link {
    color: #1a6eb5;
    font-size: 14px;
    cursor: pointer;
}
.file-link:hover {
    text-decoration: underline;
}
</style>
