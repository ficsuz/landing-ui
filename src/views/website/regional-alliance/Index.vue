<template>
    <div class="regional-alliance-page">
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <!-- Page header: logo + full title + tagline -->
                <div class="flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-9 mb-10 md:mb-12">
                    <img :src="imgRaicLogo" alt="RAIC-CAC" class="w-[72px] md:w-[104px] object-contain shrink-0" />
                    <div class="flex flex-col gap-3 text-center md:text-left">
                        <h1 class="font-black uppercase leading-[1.1] text-[clamp(32px,3.4vw,54px)] text-[#1a1e2e]">
                            {{ $t('regionalAlliancePage.title') }}
                            <span class="text-[#8a94a6]">({{ $t('regionalAlliancePage.abbr') }})</span>
                        </h1>
                        <p class="font-bold uppercase tracking-wide text-[clamp(13px,1.4vw,17px)] text-[#2d4cc5]">
                            {{ $t('regionalAlliancePage.tagline') }}
                        </p>
                    </div>
                </div>

                <!-- Mission -->
                <div class="rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] p-6 md:p-8 mb-16 md:mb-20 border-l-[3px] border-l-[#1a1e2e]">
                    <span class="block text-[14px] font-black uppercase tracking-[0.14em] text-[#1a1e2e] mb-3">
                        {{ $t('regionalAlliancePage.missionLabel') }}
                    </span>
                    <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed">
                        {{ $t('regionalAlliancePage.mission') }}
                    </p>
                </div>

                <!-- Founding Members -->
                <div class="mb-16 md:mb-20">
                    <h2 class="ra-section-title mb-8 md:mb-10">{{ $t('regionalAlliancePage.membersTitle') }}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                        <div
                            v-for="(m, i) in members"
                            :key="i"
                            class="flex flex-col rounded-2xl border border-[#eef0f4] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d0d5dd] hover:shadow-[0_12px_36px_rgba(25,28,31,0.08)]"
                        >
                            <h3 class="font-bold text-[17px] text-[#1a1e2e] leading-tight mb-2">{{ m.country }}</h3>
                            <p class="text-[14px] leading-relaxed text-[#505a63] flex-1">{{ m.council }}</p>
                            <div class="mt-5 pt-5 border-t border-[#eef0f4] flex items-center justify-center h-[120px]">
                                <img
                                    :src="m.logo"
                                    :alt="m.country"
                                    class="object-contain"
                                    :class="
                                        m.big
                                            ? 'max-h-[92px] w-full'
                                            : m.small
                                            ? 'max-h-[42px] max-w-[68%] w-auto'
                                            : 'max-h-[52px] max-w-[78%] w-auto'
                                    "
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Strategic Partner -->
                <div class="mb-16 md:mb-20">
                    <h2 class="ra-section-title mb-8 md:mb-10">{{ $t('regionalAlliancePage.partnerTitle') }}</h2>
                    <img
                        :src="imgStrategicPartner"
                        :alt="$t('regionalAlliancePage.partnerName')"
                        class="max-h-[52px] md:max-h-[60px] w-auto object-contain"
                    />
                </div>

                <!-- Objectives -->
                <div class="mb-16 md:mb-20">
                    <h2 class="ra-section-title mb-8 md:mb-10">{{ $t('regionalAlliancePage.objectivesTitle') }}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
                        <div v-for="(o, i) in objectives" :key="i" class="flex flex-col gap-4 rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] p-6">
                            <span
                                class="flex items-center justify-center w-12 h-12 rounded-full bg-[#1a1e2e] text-white"
                                v-html="objectiveIcons[i]"
                            />
                            <div class="flex flex-col gap-2">
                                <h3 class="font-bold text-[15px] text-[#1a1e2e] leading-tight min-h-[2.5em] flex items-start">{{ o.title }}</h3>
                                <p class="text-[13px] leading-relaxed text-[#8a94a6]">{{ o.desc }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TIIF Events -->
                <div>
                    <h2 class="ra-section-title mb-3">{{ $t('regionalAlliancePage.eventsTitle') }}</h2>
                    <p class="text-[clamp(14px,1.1vw,16px)] text-[#8a94a6] mb-8 md:mb-10">
                        {{ $t('regionalAlliancePage.eventsSubtitle') }}
                    </p>

                    <!-- Forum sessions — same card pattern as the Meetings page -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <router-link
                            v-for="(ev, i) in events"
                            :key="i"
                            :to="{ name: 'events-meetings' }"
                            class="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#eef0f4] shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.11)] hover:-translate-y-1 transition-all duration-300"
                        >
                            <!-- Cover -->
                            <div class="relative overflow-hidden aspect-[16/10] shrink-0">
                                <img
                                    :src="ev.image"
                                    :alt="ev.title"
                                    class="w-full h-full object-cover transition-transform duration-1500 group-hover:scale-105"
                                />
                            </div>

                            <!-- Body -->
                            <div class="flex flex-col flex-1 p-5 md:p-6">
                                <p class="text-[11px] font-bold tracking-widest uppercase text-[#4361ee] mb-2">
                                    {{ ev.subject }}
                                </p>

                                <h3 class="font-bold text-[16px] md:text-[17px] text-[#1a1e2e] leading-snug">
                                    {{ ev.title }}
                                </h3>
                                <p class="mt-2 text-[14px] leading-relaxed text-[#505a63] flex-1">{{ ev.desc }}</p>

                                <!-- Footer: date + arrow -->
                                <div class="mt-4 pt-4 border-t border-[#eef0f4] flex items-center justify-between">
                                    <span class="text-[14px] text-[#8a94a6] flex items-center gap-1.5">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        {{ ev.date }}
                                    </span>
                                    <span
                                        class="w-8 h-8 rounded-full flex items-center justify-center bg-[#f7f8fa] group-hover:bg-[#1a1e2e] transition-colors duration-300"
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="text-[#8a94a6] group-hover:text-white transition-colors duration-300"
                                        >
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </router-link>
                    </div>

                    <!-- Memorandum signing — informational block, documents live on the Results section -->
                    <div
                        class="mt-6 flex flex-col md:flex-row items-center md:items-start gap-6 rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] p-6 md:p-8 border-l-[3px] border-l-[#1a1e2e]"
                    >
                        <span class="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#1a1e2e] text-white">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <path d="M8 16c1.5-3 2.5-3 3.5 0s2 3 3.5-1" />
                            </svg>
                        </span>
                        <div class="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
                            <span class="text-[11px] font-black uppercase tracking-[0.14em] text-[#1a1e2e]">
                                {{ $t('regionalAlliancePage.memorandum.subject') }}
                                <span class="text-[#8a94a6]">· {{ $t('regionalAlliancePage.memorandum.date') }}</span>
                            </span>
                            <h3 class="font-bold text-[clamp(17px,1.6vw,22px)] text-[#1a1e2e] leading-snug">
                                {{ $t('regionalAlliancePage.memorandum.title') }}
                            </h3>
                            <p class="text-[clamp(14px,1.2vw,17px)] text-[#444] leading-relaxed">
                                {{ $t('regionalAlliancePage.memorandum.desc') }}
                            </p>
                            <router-link
                                :to="{ name: 'results-documents' }"
                                class="mt-1 inline-flex items-center gap-2 border border-[#d0d5dd] text-[#1a1e2e] font-semibold text-[15px] px-7 py-3 rounded-full transition-all duration-200 hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e]"
                            >
                                {{ $t('common.viewDocuments') }}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import imgRaicLogo from '@/assets/images/regional-image/21.png'
import imgStrategicPartner from '@/assets/images/regional-image/strategic-partner.png'
import imgStrategicSession from '@/assets/images/hero/SUT_8193.jpg'
import imgPanelSession from '@/assets/images/interim-session/DSC02281.JPG'
import logoArmenia from '@/assets/images/regional-image/member-armenia.png'
import logoGeorgia from '@/assets/images/regional-image/member-georgia.png'
import logoKazakhstan from '@/assets/images/regional-image/member-kazakhstan.png'
import logoKyrgyz from '@/assets/images/regional-image/member-kyrgyz.png'
import logoTajikistan from '@/assets/images/regional-image/member-tajikistan.png'
import logoTurkmenistan from '@/assets/images/regional-image/member-turkmenistan.png'
import logoUzbekistan from '@/assets/images/regional-image/member-uzbekistan.png'

const { tm, rt } = useI18n()

// Order matches the members list in locale files
const memberLogos = [logoArmenia, logoGeorgia, logoKazakhstan, logoKyrgyz, logoTajikistan, logoTurkmenistan, logoUzbekistan]
// Wide, text-dense logos that need to fill the card width to stay readable
const bigLogos = new Set([2]) // Kazakhstan
// Logos that render visually larger than the rest and need trimming
const smallLogos = new Set([0]) // Armenia

const members = computed(() =>
    (tm('regionalAlliancePage.members') as any[]).map((m, i) => ({
        logo: memberLogos[i] ?? '',
        big: bigLogos.has(i),
        small: smallLogos.has(i),
        country: rt(m.country),
        council: rt(m.council),
    }))
)

const objectives = computed(() =>
    (tm('regionalAlliancePage.objectives') as any[]).map((o) => ({
        title: rt(o.title),
        desc: rt(o.desc),
    }))
)

// Order matches the events list in locale files
const eventImages = [imgStrategicSession, imgPanelSession]

const events = computed(() =>
    (tm('regionalAlliancePage.events') as any[]).map((e, i) => ({
        image: eventImages[i] ?? '',
        date: rt(e.date),
        subject: rt(e.subject),
        title: rt(e.title),
        desc: rt(e.desc),
    }))
)


// Objective icons (order matches image: dialogue, integration, climate, exchange, promotion)
const objectiveIcons = [
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
]
</script>

<style scoped>
/* Section headings sit below the long page title, so keep them smaller for correct hierarchy */
.ra-section-title {
    font-weight: 900;
    font-size: clamp(22px, 2.6vw, 34px);
    line-height: 1.1;
    text-transform: uppercase;
    color: #1a1e2e;
}
</style>
