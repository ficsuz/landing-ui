<template>
    <div class="relative overflow-hidden w-full h-full bg-[#eef0f4]">
        <template v-if="urls.length">
            <transition name="card-slide-fade" mode="out-in">
                <img :key="urls[index]" :src="urls[index]" :alt="alt" class="absolute inset-0 w-full h-full object-cover" />
            </transition>

            <!-- Dots -->
            <div v-if="urls.length > 1" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-[2]">
                <span
                    v-for="(_, i) in urls"
                    :key="i"
                    class="rounded-full transition-all duration-300"
                    :class="i === index ? 'bg-white w-4 h-1.5' : 'bg-white/60 w-1.5 h-1.5'"
                />
            </div>
        </template>

        <!-- Empty placeholder -->
        <div v-else class="w-full h-full flex items-center justify-center">
            <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c8cdd6"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { getMediaUrl } from '@/utils/media'

const props = withDefaults(defineProps<{ imageIds?: string[]; alt?: string; interval?: number }>(), {
    imageIds: () => [],
    alt: '',
    interval: 5000,
})

const urls = computed(() => (props.imageIds || []).map((id) => getMediaUrl(id)).filter(Boolean))
const index = ref(0)

let timer: ReturnType<typeof setInterval> | null = null

function start() {
    if (timer || urls.value.length < 2) return
    timer = setInterval(() => {
        index.value = (index.value + 1) % urls.value.length
    }, props.interval)
}

function stop() {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
}

onMounted(start)
onUnmounted(stop)
</script>

<style scoped>
.card-slide-fade-enter-active,
.card-slide-fade-leave-active {
    transition: opacity 0.6s ease;
}
.card-slide-fade-enter-from,
.card-slide-fade-leave-to {
    opacity: 0;
}
</style>
