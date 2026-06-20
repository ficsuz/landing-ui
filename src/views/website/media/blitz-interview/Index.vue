<template>
    <div class="blitz-page bg-white py-12 md:py-16">
        <div class="page-container">

            <!-- Intro -->
            <div class="mb-12 md:mb-16 max-w-2xl">
                <h2 class="section-title mb-5">{{ $t('mediaPage.blitzPage.title') }}</h2>
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#505a63] leading-relaxed">
                    {{ $t('mediaPage.blitzPage.description') }}
                </p>
            </div>

            <!-- Cards grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                <div
                    v-for="item in voices"
                    :key="item.id"
                    class="cursor-pointer group"
                    @click="openVideo(item)"
                >
                    <div class="relative rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.08)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)] group-hover:-translate-y-1 transition-all duration-300 [transform:translateZ(0)]">
                        <div class="relative aspect-[3/4]">
                            <!-- Thumbnail -->
                            <img
                                :src="item.thumbnail"
                                :alt="item.name"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            <!-- Gradient overlay -->
                            <div class="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50 pointer-events-none" />

                            <!-- Play button -->
                            <div class="absolute top-4 left-1/2 -translate-x-1/2">
                                <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all duration-200">
                                    <svg class="w-4 h-4 md:w-5 md:h-5 text-[#1a1e2e] ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>

                            <!-- BLITZ badge -->
                            <div class="absolute top-4 right-3">
                                <span class="text-[8px] md:text-[9px] font-bold tracking-widest uppercase bg-[#1a1e2e]/70 backdrop-blur-sm text-white px-2 py-0.5 rounded-sm">
                                    BLITZ
                                </span>
                            </div>

                            <!-- Info box -->
                            <div class="absolute bottom-2.5 left-2.5 right-2.5 md:bottom-3 md:left-3 md:right-3 bg-white rounded-xl p-2.5 md:p-3 shadow-xl">
                                <!-- Org row -->
                                <div class="flex items-center gap-1.5 mb-1.5">
                                    <img
                                        v-if="item.org_logo"
                                        :src="item.org_logo"
                                        :alt="item.organization"
                                        class="h-[14px] md:h-[18px] object-contain shrink-0"
                                    />
                                    <span
                                        v-else
                                        class="text-[8px] md:text-[9px] font-extrabold tracking-wide uppercase px-1.5 py-0.5 rounded shrink-0"
                                        :style="{ background: item.org_color + '25', color: item.org_color }"
                                    >
                                        {{ item.org_short }}
                                    </span>
                                    <span class="text-[8px] md:text-[9px] font-semibold text-[#8a94a6] uppercase tracking-wide leading-tight line-clamp-1">
                                        {{ item.organization }}
                                    </span>
                                </div>
                                <p class="font-bold text-[11px] md:text-[13px] text-[#1a1e2e] leading-snug line-clamp-1">{{ item.name }}</p>
                                <p class="text-[10px] md:text-[11px] text-[#8a94a6] leading-snug mt-0.5 line-clamp-2">{{ item.position }}</p>
                            </div>
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
                                v-if="activeVideo.video_url"
                                :src="activeVideo.video_url"
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
import { ref } from 'vue'

import adbLogo         from '@/assets/images/brands/adb.png'
import ifcLogo         from '@/assets/images/brands/ifc.png'
import energyChinaLogo from '@/assets/images/brands/energy-china.png'

import thumb1 from '@/assets/images/planery-session/info2_1.png'
import thumb2 from '@/assets/images/planery-session/info2_2.png'
import thumb3 from '@/assets/images/planery-session/info2_3.png'
import thumb4 from '@/assets/images/planery-session/info2_4.png'
import thumb5 from '@/assets/images/planery-session/info2_5.png'
import thumb6 from '@/assets/images/planery-session/info2_6.png'
import thumb7 from '@/assets/images/planery-session/info2_7.png'
import thumb8 from '@/assets/images/planery-session/info2_8.png'

interface Voice {
    id: number
    name: string
    position: string
    organization: string
    org_short: string
    org_color: string
    org_logo?: string
    thumbnail: string
    video_url: string
}

const voices = ref<Voice[]>([
    {
        id: 1,
        name: 'Kanokpan Lao-Araya',
        position: 'Country Director for Uzbekistan, Asian Development Bank',
        organization: 'Asian Development Bank',
        org_short: 'ADB',
        org_color: '#e3002a',
        org_logo: adbLogo,
        thumbnail: thumb1,
        video_url: '',
    },
    {
        id: 2,
        name: 'Neil McKain',
        position: 'Country Manager for Uzbekistan and Turkmenistan, IFC',
        organization: 'International Finance Corporation',
        org_short: 'IFC',
        org_color: '#00688f',
        org_logo: ifcLogo,
        thumbnail: thumb2,
        video_url: '',
    },
    {
        id: 3,
        name: 'Alex Wong',
        position: 'Representative in Uzbekistan, China Energy Overseas Investment',
        organization: 'Energy China',
        org_short: 'CGDC',
        org_color: '#e05c00',
        org_logo: energyChinaLogo,
        thumbnail: thumb3,
        video_url: '',
    },
    {
        id: 4,
        name: 'Andy Aranitasi',
        position: 'Head of the EBRD office in Uzbekistan',
        organization: 'European Bank for Reconstruction and Development',
        org_short: 'EBRD',
        org_color: '#005b7f',
        thumbnail: thumb4,
        video_url: '',
    },
    {
        id: 5,
        name: 'Laziz Kudratov',
        position: 'Head of the representative office of MIIT',
        organization: 'Ministry of Investments and Foreign Trade',
        org_short: 'MIIT',
        org_color: '#1e7a3c',
        thumbnail: thumb5,
        video_url: '',
    },
    {
        id: 6,
        name: 'Aziz Gafurov',
        position: 'Head of the FIC Secretariat',
        organization: 'Foreign Investors Council',
        org_short: 'FIC',
        org_color: '#2563eb',
        thumbnail: thumb6,
        video_url: '',
    },
    {
        id: 7,
        name: 'Odile Renaud-Basso',
        position: 'President of the European Bank for Reconstruction and Development',
        organization: 'European Bank for Reconstruction and Development',
        org_short: 'EBRD',
        org_color: '#005b7f',
        thumbnail: thumb7,
        video_url: '',
    },
    {
        id: 8,
        name: 'Neil McKain',
        position: 'Director of the IFC Office for Uzbekistan and Turkmenistan',
        organization: 'World Bank Group · IFC',
        org_short: 'IFC',
        org_color: '#00688f',
        org_logo: ifcLogo,
        thumbnail: thumb8,
        video_url: '',
    },
])

const activeVideo = ref<Voice | null>(null)
const openVideo = (item: Voice) => { activeVideo.value = item }
</script>

<style scoped>
.iv-fade-enter-active,
.iv-fade-leave-active { transition: opacity 0.25s ease; }
.iv-fade-enter-from,
.iv-fade-leave-to    { opacity: 0; }
</style>
