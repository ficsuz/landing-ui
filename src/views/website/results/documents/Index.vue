<template>
    <div class="documents-page">
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <!-- Header -->
                <div class="text-center mb-12 md:mb-16 mx-auto">
                    <h2 class="font-black text-[clamp(22px,2.8vw,38px)] leading-snug text-[#1a1e2e] mb-4 md:mb-6">
                        {{ $t('resultsPage.documentsPage.pageTitle') }}
                    </h2>
                    <p class="text-[clamp(13px,1.1vw,15px)] text-[#8a94a6] leading-relaxed">
                        {{ $t('resultsPage.documentsPage.pageSubtitle') }}
                    </p>
                </div>

                <!-- Filter tabs -->
                <div class="flex flex-wrap justify-center gap-2 mb-10 md:mb-12">
                    <button
                        v-for="f in filters"
                        :key="f.key"
                        @click="activeFilter = f.key"
                        :class="[
                            'px-5 py-2.5 rounded-full text-[13px] font-semibold border transition-all duration-200',
                            activeFilter === f.key
                                ? 'bg-[#1a1e2e] text-white border-[#1a1e2e]'
                                : 'bg-white text-[#344054] border-[#d0d5dd] hover:border-[#1a1e2e]',
                        ]"
                    >
                        {{ $t(f.labelKey) }}
                    </button>
                </div>

                <!-- Document list -->
                <div class="flex flex-col gap-3 mx-auto">
                    <a
                        v-for="(doc, i) in filteredDocs"
                        :key="i"
                        :href="doc.file || '#'"
                        :download="!!doc.file || undefined"
                        class="flex items-center gap-4 rounded-2xl border border-[#eef0f4] bg-[#f7f8fa] px-5 py-4 hover:border-[#d0d5dd] hover:bg-white transition-all duration-200 group no-underline"
                    >
                        <!-- File icon -->
                        <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#4361ee"
                                stroke-width="1.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                        </div>

                        <!-- Title -->
                        <div class="flex-1 min-w-0">
                            <p class="font-semibold text-[15px] text-[#1a1e2e] leading-snug">{{ doc.title }}</p>
                        </div>

                        <!-- Download button -->
                        <span
                            class="flex-shrink-0 flex items-center gap-1.5 text-[13px] font-semibold text-[#4361ee] bg-[#eff4ff] px-4 py-2 rounded-full group-hover:bg-[#4361ee] group-hover:text-white transition-all duration-200 whitespace-nowrap"
                        >
                            <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            {{ $t('resultsPage.documentsPage.downloadLabel') }}
                        </span>
                    </a>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeFilter = ref('reports')

const filters = [
    { key: 'reports', labelKey: 'resultsPage.documentsPage.filterReports' },
    { key: 'wg-minutes', labelKey: 'resultsPage.documentsPage.filterWgMinutes' },
    { key: 'decrees', labelKey: 'resultsPage.documentsPage.filterDecrees' },
    { key: 'council', labelKey: 'resultsPage.documentsPage.filterCouncilMinutes' },
    { key: 'charters', labelKey: 'resultsPage.documentsPage.filterCharters' },
]

type Doc = { title: string; category: string; file?: string }

const documents: Doc[] = [
    // Annual reports
    { title: 'Secretariat annual report — 2023', category: 'reports', file: '/assets/documents/AR_2023_finalized.pdf' },
    { title: 'Secretariat annual report — 2024', category: 'reports', file: '/assets/documents/Final - FIC-Annual_Report-2024.pdf' },
    { title: 'Secretariat annual report — 2025', category: 'reports' },
    // Working group minutes
    { title: 'Working Group on Investment Climate — Session Protocol, 2024', category: 'wg-minutes' },
    { title: 'Working Group on Tax Policy — Session Protocol, 2025', category: 'wg-minutes' },
    { title: 'Working Group on Digitalization — Session Protocol, 2025', category: 'wg-minutes' },
    // Presidential decrees
    { title: 'Presidential Resolution PP-4519 — Establishment of the Council', category: 'decrees' },
    { title: 'Presidential Resolution PP-179 — Establishment of Working Groups', category: 'decrees' },
    { title: 'Presidential Resolution PP-226 — Restructuring and Expansion of Working Groups', category: 'decrees' },
    // Council minutes
    { title: 'Protocol of the I Plenary Session — 2021', category: 'council' },
    { title: 'Protocol of the II Plenary Session — TIIF 2024', category: 'council' },
    { title: 'Protocol of the III Plenary Session — 2025', category: 'council' },
    { title: 'Protocol of the Interim Session — November 2025', category: 'council' },
    // Founding documents
    { title: 'Charter of the Foreign Investors Council', category: 'charters' },
    { title: 'Regulations of the Executive Committee', category: 'charters' },
]

const filteredDocs = computed(() => documents.filter((d) => d.category === activeFilter.value))
</script>
