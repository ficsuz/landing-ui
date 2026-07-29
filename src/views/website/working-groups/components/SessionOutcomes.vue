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
                            <router-link
                                :to="outcome.file"
                                class="flex items-center gap-1.5 text-[14px] font-semibold text-[#1a1e2e] hover:opacity-60 transition-opacity"
                            >
                                {{ $t('workingGroupsPage.outcomeView') }}
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
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm, rt } = useI18n()

// Structural data (numeral, dark, file); text comes from i18n.
const base = [
    { numeral: 'I', dark: false, file: '/events/plenary-sessions/1' },
    { numeral: 'II', dark: false, file: '/events/plenary-sessions/2' },
    { numeral: 'III', dark: false, file: '/events/plenary-sessions/3' },
    { numeral: 'IV', dark: true, file: '/events/plenary-sessions/4' },
]

const outcomes = computed(() => {
    const items = tm('workingGroupsPage.outcomes') as Record<string, unknown>[]
    return base.map((b, i) => {
        const o = items?.[i] ?? {}
        return {
            ...b,
            type: rt((o as any).type ?? ''),
            date: rt((o as any).date ?? ''),
            summary: rt((o as any).summary ?? '') || null,
            bullets: null as string[] | null,
        }
    })
})
</script>
