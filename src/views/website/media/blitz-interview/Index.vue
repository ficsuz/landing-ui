<template>
    <div class="blitz-page bg-white py-12 md:py-16">
        <div class="page-container">
            <!-- Title -->
            <div class="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                <h1 class="section-title mb-4">{{ $t('mediaPage.interviewTitle') }}</h1>
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#505a63] leading-relaxed">
                    {{ $t('mediaPage.blitzPage.description') }}
                </p>
            </div>

            <!-- Loading skeleton -->
            <div v-if="testimonialsStore.loading && !voices.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                <div v-for="n in 8" :key="n" class="rounded-2xl overflow-hidden animate-pulse">
                    <div class="aspect-[3/4] bg-[#eef0f4]"></div>
                </div>
            </div>

            <!-- Empty state -->
            <div v-else-if="!voices.length" class="py-16 text-center text-[#8a94a6]">
                {{ $t('common.noData') }}
            </div>

            <!-- Cards grid -->
            <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                <div
                    v-for="item in voices"
                    :key="item.id"
                    class="cursor-pointer group hover:-translate-y-1 transition-transform duration-300"
                    @click="openVideo(item)"
                >
                    <div
                        class="relative rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.08)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition-shadow duration-300 [transform:translateZ(0)]"
                    >
                        <div class="relative aspect-[3/4] bg-[#eef0f4]">
                            <!-- Thumbnail -->
                            <img
                                v-if="getMediaUrl(item.captionId)"
                                :src="getMediaUrl(item.captionId)"
                                :alt="item.fullName || ''"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            <!-- Gradient overlay -->
                            <div class="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50 pointer-events-none" />

                            <!-- Play button -->
                            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div
                                    class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all duration-200"
                                >
                                    <svg class="w-4 h-4 md:w-5 md:h-5 text-[#1a1e2e] ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>

                            <!-- BLITZ badge -->
                            <!-- <div class="absolute top-4 right-3">
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
                                    class="h-[14px] md:h-[18px] object-contain shrink-0 mb-1.5"
                                />
                                <p class="font-bold text-[11px] md:text-[13px] text-[#1a1e2e] leading-snug line-clamp-1">{{ item.fullName || '—' }}</p>
                                <p class="text-[10px] md:text-[11px] text-[#8a94a6] leading-snug mt-0.5 line-clamp-2">{{ item.position || '' }}</p>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Video modal -->
        <Teleport to="body">
            <Transition name="iv-fade">
                <div
                    v-if="activeVideo"
                    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-6"
                    @click.self="activeVideo = null"
                >
                    <div class="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-black shadow-2xl">
                        <button
                            class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
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
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useTestimonialsStore } from '@/features/testimonials/store'
import type { Testimonial } from '@/features/testimonials/types'
import { getMediaUrl, getEmbedUrl } from '@/utils/media'

const testimonialsStore = useTestimonialsStore()

const voices = computed(() => testimonialsStore.items.filter((i) => i.status))

const activeVideo = ref<Testimonial | null>(null)
const openVideo = (item: Testimonial) => {
    activeVideo.value = item
}

onMounted(() => {
    testimonialsStore.fetchAll({ page: 1, limit: 50, sortBy: 'order', order: 'asc' })
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
