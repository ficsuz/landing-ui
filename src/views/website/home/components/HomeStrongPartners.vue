<template>
    <section ref="sectionEl" class="bg-white pt-16 md:pt-24 pb-0 overflow-hidden">
        <!-- Header -->
        <div class="px-4 md:px-6 max-w-[860px] mx-auto text-center mb-10 md:mb-14">
            <h2
                class="section-title mb-5 transition-all duration-700"
                :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
                {{ $t('strongPartners.title') }}
            </h2>
            <p
                class="text-[clamp(15px,1.4vw,18px)] text-[#666] leading-relaxed mb-8 transition-all duration-700 delay-100"
                :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            >
                {{ $t('strongPartners.subtitle') }}
            </p>
            <AppLearnMore
                to="/working-groups"
                :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
                class="transition-all duration-700 delay-200"
            />
        </div>

        <!-- Marquee photo strip -->
        <div
            class="w-full overflow-hidden transition-opacity duration-700 delay-300"
            :class="visible ? 'opacity-100' : 'opacity-0'"
            @mouseenter="pauseMarquee"
            @mouseleave="resumeMarquee"
        >
            <div class="marquee-track flex gap-4 pb-16 will-change-transform" ref="trackEl">
                <div
                    v-for="(img, i) in track"
                    :key="i"
                    class="shrink-0 rounded-2xl overflow-hidden"
                    :style="{ width: cardW + 'px', height: cardH + 'px' }"
                >
                    <img
                        :src="img"
                        :alt="`Partner photo ${i}`"
                        class="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useMarquee } from '@/composables'

import img1 from '@/assets/images/planery-session/info3_4.png'
import img2 from '@/assets/images/planery-session/info3_2.png'
import img3 from '@/assets/images/planery-session/ps_2.png'
import img4 from '@/assets/images/planery-session/info2_4.png'

const slides = [img1, img2, img3, img4]
const track = [...slides, ...slides]

const trackEl = ref<HTMLElement | null>(null)
const { pauseMarquee, resumeMarquee } = useMarquee(trackEl)

const sectionEl = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | null = null

const cardW = ref(380)
const cardH = ref(260)

const measure = () => {
    const w = window.innerWidth
    if (w < 640) {
        cardW.value = 260
        cardH.value = 180
    } else if (w < 1024) {
        cardW.value = 320
        cardH.value = 220
    } else {
        cardW.value = 380
        cardH.value = 260
    }
}

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
    measure()
    window.addEventListener('resize', measure)

    if (sectionEl.value) {
        const root = getScrollParent(sectionEl.value)
        observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    visible.value = true
                    observer?.disconnect()
                }
            },
            { root, threshold: 0.1 },
        )
        observer.observe(sectionEl.value)
    }
})

onUnmounted(() => {
    window.removeEventListener('resize', measure)
    observer?.disconnect()
})
</script>

<style scoped>
.marquee-track {
    animation: marquee 30s linear infinite;
}

@keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
}
</style>
