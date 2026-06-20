<template>
    <article
        class="group bg-white rounded-2xl flex flex-col cursor-pointer border border-[#eef0f4] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:border-transparent"
        @click="$router.push(`/media/${item.id}`)"
    >
        <!-- Image -->
        <div class="relative overflow-hidden aspect-[16/10] shrink-0">
            <img
                v-if="item.image"
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div v-else class="w-full h-full bg-[#f0f2f5]" />

            <!-- Category badge -->
            <div class="absolute top-3 left-3">
                <span class="bg-[#1a1e2e]/80 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1 rounded-full tracking-wide uppercase">
                    {{ item.category }}
                </span>
            </div>
        </div>

        <!-- Content -->
        <div class="flex flex-col flex-1 p-4 md:p-5 gap-2">
            <h3 class="font-bold text-[15px] text-[#1a1e2e] leading-snug line-clamp-2 group-hover:text-[#2563eb] transition-colors duration-200">
                {{ item.title }}
            </h3>
            <p v-if="showExcerpt" class="text-[13px] text-[#8a94a6] leading-relaxed line-clamp-2 flex-1">
                {{ item.excerpt }}
            </p>

            <!-- Footer -->
            <div class="flex items-center justify-between pt-3 border-t border-[#eef0f4] mt-auto">
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
</template>

<script setup lang="ts">
import type { NewsItem } from '@/features/news/types'

defineProps<{
    item: NewsItem
    showExcerpt?: boolean
}>()
</script>
