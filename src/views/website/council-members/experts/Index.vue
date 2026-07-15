<template>
    <div class="experts-page">
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <!-- Intro -->
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-3xl mb-10">
                    {{ $t('expertsPage.intro') }}
                </p>

                <!-- Tab selector cards -->
                <div class="flex flex-col gap-3 mb-12">
                    <button
                        v-for="tab in tabs"
                        :key="tab.key"
                        class="group w-full flex items-center justify-between gap-6 rounded-2xl border px-7 py-6 text-left transition-all duration-300 cursor-pointer"
                        :class="
                            activeTab === tab.key
                                ? 'bg-[#1a1e2e] border-[#1a1e2e] shadow-[0_4px_24px_rgba(26,30,46,0.18)]'
                                : 'bg-[#f7f8fa] border-[#eef0f4] hover:border-[#c8cdd8] hover:bg-[#f0f2f5]'
                        "
                        @click="switchTab(tab.key)"
                    >
                        <div class="flex-1 min-w-0">
                            <h3
                                class="font-black text-[15px] md:text-[17px] uppercase tracking-wide mb-1.5"
                                :class="activeTab === tab.key ? 'text-white' : 'text-[#1a1e2e]'"
                            >
                                {{ tab.title }}
                            </h3>
                            <p
                                class="text-[13px] md:text-[14px] leading-relaxed"
                                :class="activeTab === tab.key ? 'text-white/70' : 'text-[#8a94a6]'"
                            >
                                {{ tab.desc }}
                            </p>
                        </div>
                        <span
                            class="font-black text-[52px] md:text-[64px] leading-none tabular-nums shrink-0 transition-colors duration-300"
                            :class="activeTab === tab.key ? 'text-white' : 'text-[#1a1e2e]/10 group-hover:text-[#1a1e2e]/20'"
                        >
                            {{ tab.count }}
                        </span>
                    </button>
                </div>

                <!-- Loading skeleton -->
                <div v-if="loading && !activeExperts.length" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div v-for="n in 4" :key="n" class="flex bg-white rounded-2xl border border-[#eef0f4] overflow-hidden animate-pulse">
                        <div class="w-[130px] md:w-[170px] shrink-0 bg-[#f0f2f5]"></div>
                        <div class="flex-1 p-5 md:p-6 space-y-2">
                            <div class="h-3 bg-[#f0f2f5] rounded w-2/3"></div>
                            <div class="h-4 bg-[#f0f2f5] rounded w-1/2"></div>
                            <div class="h-3 bg-[#f0f2f5] rounded w-full"></div>
                        </div>
                    </div>
                </div>

                <!-- Empty state -->
                <div v-else-if="!activeExperts.length" class="py-16 text-center text-[#8a94a6]">
                    {{ $t('common.noData') }}
                </div>

                <!-- Expert cards -->
                <div v-else ref="gridEl" class="relative grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <TransitionGroup name="expert-card">
                        <div
                            v-for="(expert, i) in activeExperts"
                            :key="expert.id"
                            class="group flex bg-white rounded-2xl border border-[#eef0f4] shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300"
                            :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                            :style="{ transitionDelay: visible ? `${i * 40}ms` : '0ms' }"
                        >
                            <!-- Photo -->
                            <div class="w-[130px] md:w-[170px] shrink-0 overflow-hidden bg-[#f0f2f5]">
                                <img
                                    :src="getMediaUrl(expert.imageId)"
                                    :alt="resolveTranslation(expert.fullName, locale)"
                                    class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <!-- Info -->
                            <div class="flex flex-col justify-center p-5 md:p-6 gap-1.5 min-w-0">
                                <p class="text-[12px] md:text-[13px] text-[#8a94a6] font-medium leading-snug">
                                    {{ resolveTranslation(expert.position, locale) }}
                                </p>
                                <h3 class="font-black text-[14px] md:text-[16px] text-[#1a1e2e] uppercase leading-tight tracking-wide">
                                    {{ resolveTranslation(expert.fullName, locale) }}
                                </h3>
                                <p v-if="expert.bio" class="text-[13px] md:text-[14px] text-[#505a63] leading-relaxed mt-1 line-clamp-4">
                                    {{ resolveTranslation(expert.bio, locale) }}
                                </p>
                            </div>
                        </div>
                    </TransitionGroup>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useExpertsStore } from '@/features/experts/store'
import type { Expert } from '@/features/experts/types'
import { resolveTranslation } from '@/utils/i18n'
import { getMediaUrl } from '@/utils/media'

const { t, locale } = useI18n()
const expertsStore = useExpertsStore()

type TabKey = 'international' | 'local'

const internationalExperts = ref<Expert[]>([])
const localExperts = ref<Expert[]>([])
const loading = ref(true)

async function loadExperts() {
    loading.value = true
    try {
        const intl = await expertsStore.fetchAll({ type: 'INTERNATIONAL', limit: 100, sortBy: 'order', order: 'asc' })
        internationalExperts.value = intl.data.filter((e) => e.status)
        // Local experts hozircha backenddan uzib qo'yilgan — bo'sh (no data) ko'rsatiladi
        localExperts.value = []
    } finally {
        loading.value = false
    }
}

const activeTab = ref<TabKey>('international')

const tabs = computed(() => [
    {
        key: 'international' as TabKey,
        title: t('expertsPage.internationalTitle'),
        desc: t('expertsPage.internationalDesc'),
        count: internationalExperts.value.length,
    },
    {
        key: 'local' as TabKey,
        title: t('expertsPage.localTitle'),
        desc: t('expertsPage.localDesc'),
        count: localExperts.value.length,
    },
])

const activeExperts = computed(() =>
    activeTab.value === 'international' ? internationalExperts.value : localExperts.value,
)

const switchTab = (key: TabKey) => {
    activeTab.value = key
}

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
    await loadExperts()
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
        { root, threshold: 0.05 },
    )
    observer.observe(gridEl.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.expert-card-enter-active,
.expert-card-leave-active {
    transition: all 0.3s ease;
}
.expert-card-enter-from {
    opacity: 0;
    transform: translateY(16px);
}
.expert-card-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
/* Take leaving cards out of grid flow so they don't overlap/double up with the incoming tab's cards */
.expert-card-leave-active {
    position: absolute;
    width: 100%;
}
</style>
