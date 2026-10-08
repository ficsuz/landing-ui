<template>
    <div class="corporation-page">
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">

                <!-- Title -->
                <h2 class="section-title text-center mb-12 md:mb-16">
                    {{ $t('corporationPage.title') }}
                </h2>

                <!-- Cards grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <router-link
                        :to="{ name: 'council-members-corporation-detail' }"
                        class="group rounded-2xl border border-[#eef0f4] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 bg-white flex flex-col no-underline"
                    >
                        <!-- Image -->
                        <div class="overflow-hidden">
                            <img
                                :src="session.cover"
                                :alt="session.title"
                                class="w-full h-[220px] object-cover"
                            />
                        </div>

                        <!-- Content -->
                        <div class="p-6 flex flex-col flex-1">
                            <p class="font-semibold text-[15px] text-[#1a1e2e] leading-snug mb-6 flex-1">
                                {{ session.cardTitle }}
                            </p>
                            <span class="w-full py-2.5 rounded-xl bg-[#f2f3f6] text-[#1a1e2e] text-[14px] font-semibold text-center block transition-colors duration-200 group-hover:bg-[#1a1e2e] group-hover:text-white">
                                {{ $t('common.learnMore') }}
                            </span>
                        </div>
                    </router-link>
                </div>

            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useCorporationSession } from '@/views/website/council-members/corporation/corporationData'

const session = useCorporationSession()
</script>
