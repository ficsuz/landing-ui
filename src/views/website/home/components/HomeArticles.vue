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
                    :to="{ name: 'media-analytics-detail', params: { id: article.id } }"
                    class="group relative rounded-2xl overflow-hidden aspect-[4/3] block bg-[#eef0f4] transition-all duration-700"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                    :style="{ transitionDelay: visible ? `${i * 80}ms` : '0ms' }"
                >
                    <!-- Image only -->
                    <img
                        :src="article.image"
                        :alt="article.title"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
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
import { articles as allArticles } from '@/views/website/media/analytics/articlesData'

// Home shows only the cover image; full content lives on media/analytics.
// Hozircha static; API tayyor bo'lganda store orqali keladi.
const articles = ref(allArticles.slice(0, 6))

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
