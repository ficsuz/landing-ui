<template>
    <section class="bg-white py-12 md:py-20">
        <div class="page-container">
            <!-- Back button -->
            <router-link
                :to="{ name: 'council-members-corporation' }"
                class="inline-flex items-center gap-2 text-[14px] font-semibold text-[#1a1e2e] border border-[#d0d5dd] px-4 py-2 rounded-full mb-10 hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] transition-all duration-200"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {{ $t('common.back') }}
            </router-link>

            <div class="max-w-4xl mx-auto">
                <!-- Subject badge -->
                <span class="inline-block text-[12px] font-bold tracking-widest uppercase text-white bg-[#1a1e2e] px-3 py-1 rounded-full mb-5">
                    {{ meeting.eyebrow }}
                </span>

                <!-- Title -->
                <h1 class="font-black text-[clamp(26px,4vw,46px)] text-[#1a1e2e] leading-tight mb-6">
                    {{ meeting.title }}
                </h1>

                <!-- Meta row -->
                <div class="flex flex-wrap items-center gap-4 text-[13px] text-[#8a94a6] pb-8 border-b border-[#eef0f4]">
                    <time :datetime="meeting.date" class="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {{ meeting.dateLabel }}
                    </time>
                </div>

                <!-- Image gallery: hero + thumbnail strip -->
                <div class="mt-8">
                    <!-- Main image -->
                    <div class="group relative w-fit max-w-full mx-auto rounded-2xl overflow-hidden">
                        <img
                            :key="activeImage"
                            :src="activeImage"
                            :alt="photoAlt(activeIndex)"
                            class="gallery-main-img cursor-zoom-in"
                            @click="lightboxOpen = true"
                        />
                        <!-- Counter -->
                        <span class="absolute bottom-3 left-3 text-[12px] font-semibold text-white bg-black/55 backdrop-blur-sm px-2.5 py-1 rounded-full">
                            {{ activeIndex + 1 }} / {{ meeting.gallery.length }}
                        </span>
                        <!-- Download button -->
                        <button
                            type="button"
                            :title="$t('common.download')"
                            :aria-label="$t('common.download')"
                            class="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.2)] text-[#1a1e2e] opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-white hover:scale-105 transition-all duration-300"
                            @click.stop="downloadImage(activeIndex)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </button>
                    </div>

                    <!-- Thumbnail strip -->
                    <div class="relative mt-2">
                        <!-- Scroll left -->
                        <button
                            v-show="canScrollLeft"
                            type="button"
                            class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.18)] items-center justify-center text-[#1a1e2e] hover:bg-[#1a1e2e] hover:text-white transition-colors"
                            @click="scrollThumbs(-1)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        <div ref="thumbStrip" class="flex gap-2.5 overflow-x-auto p-2 thumb-strip" @scroll="updateThumbScroll">
                            <button
                                v-for="(img, i) in meeting.gallery"
                                :key="img"
                                type="button"
                                :aria-label="photoAlt(i)"
                                class="shrink-0 h-[64px] rounded-lg overflow-hidden bg-[#eef0f4] transition-all duration-200"
                                :class="i === activeIndex ? 'ring-2 ring-[#1a1e2e] ring-offset-2' : 'opacity-60 hover:opacity-100'"
                                @click="activeIndex = i"
                            >
                                <img :src="img" :alt="`${i + 1}`" loading="lazy" class="block w-auto h-full max-w-none" @load="updateThumbScroll" />
                            </button>
                        </div>

                        <!-- Scroll right -->
                        <button
                            v-show="canScrollRight"
                            type="button"
                            class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.18)] items-center justify-center text-[#1a1e2e] hover:bg-[#1a1e2e] hover:text-white transition-colors"
                            @click="scrollThumbs(1)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Description paragraphs -->
                <div v-if="meeting.paragraphs.length" class="mt-10 md:mt-14 flex flex-col gap-6">
                    <p v-for="(para, i) in meeting.paragraphs" :key="i" class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-[1.8]">
                        {{ para }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Lightbox -->
        <Teleport to="body">
            <Transition name="lb-fade">
                <div
                    v-if="lightboxOpen"
                    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm select-none"
                    role="dialog"
                    aria-modal="true"
                    @click.self="lightboxOpen = false"
                    @touchstart.passive="onTouchStart"
                    @touchend="onTouchEnd"
                >
                    <!-- Close -->
                    <button
                        type="button"
                        class="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors z-10"
                        @click="lightboxOpen = false"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    <!-- Prev -->
                    <button
                        type="button"
                        class="absolute left-3 md:left-6 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                        @click.stop="prevImage"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <img
                        :key="activeImage"
                        :src="activeImage"
                        :alt="photoAlt(activeIndex)"
                        class="max-w-[92vw] max-h-[86vh] object-contain rounded-lg"
                        @click.stop
                    />

                    <!-- Next -->
                    <button
                        type="button"
                        class="absolute right-3 md:right-6 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                        @click.stop="nextImage"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>

                    <!-- Counter + download -->
                    <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-4">
                        <span class="text-[13px] font-semibold text-white/90 bg-white/10 px-3 py-1.5 rounded-full">
                            {{ activeIndex + 1 }} / {{ meeting.gallery.length }}
                        </span>
                        <button
                            type="button"
                            :title="$t('common.download')"
                            :aria-label="$t('common.download')"
                            class="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                            @click.stop="downloadImage(activeIndex)"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </section>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CorporationMeeting } from '@/views/website/council-members/corporation/meetingsData'
import { useSeo } from '@/composables/useSeo'
import { truncateDescription } from '@/constants/seo.constants'

const props = defineProps<{ meeting: CorporationMeeting }>()

const { t } = useI18n()

useSeo(() => ({
    title: props.meeting.title,
    description: truncateDescription(props.meeting.paragraphs.join(' ')),
    image: props.meeting.cover,
    type: 'article',
    publishedTime: props.meeting.date,
}))

function photoAlt(index: number): string {
    return t('corporationPage.photoAlt', { title: props.meeting.title, number: index + 1 })
}

// --- Gallery ---
const activeIndex = ref(0)
const lightboxOpen = ref(false)
const activeImage = computed(() => props.meeting.gallery[activeIndex.value])

function nextImage() {
    const len = props.meeting.gallery.length
    activeIndex.value = (activeIndex.value + 1) % len
}
function prevImage() {
    const len = props.meeting.gallery.length
    activeIndex.value = (activeIndex.value - 1 + len) % len
}

// --- Thumbnail strip scrolling ---
const thumbStrip = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

function updateThumbScroll() {
    const el = thumbStrip.value
    if (!el) return
    canScrollLeft.value = el.scrollLeft > 1
    canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
}

function scrollThumbs(dir: number) {
    const el = thumbStrip.value
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
}

// Keep the active thumbnail centred in the strip when navigating from the lightbox / keyboard.
// Scrolls the strip only — never the page behind the lightbox.
watch(activeIndex, (i) => {
    const el = thumbStrip.value
    const thumb = el?.children[i] as HTMLElement | undefined
    if (!el || !thumb) return
    el.scrollTo({ left: thumb.offsetLeft - (el.clientWidth - thumb.offsetWidth) / 2, behavior: 'smooth' })
})

// --- Lightbox controls ---
function onKeydown(e: KeyboardEvent) {
    if (!lightboxOpen.value) return
    if (e.key === 'Escape') lightboxOpen.value = false
    else if (e.key === 'ArrowRight') nextImage()
    else if (e.key === 'ArrowLeft') prevImage()
}

let touchStartX = 0
function onTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX
}
function onTouchEnd(e: TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX
    if (Math.abs(dx) < 40) return
    if (dx < 0) nextImage()
    else prevImage()
}

async function downloadImage(i: number) {
    const url = props.meeting.gallery[i]
    try {
        const res = await fetch(url)
        const blob = await res.blob()
        const objectUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = objectUrl
        a.download = `${props.meeting.title}-${i + 1}.jpg`
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(objectUrl)
    } catch {
        window.open(url, '_blank')
    }
}

watch(lightboxOpen, (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('resize', updateThumbScroll)
    updateThumbScroll()
})

onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('resize', updateThumbScroll)
    document.body.style.overflow = ''
})
</script>

<style scoped>
/* Smooth crossfade when the main image changes */
.gallery-main-img {
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    /* Preserve the photo's proportions while keeping portraits within the viewport. */
    max-height: 70vh;
    max-height: 70svh;
    animation: imgFade 0.35s ease;
}
@keyframes imgFade {
    from { opacity: 0.4; }
    to { opacity: 1; }
}

/* Slim thumbnail scrollbar */
.thumb-strip {
    scrollbar-width: thin;
    scrollbar-color: #d0d5dd transparent;
}
.thumb-strip::-webkit-scrollbar {
    height: 6px;
}
.thumb-strip::-webkit-scrollbar-thumb {
    background: #d0d5dd;
    border-radius: 999px;
}

.lb-fade-enter-active,
.lb-fade-leave-active {
    transition: opacity 0.25s ease;
}
.lb-fade-enter-from,
.lb-fade-leave-to {
    opacity: 0;
}
</style>
