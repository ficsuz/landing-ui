<template>
    <div v-if="session" class="bg-white">
        <!-- Hero -->
        <WebHeroSection v-if="session.detail?.heroImage" :title="L(session.detail.heroTitle)" :image="session.detail.heroImage" />

        <div class="py-16 md:py-24">
            <div class="page-container">
                <!-- Back button -->
                <button
                    @click="router.back()"
                    class="inline-flex items-center gap-2 text-[14px] font-semibold text-[#1a1e2e] border border-[#d0d5dd] px-4 py-2 rounded-full mb-10 hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] transition-all duration-200"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    {{ $t('common.back') }}
                </button>

                <!-- Date heading -->
                <h2 class="font-black text-[clamp(22px,3vw,36px)] text-[#1a1e2e] uppercase mb-4">
                    {{ L(session.date) }}
                </h2>
                <div class="border-t-2 border-[#1a1e2e] mb-8" />

                <!-- Gallery -->
                <div v-if="session.detail?.gallery?.length" class="grid grid-cols-6 gap-3 md:gap-4 mb-12">
                    <div
                        v-for="(img, i) in session.detail.gallery"
                        :key="i"
                        class="overflow-hidden rounded-2xl"
                        :class="gridClass(i)"
                    >
                        <img :src="img" :alt="`${session.code} — photo ${i + 1}`" class="w-full h-full object-cover" />
                    </div>
                </div>

                <!-- Paragraph card -->
                <div v-if="session.detail" class="rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] p-6 md:p-8 mb-8">
                    <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed">
                        {{ L(session.detail.paragraph) }}
                    </p>
                </div>

                <!-- Stat cards -->
                <div v-if="session.detail?.stats?.length" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div v-for="(stat, i) in session.detail.stats" :key="i" class="rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] p-7 md:p-8 flex flex-col gap-3">
                        <span class="font-black text-[clamp(40px,5vw,64px)] text-[#1a1e2e] leading-none">
                            {{ stat.value }}
                        </span>
                        <span class="text-[15px] md:text-[16px] font-medium text-[#505a63] leading-snug capitalize">
                            {{ L(stat.label) }}
                        </span>
                    </div>
                </div>

                <!-- Content blocks (text + quote) -->
                <div v-if="session.detail?.contentBlocks?.length" class="mt-10 flex flex-col gap-5">
                    <template v-for="(block, i) in session.detail.contentBlocks" :key="i">
                        <blockquote
                            v-if="block.type === 'quote'"
                            class="border-l-4 border-[#1a1e2e] pl-6 py-4 bg-[#f7f8fa] rounded-r-2xl"
                        >
                            <p class="font-bold text-[clamp(15px,1.3vw,18px)] text-[#1a1e2e] leading-relaxed">
                                {{ L(block.text) }}
                            </p>
                        </blockquote>
                        <p v-else class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed">
                            {{ L(block.text) }}
                        </p>
                    </template>
                </div>

                <!-- Roadmap by working group -->
                <div v-if="session.detail?.roadmap?.length" class="mt-12 md:mt-16">
                    <h2 class="font-black text-[13px] uppercase tracking-widest text-[#1a1e2e] mb-4">{{ $t('eventsPage.interimPage.roadmapTitle') }}</h2>
                    <div class="border-t border-[#1a1e2e] mb-6" />
                    <div class="flex flex-col">
                        <div
                            v-for="(item, i) in session.detail.roadmap"
                            :key="i"
                            class="flex items-start gap-4 py-5 text-[15px] leading-snug"
                            :class="i < session.detail.roadmap.length - 1 ? 'border-b border-[#eef0f4]' : ''"
                        >
                            <span class="flex-shrink-0 w-2 h-2 rounded-full bg-[#1a1e2e] mt-[6px]" />
                            <p class="text-[#1a1e2e]">
                                <strong>{{ L(item.title) }}</strong>
                                {{ ' ' }}—{{ ' ' }}
                                <span class="text-[#505a63]">{{ L(item.description) }}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Legal basis -->

                <!-- Strategic initiatives -->
                <div v-if="session.detail?.initiatives?.length" class="mt-12 md:mt-16">
                    <h2 class="font-black text-[13px] uppercase tracking-widest text-[#1a1e2e] mb-4">{{ $t('eventsPage.interimPage.initiativesTitle') }}</h2>
                    <div class="border-t border-[#1a1e2e] mb-6" />
                    <div class="flex flex-col">
                        <div
                            v-for="(item, i) in session.detail.initiatives"
                            :key="i"
                            class="flex items-start gap-4 py-5 text-[15px] leading-snug"
                            :class="i < session.detail.initiatives.length - 1 ? 'border-b border-[#eef0f4]' : ''"
                        >
                            <span class="flex-shrink-0 w-2 h-2 rounded-full bg-[#1a1e2e] mt-[6px]" />
                            <p class="text-[#1a1e2e]">
                                <strong>{{ L(item.title) }}</strong>
                                {{ ' ' }}—{{ ' ' }}
                                <span class="text-[#505a63]">{{ L(item.description) }}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div v-if="session.detail?.legalBasis" class="mt-12 md:mt-16">
                    <div
                        class="rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                        <div>
                            <p class="font-black text-[12px] uppercase tracking-widest text-[#1a1e2e] mb-1">{{ $t('eventsPage.interimPage.legalBasis') }}</p>
                            <p class="text-[14px] text-[#505a63] leading-snug">{{ L(session.detail.legalBasis.text) }}</p>
                        </div>
                        <AppLearnMore :to="session.detail.legalBasis.docHref" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="py-24 text-center text-[#8a94a6]">{{ $t('eventsPage.sessionNotFound') }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { interimSessions } from './interimSessionsData'
import WebHeroSection from '@/components/website/WebHeroSection.vue'
import AppLearnMore from '@/components/website/AppLearnMore.vue'
import { resolveTranslation } from '@/utils/i18n'
import type { Translation } from '@/types/server/api.types'

const { locale } = useI18n()
const router = useRouter()
const route = useRoute()
const session = computed(() => interimSessions.find((s) => s.id === Number(route.params.id)))

const L = (t?: Translation | null) => resolveTranslation(t, locale.value)

function gridClass(index: number): string {
    if (index < 3) return 'col-span-3 md:col-span-2 h-[200px] md:h-[280px]'
    if (index < 5) return 'col-span-3 h-[220px] md:h-[340px]'
    return 'col-span-3 md:col-span-2 h-[200px] md:h-[280px]'
}
</script>
