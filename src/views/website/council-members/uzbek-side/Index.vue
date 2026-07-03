<template>
    <div class="uzbek-side-page">
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <!-- <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-3xl mb-14">
                    {{ $t('uzbekSidePage.intro') }}
                </p> -->

                <!-- Loading skeleton -->
                <div v-if="expertsStore.loading && !members.length" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div v-for="n in 4" :key="n" class="flex bg-white rounded-2xl border border-[#eef0f4] overflow-hidden animate-pulse">
                        <div class="w-[140px] md:w-[180px] shrink-0 bg-[#f0f2f5]"></div>
                        <div class="flex-1 p-5 md:p-6 space-y-2">
                            <div class="h-3 bg-[#f0f2f5] rounded w-2/3"></div>
                            <div class="h-4 bg-[#f0f2f5] rounded w-1/2"></div>
                        </div>
                    </div>
                </div>

                <!-- Empty state -->
                <div v-else-if="!members.length" class="py-16 text-center text-[#8a94a6]">
                    {{ $t('common.noData') }}
                </div>

                <div v-else ref="gridEl" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div
                        v-for="(member, i) in members"
                        :key="member.id"
                        class="group flex bg-white rounded-2xl border border-[#eef0f4] shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300"
                        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                        :style="{ transitionDelay: visible ? `${i * 50}ms` : '0ms' }"
                    >
                        <div class="w-[140px] md:w-[180px] shrink-0 overflow-hidden bg-[#f0f2f5]">
                            <img
                                :src="getMediaUrl(member.imageId)"
                                :alt="resolveTranslation(member.fullName, locale)"
                                class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <!-- Info -->
                        <div class="flex flex-col justify-center p-5 md:p-6 gap-1.5 min-w-0">
                            <p class="text-[12px] md:text-[13px] text-[#8a94a6] font-medium leading-snug">
                                {{ resolveTranslation(member.position, locale) }}
                            </p>
                            <h3 class="font-black text-[15px] md:text-[17px] text-[#1a1e2e] uppercase leading-tight tracking-wide">
                                {{ resolveTranslation(member.fullName, locale) }}
                            </h3>
                            <p v-if="member.bio" class="text-[13px] md:text-[14px] text-[#505a63] leading-relaxed mt-1 line-clamp-4">
                                {{ resolveTranslation(member.bio, locale) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useExpertsStore } from '@/features/experts/store'
import { resolveTranslation } from '@/utils/i18n'
import { getMediaUrl } from '@/utils/media'

const { locale } = useI18n()
const expertsStore = useExpertsStore()
const members = computed(() => expertsStore.items.filter((e) => e.status))

const gridEl = ref<HTMLElement | null>(null)
const visible = ref(false)
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

onMounted(async () => {
    await expertsStore.fetchAll({ type: 'UZBEK', limit: 100, sortBy: 'order', order: 'asc' })
    await nextTick()
    if (!gridEl.value) return
    const root = getScrollParent(gridEl.value)
    observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                visible.value = true
                observer?.disconnect()
            }
        },
        { root, threshold: 0.05 }
    )
    observer.observe(gridEl.value)
})

onUnmounted(() => observer?.disconnect())
</script>
