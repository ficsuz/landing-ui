<template>
    <section ref="sectionEl" class="bg-white py-12 md:py-16 lg:py-24 overflow-hidden">
        <div class="page-container">
            <div class="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-20 xl:gap-24 items-start">
                <!-- Left: Text -->
                <div
                    class="w-full lg:w-[30%] shrink-0 lg:pt-4 transition-all duration-700"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
                >
                    <h2 class="section-title w-min mb-4 md:mb-6">{{ $t('investorsVoices.title') }}</h2>
                    <p class="text-[clamp(13px,1.2vw,16px)] text-[#8a94a6] leading-relaxed">
                        {{ $t('investorsVoices.subtitle') }}
                    </p>
                </div>

                <!-- Right: Slider -->
                <div
                    class="w-full lg:flex-1 min-w-0 transition-all duration-700 delay-150"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                    @mouseenter="stopAuto"
                    @mouseleave="startAuto"
                    @touchstart.passive="onTouchStart"
                    @touchend.passive="onTouchEnd"
                >
                    <!-- Track wrapper -->
                    <div ref="sliderEl" class="overflow-hidden">
                        <div
                            class="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                            :style="{ transform: `translateX(-${offset}px)`, gap: gap + 'px' }"
                        >
                            <div
                                v-for="item in voices"
                                :key="item.id"
                                class="shrink-0 cursor-pointer group"
                                :style="{ width: cardWidth + 'px' }"
                                @click="openVideo(item)"
                            >
                                <div
                                    class="relative rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div class="relative aspect-[3/4] bg-[#eef0f4]">
                                        <img
                                            v-if="getMediaUrl(item.captionId)"
                                            :src="getMediaUrl(item.captionId)"
                                            :alt="item.fullName || ''"
                                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <!-- Gradient overlay -->
                                        <div
                                            class="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40 pointer-events-none"
                                        />

                                        <!-- Play button -->
                                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                            <div
                                                class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all duration-200"
                                            >
                                                <svg class="w-4 h-4 md:w-5 md:h-5 text-[#1a1e2e] ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>

                                        <!-- BLITZ badge -->
                                        <!-- <div class="absolute top-3 right-3">
                                            <span
                                                class="text-[8px] md:text-[9px] font-bold tracking-widest uppercase bg-[#1a1e2e]/70 backdrop-blur-sm text-white px-2 py-0.5 rounded-sm"
                                            >
                                                BLITZ
                                            </span>
                                        </div> -->

                                        <!-- Info box -->
                                        <!-- <div class="absolute bottom-2.5 left-2.5 right-2.5 md:bottom-3 md:left-3 md:right-3 bg-white rounded-xl p-2.5 md:p-3 shadow-xl">
                                            <img
                                                v-if="getMediaUrl(item.logoId)"
                                                :src="getMediaUrl(item.logoId)"
                                                alt=""
                                                class="h-[14px] md:h-[18px] object-contain shrink-0 mb-1.5 md:mb-2"
                                            />
                                            <p class="font-bold text-[11px] md:text-[13px] text-[#1a1e2e] leading-snug line-clamp-1">{{ item.fullName || '—' }}</p>
                                            <p class="text-[10px] md:text-[11px] text-[#8a94a6] leading-snug mt-0.5 line-clamp-2">{{ item.position || '' }}</p>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Dots -->
                    <div class="flex items-center justify-center gap-1.5 mt-5 md:mt-6 flex-wrap">
                        <button
                            v-for="(_, i) in voices"
                            :key="i"
                            class="rounded-full transition-all duration-300"
                            :class="i === currentIndex ? 'bg-[#1a1e2e] w-5 h-2' : 'bg-[#d0d5df] w-2 h-2 hover:bg-[#8a94a6]'"
                            @click="goTo(i)"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- Video modal -->
        <Teleport to="body">
            <Transition name="iv-fade">
                <div
                    v-if="activeVideo"
                    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 md:p-6"
                    @click.self="activeVideo = null"
                >
                    <div class="relative w-full max-w-4xl rounded-xl md:rounded-2xl overflow-hidden bg-black shadow-2xl">
                        <button
                            class="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
                            @click="activeVideo = null"
                        >
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                        <div class="aspect-video">
                            <iframe
                                v-if="getEmbedUrl(activeVideo.videoSource)"
                                :src="getEmbedUrl(activeVideo.videoSource)"
                                class="w-full h-full"
                                allow="autoplay; fullscreen"
                                allowfullscreen
                                frameborder="0"
                            />
                            <div v-else class="w-full h-full flex items-center justify-center text-white/50 text-sm">
                                {{ $t('common.noData') }}
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useElementSize, useWindowSize } from '@vueuse/core'
import { useTestimonialsStore } from '@/features/testimonials/store'
import type { Testimonial } from '@/features/testimonials/types'
import { getMediaUrl, getEmbedUrl } from '@/utils/media'

const testimonialsStore = useTestimonialsStore()
const voices = computed(() => testimonialsStore.items.filter((i) => i.status))

const sliderEl = ref<HTMLElement | null>(null)
const { width: sliderWidth } = useElementSize(sliderEl)
const { width: windowWidth } = useWindowSize()

// Breakpoints:
//  < 640px   → mobile: 1.15 cards (peek effect)
//  640-1023px → tablet portrait / iPad portrait: 2 cards, stacked layout
//  1024-1279px → iPad landscape (lg: side-by-side kicks in): 2 cards in slider
//  ≥ 1280px   → desktop: 3 cards in slider
const visibleCount = computed(() => {
    if (windowWidth.value < 640) return 1.15
    if (windowWidth.value < 1280) return 2
    return 3
})

const gap = computed(() => (windowWidth.value < 640 ? 12 : 16))

// Formula handles fractional visibleCount for peek effect
const cardWidth = computed(() => {
    if (!sliderWidth.value) return 280
    const g = gap.value
    const n = visibleCount.value
    return (sliderWidth.value + g) / n - g
})

const currentIndex = ref(0)
// Math.floor so every card has its own addressable dot
const maxIndex = computed(() => Math.max(0, voices.value.length - Math.floor(visibleCount.value)))
const offset = computed(() => currentIndex.value * (cardWidth.value + gap.value))

const goTo = (i: number) => {
    currentIndex.value = Math.max(0, Math.min(i, maxIndex.value))
}

// Clamp currentIndex when screen resize reduces maxIndex
watch(maxIndex, (max) => {
    if (currentIndex.value > max) currentIndex.value = max
})

// Auto-advance
let timer: ReturnType<typeof setInterval> | null = null

const startAuto = () => {
    if (timer) return
    timer = setInterval(() => {
        currentIndex.value < maxIndex.value ? currentIndex.value++ : (currentIndex.value = 0)
    }, 4000)
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

// Video modal
const activeVideo = ref<Testimonial | null>(null)
const openVideo = (item: Testimonial) => {
    activeVideo.value = item
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
    testimonialsStore.fetchAll({ page: 1, limit: 50, sortBy: 'order', order: 'asc' })

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
.iv-fade-enter-active,
.iv-fade-leave-active {
    transition: opacity 0.25s ease;
}
.iv-fade-enter-from,
.iv-fade-leave-to {
    opacity: 0;
}
</style>
