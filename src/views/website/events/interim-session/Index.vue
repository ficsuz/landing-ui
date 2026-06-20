<template>
    <div class="bg-white py-16 md:py-24">
        <div class="page-container">

            <!-- Chronology section -->
            <div>
                <h2 class="font-black text-[13px] uppercase tracking-widest text-[#1a1e2e] mb-4">
                    {{ $t('eventsPage.interimPage.chronology') }}
                </h2>
                <div class="border-t border-[#1a1e2e] mb-1" />

                <!-- Table header (desktop only) -->
                <div class="hidden md:grid md:grid-cols-[80px_160px_1fr_140px] gap-4 px-5 py-3">
                    <span class="text-[11px] font-semibold uppercase tracking-widest text-[#8a94a6]">No.</span>
                    <span class="text-[11px] font-semibold uppercase tracking-widest text-[#8a94a6]">{{ $t('common.date') }}</span>
                    <span class="text-[11px] font-semibold uppercase tracking-widest text-[#8a94a6]">{{ $t('eventsPage.interimPage.note') }}</span>
                    <span />
                </div>

                <!-- Rows -->
                <div class="rounded-2xl border border-[#eef0f4] overflow-hidden">
                    <div
                        v-for="(session, i) in sessions"
                        :key="session.id"
                        class="px-5 py-5 md:py-6 flex flex-col md:grid md:grid-cols-[80px_160px_1fr_140px] gap-2 md:gap-4 md:items-center"
                        :class="i < sessions.length - 1 ? 'border-b border-[#eef0f4]' : ''"
                    >
                        <span class="font-black text-[15px] text-[#1a1e2e]">{{ session.code }}</span>
                        <!-- Mobile label + value pairs -->
                        <div class="md:contents">
                            <div class="flex flex-col gap-0.5 md:contents">
                                <span class="text-[10px] font-semibold uppercase tracking-widest text-[#8a94a6] md:hidden">{{ $t('common.date') }}</span>
                                <span class="text-[14px] text-[#505a63]">{{ session.date }}</span>
                            </div>
                            <div class="flex flex-col gap-0.5 md:contents">
                                <span class="text-[10px] font-semibold uppercase tracking-widest text-[#8a94a6] md:hidden">{{ $t('eventsPage.interimPage.note') }}</span>
                                <span class="text-[14px] text-[#505a63] leading-snug">{{ session.note }}</span>
                            </div>
                        </div>
                        <div class="flex justify-start md:justify-end">
                            <router-link
                                v-if="session.hasDetail"
                                :to="{ name: 'events-interim-session-detail', params: { id: session.id } }"
                                class="inline-flex items-center px-5 py-2 rounded-full text-[13px] font-semibold border border-[#d0d5dd] text-[#1a1e2e] hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] transition-all duration-200"
                            >
                                {{ $t('eventsPage.readMore') }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { interimSessions as sessions } from './interimSessionsData'
</script>
