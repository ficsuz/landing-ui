<template>
    <section ref="sectionEl" class="bg-[#1a1e2e] py-16 md:py-24">
        <div class="page-container">
            <!-- Header -->
            <div
                class="flex items-center justify-between mb-10 md:mb-14 transition-all duration-700"
                :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
                <h2 class="section-title text-white">{{ $t('news.title') }}</h2>
                <router-link
                    to="/media"
                    class="inline-flex items-center gap-2 border border-white/30 text-white text-[14px] font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:bg-white hover:text-[#1a1e2e]"
                >
                    {{ $t('news.allNews') }}
                </router-link>
            </div>

            <!-- Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <article
                    v-for="(item, i) in news"
                    :key="item.id"
                    class="group bg-white rounded-2xl flex flex-col cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-3"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
                    :style="{ transitionDelay: visible ? `${i * 100}ms` : '0ms' }"
                    @click="$router.push(item.link || '/media')"
                >
                    <!-- Image -->
                    <div class="relative overflow-hidden rounded-xl aspect-[16/10] [transform:translateZ(0)]">
                        <img
                            :src="item.image"
                            :alt="item.title"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <!-- Category badge -->
                        <div class="absolute top-3 left-3">
                            <span class="bg-[#1a1e2e]/80 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1 rounded-full tracking-wide uppercase">
                                {{ item.category }}
                            </span>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="flex flex-col flex-1 px-2 pt-4 pb-2">
                        <h3 class="font-bold text-[15px] text-[#1a1e2e] leading-snug mb-2 line-clamp-2 group-hover:text-[#2563eb] transition-colors duration-200">
                            {{ item.title }}
                        </h3>
                        <p class="text-[13px] text-[#8a94a6] leading-relaxed line-clamp-2 mb-4 flex-1">
                            {{ item.excerpt }}
                        </p>

                        <!-- Footer -->
                        <div class="flex items-center justify-between pt-4 border-t border-[#eef0f4]">
                            <span class="text-[12px] text-[#b0b8c6] font-medium">{{ item.date }}</span>
                            <span class="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1a1e2e] group-hover:text-[#2563eb] transition-all duration-200">
                                {{ $t('common.learnMore') }}
                                <svg class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import img1 from '@/assets/images/hero/ATM_9764.jpg'
import img2 from '@/assets/images/hero/SUT_7962.jpg'
import img3 from '@/assets/images/hero/about-blog.jpg'

interface NewsItem {
    id: number
    title: string
    excerpt: string
    date: string
    category: string
    image: string
    link?: string
}

// API tayyor bo'lganda: onMounted ichida news.value = await api.get('/news?limit=3')
const news = ref<NewsItem[]>([
    {
        id: 1,
        category: 'Announcement',
        title: 'New Office Location',
        excerpt: 'We are pleased to announce the relocation of the Foreign Investors Council Secretariat to a new office.',
        date: 'January 5, 2026',
        image: img1,
    },
    {
        id: 2,
        category: 'Legal',
        title: 'FIC Has Officially Obtained Legal Status as an Association',
        excerpt: 'A new chapter begins for the Foreign Investors Council under the President of the Republic of Uzbekistan.',
        date: 'November 6, 2025',
        image: img2,
    },
    {
        id: 3,
        category: 'Event',
        title: 'IV Plenary Session of the Foreign Investors Council',
        excerpt: 'The IV Plenary Session brought together leading investors and government officials to discuss key reforms.',
        date: 'October 15, 2025',
        image: img3,
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
    if (!sectionEl.value) return
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
})

onUnmounted(() => {
    observer?.disconnect()
})
</script>
