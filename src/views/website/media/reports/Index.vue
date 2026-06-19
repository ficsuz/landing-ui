<template>
    <div class="reports-page">
        <section class="bg-white py-12 md:py-16">
            <div class="page-container">
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-3xl mb-12">
                    {{ $t('mediaPage.reportsPage.intro') }}
                </p>

                <!-- Year filter -->
                <div class="flex flex-wrap gap-2 mb-10">
                    <button
                        v-for="year in years"
                        :key="year"
                        @click="activeYear = year"
                        :class="[
                            'px-4 py-2 rounded-full text-[13px] font-semibold border transition-all duration-200',
                            activeYear === year
                                ? 'bg-[#1a1e2e] text-white border-[#1a1e2e]'
                                : 'bg-white text-[#344054] border-[#d0d5dd] hover:border-[#1a1e2e]'
                        ]"
                    >
                        {{ year === 'all' ? $t('mediaPage.categories.all') : year }}
                    </button>
                </div>

                <!-- Reports list -->
                <div class="flex flex-col gap-4">
                    <div
                        v-for="(report, i) in filteredReports"
                        :key="i"
                        class="rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] p-5 md:p-6 hover:border-[#1a1e2e] hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-all duration-300"
                    >
                        <div class="flex items-start gap-5">
                            <!-- File icon -->
                            <div class="w-12 h-14 rounded-xl flex items-center justify-center shrink-0"
                                :style="{ background: categoryColor(report.category) + '15' }">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                    :stroke="categoryColor(report.category)" stroke-width="1.8"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                    <line x1="16" y1="13" x2="8" y2="13"/>
                                    <line x1="16" y1="17" x2="8" y2="17"/>
                                    <polyline points="10 9 9 9 8 9"/>
                                </svg>
                            </div>

                            <!-- Content -->
                            <div class="flex-1 min-w-0">
                                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                                    <div class="flex items-center gap-2 flex-wrap">
                                        <span
                                            class="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                                            :style="{ background: categoryColor(report.category) + '18', color: categoryColor(report.category) }"
                                        >
                                            {{ $t(`mediaPage.reportsPage.categories.${report.category}`) }}
                                        </span>
                                        <span class="text-[11px] text-[#8a94a6]">{{ report.date }}</span>
                                        <span class="text-[11px] text-[#8a94a6]">{{ report.size }}</span>
                                    </div>
                                    <a
                                        href="#"
                                        class="flex-shrink-0 inline-flex items-center gap-2 border border-[#d0d5dd] text-[#1a1e2e] font-semibold text-[13px] px-4 py-2 rounded-full hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] transition-all duration-200 w-fit"
                                    >
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                        {{ $t('mediaPage.downloadReport') }}
                                    </a>
                                </div>
                                <h3 class="font-bold text-[15px] text-[#1a1e2e] leading-snug mb-1.5">{{ report.title }}</h3>
                                <p class="text-[13px] text-[#505a63] leading-relaxed line-clamp-2">{{ report.description }}</p>
                                <div class="flex flex-wrap gap-1.5 mt-3">
                                    <span v-for="tag in report.tags" :key="tag"
                                        class="text-[10px] font-semibold bg-[#1a1e2e]/6 text-[#1a1e2e] px-2 py-0.5 rounded-full">
                                        {{ tag }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeYear = ref('all')
const years = ['all', '2026', '2025', '2024', '2023']

const categoryColorMap: Record<string, string> = {
    annualReport: '#1a1e2e',
    plenary:      '#067647',
    wgReport:     '#5c36b5',
    investment:   '#b54708',
    policy:       '#1a6eb5',
}

function categoryColor(category: string) {
    return categoryColorMap[category] ?? '#1a1e2e'
}

const reports = [
    {
        title:       'FIC Annual Investment Climate Report 2026',
        description: 'Comprehensive analysis of Uzbekistan\'s investment climate covering regulatory reforms, FDI dynamics, sector opportunities, and FIC initiative outcomes for the year.',
        category: 'annualReport', date: 'Sep 2026', size: '4.2 MB', year: '2026',
        tags: ['Annual', 'Investment Climate', 'FDI', 'Reforms'],
    },
    {
        title:       'III Plenary Session Protocol & Outcomes — June 2026',
        description: 'Official protocol of the III Plenary Session of the Foreign Investors Council, including all adopted decisions, initiative pipeline updates, and Presidential Decree PP-226.',
        category: 'plenary', date: 'Jun 2026', size: '1.8 MB', year: '2026',
        tags: ['Plenary', 'PP-226', 'Working Groups'],
    },
    {
        title:       'Working Group Progress Report — Q2 2026',
        description: 'Consolidated status report on all 16 working groups: initiatives completed, in progress, and planned. Includes ministry response tracking and next session schedule.',
        category: 'wgReport', date: 'Jul 2026', size: '2.3 MB', year: '2026',
        tags: ['Working Groups', 'Q2', 'Initiative Tracker'],
    },
    {
        title:       'Uzbekistan FDI Statistics — H1 2026',
        description: 'Sectoral and geographic breakdown of foreign direct investment into Uzbekistan in H1 2026, with year-on-year comparison and FIC-member contribution analysis.',
        category: 'investment', date: 'Aug 2026', size: '0.9 MB', year: '2026',
        tags: ['FDI', 'Statistics', 'H1 2026'],
    },
    {
        title:       'Digital Economy Policy Brief — Investor Portal Framework',
        description: 'Policy recommendations from the Digital Economy Working Group on the legal and technical framework for the Unified Investor Portal, including e-signature integration.',
        category: 'policy', date: 'May 2026', size: '1.1 MB', year: '2026',
        tags: ['Digital Economy', 'Policy', 'e-Government'],
    },
    {
        title:       'FIC Annual Investment Climate Report 2025',
        description: 'Year-in-review of Uzbekistan\'s investment environment, with focus on the establishment of the FIC Association, working group restructuring, and initiative impact assessment.',
        category: 'annualReport', date: 'Sep 2025', size: '3.8 MB', year: '2025',
        tags: ['Annual', 'Association', 'Working Groups'],
    },
    {
        title:       'II Plenary Session Protocol — November 2025',
        description: 'Official protocol of the II Plenary Session, including adoption of the FIC Association charter and approval of the 2025–2026 working group initiative pipeline.',
        category: 'plenary', date: 'Nov 2025', size: '1.5 MB', year: '2025',
        tags: ['Plenary', 'Association', 'Charter'],
    },
    {
        title:       'Working Group Progress Report — Year-End 2025',
        description: 'Annual working group consolidated report covering initiative completion rates, ministry engagement metrics, and impact estimates for all FIC working groups.',
        category: 'wgReport', date: 'Dec 2025', size: '2.7 MB', year: '2025',
        tags: ['Working Groups', '2025', 'Annual Review'],
    },
    {
        title:       'FIC Annual Investment Climate Report 2024',
        description: 'Review of Uzbekistan\'s economic reform trajectory and investment climate in 2024, with sectoral outlooks and FIC member sentiment survey results.',
        category: 'annualReport', date: 'Sep 2024', size: '3.5 MB', year: '2024',
        tags: ['Annual', '2024', 'Investment Climate'],
    },
    {
        title:       'I Plenary Session Protocol — November 2019',
        description: 'Founding plenary session protocol following Presidential Decree PP-4519, establishing the FIC governance structure, founding member list, and first-priority initiative areas.',
        category: 'plenary', date: 'Nov 2019', size: '1.2 MB', year: '2019',
        tags: ['Plenary', 'Founding', 'PP-4519'],
    },
]

const filteredReports = computed(() =>
    activeYear.value === 'all' ? reports : reports.filter((r) => r.year === activeYear.value)
)
</script>
