<template>
    <div class="blitz-interview-page">
        <section class="bg-white py-12 md:py-16">
            <div class="page-container">
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-3xl mb-12">
                    {{ $t('mediaPage.blitzPage.intro') }}
                </p>

                <!-- Featured interview -->
                <div class="rounded-2xl overflow-hidden border border-[#1a1e2e] mb-10 bg-[#1a1e2e] text-white">
                    <div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
                        <!-- Photo column -->
                        <div class="aspect-[3/4] lg:aspect-auto lg:min-h-[340px] bg-[#2a2e3e] relative overflow-hidden">
                            <div class="absolute inset-0 flex items-end p-6">
                                <div class="w-20 h-20 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center text-[28px] font-black text-white">
                                    {{ featuredInterview.initials }}
                                </div>
                            </div>
                        </div>
                        <!-- Content -->
                        <div class="p-7 md:p-10 flex flex-col justify-center">
                            <span class="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 w-fit mb-4">
                                {{ $t('mediaPage.blitzPage.featured') }}
                            </span>
                            <blockquote class="text-[clamp(17px,1.8vw,22px)] font-semibold leading-snug text-white mb-6 italic">
                                "{{ featuredInterview.quote }}"
                            </blockquote>
                            <div class="mb-6">
                                <p class="font-bold text-white text-[15px]">{{ featuredInterview.name }}</p>
                                <p class="text-white/60 text-[13px]">{{ featuredInterview.role }}</p>
                                <p class="text-white/40 text-[12px] mt-1">{{ featuredInterview.company }} · {{ featuredInterview.date }}</p>
                            </div>
                            <div class="flex flex-wrap gap-2 mb-6">
                                <span v-for="tag in featuredInterview.topics" :key="tag"
                                    class="text-[11px] font-semibold bg-white/10 text-white/70 px-2.5 py-0.5 rounded-full">
                                    {{ tag }}
                                </span>
                            </div>
                            <a href="#" class="self-start inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-[14px] px-6 py-3 rounded-full hover:bg-white hover:text-[#1a1e2e] transition-all duration-200">
                                {{ $t('mediaPage.blitzPage.readInterview') }}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Interview grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    <div
                        v-for="(interview, i) in interviews"
                        :key="i"
                        class="rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] p-6 flex flex-col gap-5 hover:border-[#1a1e2e] hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                    >
                        <!-- Interviewer -->
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-full bg-[#1a1e2e] flex items-center justify-center text-white font-black text-[16px] shrink-0">
                                {{ interview.initials }}
                            </div>
                            <div>
                                <p class="font-bold text-[14px] text-[#1a1e2e]">{{ interview.name }}</p>
                                <p class="text-[12px] text-[#8a94a6]">{{ interview.role }}</p>
                                <p class="text-[11px] text-[#8a94a6]/70">{{ interview.company }}</p>
                            </div>
                        </div>

                        <!-- Quote -->
                        <blockquote class="text-[14px] text-[#505a63] leading-relaxed italic flex-1 border-l-2 border-[#1a1e2e]/20 pl-4">
                            "{{ interview.quote }}"
                        </blockquote>

                        <!-- Topics -->
                        <div class="flex flex-wrap gap-1.5">
                            <span v-for="tag in interview.topics" :key="tag"
                                class="text-[10px] font-semibold bg-[#1a1e2e]/6 text-[#1a1e2e] px-2 py-0.5 rounded-full">
                                {{ tag }}
                            </span>
                        </div>

                        <!-- Footer -->
                        <div class="flex items-center justify-between pt-4 border-t border-[#eef0f4]">
                            <span class="text-[11px] text-[#8a94a6]">{{ interview.date }}</span>
                            <a href="#" class="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1a1e2e] hover:gap-3 transition-all duration-200">
                                {{ $t('mediaPage.readMore') }}
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
const featuredInterview = {
    name:     'Jean-Marc Peterschmitt',
    initials: 'JP',
    role:     'Resident Representative, EBRD Uzbekistan',
    company:  'EBRD',
    date:     'September 2026',
    quote:    'Uzbekistan has made a decade\'s worth of reform progress in three years. The Foreign Investors Council is one of the most effective structured dialogue mechanisms we have seen in any transition economy.',
    topics:   ['Investment Climate', 'Reform Progress', 'EBRD Outlook'],
}

const interviews = [
    {
        name: 'Aziz Voitov',         initials: 'AV',
        role: 'Executive Director',  company: 'FIC Association',
        date: 'August 2026',
        quote: 'The transition to a legal entity status for our Secretariat gives us tools we simply did not have before — we can now contract, hold accounts, and represent members formally in government dialogue.',
        topics: ['Secretariat', 'Governance', 'PP-226'],
    },
    {
        name: 'Vladislav Pak',        initials: 'VP',
        role: 'Head of Legal',        company: 'FIC Secretariat',
        date: 'July 2026',
        quote: 'Our working groups are not advisory bodies — they are implementation engines. The legal reform track that started as a recommendation two years ago is now literally written into the new Commercial Procedure Code.',
        topics: ['Legal Reform', 'Working Groups', 'Advocacy'],
    },
    {
        name: 'Shirin Mokhova',       initials: 'SM',
        role: 'Country Director',     company: 'IFC Uzbekistan',
        date: 'July 2026',
        quote: 'We see Uzbekistan as one of IFC\'s highest-priority markets in EMEA. The depth of structural reform and political will to attract quality FDI is unlike anything in this region in the last decade.',
        topics: ['IFC', 'Private Sector', 'Development Finance'],
    },
    {
        name: 'Thomas Hacker',        initials: 'TH',
        role: 'CEO, Uzbekistan',      company: 'Siemens Energy',
        date: 'June 2026',
        quote: 'The Energy Working Group gave us a direct line to the Ministry on tariff and grid-connection issues that previously took years to resolve informally. Two of our grid code concerns made it into the III Plenary agenda.',
        topics: ['Energy', 'Working Groups', 'Advocacy'],
    },
    {
        name: 'Park Ji-won',          initials: 'PJ',
        role: 'Head of Tashkent Office', company: 'Korea Trade Center',
        date: 'May 2026',
        quote: 'Korean companies feel a structural connection to the FIC community. The transparency around initiative tracking and ministry responses makes it easy to explain to headquarters why Uzbekistan is worth the commitment.',
        topics: ['Korean Investment', 'Transparency', 'Member Experience'],
    },
    {
        name: 'Sarah Mitchell',       initials: 'SM',
        role: 'Managing Director CA', company: 'Citi Uzbekistan',
        date: 'May 2026',
        quote: 'Capital market reform is the next frontier. The TSE listing pipeline is real, and the Finance WG has been instrumental in getting the legal groundwork right so that international investors can actually participate.',
        topics: ['Finance', 'Capital Markets', 'Stock Exchange'],
    },
]
</script>
