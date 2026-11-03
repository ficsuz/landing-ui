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
                    <div
                        class="rounded-2xl border border-[#eef0f4] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] bg-white flex flex-col"
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
                            <button type="button" disabled class="mt-auto w-full py-2.5 rounded-xl bg-[#f2f3f6] text-[#1a1e2e] text-[14px] font-semibold text-center block cursor-default">
                                {{ $t('common.learnMore') }}
                            </button>
                        </div>
                    </div>

                    <!-- AmCham × FIC memorandum (copied from the meetings section) -->
                    <router-link
                        :to="{ name: 'council-members-corporation-memorandum' }"
                        class="group rounded-2xl border border-[#eef0f4] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] bg-white flex flex-col transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                    >
                        <!-- Image -->
                        <div class="overflow-hidden">
                            <img
                                :src="memorandum.cover"
                                :alt="memorandum.title"
                                loading="lazy"
                                class="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        <!-- Content -->
                        <div class="p-6 flex flex-col flex-1">
                            <time :datetime="memorandum.date" class="text-[13px] text-[#8a94a6] mb-2">
                                {{ memorandum.dateLabel }}
                            </time>
                            <h3 class="font-bold text-[17px] text-[#1a1e2e] leading-snug line-clamp-3 mb-5">
                                {{ memorandum.title }}
                            </h3>
                            <span class="mt-auto w-full py-2.5 rounded-xl bg-[#f2f3f6] text-[#1a1e2e] text-[14px] font-semibold text-center block transition-colors duration-200 group-hover:bg-[#1a1e2e] group-hover:text-white">
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
import { useCorporationMemorandum } from '@/views/website/council-members/corporation/memorandumData'

const session = useCorporationSession()
const memorandum = useCorporationMemorandum()
</script>
