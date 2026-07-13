<template>
    <div class="special-projects-page bg-white py-12 md:py-16">
        <div class="page-container">
            <!-- Title -->
            <div class="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                <h1 class="section-title mb-4">{{ $t('mediaPage.specialProjectsPage.title') }}</h1>
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#505a63] leading-relaxed">
                    {{ $t('mediaPage.specialProjectsPage.description') }}
                </p>
            </div>

            <!-- Featured project -->
            <div class="max-w-5xl mx-auto">
                <span class="inline-block text-[11px] font-semibold uppercase tracking-widest text-[#8a94a6] mb-4">
                    {{ $t('mediaPage.specialProjectsPage.featured') }}
                </span>

                <div class="rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] bg-black">
                    <div class="aspect-video">
                        <iframe
                            :src="embedUrl"
                            class="w-full h-full"
                            allow="autoplay; fullscreen"
                            allowfullscreen
                            frameborder="0"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getEmbedUrl } from '@/utils/media'

const videoSource = 'https://youtu.be/2LqpFWdgtiA?si=4VK0fHmK1GOO3oSo'
const embedUrl = getEmbedUrl(videoSource)
</script>
