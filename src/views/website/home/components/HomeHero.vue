<template>
    <div ref="sceneEl" class="relative overflow-hidden" style="height: calc(100vh - 80px)">
        <!-- ── Slide 1 — quote left-aligned ── -->
        <div ref="slide1" class="absolute inset-0 flex items-end pb-20 md:pb-0 md:items-center">
            <div class="absolute inset-0 bg-cover bg-center md:bg-left bg-no-repeat" :style="{ backgroundImage: `url(${img1})` }" />
            <div class="absolute inset-0 bg-[rgba(10,14,20,0.55)] md:hidden" />
            <div
                class="absolute inset-0 bg-gradient-to-r from-[rgba(10,14,20,0.88)] via-[rgba(10,14,20,0.55)] to-[rgba(10,14,20,0.08)] hidden md:block"
            />

            <div ref="content1" class="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <div class="max-w-[600px]">
                    <div class="s1-mark text-[48px] md:text-[96px] leading-none text-white/20 font-serif mb-[-10px] md:mb-[-16px] select-none">"</div>
                    <a
                        href="https://president.uz/en/lists/view/7194"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="s1-quote block mb-8 group/quote"
                    >
                        <blockquote
                            class="text-[clamp(22px,2.5vw,32px)] font-medium text-white italic leading-[1.55] transition-opacity duration-200 group-hover/quote:opacity-80"
                        >
                            {{ $t('hero.slide1.quote') }}
                        </blockquote>
                    </a>
                    <div class="s1-author flex items-center gap-4">
                        <span class="block w-10 h-[2px] bg-white/40 flex-shrink-0" />
                        <div>
                            <p class="text-white font-bold text-[16px] leading-tight">{{ $t('hero.slide1.author') }}</p>
                            <p class="text-white/55 text-[13px] mt-1">{{ $t('hero.slide1.role') }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                ref="scrollEl"
                class="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/55 pointer-events-none"
            >
                <span class="text-[10px] font-bold tracking-[0.22em] uppercase">{{ $t('hero.scroll') }}</span>
                <div class="w-6 h-6 hero-bounce">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
            </div>
        </div>

        <!-- ── Slide 2 — quote right-aligned ── -->
        <div ref="slide2" class="absolute inset-0 flex items-end pb-20 md:pb-0 md:items-center">
            <div class="absolute inset-0 bg-cover bg-[33%_center] bg-no-repeat" :style="{ backgroundImage: `url(${img2})` }" />
            <div class="absolute inset-0 bg-[rgba(10,14,20,0.55)] md:hidden" />
            <div
                class="absolute inset-0 bg-gradient-to-l from-[rgba(10,14,20,0.90)] via-[rgba(10,14,20,0.55)] to-[rgba(10,14,20,0.06)] hidden md:block"
            />

            <div ref="content2" class="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <div class="max-w-[600px] md:ml-auto text-left md:text-right">
                    <div class="s2-mark text-[48px] md:text-[96px] leading-none text-white/20 font-serif mb-[-10px] md:mb-[-16px] select-none">"</div>
                    <router-link to="/" class="s2-quote block mb-8 group/quote">
                        <blockquote
                            class="text-[clamp(24px,2.5vw,36px)] font-medium text-white italic leading-[1.55] transition-opacity duration-200 group-hover/quote:opacity-80"
                        >
                            {{ $t('hero.slide2.quote') }}
                        </blockquote>
                    </router-link>
                    <div class="s2-author flex items-center gap-4 flex-row-reverse md:flex-row md:justify-end">
                        <div>
                            <p class="text-white font-bold text-[16px] leading-tight">{{ $t('hero.slide2.author') }}</p>
                            <p class="text-white/55 text-[13px] mt-1">{{ $t('hero.slide2.role') }}</p>
                        </div>
                        <span class="block w-10 h-[2px] bg-white/40 flex-shrink-0" />
                    </div>
                </div>
            </div>
        </div>

        <!-- ── Slide 3 — EBRD announcement (light, centered) ── -->
        <div ref="slide3" class="absolute inset-0 flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-b from-[#ffffff] to-white" />
            <div ref="content3" class="relative z-10 flex flex-col items-center text-center px-6 max-w-[900px]">
                <h2 class="s3-title text-[clamp(28px,3.5vw,56px)] font-bold text-[#1a1e2e] leading-[1.2] mb-12">
                    {{ $t('hero.slide3.title') }}
                </h2>
                <div class="s3-logo">
                    <img :src="img3" alt="EBRD" class="h-28 md:h-36 w-auto" />
                </div>
            </div>
        </div>

        <!-- Progress dots -->
        <div class="absolute bottom-6 right-6 md:bottom-9 md:right-12 z-10 flex items-center gap-2 pointer-events-none">
            <span ref="dot1" class="block h-[2px] rounded-full bg-white" style="width: 24px" />
            <span ref="dot2" class="block h-[2px] rounded-full bg-white/35" style="width: 8px" />
            <span ref="dot3" class="block h-[2px] rounded-full bg-white/35" style="width: 8px" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import img1 from '@/assets/images/banner/banner-img.png'
import img2 from '@/assets/images/banner/opa.png'
import img3 from '@/assets/images/icons/fInvestor.png'

const sceneEl = ref<HTMLElement | null>(null)
const slide1 = ref<HTMLElement | null>(null)
const slide2 = ref<HTMLElement | null>(null)
const slide3 = ref<HTMLElement | null>(null)
const content1 = ref<HTMLElement | null>(null)
const content2 = ref<HTMLElement | null>(null)
const content3 = ref<HTMLElement | null>(null)
const scrollEl = ref<HTMLElement | null>(null)
const dot1 = ref<HTMLElement | null>(null)
const dot2 = ref<HTMLElement | null>(null)
const dot3 = ref<HTMLElement | null>(null)

let currentSlide = 0
let isAnimating = false
let touchStartY = 0
let slide3Timer: ReturnType<typeof setTimeout> | null = null
let snapLock = false
let scrollDebounceTimer: ReturnType<typeof setTimeout> | null = null
let scrollListenerEl: HTMLElement | null = null

// Mobile: no scroll hijacking — plain autoplay slider + normal page scroll
const mq = typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)') : null
let isMobile = mq ? mq.matches : false
let autoplayTimer: ReturnType<typeof setInterval> | null = null
let autoplayDir = 1

