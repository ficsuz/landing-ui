<template>
    <section ref="sectionEl" class="bg-[#f7f8fa] py-16 md:py-24">
        <!-- Title -->
        <div class="page-container mb-12 md:mb-16">
            <h2
                class="section-title text-center transition-all duration-700"
                :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
                {{ $t('exec.title') }}
            </h2>
        </div>

        <!-- Cards grid -->
        <div class="px-4 md:px-10 max-w-[1440px] mx-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div
                    v-for="(member, i) in members"
                    :key="i"
                    class="group bg-white rounded-2xl border border-[#eef0f4] p-4 flex flex-col transition-all duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] hover:-translate-y-1.5"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                    :style="{ transitionDelay: visible ? `${i * 90}ms` : '0ms' }"
                >
                    <!-- Logo -->
                    <div class="flex items-center justify-center h-[72px] mb-3">
                        <img :src="member.logo" :alt="$t(`exec.${member.key}.name`)" class="w-auto object-contain" :style="member.logoStyle" />
                    </div>

                    <!-- Photo -->
                    <div class="rounded-2xl overflow-hidden aspect-[3/3.4] bg-[#eef0f4]">
                        <img
                            :src="member.photo"
                            :alt="$t(`exec.${member.key}.name`)"
                            class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            @error="(e) => ((e.target as HTMLImageElement).src = defaultPhoto)"
                        />
                    </div>

                    <!-- Quote -->
                    <div class="px-1 pt-5 pb-4 flex-1">
                        <p class="text-[13px] text-[#555] italic leading-relaxed text-center">"{{ $t(`exec.${member.key}.quote`) }}"</p>
                    </div>

                    <!-- Divider -->
                    <div class="border-t border-[#eef0f4]"></div>

                    <!-- Name / Role -->
                    <div class="pt-4 px-1 text-center min-h-[100px]">
                        <p class="font-extrabold text-[17px] text-[#1a1e2e] leading-tight line-clamp-2">{{ $t(`exec.${member.key}.name`) }}</p>
                        <p class="text-[12px] text-[#8a94a6] mt-1.5 leading-snug line-clamp-2">{{ $t(`exec.${member.key}.role`) }}</p>
                    </div>
                </div>
            </div>

            <!-- Learn more -->
            <div
                class="flex justify-center mt-10 transition-all duration-700 delay-500"
                :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            >
                <AppLearnMore to="/management" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import defaultPhoto from '@/assets/images/avatars/default-avatar.svg'
import avatar1 from '@/assets/images/exports/foreign1.png'
import avatar2 from '@/assets/images/exports/foreign2.png'
import avatar3 from '@/assets/images/exports/foreign3.png'
import avatar4 from '@/assets/images/exports/foreign4.png'
import avatar5 from '@/assets/images/avatars/A.Gafurov.jpg'

import logoEbrd from '@/assets/images/brands/e-bank.png'
import logoAdb from '@/assets/images/brands/ad-bank.png'
import logoIfc from '@/assets/images/brands/ifc2.png'
import logoMinistry from '@/assets/images/brands/miit.png'
import logoFic from '@/assets/images/icons/ba12d8ddde154e568c101e56e4a917883a60b20a.png'

const DEFAULT_LOGO_STYLE = 'max-width: 160px; max-height: 46px'
const WIDE_LOGO_STYLE = 'max-width: 240px; max-height: 66px'

const members = [
    { key: 'm1', logo: logoMinistry, photo: avatar1, logoStyle: DEFAULT_LOGO_STYLE },
    { key: 'm2', logo: logoEbrd, photo: avatar2, logoStyle: WIDE_LOGO_STYLE },
    { key: 'm3', logo: logoAdb, photo: avatar3, logoStyle: WIDE_LOGO_STYLE },
    { key: 'm4', logo: logoIfc, photo: avatar4, logoStyle: DEFAULT_LOGO_STYLE },
    { key: 'm5', logo: logoFic, photo: avatar5, logoStyle: DEFAULT_LOGO_STYLE },
]

const visible = ref(false)
const sectionEl = ref<HTMLElement | null>(null)
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
    if (!sectionEl.value) return
    const root = getScrollParent(sectionEl.value)
    observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                visible.value = true
                observer?.disconnect()
            }
        },
        { root, threshold: 0.1 }
    )
    observer.observe(sectionEl.value)
})

onUnmounted(() => {
    observer?.disconnect()
})
</script>
