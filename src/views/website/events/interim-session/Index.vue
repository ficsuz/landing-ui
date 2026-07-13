<template>
    <div class="bg-white py-16 md:py-24">
        <div class="page-container">

            <!-- Chronology section -->
            <div>
                <h2 class="section-title text-center mb-12 md:mb-16">
                    {{ $t('eventsPage.interimPage.chronology') }}
                </h2>

                <!-- Cards grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <component
                        :is="session.hasDetail ? 'router-link' : 'div'"
                        v-for="session in sessions"
                        :key="session.id"
                        :to="session.hasDetail ? { name: 'events-interim-session-detail', params: { id: session.id } } : undefined"
                        class="group rounded-2xl border border-[#eef0f4] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-all duration-300 bg-white flex flex-col no-underline"
                        :class="session.hasDetail ? 'hover:shadow-[0_6px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1' : ''"
                    >
                        <!-- Image -->
                        <div class="overflow-hidden">
                            <img
                                :src="session.detail?.heroImage || fallbackCover"
                                :alt="session.code"
                                class="w-full h-[220px] object-cover"
                            />
                        </div>

                        <!-- Content -->
                        <div class="p-6 flex flex-col flex-1">
                            <span class="text-[11px] font-semibold uppercase tracking-widest text-[#8a94a6] mb-2">{{ session.code }} · {{ session.date }}</span>
                            <p class="font-semibold text-[15px] text-[#1a1e2e] leading-snug mb-6 flex-1">
                                {{ session.note }}
                            </p>
                            <span
                                v-if="session.hasDetail"
                                class="w-full py-2.5 rounded-xl bg-[#f2f3f6] text-[#1a1e2e] text-[14px] font-semibold text-center block transition-colors duration-200 group-hover:bg-[#1a1e2e] group-hover:text-white"
                            >
                                {{ $t('eventsPage.readMore') }}
                            </span>
                        </div>
                    </component>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { interimSessions as sessions } from './interimSessionsData'
import fallbackCover from '@/assets/images/hero/ATM_9764.jpg'
</script>
