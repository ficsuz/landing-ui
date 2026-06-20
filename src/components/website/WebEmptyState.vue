<template>
    <section class="bg-white py-16 md:py-20">
        <div class="page-container">
            <div
                ref="wrapRef"
                class="relative flex flex-col items-center text-center overflow-hidden rounded-[32px] border border-[#eef0f4] bg-[#f7f8fa] px-6 py-20 max-w-[700px] mx-auto md:px-14 md:py-24"
            >
                <!-- Dot grid -->
                <div class="dot-grid" aria-hidden="true" />

                <!-- Blobs -->
                <div class="absolute w-[300px] h-[300px] -top-24 -left-24 rounded-full bg-[rgba(26,30,46,0.05)] blur-[72px] pointer-events-none anim-blob" aria-hidden="true" />
                <div class="absolute w-[240px] h-[240px] -bottom-20 -right-20 rounded-full bg-[rgba(26,30,46,0.05)] blur-[72px] pointer-events-none [animation:float-blob_11s_ease-in-out_infinite_reverse]" aria-hidden="true" />

                <!-- Sparkles -->
                <span
                    v-for="sp in sparkles"
                    :key="sp.id"
                    class="absolute rounded-full bg-[#1a1e2e] opacity-0 pointer-events-none z-0 anim-sparkle"
                    :style="{
                        top: sp.y + 'px',
                        left: sp.x + 'px',
                        width: sp.size + 'px',
                        height: sp.size + 'px',
                        animationDelay: sp.delay + 's',
                        animationDuration: sp.dur + 's',
                    }"
                    aria-hidden="true"
                />

                <!-- Visual: sonar rings + orbit + icon -->
                <div class="relative flex items-center justify-center w-[200px] h-[200px] mb-10 shrink-0">

                    <!-- Sonar rings -->
                    <div class="empty-ring absolute rounded-full border border-[rgba(26,30,46,0.14)] w-24 h-24 [animation-delay:0s]" />
                    <div class="empty-ring absolute rounded-full border border-[rgba(26,30,46,0.14)] w-[140px] h-[140px] [animation-delay:0.8s]" />
                    <div class="empty-ring absolute rounded-full border border-[rgba(26,30,46,0.14)] w-[184px] h-[184px] [animation-delay:1.6s]" />

                    <!-- Orbiting dots -->
                    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
                        <span class="orbit-dot absolute top-1/2 left-1/2 -m-[3px] w-1.5 h-1.5 rounded-full bg-[#1a1e2e] opacity-55 [animation-delay:0s]" />
                        <span class="orbit-dot absolute top-1/2 left-1/2 -m-[2px] w-1 h-1 rounded-full bg-[#1a1e2e] opacity-35 [animation-delay:-2.33s]" />
                        <span class="orbit-dot absolute top-1/2 left-1/2 -m-[2.5px] w-[5px] h-[5px] rounded-full bg-[#1a1e2e] opacity-45 [animation-delay:-4.66s]" />
                    </div>

                    <!-- Icon box -->
                    <div
                        ref="iconRef"
                        class="icon-box relative z-[2] w-[76px] h-[76px] rounded-[22px] bg-[#1a1e2e] flex items-center justify-center overflow-hidden [box-shadow:0_8px_32px_rgba(26,30,46,0.28),inset_0_0_0_1px_rgba(255,255,255,0.06)] anim-float"
                    >
                        <slot name="icon" />
                    </div>
                </div>

                <!-- Badge -->
                <div
                    ref="badgeRef"
                    class="relative z-[2] inline-flex items-center gap-2 bg-white border border-[#e4e7ec] rounded-full pl-3 pr-4 py-1.5 text-[11px] font-bold tracking-[0.09em] uppercase text-[#1a1e2e] mb-5 shadow-sm"
                >
                    <span class="badge-pulse relative w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    {{ $t('common.comingSoon') }}
                </div>

                <!-- Title -->
                <h2
                    ref="titleRef"
                    class="relative z-[2] text-[clamp(26px,4vw,40px)] font-black text-[#1a1e2e] tracking-[-0.025em] leading-[1.1] mb-4"
                >
                    {{ title }}
                </h2>

                <!-- Description -->
                <p
                    ref="descRef"
                    class="relative z-[2] text-[clamp(14px,1.2vw,16px)] text-[#8a94a6] leading-[1.75] max-w-[360px]"
                >
                    {{ text }}
                </p>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

