<template>
    <div class="news-page">
        <!-- Header with category filters -->
        <section class="bg-white pt-10 pb-0 border-b border-[#eef0f4]">
            <div class="page-container">
                <div class="flex flex-wrap gap-2 pb-6">
                    <button
                        v-for="cat in categories"
                        :key="cat.key"
                        @click="activeCategory = cat.key"
                        :class="[
                            'px-4 py-2 rounded-full text-[13px] font-semibold border transition-all duration-200',
                            activeCategory === cat.key
                                ? 'bg-[#1a1e2e] text-white border-[#1a1e2e]'
                                : 'bg-white text-[#344054] border-[#d0d5dd] hover:border-[#1a1e2e]'
                        ]"
                    >
                        {{ $t(cat.labelKey) }}
                    </button>
                </div>
            </div>
        </section>

        <section class="bg-white py-12 md:py-16">
            <div class="page-container">
                <!-- Featured article -->
                <div v-if="featured" class="rounded-2xl overflow-hidden border border-[#eef0f4] mb-10 group hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] transition-shadow duration-300">
                    <div class="grid grid-cols-1 lg:grid-cols-2">
                        <div class="aspect-[16/9] lg:aspect-auto lg:min-h-[320px] overflow-hidden bg-[#eef0f4]">
                            <img :src="featured.image" :alt="featured.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div class="p-7 md:p-10 flex flex-col justify-center">
                            <div class="flex items-center gap-2 mb-4">
                                <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#1a1e2e]/8 text-[#1a1e2e]">
                                    {{ $t(`mediaPage.categories.${featured.category}`) }}
                                </span>
                                <span class="text-[11px] text-[#8a94a6]">{{ featured.date }}</span>
                            </div>
                            <h2 class="font-bold text-[clamp(18px,2vw,26px)] text-[#1a1e2e] leading-snug mb-4">{{ featured.title }}</h2>
                            <p class="text-[14px] text-[#505a63] leading-relaxed mb-6">{{ featured.excerpt }}</p>
                            <a href="#" class="self-start inline-flex items-center gap-2 border border-[#d0d5dd] text-[#1a1e2e] font-semibold text-[14px] px-6 py-3 rounded-full hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] transition-all duration-200">
                                {{ $t('mediaPage.readMore') }}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- News grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div
                        v-for="(news, i) in filteredNews"
                        :key="i"
                        class="rounded-2xl border border-[#eef0f4] overflow-hidden flex flex-col hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <div class="aspect-[16/9] overflow-hidden bg-[#eef0f4]">
                            <img :src="news.image" :alt="news.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div class="p-5 flex flex-col flex-1 gap-3">
                            <div class="flex items-center gap-2">
                                <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#1a1e2e]/8 text-[#1a1e2e]">
                                    {{ $t(`mediaPage.categories.${news.category}`) }}
                                </span>
                                <span class="text-[11px] text-[#8a94a6]">{{ news.date }}</span>
                            </div>
                            <h3 class="font-bold text-[15px] text-[#1a1e2e] leading-snug flex-1">{{ news.title }}</h3>
                            <a href="#" class="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1a1e2e] hover:gap-3 transition-all duration-200">
                                {{ $t('mediaPage.readMore') }}
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import defaultImg from '@/assets/images/avatars/investors.png'

const activeCategory = ref('all')

const categories = [
    { key: 'all',          labelKey: 'mediaPage.categories.all' },
    { key: 'investment',   labelKey: 'mediaPage.categories.investment' },
    { key: 'reforms',      labelKey: 'mediaPage.categories.reforms' },
    { key: 'events',       labelKey: 'mediaPage.categories.events' },
    { key: 'announcements',labelKey: 'mediaPage.categories.announcements' },
]

const featured = {
    title: 'III Plenary Session of the Foreign Investors Council: Record 47 Initiatives, New Working Group Structure',
    excerpt: 'President Mirziyoyev chaired the third plenary session on June 11, 2026. PP-226 was signed, restructuring the Council\'s working groups to 16 and formalising the FIC Association as the permanent Secretariat.',
    date: 'June 12, 2026',
    category: 'events',
    image: defaultImg,
}

const newsItems = [
    { title: 'FIC Annual Investment Climate Report 2026 Released', date: 'Sep 1, 2026', category: 'investment', image: defaultImg },
    { title: 'Digital Economy Working Group Launches Investor Portal Initiative', date: 'Aug 28, 2026', category: 'reforms', image: defaultImg },
    { title: 'EBRD Announces $500M Green Economy Framework for Uzbekistan', date: 'Aug 22, 2026', category: 'investment', image: defaultImg },
    { title: 'VAT Refund Processing Time Reduced to 15 Days — FIC Initiative Completed', date: 'Aug 15, 2026', category: 'reforms', image: defaultImg },
    { title: 'FIC Member Survey: Investment Sentiment in Uzbekistan at Record High', date: 'Aug 10, 2026', category: 'investment', image: defaultImg },
    { title: 'New Members Join FIC: 3 Companies from Energy and Finance Sectors', date: 'Aug 5, 2026', category: 'announcements', image: defaultImg },
    { title: 'Legal Reform WG: International Arbitration Bill Advances in Parliament', date: 'Jul 30, 2026', category: 'reforms', image: defaultImg },
    { title: 'FIC Welcomes Uzbekistan\'s BB- Rating Upgrade by Fitch', date: 'Jul 22, 2026', category: 'investment', image: defaultImg },
    { title: 'Working Group Session Recap: Q2 2026 Initiative Progress Report', date: 'Jul 15, 2026', category: 'events', image: defaultImg },
]

const filteredNews = computed(() =>
    activeCategory.value === 'all' ? newsItems : newsItems.filter((n) => n.category === activeCategory.value)
)
</script>