const q1 = () => gsap.utils.selector(content1.value)
const q2 = () => gsap.utils.selector(content2.value)
const q3 = () => gsap.utils.selector(content3.value)

const findScrollParent = (): HTMLElement | null => {
    let p = sceneEl.value?.parentElement
    while (p && p !== document.documentElement) {
        const { overflowY } = window.getComputedStyle(p)
        if (overflowY === 'auto' || overflowY === 'scroll') return p
        p = p.parentElement
    }
    return null
}

const scrollToNextSection = () => {
    if (slide3Timer) {
        clearTimeout(slide3Timer)
        slide3Timer = null
    }
    const parent = findScrollParent()
    if (parent && sceneEl.value) {
        const heroRect = sceneEl.value.getBoundingClientRect()
        const parentRect = parent.getBoundingClientRect()
        const targetScrollTop = parent.scrollTop + heroRect.bottom - parentRect.top
        if (parent.scrollTop < targetScrollTop) {
            snapLock = true
            parent.scrollTo({ top: targetScrollTop, behavior: 'smooth' })
            setTimeout(() => {
                snapLock = false
            }, 800)
        }
        return
    }
    snapLock = true
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    setTimeout(() => {
        snapLock = false
    }, 800)
}

const handleParentScroll = () => {
    // Once on the final slide, allow leaving the hero — never snap back to top.
    if (!sceneEl.value || snapLock || currentSlide === 2) return
    const sp = findScrollParent()
    const scrollTop = sp ? sp.scrollTop : window.scrollY
    const heroHeight = sceneEl.value.offsetHeight
    if (scrollTop > 0 && scrollTop < heroHeight) {
        if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer)
        scrollDebounceTimer = setTimeout(() => {
            const sp2 = findScrollParent()
            if (sp2) {
                sp2.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }, 150)
    }
}

