<template>
    <section class="bg-[#f7f8fa] py-16 md:py-24">
        <div class="page-container">
            <h2 class="section-title mb-12">{{ $t('workingGroupsPage.outcomeTitle') }}</h2>

            <div class="flex flex-col gap-4">
                <div v-for="(outcome, i) in outcomes" :key="i" class="rounded-2xl overflow-hidden border border-[#eef0f4] flex flex-col md:flex-row">
                    <!-- Left panel: numeral + type + date -->
                    <div
                        class="md:w-[210px] shrink-0 flex flex-col items-center justify-center gap-2 py-10 px-6 text-center"
                        :class="outcome.dark ? 'bg-[#1a1e2e]' : 'bg-[#ECEAF5]'"
                    >
                        <span class="text-[56px] leading-none font-black tracking-tight" :class="outcome.dark ? 'text-white' : 'text-[#1a1e2e]'">{{
                            outcome.numeral
                        }}</span>
                        <span
                            class="text-[9px] font-bold uppercase tracking-[0.14em] mt-1"
                            :class="outcome.dark ? 'text-white/50' : 'text-[#8a94a6]'"
                            >{{ outcome.type }}</span
                        >
                        <span class="text-[12px] font-medium" :class="outcome.dark ? 'text-white/40' : 'text-[#8a94a6]'">{{ outcome.date }}</span>
                    </div>

                    <!-- Right: content -->
                    <div class="flex-1 bg-white flex flex-col">
                        <div class="flex-1 p-6 md:p-8">
                            <ul v-if="outcome.bullets" class="flex flex-col gap-2">
                                <li
                                    v-for="(b, j) in outcome.bullets"
                                    :key="j"
                                    class="flex items-start gap-2.5 text-[14px] text-[#505a63] leading-relaxed"
                                >
                                    <span class="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#1a1e2e] shrink-0"></span>
                                    {{ b }}
                                </li>
                            </ul>
                            <p v-else class="text-[14px] text-[#505a63] leading-relaxed">
                                {{ outcome.summary }}
                            </p>
                        </div>
                        <div class="border-t border-[#eef0f4] px-6 md:px-8 py-4 flex justify-end">
                            <a
                                :href="outcome.file"
                                class="flex items-center gap-1.5 text-[14px] font-semibold text-[#1a1e2e] hover:opacity-60 transition-opacity"
                            >
                                View
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
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const outcomes = [
    {
        numeral: 'I',
        dark: false,
        type: 'Plenary Session',
        date: 'November 16, 2022',
        summary:
            'Residence «Kuksaroy». More than 150 participants, over 40 proposals. Priorities: business environment, tax stability, PPP, green economy, digitalization.',
        bullets: null,
        file: '#',
    },
    {
        numeral: 'II',
        dark: false,
        type: 'Plenary Session',
        date: 'May 3 - 2024',
        summary:
            'Held within the III TIIF under the chairmanship of the President. As a result — PP-179 with a roadmap of 14 initiatives, including the creation of four working groups.',
        bullets: null,
        file: '#',
    },
    {
        numeral: 'III',
        dark: false,
        type: 'Plenary Session',
        date: 'June 11 - 2025',
        summary: null,
        bullets: [
            'IWG for Drafting the Law on Alternative Investment Funds',
            'IWG on the Improvement of Pledge Legislation',
            'IWG on the Implementation of Responsible Business Conduct Principles',
            'IWG on the Training of Professional Personnel for Foreign Companies',
            'IWG on the Enhancement of Corporate Governance in Local Companies',
            'IWG on the Improvement of Tax Administration',
            'IWG on the Improvement of Land Allocation Procedures',
            'IWG on Energy-Related Issues',
            'IWG on Circular Economy',
            'IWG on Artificial Intelligence Development',
        ],
        file: '#',
    },
    {
        numeral: 'IV',
        dark: true,
        type: 'Plenary Session',
        date: 'June 18 - 2026',
        summary: null,
        bullets: null,
        file: '#',
    },
]
</script>
