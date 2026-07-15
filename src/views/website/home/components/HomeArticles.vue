<template>
    <section ref="sectionEl" class="bg-[#f7f8fa] py-16 md:py-24">
        <!-- Header -->
        <div class="page-container text-center mb-10 md:mb-14">
            <h2 class="section-title mb-5 transition-all duration-700" :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'">
                {{ $t('articles.title') }}
            </h2>
        </div>

        <!-- Cards grid -->
        <div class="page-container">
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                <router-link
                    v-for="(article, i) in articles"
                    :key="article.id"
                    :to="{ name: 'media-analytics-detail', params: { id: article.id } }"
                    class="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#eef0f4] shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.11)] hover:-translate-y-1 transition-all duration-300"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                    :style="{ transitionDelay: visible ? `${i * 80}ms` : '0ms' }"
                >
                    <!-- Image -->
                    <div class="relative overflow-hidden md:aspect-[16/10] bg-white rounded-2xl">
                        <img
                            :src="getMediaUrl(article.imageId)"
                            :alt="resolveTranslation(article.title, locale)"
                            class="w-full h-auto md:h-full transition-transform duration-500 group-hover:scale-105"
                        />
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AppLearnMore from '@/components/website/AppLearnMore.vue'
import { useBlogStore } from '@/features/blog/store'
import { resolveTranslation } from '@/utils/i18n'
import { getMediaUrl } from '@/utils/media'

const { locale } = useI18n()
const blogStore = useBlogStore()

const articles = computed(() => blogStore.items.filter((b) => b.status === 1).slice(0, 6))

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
    blogStore.fetchAll({ limit: 6, sortBy: 'date', order: 'desc' })
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
