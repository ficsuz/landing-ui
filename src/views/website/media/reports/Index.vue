<template>
    <div class="reports-page">
        <section class="bg-white py-12 md:py-16">
            <div class="page-container">
                <h1 class="section-title mb-8 text-center">{{ $t('mediaPage.reportsTitle') }}</h1>

                <!-- Quote -->
                <blockquote class="text-[clamp(16px,1.4vw,20px)] text-[#444] italic leading-relaxed max-w-3xl mb-12 border-l-4 border-[#1a1e2e]/20 pl-5">
                    "{{ $t('mediaPage.reportsPage.quote') }}"
                </blockquote>

                <!-- NEW APPROACHES section -->
                <div class="mb-16 md:mb-20">
                    <p class="text-[11px] font-bold tracking-widest uppercase text-[#8a94a6] mb-2">
                        {{ $t('mediaPage.reportsPage.newApproaches.label') }}
                    </p>
                    <h2 class="font-black text-[clamp(20px,2.2vw,32px)] leading-tight text-[#1a1e2e] uppercase mb-8">{{ $t('mediaPage.reportsPage.newApproaches.title') }}</h2>

                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                        <a
                            v-for="(rep, i) in analyticalReports"
                            :key="i"
                            :href="rep.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="group flex flex-col gap-3"
                        >
                            <!-- Cover image -->
                            <div
                                class="relative rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.10)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] group-hover:-translate-y-1.5 transition-all duration-300 [transform:translateZ(0)] aspect-[3/4]"
                            >
                                <img
                                    :src="rep.cover"
                                    :alt="rep.title"
                                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                                <!-- Hover download overlay -->
                                <div
                                    class="absolute inset-0 bg-[#1a1e2e]/0 group-hover:bg-[#1a1e2e]/40 transition-all duration-300 flex items-center justify-center"
                                >
                                    <div
                                        class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#1a1e2e"
                                            stroke-width="2.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Title below -->
                            <p
                                class="text-[13px] font-semibold text-[#1a1e2e] leading-snug line-clamp-2 group-hover:text-[#2563eb] transition-colors duration-200 px-0.5"
                            >
                                {{ rep.title }}
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import cover1 from '@/assets/documents/report-1.jpg'
import cover2 from '@/assets/documents/report-2.jpg'
import cover3 from '@/assets/documents/report-3.jpg'
import cover4 from '@/assets/documents/report-4.jpg'
import cover5 from '@/assets/documents/report-5.jpg'

import pdf1 from '@/assets/documents/report-1.pdf'
import pdf2 from '@/assets/documents/report-2.pdf'
import pdf3 from '@/assets/documents/report-3-en.pdf'
import pdf4 from '@/assets/documents/report-4.pdf'
import pdf5 from '@/assets/documents/report-5.pdf'

const activeYear = ref('all')
const years = ['all', '2026', '2025', '2024', '2023']

const categoryColorMap: Record<string, string> = {
    annualReport: '#1a1e2e',
    plenary: '#067647',
    wgReport: '#5c36b5',
    investment: '#b54708',
    policy: '#1a6eb5',
}

function categoryColor(category: string) {
    return categoryColorMap[category] ?? '#1a1e2e'
}

const analyticalReports = [
    {
        title: 'Digital Transformation & E-Government: A New Framework for Investors',
        description:
            "An in-depth look at Uzbekistan's digital economy policy shifts and how the new e-government architecture opens investment opportunities across public sector digitisation.",
        category: 'Policy Brief',
        color: '#1a6eb5',
        year: '2026',
        tags: ['Digital Economy', 'E-Government', 'Policy'],
        cover: cover1,
        pdf: pdf1,
    },
    {
        title: 'Green Finance & Climate Investment: Pathways to Sustainable Returns',
        description:
            'This report maps the emerging green finance ecosystem in Uzbekistan — sovereign green bonds, renewable energy auctions, and the regulatory incentives underpinning a $9B opportunity.',
        category: 'Sector Brief',
        color: '#067647',
        year: '2026',
        tags: ['Green Finance', 'Renewables', 'Climate'],
        cover: cover2,
        pdf: pdf2,
    },
    {
        title: 'Human Capital & Talent Policy: Closing the Skills Gap for FDI Growth',
        description:
            'Labour market analysis covering talent pipelines, visa frameworks for international specialists, and FIC working group recommendations on workforce development to sustain FDI growth.',
        category: 'WG Report',
        color: '#b54708',
        year: '2026',
        tags: ['Human Capital', 'Talent', 'Labour Market'],
        cover: cover3,
        pdf: pdf3,
    },
    {
        title: 'Legal Reform & International Arbitration: The Investor Protection Roadmap',
        description:
            'A comprehensive review of legislative changes affecting dispute resolution, enforcement of arbitral awards, and the new Commercial Procedure Code — with a practical guide for foreign investors.',
        category: 'Policy Brief',
        color: '#5c36b5',
        year: '2026',
        tags: ['Legal Reform', 'Arbitration', 'Investor Protection'],
        cover: cover4,
        pdf: pdf4,
    },
    {
        title: 'Public-Private Partnership Models: Lessons Learned & Emerging Structures',
        description:
            "Case-study analysis of Uzbekistan's first generation of PPP projects, identifying structural success factors, common pitfalls, and the evolving PPP legal framework for 2026–2030.",
        category: 'Investment Data',
        color: '#c4320a',
        year: '2026',
        tags: ['PPP', 'Infrastructure', 'Case Studies'],
        cover: cover5,
        pdf: pdf5,
    },
]

