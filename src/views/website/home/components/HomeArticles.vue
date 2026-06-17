<template>
    <section ref="sectionEl" class="bg-white py-16 md:py-24">
        <!-- Header -->
        <div class="page-container text-center mb-10 md:mb-14">
            <h2
                class="section-title mb-5 transition-all duration-700"
                :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
                {{ $t('articles.title') }}
            </h2>
        </div>

        <!-- 3x2 grid -->
        <div class="page-container">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                <router-link
                    v-for="(article, i) in articles"
                    :key="article.id"
                    :to="article.link || '/media/analytics'"
                    class="group relative rounded-2xl overflow-hidden aspect-[4/3] block transition-all duration-700"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                    :style="{ transitionDelay: visible ? `${i * 80}ms` : '0ms' }"
                >
                    <!-- Background image -->
                    <img
                        :src="article.image"
                        :alt="article.title"
                        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <!-- Dark overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/25" />

                    <!-- Top bar: BLOG|FIC badge + logo -->
                    <div class="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <div class="flex items-center text-[11px] font-bold tracking-widest">
                            <span class="bg-[#2563eb] text-white px-2 py-[3px]">BLOG</span>
                            <span class="bg-white/15 backdrop-blur-sm text-white px-2 py-[3px] border border-white/25">FIC</span>
                        </div>
                        <img src="@/assets/images/logo.svg" alt="FIC" class="h-7 w-7 object-contain" />
                    </div>

                    <!-- Title & subtitle -->
                    <div class="absolute bottom-0 left-0 right-0 p-4">
                        <h3 class="text-white font-black text-[clamp(12px,1vw,14px)] leading-snug uppercase">
                            {{ article.title }}
                        </h3>
                        <p v-if="article.subtitle" class="text-white/65 text-[11px] mt-1 leading-snug line-clamp-2 uppercase">
                            {{ article.subtitle }}
                        </p>
                    </div>
                </router-link>
            </div>
        </div>

        <!-- Learn more -->
        <div
            class="flex justify-center transition-all duration-700 delay-500"
            :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
            <AppLearnMore to="/media/analytics" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppLearnMore from '@/components/website/AppLearnMore.vue'

import img1 from '@/assets/images/hero/ATM_9764.jpg'
import img2 from '@/assets/images/hero/SUT_8193.jpg'
import img3 from '@/assets/images/hero/SUT_7962.jpg'
import img4 from '@/assets/images/hero/about-blog.jpg'
import img5 from '@/assets/images/banner/banner-img.png'
import img6 from '@/assets/images/banner/opa.png'

interface Article {
    id: number
    title: string
    subtitle?: string
    image: string
    link?: string
}

// Hozircha static; API tayyor bo'lganda onMounted ichida:
// const res = await api.get('/articles?limit=6')
// articles.value = res.data
const articles = ref<Article[]>([
    {
        id: 1,
        title: 'Annual Report 2025',
        subtitle: 'Comprehensive Assessment of Investment Impacts in Uzbekistan',
        image: img1,
    },
    {
        id: 2,
        title: 'Unlocking Growth From Within:',
        subtitle: "A National Compass for Developing Leaders: FIC's Competency Agenda for the Next Generation of Leaders",
        image: img2,
    },
    {
        id: 3,
        title: 'Attracting Creative Investments:',
        subtitle: 'The Next Frontier for Uzbekistan',
        image: img3,
    },
    {
        id: 4,
        title: 'A Focus on Regulatory Autonomy for Uzbekistan Policymakers',
        image: img4,
    },
    {
        id: 5,
        title: 'New Capital, New Growth:',
        subtitle: "Alternative Investments and Uzbekistan's New Opportunity",
        image: img5,
    },
    {
        id: 6,
        title: 'Three Pillars for Investment Growth:',
        subtitle: "Foreign Investors Council's Strategy for a Dynamic Uzbekistan",
        image: img6,
    },
])

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
    if (sectionEl.value) {
        const root = getScrollParent(sectionEl.value)
        observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    visible.value = true
                    observer?.disconnect()
                }
            },
            { root, threshold: 0.1 }
        )
        observer.observe(sectionEl.value)
    }
})

onUnmounted(() => {
    observer?.disconnect()
})
</script>