defineProps<{ title: string; text: string }>()

const wrapRef  = ref<HTMLElement | null>(null)
const iconRef  = ref<HTMLElement | null>(null)
const badgeRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const descRef  = ref<HTMLElement | null>(null)

const sparkles = Array.from({ length: 8 }, (_, i) => {
    const angle  = (i / 8) * Math.PI * 2
    const radius = 120 + (i % 3) * 30
    return {
        id:    i,
        x:     Math.round(Math.cos(angle) * radius + 170),
        y:     Math.round(Math.sin(angle) * radius + 170),
        size:  [5, 4, 6, 4, 5, 6, 4, 5][i],
        delay: +(i * 0.45).toFixed(2),
        dur:   +(2.4 + (i % 3) * 0.6).toFixed(2),
    }
})

onMounted(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(wrapRef.value,
        { y: 48, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.75 }
    )
    .fromTo(iconRef.value,
        { scale: 0, rotate: -15 },
        { scale: 1, rotate: 0, duration: 0.65, ease: 'back.out(1.8)' },
        '-=0.35'
    )
    .fromTo('.empty-ring',
        { scale: 0.3, opacity: 0 },
        { scale: 1,   opacity: 1, duration: 0.55, stagger: 0.12, ease: 'power2.out' },
        '-=0.4'
    )
    .fromTo('.anim-sparkle',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.07, ease: 'back.out(2)' },
        '-=0.3'
    )
    .fromTo(badgeRef.value,
        { y: 18, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.5 },
        '-=0.15'
    )
    .fromTo(titleRef.value,
        { y: 16, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.45 },
        '-=0.3'
    )
    .fromTo(descRef.value,
        { y: 12, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.4 },
        '-=0.28'
    )
})
</script>

<style scoped>
/* Dot grid */
.dot-grid {
    position: absolute;
    inset: -40px;
    background-image: radial-gradient(circle, #b8bec8 1.2px, transparent 1.2px);
    background-size: 26px 26px;
    opacity: 0.5;
    pointer-events: none;
    animation: grid-drift 20s linear infinite;
    mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%);
}

/* Sonar ring animation */
.empty-ring {
    animation: sonar 3.6s ease-out infinite;
}

/* Orbiting dots */
.orbit-dot {
    animation: orbit 7s linear infinite;
}

/* Icon float + shimmer */
.anim-float {
    animation: icon-float 4s ease-in-out infinite;
}
.anim-float::after {
    content: '';
    position: absolute;
    top: 0;
    left: -80%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent);
    transform: skewX(-18deg);
    animation: shimmer 3.5s ease-in-out infinite;
}
.icon-box :deep(svg) {
    width: 38px;
    height: 38px;
    stroke: #fff;
    color: #fff;
    position: relative;
    z-index: 1;
}

/* Badge pulse dot */
.badge-pulse::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: rgba(34, 197, 94, 0.28);
    animation: dot-ping 1.6s ease-out infinite;
}

/* Blob */
.anim-blob {
    animation: float-blob 9s ease-in-out infinite;
}

/* Sparkle */
.anim-sparkle {
    animation: sparkle-blink 2.4s ease-in-out infinite;
}

/* ── Keyframes ── */
@keyframes sonar {
    0%   { transform: scale(0.55); opacity: 0.8; }
    70%  { opacity: 0.12; }
    100% { transform: scale(1.04); opacity: 0; }
}

@keyframes orbit {
    from { transform: rotate(0deg)   translateX(68px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(68px) rotate(-360deg); }
}

@keyframes icon-float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-7px); }
}

@keyframes shimmer {
    0%        { left: -80%; opacity: 0; }
    15%       { opacity: 1; }
    45%, 100% { left: 130%; opacity: 0; }
}

@keyframes dot-ping {
    0%   { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2.4); opacity: 0; }
}

@keyframes sparkle-blink {
    0%, 100% { transform: scale(0) rotate(0deg);    opacity: 0; }
    30%       { transform: scale(1) rotate(45deg);   opacity: 0.5; }
    60%       { transform: scale(0.6) rotate(90deg); opacity: 0.25; }
}

@keyframes grid-drift {
    0%   { background-position: 0 0; }
    100% { background-position: 26px 26px; }
}

@keyframes float-blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%       { transform: translate(24px, 18px) scale(1.1); }
}
</style>
