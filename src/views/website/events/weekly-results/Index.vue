<template>
    <div class="bg-white py-16 md:py-24">
        <div class="page-container">

            <!-- Section heading -->
            <h2 class="font-black text-[clamp(18px,2vw,26px)] text-[#1a1e2e] uppercase mb-8 md:mb-12">
                {{ $t('eventsPage.weeklyPage.sectionTitle') }}
            </h2>

            <!-- Cards grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
                <div
                    v-for="item in store.items"
                    :key="item.id"
                    class="rounded-2xl border border-[#eef0f4] overflow-hidden hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-shadow duration-300 cursor-pointer"
                >
                    <div class="aspect-[3/4] overflow-hidden bg-[#f7f8fa]">
                        <img :src="item.image" :alt="item.dateRange" class="w-full h-full object-cover" />
                    </div>
                    <div class="p-3 md:p-4">
                        <p class="text-[11px] md:text-[12px] text-[#8a94a6] mb-1">{{ $t('eventsPage.weeklyPage.cardLabel') }}</p>
                        <p class="font-bold text-[13px] md:text-[14px] text-[#1a1e2e] leading-snug mb-2">{{ $t('eventsPage.weeklyPage.cardTitle') }}</p>
                        <p class="text-[12px] md:text-[13px] text-[#505a63]">{{ item.dateRange }}</p>
                    </div>
                </div>
            </div>

            <!-- Skeleton loading -->
            <div v-if="store.loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 mt-4">
                <div v-for="n in 5" :key="n" class="rounded-2xl border border-[#eef0f4] overflow-hidden animate-pulse">
                    <div class="aspect-[3/4] bg-[#f0f0f0]" />
                    <div class="p-3 md:p-4 flex flex-col gap-2">
                        <div class="h-3 w-20 bg-[#eef0f4] rounded" />
                        <div class="h-4 w-32 bg-[#eef0f4] rounded" />
                        <div class="h-3 w-24 bg-[#eef0f4] rounded" />
                    </div>
                </div>
            </div>

            <!-- View more -->
            <div v-if="store.hasMore()" class="flex justify-center mt-10">
                <button
                    :disabled="store.loading"
                    @click="store.fetchItems()"
                    class="inline-flex items-center px-8 py-3 rounded-full border border-[#d0d5dd] text-[#1a1e2e] font-semibold text-[15px] hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] transition-all duration-200 disabled:opacity-50"
                >
                    {{ $t('eventsPage.weeklyPage.viewMore') }}
                </button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useWeeklyResultsStore } from '@/features/weekly-results/store'

const store = useWeeklyResultsStore()

onMounted(() => store.fetchItems(true))
</script>
