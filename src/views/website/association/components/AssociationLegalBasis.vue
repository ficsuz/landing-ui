<template>
    <section class="bg-white py-16 md:py-24">
        <div class="page-container">
            <h2 class="section-title mb-10 text-center">{{ $t('association.legalBasis.title') }}</h2>

            <div class="max-w-3xl">
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed mb-6">
                    {{ $t('association.legalBasis.p1') }}
                </p>
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed mb-6">
                    {{ $t('association.legalBasis.p2') }}
                </p>
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed mb-10">
                    {{ $t('association.legalBasis.p3') }}
                </p>

                <RouterLink
                    to="/results/documents"
                    class="inline-flex items-center gap-2 border border-[#d0d5dd] text-[#1a1e2e] font-semibold text-[15px] px-7 py-3 rounded-full transition-all duration-200 hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e]"
                >
                    {{ $t('association.legalBasis.documents') }}
                </RouterLink>
            </div>

            <!-- Cards -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-14">
                <!-- Functions card -->
                <div class="rounded-2xl border border-[rgba(25,28,31,0.08)] bg-[#f7f8fa] p-8">
                    <div class="flex items-center gap-3 mb-6">
                        <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1a1e2e]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 11l3 3L22 4" />
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                            </svg>
                        </span>
                        <h3 class="text-[15px] font-black uppercase tracking-wide text-[#1a1e2e] leading-tight">
                            {{ $t('association.functions.title') }}
                        </h3>
                    </div>
                    <ul class="flex flex-col gap-3">
                        <li
                            v-for="(item, i) in functionItems"
                            :key="i"
                            class="flex items-start gap-3 text-[clamp(14px,1.1vw,15px)] text-[#505a63] leading-snug"
                        >
                            <span class="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-[#1a1e2e] opacity-40" />
                            {{ item }}
                        </li>
                    </ul>
                </div>

                <!-- Governance card -->
                <div class="rounded-2xl border border-[rgba(25,28,31,0.08)] bg-[#f7f8fa] p-8">
                    <div class="flex items-center gap-3 mb-6">
                        <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1a1e2e]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                            </svg>
                        </span>
                        <h3 class="text-[15px] font-black uppercase tracking-wide text-[#1a1e2e] leading-tight">
                            {{ $t('association.governance.title') }}
                        </h3>
                    </div>
                    <ul class="flex flex-col gap-3">
                        <li
                            v-for="(item, i) in governanceItems"
                            :key="i"
                            class="flex items-start gap-3 text-[clamp(14px,1.1vw,15px)] text-[#505a63] leading-snug"
                        >
                            <span class="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-[#1a1e2e] opacity-40" />
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm, rt } = useI18n()

const functionItems = computed(() =>
    (tm('association.functions.items') as any[]).map((item) => rt(item))
)

const governanceItems = computed(() =>
    (tm('association.governance.items') as any[]).map((item) => rt(item))
)
</script>

