<template>
    <div class="news-page bg-white">

        <!-- Category filter bar -->
        <div class="border-b border-[#eef0f4] sticky top-0 bg-white z-10">
            <div class="page-container">
                <div class="flex flex-wrap gap-2 py-4">
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
        </div>

        <div class="page-container py-12 md:py-16">

            <!-- Featured article -->
            <article
                v-if="featured && activeCategory === 'all'"
                class="group rounded-2xl overflow-hidden border border-[#eef0f4] mb-10 cursor-pointer hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] hover:border-transparent transition-all duration-300"
                @click="$router.push(`/media/${featured.id}`)"
            >
                <div class="grid grid-cols-1 lg:grid-cols-2">
                    <div class="aspect-[16/9] lg:aspect-auto lg:min-h-[340px] overflow-hidden bg-[#eef0f4] [transform:translateZ(0)]">
                        <img
                            :src="featured.image"
                            :alt="featured.title"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div class="p-7 md:p-10 flex flex-col justify-center">
                        <div class="flex items-center gap-2 mb-4">
                            <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#1a1e2e]/8 text-[#1a1e2e] uppercase tracking-wide">
                                {{ $t(`mediaPage.categories.${featured.category}`) }}
                            </span>
                            <span class="text-[11px] text-[#8a94a6]">{{ featured.date }}</span>
                        </div>
                        <h2 class="font-bold text-[clamp(18px,2vw,26px)] text-[#1a1e2e] leading-snug mb-4">
                            {{ featured.title }}
                        </h2>
                        <p class="text-[14px] text-[#505a63] leading-relaxed mb-7 line-clamp-3">
                            {{ featured.excerpt }}
                        </p>
                        <span class="self-start inline-flex items-center gap-2 border border-[#d0d5dd] text-[#1a1e2e] font-semibold text-[14px] px-6 py-3 rounded-full group-hover:bg-[#1a1e2e] group-hover:text-white group-hover:border-[#1a1e2e] transition-all duration-200">
                            {{ $t('mediaPage.readMore') }}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </article>

            <!-- News grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <article
                    v-for="item in gridItems"
                    :key="item.id"
                    class="group bg-white rounded-2xl flex flex-col cursor-pointer border border-[#eef0f4] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:border-transparent"
                    @click="$router.push(`/media/${item.id}`)"
                >
                    <!-- Image -->
                    <div class="relative overflow-hidden aspect-[16/10] shrink-0 [transform:translateZ(0)]">
                        <img
                            :src="item.image"
                            :alt="item.title"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div class="absolute top-3 left-3">
                            <span class="bg-[#1a1e2e]/80 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1 rounded-full tracking-wide uppercase">
                                {{ item.category }}
                            </span>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="flex flex-col flex-1 px-4 pt-4 pb-3 gap-2">
                        <h3 class="font-bold text-[15px] text-[#1a1e2e] leading-snug line-clamp-2 group-hover:text-[#2563eb] transition-colors duration-200">
                            {{ item.title }}
                        </h3>
                        <p class="text-[13px] text-[#8a94a6] leading-relaxed line-clamp-2 flex-1">
                            {{ item.excerpt }}
                        </p>
                        <div class="flex items-center justify-between pt-3 border-t border-[#eef0f4] mt-auto">
                            <span class="text-[12px] text-[#b0b8c6] font-medium">{{ item.date }}</span>
                            <span class="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1a1e2e] group-hover:text-[#2563eb] transition-all duration-200">
                                {{ $t('common.learnMore') }}
                                <svg class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </article>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { NewsItem } from '@/features/news/types'

import img1 from '@/assets/images/hero/ATM_9764.jpg'
import img2 from '@/assets/images/hero/SUT_7962.jpg'
import img3 from '@/assets/images/hero/about-blog.jpg'
import img4 from '@/assets/images/hero/SUT_8193.jpg'

const activeCategory = ref('all')