const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return
    isAnimating = true

    if (slide3Timer) {
        clearTimeout(slide3Timer)
        slide3Timer = null
    }

    const prev = currentSlide
    currentSlide = index

    const tl = gsap.timeline({
        onComplete: () => {
            isAnimating = false
        },
    })

    if (index === 1 && prev === 0) {
        // slide 1 → slide 2
        tl.to(slide1.value, { xPercent: -100, duration: 1.1, ease: 'power3.inOut' }, 0)
        tl.to(slide2.value, { xPercent: 0, duration: 1.1, ease: 'power3.inOut' }, 0)
        tl.to(scrollEl.value, { opacity: 0, duration: 0.25 }, 0)
        tl.to(q1()('.s1-mark, .s1-quote, .s1-author'), { opacity: 0, x: -24, stagger: 0.04, duration: 0.35 }, 0)
        tl.fromTo(q2()('.s2-mark, .s2-quote, .s2-author'), { opacity: 0, x: -36 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 }, 0.55)
        tl.to(dot1.value, { width: 8, backgroundColor: 'rgba(255,255,255,0.35)', duration: 0.3 }, 0.1)
        tl.to(dot2.value, { width: 24, backgroundColor: '#ffffff', duration: 0.3 }, 0.1)
        tl.to(dot3.value, { width: 8, backgroundColor: 'rgba(255,255,255,0.35)', duration: 0.3 }, 0.1)
    } else if (index === 0 && prev === 1) {
        // slide 2 → slide 1
        tl.to(slide2.value, { xPercent: 100, duration: 1.1, ease: 'power3.inOut' }, 0)
        tl.to(slide1.value, { xPercent: 0, duration: 1.1, ease: 'power3.inOut' }, 0)
        tl.to(q2()('.s2-mark, .s2-quote, .s2-author'), { opacity: 0, x: -24, stagger: 0.04, duration: 0.35 }, 0)
        tl.fromTo(q1()('.s1-mark, .s1-quote, .s1-author'), { opacity: 0, x: -36 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 }, 0.55)
        tl.fromTo(scrollEl.value, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.7)
        tl.to(dot1.value, { width: 24, backgroundColor: '#ffffff', duration: 0.3 }, 0.1)
        tl.to(dot2.value, { width: 8, backgroundColor: 'rgba(255,255,255,0.35)', duration: 0.3 }, 0.1)
        tl.to(dot3.value, { width: 8, backgroundColor: 'rgba(255,255,255,0.35)', duration: 0.3 }, 0.1)
    } else if (index === 2 && prev === 1) {
        // slide 2 → slide 3
        tl.to(slide2.value, { xPercent: -100, duration: 1.1, ease: 'power3.inOut' }, 0)
        tl.to(slide3.value, { xPercent: 0, duration: 1.1, ease: 'power3.inOut' }, 0)
        tl.to(q2()('.s2-mark, .s2-quote, .s2-author'), { opacity: 0, x: -24, stagger: 0.04, duration: 0.35 }, 0)
        tl.fromTo(q3()('.s3-title, .s3-logo'), { opacity: 0, y: 32 }, { opacity: 1, y: 0, stagger: 0.18, duration: 0.65, ease: 'power3.out' }, 0.55)
        tl.to(dot1.value, { width: 8, backgroundColor: 'rgba(26,30,46,0.2)', duration: 0.3 }, 0.1)
        tl.to(dot2.value, { width: 8, backgroundColor: 'rgba(26,30,46,0.2)', duration: 0.3 }, 0.1)
        tl.to(dot3.value, { width: 24, backgroundColor: '#1a1e2e', duration: 0.3 }, 0.1)
        // Desktop only: auto-advance off the hero. On mobile the page scrolls normally.
        if (!isMobile) slide3Timer = setTimeout(scrollToNextSection, 1100 + 1000)
    } else if (index === 1 && prev === 2) {
        // slide 3 → slide 2
        tl.to(slide3.value, { xPercent: 100, duration: 1.1, ease: 'power3.inOut' }, 0)
        tl.to(slide2.value, { xPercent: 0, duration: 1.1, ease: 'power3.inOut' }, 0)
        tl.to(q3()('.s3-title, .s3-logo'), { opacity: 0, y: 24, duration: 0.3 }, 0)
        tl.fromTo(q2()('.s2-mark, .s2-quote, .s2-author'), { opacity: 0, x: -36 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 }, 0.55)
        tl.to(dot1.value, { width: 8, backgroundColor: 'rgba(255,255,255,0.35)', duration: 0.3 }, 0.1)
        tl.to(dot2.value, { width: 24, backgroundColor: '#ffffff', duration: 0.3 }, 0.1)
        tl.to(dot3.value, { width: 8, backgroundColor: 'rgba(255,255,255,0.35)', duration: 0.3 }, 0.1)
    }
}

