<template>
    <div class="weekly-results-page">
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-3xl mb-12">
                    {{ $t('eventsPage.weeklyPage.intro') }}
                </p>

                <div class="flex flex-col gap-5">
                    <div
                        v-for="(week, i) in weeks"
                        :key="i"
                        class="rounded-2xl border border-[#eef0f4] overflow-hidden hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-shadow duration-300"
                    >
                        <!-- Week header -->
                        <div class="flex items-center justify-between px-6 py-4 bg-[#f7f8fa] border-b border-[#eef0f4]">
                            <div class="flex items-center gap-3">
                                <span class="font-bold text-[14px] text-[#1a1e2e]">{{ week.period }}</span>
                                <span class="text-[11px] font-semibold bg-[#1a1e2e]/8 text-[#1a1e2e] px-2.5 py-0.5 rounded-full">
                                    Week {{ week.weekNum }}
                                </span>
                            </div>
                            <a href="#" class="text-[12px] font-semibold text-[#1a1e2e] hover:underline flex items-center gap-1">
                                Full report
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                            </a>
                        </div>

                        <!-- Week content -->
                        <div class="p-6 bg-white">
                            <ul class="flex flex-col gap-3">
                                <li
                                    v-for="(item, j) in week.highlights"
                                    :key="j"
                                    class="flex items-start gap-3 text-[14px] text-[#505a63] leading-snug"
                                >
                                    <span class="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#1a1e2e] opacity-40" />
                                    {{ item }}
                                </li>
                            </ul>
                            <div class="flex items-center gap-5 mt-5 pt-4 border-t border-[#eef0f4]">
                                <span class="text-[12px] text-[#8a94a6]">
                                    <strong class="text-[#1a1e2e]">{{ week.meetings }}</strong> meetings
                                </span>
                                <span class="text-[12px] text-[#8a94a6]">
                                    <strong class="text-[#1a1e2e]">{{ week.initiatives }}</strong> initiatives advanced
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const weeks = [
    {
        period: 'Sep 8 – Sep 12, 2026',
        weekNum: 37,
        meetings: 4,
        initiatives: 3,
        highlights: [
            'Digital Economy WG Q3 session held — 8 initiatives reviewed, 5 moved to approval stage',
            'Bilateral meeting with Ministry of Finance on VAT refund digitisation progress',
            'Energy WG coordinator meeting with ACWA Power on Q4 solar auction preparation',
            'Secretariat submitted monthly investor survey results to Executive Committee',
        ],
    },
    {
        period: 'Sep 1 – Sep 5, 2026',
        weekNum: 36,
        meetings: 3,
        initiatives: 2,
        highlights: [
            'Legal Reform WG review: international arbitration bill passed second reading in Parliament',
            'Infrastructure WG bilateral with Uzbekistan Railways on public-private partnership framework',
            'FIC Annual Investment Climate Survey 2026 launched — 43 member companies invited',
        ],
    },
    {
        period: 'Aug 25 – Aug 29, 2026',
        weekNum: 35,
        meetings: 5,
        initiatives: 4,
        highlights: [
            'EBRD × FIC green economy partnership session — $500M framework agreed in principle',
            'Finance WG meeting on capital market reform: stock exchange listing incentives discussed',
            'Agricultural WG: EU export certification for 3 Uzbek produce categories approved',
            'Secretariat published quarterly working group progress report',
            'Incoming initiative review: 12 new proposals received from member companies',
        ],
    },
]
</script>
