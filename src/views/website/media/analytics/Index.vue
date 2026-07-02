<template>
    <div class="analytics-page">
        <section class="bg-white py-12 md:py-16">
            <div class="page-container">
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-3xl mb-12">
                    {{ $t('mediaPage.analyticsPage.intro') }}
                </p>

                <!-- Filter tabs -->
                <div class="flex flex-wrap gap-2 mb-10">
                    <button
                        v-for="topic in topics"
                        :key="topic.key"
                        @click="activeTopic = topic.key"
                        :class="[
                            'px-4 py-2 rounded-full text-[13px] font-semibold border transition-all duration-200',
                            activeTopic === topic.key
                                ? 'bg-[#1a1e2e] text-white border-[#1a1e2e]'
                                : 'bg-white text-[#344054] border-[#d0d5dd] hover:border-[#1a1e2e]',
                        ]"
                    >
                        {{ $t(topic.labelKey) }}
                    </button>
                </div>

                <!-- Article grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <router-link
                        v-for="article in filteredArticles"
                        :key="article.id"
                        :to="{ name: 'media-analytics-detail', params: { id: article.id } }"
                        class="group flex flex-col rounded-2xl overflow-hidden border border-[#eef0f4] bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300"
                    >
                        <!-- Image with BLOG|FIC badge -->
                        <div class="relative aspect-[16/10] overflow-hidden bg-[#eef0f4]">
                            <img
                                :src="article.image"
                                :alt="article.title"
                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div class="absolute top-4 left-4 flex items-center text-[11px] font-bold tracking-widest">
                                <span class="bg-[#2563eb] text-white px-2 py-[3px]">BLOG</span>
                                <span class="bg-white/15 backdrop-blur-sm text-white px-2 py-[3px] border border-white/25">FIC</span>
                            </div>
                            <img src="@/assets/images/logo.svg" alt="FIC" class="absolute top-4 right-4 h-7 w-7 object-contain" />
                        </div>

                        <!-- Category + title + date -->
                        <div class="p-5 md:p-6 flex flex-col flex-1">
                            <span class="text-[13px] text-[#8a94a6]">{{ article.category }}</span>
                            <h3 class="mt-2 font-black text-[clamp(18px,1.5vw,24px)] text-[#1a1e2e] leading-snug">
                                {{ article.title }}
                            </h3>
                            <span class="text-[13px] text-[#8a94a6] mt-auto pt-4">{{ article.date }}</span>
                        </div>
                    </router-link>
                </div>

                <el-empty v-if="filteredArticles.length === 0" :description="$t('common.noData')" class="py-10" />
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { articles } from './articlesData'

const activeTopic = ref('all')

const topics = [
    { key: 'all', labelKey: 'mediaPage.categories.all' },
    { key: 'investment', labelKey: 'mediaPage.analyticsPage.topics.investment' },
    { key: 'reform', labelKey: 'mediaPage.analyticsPage.topics.reform' },
    { key: 'macroeconomy', labelKey: 'mediaPage.analyticsPage.topics.macroeconomy' },
    { key: 'sector', labelKey: 'mediaPage.analyticsPage.topics.sector' },
]

const filteredArticles = computed(() =>
    activeTopic.value === 'all' ? articles : articles.filter((a) => a.topic === activeTopic.value)
)
</script>
