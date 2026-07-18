<template>
    <div class="become-a-member-page">
        <!-- Hero intro -->
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <h2 class="section-title text-center mb-6">
                    {{ $t('becomeAMemberPage.categoriesSubtitle') }}
                </h2>
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-3xl mx-auto text-center">
                    {{ $t('becomeAMemberPage.intro') }}
                </p>

                <!-- Admission Procedure -->
                <div ref="sectionEl" class="mt-20">
                    <h3 class="text-[clamp(18px,2vw,28px)] font-black uppercase text-[#1a1e2e] leading-tight mb-8">
                        {{ $t('becomeAMemberPage.admissionTitle') }}
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div
                            v-for="(step, i) in steps"
                            :key="step.num"
                            class="relative flex flex-col bg-white rounded-2xl border border-[#eef0f4] p-6 md:p-7 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300"
                            :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                            :style="{ transition: 'all 0.5s', transitionDelay: visible ? `${i * 80}ms` : '0ms' }"
                        >
                            <!-- Step number + chevron row -->
                            <div class="flex items-center justify-between mb-6">
                                <span class="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#1a1e2e] text-white font-black text-[14px] shrink-0">
                                    {{ step.num }}
                                </span>
                                <svg
                                    v-if="i < steps.length - 1"
                                    class="w-4 h-4 text-[#c8cdd8]"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                                <span v-else class="w-4 h-4" />
                            </div>

                            <!-- Content -->
                            <p class="font-bold text-[15px] md:text-[16px] text-[#1a1e2e] leading-snug mb-3">
                                {{ step.title }}
                            </p>
                            <p class="text-[13px] md:text-[14px] text-[#505a63] leading-relaxed flex-1">
                                {{ step.desc }}
                            </p>
                        </div>
                    </div>

                    <!-- Footnote -->
                    <p class="mt-8 text-[13px] text-[#8a94a6] italic leading-relaxed">
                        {{ $t('becomeAMemberPage.admissionNote') }}
                    </p>
                </div>

                <!-- Membership Categories -->
                <div ref="categoriesEl" class="mt-20">
                    <h3 class="text-[clamp(18px,2vw,28px)] font-black uppercase text-[#1a1e2e] leading-tight mb-8">
                        {{ $t('becomeAMemberPage.categoriesTitle') }}
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div
                            v-for="(cat, i) in categories"
                            :key="i"
                            class="flex flex-col rounded-2xl border border-[#eef0f4] bg-white p-7 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300"
                            :class="categoriesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                            :style="{ transition: 'all 0.5s', transitionDelay: categoriesVisible ? `${i * 100}ms` : '0ms' }"
                        >
                            <!-- Category title -->
                            <h4 class="font-black text-[14px] md:text-[15px] text-[#1a1e2e] uppercase tracking-wide mb-5">
                                {{ cat.title }}
                            </h4>

                            <!-- Perks list -->
                            <ul class="flex flex-col gap-3 flex-1">
                                <li
                                    v-for="(perk, j) in cat.perks"
                                    :key="j"
                                    class="flex items-start gap-3"
                                >
                                    <svg class="w-4 h-4 mt-0.5 shrink-0 text-[#1a1e2e]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span class="text-[13px] md:text-[14px] text-[#505a63] leading-snug">{{ perk }}</span>
                                </li>
                            </ul>

                            <!-- Member limit badge -->
                            <template v-if="cat.limit">
                                <div class="mt-6 pt-5 border-t border-[#eef0f4]">
                                    <span class="inline-block bg-[#f0f2f5] text-[#1a1e2e] font-bold text-[13px] px-4 py-1.5 rounded-full">
                                        {{ cat.limit }}
                                    </span>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm, rt } = useI18n()

const steps = computed(() =>
    (tm('becomeAMemberPage.steps') as any[]).map((s) => ({
        num: rt(s.num),
        title: rt(s.title),
        desc: rt(s.desc),
    })),
)

const categories = computed(() =>
    (tm('becomeAMemberPage.categories') as any[]).map((c) => ({
        title: rt(c.title),
        limit: c.limit ? rt(c.limit) : null,
        perks: (c.perks as any[]).map((p) => rt(p)),
    })),
)

const sectionEl = ref<HTMLElement | null>(null)
const visible = ref(false)
const categoriesEl = ref<HTMLElement | null>(null)
const categoriesVisible = ref(false)
let observer: IntersectionObserver | null = null
let categoriesObserver: IntersectionObserver | null = null

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
    const observe = (el: HTMLElement, onVisible: () => void): IntersectionObserver => {
        const root = getScrollParent(el)
        const obs = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) { onVisible(); obs.disconnect() } },
            { root, threshold: 0.05 },
        )
        obs.observe(el)
        return obs
    }

    if (sectionEl.value) observer = observe(sectionEl.value, () => (visible.value = true))
    if (categoriesEl.value) categoriesObserver = observe(categoriesEl.value, () => (categoriesVisible.value = true))
})

onUnmounted(() => {
    observer?.disconnect()
    categoriesObserver?.disconnect()
})
</script>