const handleWheel = (e: WheelEvent) => {
    // Listener is on window now (to catch gestures over the sticky navbar),
    // so once the hero has scrolled fully out of view, stop hijacking.
    if (!sceneEl.value || sceneEl.value.getBoundingClientRect().bottom <= 0) return

    if (isAnimating) {
        e.preventDefault()
        return
    }

    if (e.deltaY > 0 && currentSlide === 0) {
        e.preventDefault()
        goToSlide(1)
    } else if (e.deltaY > 0 && currentSlide === 1) {
        e.preventDefault()
        goToSlide(2)
    } else if (e.deltaY > 0 && currentSlide === 2) {
        e.preventDefault()
        scrollToNextSection()
    } else if (e.deltaY < 0 && currentSlide === 2) {
        e.preventDefault()
        goToSlide(1)
    } else if (e.deltaY < 0 && currentSlide === 1) {
        e.preventDefault()
        goToSlide(0)
    } else if (e.deltaY < 0 && currentSlide === 0) {
        e.preventDefault()
    }
}

const handleTouchStart = (e: TouchEvent) => {
    touchStartY = e.touches[0].clientY
}
const handleTouchEnd = (e: TouchEvent) => {
    if (isAnimating) return
    const dy = touchStartY - e.changedTouches[0].clientY
    if (Math.abs(dy) < 40) return
    if (dy > 0 && currentSlide === 0) goToSlide(1)
    else if (dy > 0 && currentSlide === 1) goToSlide(2)
    else if (dy > 0 && currentSlide === 2) scrollToNextSection()
    else if (dy < 0 && currentSlide === 2) goToSlide(1)
    else if (dy < 0 && currentSlide === 1) goToSlide(0)
}

// ── Mobile: plain autoplay slider (ping-pong through the 3 slides) ──
const startAutoplay = () => {
    stopAutoplay()
    autoplayTimer = setInterval(() => {
        if (isAnimating) return
        let next = currentSlide + autoplayDir
        if (next > 2) {
            next = 1
            autoplayDir = -1
        } else if (next < 0) {
            next = 1
            autoplayDir = 1
        }
        goToSlide(next)
    }, 5000)
}
const stopAutoplay = () => {
    if (autoplayTimer) {
        clearInterval(autoplayTimer)
        autoplayTimer = null
    }
}

// ── Desktop: scroll-hijack listeners ──
const setupDesktop = () => {
    // Bound to window (not sceneEl) so wheel gestures starting over the sticky
    // navbar — which sits outside sceneEl's box — still drive the slide hijack.
    window.addEventListener('wheel', handleWheel, { passive: false })
    sceneEl.value?.addEventListener('touchstart', handleTouchStart, { passive: true })
    sceneEl.value?.addEventListener('touchend', handleTouchEnd, { passive: true })
    scrollListenerEl = findScrollParent()
    if (scrollListenerEl) {
        scrollListenerEl.addEventListener('scroll', handleParentScroll, { passive: true })
    } else {
        window.addEventListener('scroll', handleParentScroll, { passive: true })
    }
}
const teardownDesktop = () => {
    window.removeEventListener('wheel', handleWheel)
    sceneEl.value?.removeEventListener('touchstart', handleTouchStart)
    sceneEl.value?.removeEventListener('touchend', handleTouchEnd)
    if (scrollListenerEl) {
        scrollListenerEl.removeEventListener('scroll', handleParentScroll)
    } else {
        window.removeEventListener('scroll', handleParentScroll)
    }
    scrollListenerEl = null
}

const applyMode = () => {
    isMobile = mq ? mq.matches : false
    if (slide3Timer) {
        clearTimeout(slide3Timer)
        slide3Timer = null
    }
    if (isMobile) {
        teardownDesktop()
        startAutoplay()
    } else {
        stopAutoplay()
        setupDesktop()
    }
}

onMounted(() => {
    gsap.set(slide2.value, { xPercent: 100 })
    gsap.set(slide3.value, { xPercent: 100 })

    gsap.fromTo(
        q1()('.s1-mark, .s1-quote, .s1-author'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1.1, ease: 'power3.out', delay: 0.2 }
    )
    gsap.fromTo(scrollEl.value, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.9 })

    applyMode()
    mq?.addEventListener('change', applyMode)
})

onUnmounted(() => {
    if (slide3Timer) clearTimeout(slide3Timer)
    if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer)
    stopAutoplay()
    teardownDesktop()
    mq?.removeEventListener('change', applyMode)
})
</script>

<style scoped>
.hero-bounce {
    animation: hero-bounce 2.2s ease-in-out infinite;
}

@keyframes hero-bounce {
    0%,
    100% {
        transform: translateY(0);
        opacity: 0.55;
    }
    50% {
        transform: translateY(7px);
        opacity: 1;
    }
}
</style>
