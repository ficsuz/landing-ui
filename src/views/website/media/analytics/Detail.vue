<template>
    <div v-if="article" class="bg-white py-12 md:py-20">
        <div class="page-container">
            <!-- Back button -->
            <button
                @click="router.back()"
                class="inline-flex items-center gap-2 text-[14px] font-semibold text-[#1a1e2e] mb-8 hover:opacity-70 transition-opacity duration-200"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {{ $t('common.back') }}
            </button>

            <!-- Header -->
            <div class="max-w-3xl">
                <span class="block text-[13px] font-semibold text-[#8a94a6] mb-3">{{ article.category }}</span>
                <h1 class="font-black text-[clamp(26px,4vw,48px)] text-[#1a1e2e] leading-tight">
                    {{ article.title }}
                </h1>

                <!-- Meta -->
                <div class="mt-5 flex flex-wrap items-center gap-4 text-[13px] text-[#8a94a6]">
                    <span class="inline-flex items-center gap-2">
                        <span class="w-7 h-7 rounded-full bg-[#1a1e2e] flex items-center justify-center text-white font-bold text-[11px]">
                            {{ article.authorInitials }}
                        </span>
                        <span class="font-semibold text-[#1a1e2e]">{{ article.author }}</span>
                    </span>
                    <span>{{ article.date }}</span>
                    <span class="inline-flex items-center gap-1">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                        {{ article.readMin }} min
                    </span>
                </div>
            </div>

            <!-- Cover image -->
            <div class="mt-8 md:mt-10 rounded-2xl overflow-hidden aspect-[16/8] bg-[#eef0f4]">
                <img :src="article.image" :alt="article.title" class="w-full h-full object-cover" />
            </div>

            <!-- Content -->
            <div class="mt-10 md:mt-14 flex flex-col gap-6 max-w-3xl">
                <p v-for="(para, i) in article.content" :key="i" class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed">
                    {{ para }}
                </p>
            </div>
        </div>
    </div>

    <div v-else class="py-24 text-center text-[#8a94a6]">{{ $t('common.noData') }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleById } from './articlesData'

const router = useRouter()
const route = useRoute()
const article = computed(() => getArticleById(Number(route.params.id)))
</script>
