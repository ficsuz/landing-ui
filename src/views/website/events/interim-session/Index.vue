<template>
    <div class="interim-session-page">
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-3xl mb-12">
                    {{ $t('eventsPage.interimPage.intro') }}
                </p>

                <div class="flex flex-col gap-5">
                    <div
                        v-for="(session, i) in sessions"
                        :key="i"
                        class="rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] p-6 md:p-7 hover:border-[#1a1e2e] hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-all duration-300"
                    >
                        <div class="flex flex-col md:flex-row md:items-start gap-5">
                            <div class="flex-shrink-0 w-[72px] text-center hidden md:block">
                                <p class="font-black text-[24px] text-[#1a1e2e] leading-none">{{ session.day }}</p>
                                <p class="text-[12px] text-[#8a94a6] font-semibold">{{ session.month }}</p>
                                <p class="text-[12px] text-[#8a94a6]">{{ session.year }}</p>
                            </div>
                            <div class="w-px bg-[#eef0f4] hidden md:block self-stretch" />
                            <div class="flex-1">
                                <p class="text-[11px] text-[#8a94a6] font-semibold mb-2 md:hidden">{{ session.day }} {{ session.month }} {{ session.year }}</p>
                                <h3 class="font-bold text-[16px] text-[#1a1e2e] leading-snug mb-3">{{ session.title }}</h3>
                                <p class="text-[14px] text-[#505a63] leading-relaxed mb-4">{{ session.summary }}</p>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="tag in session.tags" :key="tag"
                                        class="text-[11px] font-semibold bg-[#1a1e2e]/8 text-[#1a1e2e] px-2.5 py-0.5 rounded-full">
                                        {{ tag }}
                                    </span>
                                </div>
                            </div>
                            <a v-if="session.protocol" href="#" class="flex-shrink-0 self-start inline-flex items-center gap-2 border border-[#d0d5dd] text-[#1a1e2e] text-[13px] font-semibold px-4 py-2.5 rounded-full hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] transition-all duration-200">
                                Protocol
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const sessions = [
    {
        day: '25', month: 'Nov', year: '2026',
        title: 'Interim Session — Investment Climate Update Q3 2026',
        summary: 'Review of implementation status of III Plenary Session decisions. New initiatives from the Digital Economy and Energy working groups presented to government representatives.',
        tags: ['Investment Climate', 'Digital Economy', 'Energy'],
        protocol: false,
    },
    {
        day: '19', month: 'Nov', year: '2025',
        title: 'Interim Session — Post-Association Establishment',
        summary: 'First session following the formal registration of the FIC Association. Review of working group restructuring under PP-226 and approval of Secretariat operational plan.',
        tags: ['PP-226', 'Working Groups', 'Association', 'Secretariat'],
        protocol: true,
    },
    {
        day: '20', month: 'Nov', year: '2019',
        title: 'First Interim Session — Council Launch',
        summary: 'Inaugural interim session following establishment of the Foreign Investors Council by Presidential Resolution PP-4519. Governance structure, membership and priority areas discussed.',
        tags: ['PP-4519', 'Inaugural', 'Governance'],
        protocol: true,
    },
]
</script>
