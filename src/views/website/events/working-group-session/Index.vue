<template>
    <div class="working-group-session-page">
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-3xl mb-10">
                    {{ $t('eventsPage.wgSessionPage.intro') }}
                </p>

                <!-- Filter by working group -->
                <div class="flex flex-wrap gap-2 mb-10">
                    <button
                        v-for="f in wgFilters"
                        :key="f"
                        @click="activeWg = f"
                        :class="[
                            'px-4 py-2 rounded-full text-[13px] font-semibold border transition-all duration-200',
                            activeWg === f
                                ? 'bg-[#1a1e2e] text-white border-[#1a1e2e]'
                                : 'bg-white text-[#344054] border-[#d0d5dd] hover:border-[#1a1e2e]'
                        ]"
                    >
                        {{ f }}
                    </button>
                </div>

                <!-- Sessions list -->
                <div class="flex flex-col gap-4">
                    <div
                        v-for="(session, i) in filteredSessions"
                        :key="i"
                        class="rounded-2xl border border-[#eef0f4] p-6 hover:border-[#1a1e2e] hover:bg-[#f7f8fa] transition-all duration-200"
                    >
                        <div class="flex flex-col md:flex-row md:items-center gap-4">
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#1a1e2e]/8 text-[#1a1e2e]">
                                        {{ session.wg }}
                                    </span>
                                    <span class="text-[11px] text-[#8a94a6]">{{ session.date }}</span>
                                </div>
                                <h3 class="font-bold text-[15px] text-[#1a1e2e] leading-snug mb-1">{{ session.title }}</h3>
                                <p class="text-[13px] text-[#8a94a6]">{{ session.outcomes }} initiatives discussed · {{ session.participants }} participants</p>
                            </div>
                            <a href="#" class="flex-shrink-0 inline-flex items-center gap-2 border border-[#d0d5dd] text-[#1a1e2e] text-[13px] font-semibold px-4 py-2.5 rounded-full hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] transition-all duration-200">
                                {{ $t('eventsPage.readMore') }}
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

const wgFilters = ['All', 'Energy', 'Digital Economy', 'Finance', 'Infrastructure', 'Agriculture', 'Legal Reform']
const activeWg = ref('All')

const sessions = [
    { wg: 'Energy', date: 'August 12, 2026', title: 'Energy & Green Transition WG — Q2 Review', outcomes: 6, participants: 18 },
    { wg: 'Digital Economy', date: 'August 5, 2026', title: 'Digital Economy WG — E-Government Initiatives', outcomes: 8, participants: 22 },
    { wg: 'Finance', date: 'July 28, 2026', title: 'Financial Sector WG — Capital Market Development', outcomes: 5, participants: 16 },
    { wg: 'Infrastructure', date: 'July 15, 2026', title: 'Infrastructure & Logistics WG — Railway Modernisation', outcomes: 4, participants: 14 },
    { wg: 'Agriculture', date: 'July 8, 2026', title: 'Agriculture WG — Export Certification Progress', outcomes: 3, participants: 12 },
    { wg: 'Legal Reform', date: 'June 25, 2026', title: 'Legal Reform WG — International Arbitration Standards', outcomes: 7, participants: 20 },
    { wg: 'Energy', date: 'May 20, 2026', title: 'Energy WG — Renewable Energy Tariff Mechanism', outcomes: 5, participants: 17 },
    { wg: 'Digital Economy', date: 'May 12, 2026', title: 'Digital Economy WG — Investor Portal Launch Review', outcomes: 9, participants: 24 },
]

const filteredSessions = computed(() =>
    activeWg.value === 'All' ? sessions : sessions.filter((s) => s.wg === activeWg.value)
)
</script>
