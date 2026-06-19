<template>
    <div class="meetings-page">
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-3xl mb-12">
                    {{ $t('eventsPage.meetingsPage.intro') }}
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div
                        v-for="(meeting, i) in meetings"
                        :key="i"
                        class="rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] p-6 flex flex-col gap-4 hover:border-[#1a1e2e] hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-all duration-300"
                    >
                        <!-- Participants logos / names -->
                        <div class="flex items-center gap-3">
                            <span class="text-[11px] font-semibold text-[#8a94a6]">{{ meeting.date }}</span>
                        </div>
                        <h3 class="font-bold text-[15px] text-[#1a1e2e] leading-snug">{{ meeting.title }}</h3>
                        <p class="text-[13px] text-[#505a63] leading-relaxed flex-1">{{ meeting.summary }}</p>
                        <div class="flex flex-wrap gap-2 pt-4 border-t border-[#eef0f4]">
                            <span v-for="p in meeting.parties" :key="p"
                                class="text-[11px] font-semibold bg-[#1a1e2e]/8 text-[#1a1e2e] px-2.5 py-0.5 rounded-full">
                                {{ p }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const meetings = [
    {
        date: 'September 3, 2026',
        title: 'FIC × Ministry of Finance — Tax Reform Discussion',
        summary: 'Bilateral meeting on VAT refund simplification progress and implementation of the digital tax administration platform.',
        parties: ['FIC Secretariat', 'Ministry of Finance', 'State Tax Committee'],
    },
    {
        date: 'August 22, 2026',
        title: 'FIC × EBRD — Green Economy Partnership',
        summary: 'Discussion of EBRD\'s new $500M green economy framework for Uzbekistan and alignment with FIC working group priorities.',
        parties: ['FIC Executive Committee', 'EBRD Uzbekistan'],
    },
    {
        date: 'August 10, 2026',
        title: 'Energy Sector Bilateral: FIC × Ministry of Energy',
        summary: 'Progress review on renewable energy tariff mechanism and upcoming auctions for solar and wind projects.',
        parties: ['Energy WG', 'Ministry of Energy', 'ACWA Power', 'Masdar'],
    },
    {
        date: 'July 30, 2026',
        title: 'Digital Economy Forum: FIC × Ministry of Digital Technologies',
        summary: 'Joint review of investor portal development timeline and e-signature framework for foreign companies.',
        parties: ['Digital Economy WG', 'Ministry of Digital Technologies'],
    },
    {
        date: 'July 18, 2026',
        title: 'IFC × FIC: Private Sector Development Strategy',
        summary: 'Discussion of IFC\'s Country Strategy for Uzbekistan 2024–2028 and FIC initiative pipeline alignment.',
        parties: ['FIC Secretariat', 'IFC Uzbekistan Office'],
    },
    {
        date: 'July 5, 2026',
        title: 'Legal Reform Dialogue: FIC × Ministry of Justice',
        summary: 'Review of international arbitration bill progress and commercial court reform recommendations from FIC Legal WG.',
        parties: ['Legal Reform WG', 'Ministry of Justice', 'White & Case'],
    },
]
</script>
