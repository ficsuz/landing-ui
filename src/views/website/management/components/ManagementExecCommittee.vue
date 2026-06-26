<template>
    <section ref="sectionEl" class="bg-[#f7f8fa] py-16 md:py-24">
        <div class="page-container">
            <h2
                class="section-title text-center mb-12 md:mb-16 transition-all duration-700"
                :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
                {{ $t('exec.title') }}
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div
                    v-for="(member, i) in members"
                    :key="i"
                    class="group bg-white rounded-2xl border border-[#eef0f4] overflow-hidden flex flex-col transition-all duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] hover:-translate-y-1.5"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                    :style="{ transitionDelay: visible ? `${i * 90}ms` : '0ms' }"
                >
                    <!-- Logo -->
                    <div class="flex items-center justify-center h-[72px] px-4 border-b border-[#eef0f4]">
                        <img :src="member.logo" :alt="$t(`exec.${member.key}.name`)" class="w-auto object-contain" style="max-width: 140px" />
                    </div>

                    <!-- Photo + bio overlay -->
                    <div class="relative w-full aspect-[3/3.5] overflow-hidden bg-[#eef0f4]">
                        <img
                            :src="member.photo"
                            :alt="$t(`exec.${member.key}.name`)"
                            class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            @error="(e) => ((e.target as HTMLImageElement).src = defaultPhoto)"
                        />
                        <!-- Bio overlay -->
                        <div
                            class="absolute inset-0 flex flex-col p-4 bg-[#1a1e2e]/95 backdrop-blur-[2px] transition-opacity duration-300 lg:group-hover:opacity-100 lg:group-hover:pointer-events-auto"
                            :class="openBio === i ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
                        >
                            <p class="text-[10px] uppercase tracking-[0.16em] font-bold text-white/45 mb-2 shrink-0">
                                {{ $t('management.biography') }}
                            </p>
                            <p class="text-[12.5px] leading-relaxed text-white/90 overflow-y-auto pr-1">
                                {{ $t(`exec.${member.key}.bio`) }}
                            </p>
                        </div>
                    </div>

                    <!-- Info -->
                    <div class="flex flex-col items-center px-4 pt-4 pb-5 flex-1">
                        <p class="font-bold text-[13px] text-[#1a1e2e] text-center leading-snug">
                            {{ $t(`exec.${member.key}.name`) }}
                        </p>
                        <span class="mt-2 text-[11px] font-semibold text-[#2563eb] text-center leading-tight">
                            {{ $t(member.isChair ? 'management.execChair' : 'management.execMember') }}
                        </span>
                        <p class="mt-2 mb-4 text-[12px] text-[#8a94a6] text-center leading-relaxed">
                            {{ $t(`exec.${member.key}.role`) }}
                        </p>
                        <button
                            type="button"
                            @click="openBio = openBio === i ? null : i"
                            class="mt-auto px-5 py-1.5 rounded-full border text-[12px] font-semibold transition-all duration-200"
                            :class="
                                openBio === i
                                    ? 'bg-[#1a1e2e] text-white border-[#1a1e2e]'
                                    : 'border-[#d0d5dd] text-[#1a1e2e] hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e]'
                            "
                        >
                            {{ openBio === i ? $t('common.close') : $t('management.biography') }}
                        </button>
                    </div>
                </div>
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
import avatar5 from '@/assets/images/exports/aziz2.png'

import logoEbrd from '@/assets/images/brands/e-bank.png'
import logoAdb from '@/assets/images/brands/ad-bank.png'
import logoIfc from '@/assets/images/brands/ifc2.png'
import logoMinistry from '@/assets/images/brands/miit.png'
import logoFic from '@/assets/images/icons/ba12d8ddde154e568c101e56e4a917883a60b20a.png'

const members = [
    { key: 'm1', logo: logoMinistry, photo: avatar1, isChair: true },
    { key: 'm2', logo: logoEbrd, photo: avatar2, isChair: false },
    { key: 'm3', logo: logoAdb, photo: avatar3, isChair: false },
    { key: 'm4', logo: logoIfc, photo: avatar4, isChair: false },
    { key: 'm5', logo: logoFic, photo: avatar5, isChair: false },
]

const visible = ref(false)
const openBio = ref<number | null>(null)
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

onUnmounted(() => observer?.disconnect())
</script>