const categories = [
    { key: 'all',           labelKey: 'mediaPage.categories.all' },
    { key: 'investment',    labelKey: 'mediaPage.categories.investment' },
    { key: 'reforms',       labelKey: 'mediaPage.categories.reforms' },
    { key: 'events',        labelKey: 'mediaPage.categories.events' },
    { key: 'announcements', labelKey: 'mediaPage.categories.announcements' },
]

const newsItems: NewsItem[] = [
    {
        id: 1,
        title: 'III Plenary Session of the Foreign Investors Council: Record 47 Initiatives, New Working Group Structure',
        excerpt: 'President Mirziyoyev chaired the third plenary session on June 11, 2026. PP-226 was signed, restructuring the Council\'s working groups to 16 and formalising the FIC Association as the permanent Secretariat.',
        date: 'June 12, 2026',
        category: 'events',
        image: img1,
        isFeatured: true,
    },
    {
        id: 2,
        title: 'FIC Annual Investment Climate Report 2026 Released',
        excerpt: 'The report highlights record FDI inflows, improved regulatory frameworks and the growing role of working group initiatives in driving reform.',
        date: 'Sep 1, 2026',
        category: 'investment',
        image: img2,
    },
    {
        id: 3,
        title: 'Digital Economy Working Group Launches Investor Portal Initiative',
        excerpt: 'A new single-window investor portal, developed with FIC input, is set to reduce registration time for foreign companies from 30 to 5 days.',
        date: 'Aug 28, 2026',
        category: 'reforms',
        image: img3,
    },
    {
        id: 4,
        title: 'EBRD Announces $500M Green Economy Framework for Uzbekistan',
        excerpt: 'The European Bank for Reconstruction and Development confirmed a new $500M green finance package, aligned with FIC working group priorities.',
        date: 'Aug 22, 2026',
        category: 'investment',
        image: img4,
    },
    {
        id: 5,
        title: 'VAT Refund Processing Time Reduced to 15 Days — FIC Initiative Completed',
        excerpt: 'One of the FIC\'s flagship tax reform initiatives has been fully implemented, cutting the average VAT refund waiting period by more than half.',
        date: 'Aug 15, 2026',
        category: 'reforms',
        image: img1,
    },
    {
        id: 6,
        title: 'New Members Join FIC: 3 Companies from Energy and Finance Sectors',
        excerpt: 'Three leading international companies have joined the Foreign Investors Council, bringing total membership to 78 organisations.',
        date: 'Aug 5, 2026',
        category: 'announcements',
        image: img2,
    },
    {
        id: 7,
        title: 'Legal Reform WG: International Arbitration Bill Advances in Parliament',
        excerpt: 'The FIC Legal Reform Working Group\'s recommendation for a new international arbitration framework has passed its second reading.',
        date: 'Jul 30, 2026',
        category: 'reforms',
        image: img3,
    },
    {
        id: 8,
        title: 'FIC Welcomes Uzbekistan\'s BB- Rating Upgrade by Fitch',
        excerpt: 'Fitch Ratings upgraded Uzbekistan\'s sovereign credit rating, citing improved investment climate and fiscal discipline — key FIC advocacy areas.',
        date: 'Jul 22, 2026',
        category: 'investment',
        image: img4,
    },
    {
        id: 9,
        title: 'Working Group Session Recap: Q2 2026 Initiative Progress Report',
        excerpt: '15 of 16 working groups held their Q2 sessions in July, reporting on 94 active initiatives with 31 completed since the last plenary.',
        date: 'Jul 15, 2026',
        category: 'events',
        image: img1,
    },
]

const featured = computed(() => newsItems.find(i => i.isFeatured) ?? null)

const gridItems = computed(() => {
    const list = activeCategory.value === 'all'
        ? newsItems
        : newsItems.filter(n => n.category === activeCategory.value)
    return list.filter(n => !n.isFeatured || activeCategory.value !== 'all')
})
</script>
