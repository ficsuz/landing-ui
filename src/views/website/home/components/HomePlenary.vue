<template>
    <section class="bg-white pt-16 md:pt-24 pb-0 overflow-hidden">
        <!-- Text block -->
        <div class="px-4 md:px-6 max-w-[860px] mx-auto text-center mb-10 md:mb-14">
            <h2 class="section-title mb-5">
                {{ $t('plenary.title') }}
            </h2>
            <p class="text-[clamp(15px,1.4vw,18px)] text-[#666] leading-relaxed mb-8">
                {{ $t('plenary.subtitle') }}
            </p>
            <AppLearnMore to="/events/plenary-sessions" />
        </div>

        <!-- Carousel -->
        <div class="relative w-full" @mouseenter="pause" @mouseleave="resume">
            <div
                class="flex gap-4 transition-transform duration-700 ease-in-out will-change-transform"
                :style="{ transform: `translateX(${offset}px)` }"
            >
                <div
                    v-for="(img, i) in track"
                    :key="i"
                    class="shrink-0 rounded-2xl overflow-hidden isolate"
                    :style="{ width: cardWidth + 'px', height: cardHeight + 'px' }"
                >
                    <img
                        :src="img"
                        :alt="`Plenary session ${i}`"
                        class="w-full h-full object-cover rounded-2xl transition-transform duration-700"
                        :class="realIndex(i) === current ? 'scale-100' : 'scale-[0.97] opacity-70'"
                    />
                </div>
            </div>

            <!-- Dots -->
            <div class="flex justify-center gap-2 mt-6 pb-16">
                <button
                    v-for="(_, i) in slides"
                    :key="i"
                    class="h-[3px] rounded-full transition-all duration-300"
                    :class="i === current ? 'bg-[#1a1e2e] w-7' : 'bg-[#d0d5dd] w-3'"
                    @click="goTo(i)"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

import img1 from '@/assets/images/hero/ATM_9764.jpg'
import img2 from '@/assets/images/avatars/main-info.png'
import img3 from '@/assets/images/hero/SUT_7962.jpg'
import img4 from '@/assets/images/avatars/investors.png'
import img5 from '@/assets/images/hero/SUT_8193.jpg'
import img6 from '@/assets/images/hero/about-blog.jpg'
import img7 from '@/assets/images/banner/banner-img.png'
import img8 from '@/assets/images/banner/opa.png'

const slides = [img1, img2, img3, img4, img5, img6, img7, img8]

const CARD_RATIO = 0.65
const GAP = 16
const cardWidth = ref(0)
const cardHeight = ref(0)
const containerWidth = ref(0)

const current = ref(0)
let timer: ReturnType<typeof setInterval> | null = null
let paused = false
let transitioning = false

// Clone first and last for seamless loop
const track = computed(() => [slides[slides.length - 1], ...slides, slides[0]])
const trackOffset = computed(() => 1) // real slides start at index 1 in track

const offset = computed(() => {
    const center = (containerWidth.value - cardWidth.value) / 2
    const activeTrackIndex = current.value + trackOffset.value
    return center - activeTrackIndex * (cardWidth.value + GAP)
})

const realIndex = (trackIdx: number) => {
    const ri = trackIdx - trackOffset.value
    if (ri < 0) return slides.length - 1
    if (ri >= slides.length) return 0
    return ri
}

const measure = () => {
    containerWidth.value = window.innerWidth
    cardWidth.value = Math.round(containerWidth.value * CARD_RATIO)
    cardHeight.value = Math.round(cardWidth.value * 0.6)
}

const goTo = (index: number) => {
    if (transitioning) return
    current.value = ((index % slides.length) + slides.length) % slides.length
}

const next = () => {
    if (transitioning) return
    transitioning = true

    if (current.value === slides.length - 1) {
        // jump to clone at end, then silently reset
        current.value = slides.length
        setTimeout(() => {
            transitioning = false
            // disable transition momentarily
            const el = document.querySelector('.will-change-transform') as HTMLElement | null
            if (el) el.style.transitionDuration = '0ms'
            current.value = 0
            requestAnimationFrame(() => requestAnimationFrame(() => {
                if (el) el.style.transitionDuration = ''
            }))
        }, 700)
    } else {
        current.value++
        setTimeout(() => { transitioning = false }, 700)
    }
}

const pause = () => { paused = true }
const resume = () => { paused = false }

const tick = () => { if (!paused) next() }

onMounted(() => {
    measure()
    window.addEventListener('resize', measure)
    timer = setInterval(tick, 4000)
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
    window.removeEventListener('resize', measure)
})
</script>
