<template>
    <div class="analytics-page">
        <section class="bg-white py-12 md:py-16">
            <div class="page-container">
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-3xl mb-12">
                    {{ $t('mediaPage.analyticsPage.intro') }}
                </p>

                <!-- Filter tabs -->
                <div class="flex flex-wrap gap-2 mb-10">
                    <button
                        v-for="topic in topics"
                        :key="topic.key"
                        @click="activeTopic = topic.key"
                        :class="[
                            'px-4 py-2 rounded-full text-[13px] font-semibold border transition-all duration-200',
                            activeTopic === topic.key
                                ? 'bg-[#1a1e2e] text-white border-[#1a1e2e]'
                                : 'bg-white text-[#344054] border-[#d0d5dd] hover:border-[#1a1e2e]'
                        ]"
                    >
                        {{ $t(topic.labelKey) }}
                    </button>
                </div>

                <!-- Article grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    <div
                        v-for="(article, i) in filteredArticles"
                        :key="i"
                        class="rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] p-6 flex flex-col gap-4 hover:border-[#1a1e2e] hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300"
                    >
                        <!-- Topic + read time -->
                        <div class="flex items-center justify-between">
                            <span
                                class="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                                :style="{ background: topicColor(article.topic) + '18', color: topicColor(article.topic) }"
                            >
                                {{ $t(`mediaPage.analyticsPage.topics.${article.topic}`) }}
                            </span>
                            <span class="text-[11px] text-[#8a94a6] flex items-center gap-1">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                                </svg>
                                {{ article.readMin }} min
                            </span>
                        </div>

                        <!-- Title -->
                        <h3 class="font-bold text-[15px] text-[#1a1e2e] leading-snug flex-1">{{ article.title }}</h3>

                        <!-- Excerpt -->
                        <p class="text-[13px] text-[#505a63] leading-relaxed line-clamp-3">{{ article.excerpt }}</p>

                        <!-- Author + date -->
                        <div class="flex items-center gap-3 pt-4 border-t border-[#eef0f4]">
                            <div class="w-8 h-8 rounded-full bg-[#1a1e2e] flex items-center justify-center text-white font-bold text-[12px] shrink-0">
                                {{ article.authorInitials }}
                            </div>
                            <div class="min-w-0">
                                <p class="text-[12px] font-semibold text-[#1a1e2e] truncate">{{ article.author }}</p>
                                <p class="text-[11px] text-[#8a94a6]">{{ article.date }}</p>
                            </div>
                        </div>

                        <a href="#" class="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1a1e2e] hover:gap-3 transition-all duration-200 mt-1">
                            {{ $t('mediaPage.readMore') }}
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeTopic = ref('all')

const topics = [
    { key: 'all',         labelKey: 'mediaPage.categories.all' },
    { key: 'investment',  labelKey: 'mediaPage.analyticsPage.topics.investment' },
    { key: 'reform',      labelKey: 'mediaPage.analyticsPage.topics.reform' },
    { key: 'macroeconomy',labelKey: 'mediaPage.analyticsPage.topics.macroeconomy' },
    { key: 'sector',      labelKey: 'mediaPage.analyticsPage.topics.sector' },
]

const topicColorMap: Record<string, string> = {
    investment:   '#1a1e2e',
    reform:       '#067647',
    macroeconomy: '#b54708',
    sector:       '#5c36b5',
}

function topicColor(topic: string) {
    return topicColorMap[topic] ?? '#1a1e2e'
}

const articles = [
    {
        title: 'Uzbekistan FDI Landscape 2026: Key Trends and Sector Shifts',
        excerpt: 'Foreign direct investment into Uzbekistan reached $12.4B in 2025, with energy and digital sectors driving 60% of inflows. This analysis examines structural factors and the FIC\'s role in regulatory improvements.',
        topic: 'investment', date: 'Sep 5, 2026', readMin: 8,
        author: 'FIC Secretariat',       authorInitials: 'FS',
    },
    {
        title: 'Tax Reform Progress: From Concept to Implementation',
        excerpt: 'The 2024–2026 tax reform package represents the most significant overhaul of Uzbekistan\'s fiscal framework in a decade. We assess what has been implemented, what remains, and investor impact.',
        topic: 'reform', date: 'Aug 20, 2026', readMin: 12,
        author: 'Legal Reform WG',       authorInitials: 'LR',
    },
    {
        title: 'GDP Growth Composition: Investment vs. Consumption Dynamics',
        excerpt: 'Q2 2026 GDP growth of 7.2% masks divergent dynamics: investment growth decelerated while private consumption strengthened. Implications for foreign investors planning capital commitments.',
        topic: 'macroeconomy', date: 'Aug 12, 2026', readMin: 6,
        author: 'FIC Research',          authorInitials: 'FR',
    },
    {
        title: 'Green Energy Transition: Investor Roadmap 2026–2030',
        excerpt: 'Uzbekistan\'s 8GW renewable target by 2030 creates a $7–9B investment opportunity. This sector brief maps the regulatory landscape, auction mechanisms, and identified risks for IPP developers.',
        topic: 'sector', date: 'Jul 28, 2026', readMin: 10,
        author: 'Energy WG',             authorInitials: 'EW',
    },
    {
        title: 'Commercial Court Reform: Impact on Dispute Resolution for Foreign Investors',
        excerpt: 'The new Commercial Procedure Code, effective January 2026, introduces significant changes to dispute resolution mechanisms. A practical guide to enforcement and arbitration options.',
        topic: 'reform', date: 'Jul 15, 2026', readMin: 9,
        author: 'White & Case',          authorInitials: 'WC',
    },
    {
        title: 'Capital Market Development: Tashkent Stock Exchange Growth Outlook',
        excerpt: 'TSE market capitalisation grew 34% in H1 2026, driven by SOE privatisation listings. The Finance WG\'s capital market reform initiative is bearing results — this brief assesses what\'s next.',
        topic: 'investment', date: 'Jul 5, 2026', readMin: 7,
        author: 'Finance WG',            authorInitials: 'FW',
    },
    {
        title: 'Digital Infrastructure Competitiveness: Benchmarking Uzbekistan in Central Asia',
        excerpt: 'Uzbekistan ranks first in Central Asia on mobile internet penetration and has closed the gap on data centre capacity. Implications for technology sector investors and the e-government roadmap.',
        topic: 'sector', date: 'Jun 22, 2026', readMin: 8,
        author: 'Digital Economy WG',   authorInitials: 'DE',
    },
    {
        title: 'Currency and Monetary Policy: Sum Stability and Convertibility Prospects',
        excerpt: 'The Central Bank of Uzbekistan maintained a managed float with 3.2% depreciation in H1 2026. Analysis of monetary policy framework and profit repatriation considerations for investors.',
        topic: 'macroeconomy', date: 'Jun 10, 2026', readMin: 6,
        author: 'FIC Research',         authorInitials: 'FR',
    },
    {
        title: 'Agriculture Modernisation: Export Potential and Investor Entry Points',
        excerpt: 'Following EU export certification for 3 produce categories, Uzbek agri-exports are projected to reach $3.5B by 2027. The Agriculture WG identifies 6 key sub-sectors with strong ROI potential.',
        topic: 'sector', date: 'May 30, 2026', readMin: 11,
        author: 'Agriculture WG',       authorInitials: 'AW',
    },
]

const filteredArticles = computed(() =>
    activeTopic.value === 'all' ? articles : articles.filter((a) => a.topic === activeTopic.value)
)
</script>
