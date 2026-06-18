<template>
    <div class="fic-history-page">
        <!-- About the Council -->
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <!-- Left: text -->
                    <div>
                        <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed mb-6">
                            {{ $t('ficHistory.p1') }}
                        </p>
                        <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed mb-10">
                            {{ $t('ficHistory.p2') }}
                        </p>
                        <a
                            href="https://lex.uz/docs/4593913"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 border border-[#d0d5dd] text-[#1a1e2e] font-semibold text-[15px] px-7 py-3 rounded-full transition-all duration-200 hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e]"
                        >
                            {{ $t('ficHistory.viewDecree') }}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>

                    <!-- Right: image -->
                    <div>
                        <img
                            :src="mainPhoto"
                            alt="FIC History"
                            class="w-full rounded-2xl object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- Chronology -->
        <FicHistoryChronology />

        <!-- Tasks -->
        <FicHistoryTasks />
    </div>
</template>

<script setup lang="ts">
import mainPhoto from '@/assets/images/avatars/main-info.png'
import FicHistoryChronology from './components/FicHistoryChronology.vue'
import FicHistoryTasks from './components/FicHistoryTasks.vue'
</script>