const reports = [
    {
        title: 'FIC Annual Investment Climate Report 2026',
        description:
            "Comprehensive analysis of Uzbekistan's investment climate covering regulatory reforms, FDI dynamics, sector opportunities, and FIC initiative outcomes for the year.",
        category: 'annualReport',
        date: 'Sep 2026',
        size: '4.2 MB',
        year: '2026',
        tags: ['Annual', 'Investment Climate', 'FDI', 'Reforms'],
    },
    {
        title: 'III Plenary Session Protocol & Outcomes — June 2026',
        description:
            'Official protocol of the III Plenary Session of the Foreign Investors Council, including all adopted decisions, initiative pipeline updates, and Presidential Decree PP-226.',
        category: 'plenary',
        date: 'Jun 2026',
        size: '1.8 MB',
        year: '2026',
        tags: ['Plenary', 'PP-226', 'Working Groups'],
    },
    {
        title: 'Working Group Progress Report — Q2 2026',
        description:
            'Consolidated status report on all 16 working groups: initiatives completed, in progress, and planned. Includes ministry response tracking and next session schedule.',
        category: 'wgReport',
        date: 'Jul 2026',
        size: '2.3 MB',
        year: '2026',
        tags: ['Working Groups', 'Q2', 'Initiative Tracker'],
    },
    {
        title: 'Uzbekistan FDI Statistics — H1 2026',
        description:
            'Sectoral and geographic breakdown of foreign direct investment into Uzbekistan in H1 2026, with year-on-year comparison and FIC-member contribution analysis.',
        category: 'investment',
        date: 'Aug 2026',
        size: '0.9 MB',
        year: '2026',
        tags: ['FDI', 'Statistics', 'H1 2026'],
    },
    {
        title: 'Digital Economy Policy Brief — Investor Portal Framework',
        description:
            'Policy recommendations from the Digital Economy Working Group on the legal and technical framework for the Unified Investor Portal, including e-signature integration.',
        category: 'policy',
        date: 'May 2026',
        size: '1.1 MB',
        year: '2026',
        tags: ['Digital Economy', 'Policy', 'e-Government'],
    },
    {
        title: 'FIC Annual Investment Climate Report 2025',
        description:
            "Year-in-review of Uzbekistan's investment environment, with focus on the establishment of the FIC Association, working group restructuring, and initiative impact assessment.",
        category: 'annualReport',
        date: 'Sep 2025',
        size: '3.8 MB',
        year: '2025',
        tags: ['Annual', 'Association', 'Working Groups'],
    },
    {
        title: 'II Plenary Session Protocol — November 2025',
        description:
            'Official protocol of the II Plenary Session, including adoption of the FIC Association charter and approval of the 2025–2026 working group initiative pipeline.',
        category: 'plenary',
        date: 'Nov 2025',
        size: '1.5 MB',
        year: '2025',
        tags: ['Plenary', 'Association', 'Charter'],
    },
    {
        title: 'Working Group Progress Report — Year-End 2025',
        description:
            'Annual working group consolidated report covering initiative completion rates, ministry engagement metrics, and impact estimates for all FIC working groups.',
        category: 'wgReport',
        date: 'Dec 2025',
        size: '2.7 MB',
        year: '2025',
        tags: ['Working Groups', '2025', 'Annual Review'],
    },
    {
        title: 'FIC Annual Investment Climate Report 2024',
        description:
            "Review of Uzbekistan's economic reform trajectory and investment climate in 2024, with sectoral outlooks and FIC member sentiment survey results.",
        category: 'annualReport',
        date: 'Sep 2024',
        size: '3.5 MB',
        year: '2024',
        tags: ['Annual', '2024', 'Investment Climate'],
    },
    {
        title: 'I Plenary Session Protocol — November 2019',
        description:
            'Founding plenary session protocol following Presidential Decree PP-4519, establishing the FIC governance structure, founding member list, and first-priority initiative areas.',
        category: 'plenary',
        date: 'Nov 2019',
        size: '1.2 MB',
        year: '2019',
        tags: ['Plenary', 'Founding', 'PP-4519'],
    },
]

const filteredReports = computed(() => (activeYear.value === 'all' ? reports : reports.filter((r) => r.year === activeYear.value)))
</script>
