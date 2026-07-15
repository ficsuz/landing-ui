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

            <div v-loading="store.loading">
                <div
                    v-if="active"
                    class="max-w-6xl mx-auto"
                    @mouseenter="pauseAuto"
                    @mouseleave="resumeAuto"
                >
                    <!-- Main stage -->
                    <div ref="stageEl">
                        <div
                            class="group relative rounded-2xl md:rounded-3xl overflow-hidden bg-black shadow-[0_18px_60px_rgba(26,30,46,0.22)] ring-1 ring-black/5 cursor-pointer"
                            @click="playMain"
                        >
                            <div class="aspect-video">
                                <iframe
                                    v-if="mainPlaying"
                                    :src="getEmbedUrl(active.link) + '?autoplay=1'"
                                    class="absolute inset-0 w-full h-full"
                                    allow="autoplay; fullscreen"
                                    allowfullscreen
                                    frameborder="0"
                                />
                                <template v-else>
                                    <img
                                        :src="thumbnail(active.link)"
                                        :alt="resolveTranslation(active.title, locale)"
                                        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                        @error="onThumbError"
                                    />
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 transition-opacity duration-300" />
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <span class="flex items-center justify-center w-[68px] h-[68px] md:w-[84px] md:h-[84px] rounded-full bg-white/95 shadow-[0_10px_34px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="#1a1e2e" class="ml-1">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </span>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>

                    <!-- Thumbnails gallery -->
                    <div v-if="projects.length > 1" class="mt-6 md:mt-8">
                        <div class="flex gap-3 md:gap-4 overflow-x-auto pt-2 pb-3 -mx-4 px-5 md:-mx-2 md:px-2 snap-x scroll-smooth thumbs-row">
                            <button
                                v-for="(project, i) in projects"
                                :key="project.id"
                                type="button"
                                class="group relative shrink-0 w-[168px] md:w-[196px] rounded-xl overflow-hidden snap-start transition-all duration-300 focus:outline-none"
                                :class="i === activeIndex
                                    ? 'ring-2 ring-[#1a1e2e] ring-offset-2 ring-offset-white scale-[1.02]'
                                    : 'ring-1 ring-[#eef0f4] hover:ring-[#c8cdd6]'"
                                @click="setActive(i)"
                            >
                                <div class="relative aspect-video bg-black">
                                    <img
                                        :src="thumbnail(project.link)"
                                        :alt="resolveTranslation(project.title, locale)"
                                        class="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                        :class="i === activeIndex ? '' : 'grayscale-[0.35] group-hover:grayscale-0'"
                                        @error="onThumbError"
                                    />
                                    <div
                                        class="absolute inset-0 transition-colors duration-300"
                                        :class="i === activeIndex ? 'bg-transparent' : 'bg-[#1a1e2e]/35 group-hover:bg-[#1a1e2e]/15'"
                                    />
                                    <span class="absolute inset-0 flex items-center justify-center">
                                        <span
                                            class="flex items-center justify-center rounded-full transition-all duration-300"
                                            :class="i === activeIndex
                                                ? 'w-10 h-10 bg-white shadow-[0_4px_14px_rgba(0,0,0,0.3)]'
                                                : 'w-9 h-9 bg-white/85 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100'"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#1a1e2e" class="ml-0.5">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </span>
                                    </span>
                                    <!-- active indikator chizig'i -->
                                    <span
                                        v-if="i === activeIndex"
                                        class="absolute bottom-0 left-0 right-0 h-1 bg-[#1a1e2e]"
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <WebEmptyState
                    v-if="!store.loading && projects.length === 0"
                    :title="$t('mediaPage.specialProjectsPage.title')"
                    :text="$t('common.noData')"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import WebEmptyState from '@/components/website/WebEmptyState.vue'
import { useSpecialProjectsStore } from '@/features/specialProjects/store'
import { getEmbedUrl } from '@/utils/media'
import { resolveTranslation } from '@/utils/i18n'

const { locale } = useI18n()
const store = useSpecialProjectsStore()

const projects = computed(() => store.items.filter((p) => p.status))

const activeIndex = ref(0)
const active = computed(() => projects.value[activeIndex.value] ?? projects.value[0] ?? null)

const mainPlaying = ref(false)
const playMain = () => {
    mainPlaying.value = true
    stopAuto() // video ochilganda avto-almashinuv to'xtaydi
}

const stageEl = ref<HTMLElement | null>(null)

function setActive(i: number) {
    if (i === activeIndex.value) return
    activeIndex.value = i
    mainPlaying.value = false
    nextTick(() => {
        if (!stageEl.value) return
        gsap.fromTo(
            stageEl.value,
            { opacity: 0, y: 24, scale: 0.985 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
        )
    })
}

// ── Auto-slide ────────────────────────────────────────────────
const AUTO_MS = 5500
let timer: ReturnType<typeof setInterval> | null = null
let hovered = false

function nextSlide() {
    if (projects.value.length < 2) return
    setActive((activeIndex.value + 1) % projects.value.length)
}

function startAuto() {
    if (timer || projects.value.length < 2 || mainPlaying.value || hovered) return
    timer = setInterval(nextSlide, AUTO_MS)
}

function stopAuto() {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
}

function pauseAuto() {
    hovered = true
    stopAuto()
}

function resumeAuto() {
    hovered = false
    if (!mainPlaying.value) startAuto()
}

function youtubeId(url?: string | null): string {
    if (!url) return ''
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]+)/)
    return m ? m[1] : ''
}

function thumbnail(url?: string | null): string {
    const id = youtubeId(url)
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : ''
}

function onThumbError(e: Event) {
    const img = e.target as HTMLImageElement
    if (img.src.includes('maxresdefault')) {
        img.src = img.src.replace('maxresdefault', 'hqdefault')
    }
}

onMounted(async () => {
    await store.fetchAll({ limit: 100, sortBy: 'order', order: 'asc' })
    startAuto()
})

onUnmounted(stopAuto)
</script>

<style scoped>
.thumbs-row {
    scrollbar-width: thin;
    scrollbar-color: #d0d5df transparent;
}
.thumbs-row::-webkit-scrollbar {
    height: 6px;
}
.thumbs-row::-webkit-scrollbar-thumb {
    background: #d0d5df;
    border-radius: 999px;
}
.thumbs-row::-webkit-scrollbar-track {
    background: transparent;
}
</style>
