<template>
    <el-tabs :model-value="activeTab" class="section-tabs" @tab-change="onTabChange">
        <el-tab-pane label="Meetings" name="admin-meetings" />
        <el-tab-pane label="Working Group Sessions" name="admin-working-group-sessions" />
    </el-tabs>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { TabPaneName } from 'element-plus'

const route = useRoute()
const router = useRouter()

const activeTab = computed(() => String(route.name ?? ''))

function onTabChange(name: TabPaneName) {
    if (name !== route.name) router.push({ name: String(name) })
}
</script>

<style scoped>
.section-tabs { margin-bottom: 8px; }
.section-tabs :deep(.el-tabs__item) { font-size: 15px; font-weight: 600; }
</style>
