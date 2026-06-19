<template>
    <div class="secretariat-page">
        <!-- Mission -->
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <h2 class="section-title mb-8">{{ $t('secretariatPage.title') }}</h2>
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-4xl mb-5">
                    {{ $t('secretariatPage.missionText') }}
                </p>
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-4xl">
                    {{ $t('secretariatPage.legalText') }}
                </p>
            </div>
        </section>

        <!-- Team -->
        <section ref="teamEl" class="bg-[#f7f8fa] py-16 md:py-24">
            <div class="page-container">
                <h2 class="section-title text-center mb-14"
                    :class="teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
                    style="transition: all 0.7s">
                    {{ $t('secretariatPage.teamTitle') }}
                </h2>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                    <div v-for="(member, i) in teamMembers" :key="i"
                        class="bg-white rounded-2xl border border-[#eef0f4] overflow-hidden flex flex-col hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] hover:-translate-y-1.5 transition-all duration-400"
                        :class="teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                        :style="{ transition: 'all 0.5s', transitionDelay: teamVisible ? `${i * 80}ms` : '0ms' }">
                        <div class="aspect-[3/3.5] overflow-hidden bg-[#eef0f4]">
                            <img :src="member.photo" :alt="member.name"
                                class="w-full h-full object-cover object-top"
                                @error="(e) => ((e.target as HTMLImageElement).src = defaultPhoto)" />
                        </div>
                        <div class="p-3 md:p-4">
                            <p class="font-bold text-[13px] text-[#1a1e2e] leading-snug">{{ member.name }}</p>
                            <p class="text-[11px] text-[#8a94a6] mt-1 leading-snug">{{ member.role }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact -->
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <h2 class="section-title mb-12">{{ $t('secretariatPage.contactTitle') }}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div v-for="(card, i) in contactCards" :key="i"
                        class="rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] p-6 flex flex-col gap-3">
                        <span class="w-10 h-10 rounded-xl bg-[#1a1e2e] flex items-center justify-center flex-shrink-0">
                            <svg :viewBox="card.viewBox" width="18" height="18" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path v-for="(d, j) in card.paths" :key="j" :d="d" />
                            </svg>
                        </span>
                        <div>
                            <p class="text-[11px] font-bold uppercase tracking-widest text-[#8a94a6] mb-1">{{ $t(card.labelKey) }}</p>
                            <p class="text-[14px] font-semibold text-[#1a1e2e] leading-snug">{{ $t(card.valueKey) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import defaultPhoto from '@/assets/images/avatars/default.png'
import photoAziz from '@/assets/images/exports/aziz2.png'
import photoAvazbek from '@/assets/images/exports/Avazbek.jpg'
import photoHakimniyaz from '@/assets/images/exports/Hakimniyaz.png'
import photoVladislav from '@/assets/images/exports/Vladislav.png'
import photoJorabek from '@/assets/images/exports/jorabek.png'
import photoMadina from '@/assets/images/exports/Madina1.png'

const { t } = useI18n()

const teamMembers = [
    { name: 'Aziz Gafurov',            role: t('secretariatPage.roles.head'),      photo: photoAziz },
    { name: 'Avazbek Mullajonov',       role: t('secretariatPage.roles.coordinator'), photo: photoAvazbek },
    { name: 'Hakimniyaz Kaipbergenov', role: t('secretariatPage.roles.coordinator'), photo: photoHakimniyaz },
    { name: 'Vladislav Li',            role: t('secretariatPage.roles.coordinator'), photo: photoVladislav },
    { name: 'Jurabek Babaev',          role: t('secretariatPage.roles.pr'),        photo: photoJorabek },
    { name: 'Madinakhon Abidova',      role: t('secretariatPage.roles.admin'),     photo: photoMadina },
]

const contactCards = [
    {
        labelKey: 'footer.addressLabel',
        valueKey: 'secretariatPage.address',
        viewBox: '0 0 24 24',
        paths: ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', 'M12 10m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0'],
    },
    {
        labelKey: 'footer.phoneLabel',
        valueKey: 'secretariatPage.phone',
        viewBox: '0 0 24 24',
        paths: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.79h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z'],
    },
    {
        labelKey: 'footer.emailLabel',
        valueKey: 'secretariatPage.email',
        viewBox: '0 0 24 24',
        paths: ['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', 'M22 6l-10 7L2 6'],
    },
    {
        labelKey: 'nav.events',
        valueKey: 'secretariatPage.workHours',
        viewBox: '0 0 24 24',
        paths: ['M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z', 'M12 6v6l4 2'],
    },
]

const teamEl = ref<HTMLElement | null>(null)
const teamVisible = ref(false)
let observer: IntersectionObserver | null = null

const getScrollParent = (el: HTMLElement): Element => {
    let parent = el.parentElement
    while (parent && parent !== document.documentElement) {
        const { overflowY } = window.getComputedStyle(parent)
        if (overflowY === 'auto' || overflowY === 'scroll') return parent
        parent = parent.parentElement
    }
    return document.documentElement
}

onMounted(() => {
    if (!teamEl.value) return
    const root = getScrollParent(teamEl.value)
    observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                teamVisible.value = true
                observer?.disconnect()
            }
        },
        { root, threshold: 0.1 }
    )
    observer.observe(teamEl.value)
})

onUnmounted(() => observer?.disconnect())
</script>
