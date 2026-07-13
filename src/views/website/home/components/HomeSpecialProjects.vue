<template>
    <section ref="sectionEl" class="bg-[#f7f8fa] py-12 md:py-16 lg:py-24 overflow-hidden">
        <div class="page-container">
            <div class="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-20 xl:gap-24 items-start">
                <!-- Left: Text -->
                <div
                    class="w-full lg:w-[30%] shrink-0 lg:pt-4 transition-all duration-700"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
                >
                    <h2 class="section-title mb-4 md:mb-6">{{ $t('specialProjects.title') }}</h2>
                    <p class="text-[clamp(13px,1.2vw,16px)] text-[#8a94a6] leading-relaxed">
                        {{ $t('specialProjects.subtitle') }}
                    </p>
                </div>

                <!-- Right: Slider (1 large video per slide) -->
                <div
                    class="w-full lg:flex-1 min-w-0 transition-all duration-700 delay-150"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                    @mouseenter="stopAuto"
                    @mouseleave="startAuto"
                    @touchstart.passive="onTouchStart"
                    @touchend.passive="onTouchEnd"
                >
                    <div class="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] bg-black">
                        <div class="aspect-video relative">
                            <Transition name="sp-fade" mode="out-in">
                                <iframe
                                    :key="videos[currentIndex].id"
                                    :src="videos[currentIndex].embedUrl"
                                    class="absolute inset-0 w-full h-full"
                                    allow="autoplay; fullscreen"
                                    allowfullscreen
                                    frameborder="0"
                                />
                            </Transition>
                        </div>
                    </div>

                    <!-- Dots -->
                    <div v-if="videos.length > 1" class="flex items-center justify-center gap-1.5 mt-5 md:mt-6">
                        <button
                            v-for="(_, i) in videos"
                            :key="i"
                            class="rounded-full transition-all duration-300"
                            :class="i === currentIndex ? 'bg-[#1a1e2e] w-5 h-2' : 'bg-[#d0d5df] w-2 h-2 hover:bg-[#8a94a6]'"
                            @click="goTo(i)"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getEmbedUrl } from '@/utils/media'

const videos = computed(() =>
    [
        'https://youtu.be/2LqpFWdgtiA?si=4VK0fHmK1GOO3oSo',
        'https://youtu.be/2LqpFWdgtiA?si=4VK0fHmK1GOO3oSo',
    ].map((videoSource, i) => ({
        id: i,
        embedUrl: getEmbedUrl(videoSource),
    }))
)

const currentIndex = ref(0)
const goTo = (i: number) => {
    currentIndex.value = Math.max(0, Math.min(i, videos.value.length - 1))
}

// Auto-advance
let timer: ReturnType<typeof setInterval> | null = null

const startAuto = () => {
    if (timer || videos.value.length < 2) return
    timer = setInterval(() => {
        currentIndex.value = currentIndex.value < videos.value.length - 1 ? currentIndex.value + 1 : 0
    }, 6000)
}

const stopAuto = () => {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
}

// Touch swipe
let touchStartX = 0
const onTouchStart = (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX
}
const onTouchEnd = (e: TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX
    if (Math.abs(dx) < 40) return
    dx < 0 ? goTo(currentIndex.value + 1) : goTo(currentIndex.value - 1)
}

// Intersection observer
const sectionEl = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | null = null

const getScrollParent = (el: HTMLElement): Element => {
    let parent = el.parentElement
    while (parent && parent !== document.documentElement) {
        const { overflowY } = window.getComputedStyle(parent)
        if (overflowY === 'auto' || overflowY === 'scroll') return parent
        parent = parent.parentElement
    }
    return document.documentElement
}

onMounted(() => {
    if (!sectionEl.value) return
    const root = getScrollParent(sectionEl.value)
    observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                visible.value = true
                startAuto()
                observer?.disconnect()
            }
        },
        { root, threshold: 0.1 }
    )
    observer.observe(sectionEl.value)
})

onUnmounted(() => {
    observer?.disconnect()
    stopAuto()
})
</script>

<style scoped>
.sp-fade-enter-active,
.sp-fade-leave-active {
    transition: opacity 0.3s ease;
}
.sp-fade-enter-from,
.sp-fade-leave-to {
    opacity: 0;
}
</style>
