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
                    <!-- Meetings copied from the meetings section (see meetingsData.ts) -->
                    <router-link
                        v-for="meeting in meetings"
                        :key="meeting.slug"
                        :to="{ name: 'council-members-corporation-meeting', params: { slug: meeting.slug } }"
                        class="group rounded-2xl border border-[#eef0f4] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] bg-white flex flex-col transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                    >
                        <!-- Image: uniform 3:2 frame (native ratio of the event photos) so cards stay aligned;
                             per-meeting coverPosition keeps the key part of other ratios in view -->
                        <div class="aspect-[3/2] overflow-hidden bg-[#f7f8fa]">
                            <img
                                :src="meeting.cover"
                                :alt="meeting.title"
                                :style="{ objectPosition: meeting.coverPosition }"
                                class="w-full h-full object-cover"
                            />
                        </div>

                        <!-- Content -->
                        <div class="p-6 flex flex-col flex-1">
                            <time :datetime="meeting.date" class="text-[13px] text-[#8a94a6] mb-2">
                                {{ meeting.dateLabel }}
                            </time>
                            <h3 class="font-bold text-[17px] text-[#1a1e2e] leading-snug mb-5">
                                {{ meeting.title }}
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
import { useCorporationMeetings } from '@/views/website/council-members/corporation/meetingsData'

const meetings = useCorporationMeetings()
</script>
