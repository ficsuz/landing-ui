<template>
    <div v-if="session" class="bg-white py-16 md:py-24">
        <div class="page-container">
            <!-- Back button -->
            <button
                @click="router.back()"
                class="inline-flex items-center gap-2 text-[14px] font-semibold text-[#1a1e2e] mb-8 hover:opacity-70 transition-opacity duration-200"
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {{ $t('common.back') }}
            </button>

            <!-- Header -->
            <div class="mb-10 md:mb-14">
                <span
                    class="inline-block text-[11px] font-semibold uppercase tracking-widest text-[#8a94a6] border border-[#d0d5dd] px-3 py-1 rounded-full mb-4"
                >
                    {{ session.eyebrow }}
                </span>
                <h1 class="font-black text-[clamp(28px,4vw,52px)] text-[#1a1e2e] leading-tight max-w-4xl">
                    {{ session.title }}
                </h1>
            </div>

            <!-- Photo gallery: 3 + 2 + 3 grid -->
            <div class="grid grid-cols-6 gap-3 md:gap-4">
                <div v-for="(img, i) in session.gallery" :key="i" class="overflow-hidden rounded-2xl" :class="gridClass(i)">
                    <img :src="img" :alt="`${session.title} — photo ${i + 1}`" class="w-full h-full object-cover" />
                </div>
            </div>

            <!-- Feature image cards (3-column) -->
            <div v-if="session.featureImages?.length" class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                    v-for="(img, i) in session.featureImages"
                    :key="i"
                    class="overflow-hidden rounded-2xl h-[220px] md:h-[300px]"
                >
                    <img :src="img" :alt="`${session.title} — photo ${i + 1}`" class="w-full h-full object-cover" />
                </div>
            </div>

            <!-- Description paragraphs -->
            <div v-if="session.paragraphs.length" class="mt-20 md:mt-28 flex flex-col gap-6 max-w-3xl">
                <p v-for="(para, i) in session.paragraphs" :key="i" class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed">
                    {{ para }}
                </p>
            </div>

            <!-- Stats block -->
            <div v-if="session.statsBlock" class="mt-12 md:mt-16">
                <h2 class="font-black text-[clamp(22px,3vw,40px)] text-[#1a1e2e] leading-tight uppercase mb-8">
                    {{ session.statsBlock.title }}
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                        v-for="(card, i) in session.statsBlock.cards"
                        :key="i"
                        class="rounded-2xl p-6 md:p-8 flex flex-col gap-3"
                        :class="card.dark ? 'bg-[#1a1e2e] text-white' : 'bg-[#f7f8fa] text-[#1a1e2e]'"
                    >
                        <span class="text-[14px] leading-snug" :class="card.dark ? 'text-white/70' : 'text-[#8a94a6]'">
                            {{ card.label }}
                        </span>
                        <span class="font-black text-[clamp(28px,3.5vw,48px)] leading-none">
                            {{ card.value }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Initiatives list -->
            <div v-if="session.initiativesList?.length" class="mt-8 rounded-2xl border border-[#eef0f4] overflow-hidden">
                <div
                    v-for="(item, i) in session.initiativesList"
                    :key="i"
                    class="flex items-start gap-5 px-6 py-4 text-[15px] text-[#1a1e2e] leading-snug"
                    :class="i < session.initiativesList.length - 1 ? 'border-b border-[#eef0f4]' : ''"
                >
                    <span class="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#1a1e2e] mt-[7px]"></span>
                    {{ item }}
                </div>
            </div>

            <!-- Info card -->
            <div v-if="session.infoCard" class="mt-6 rounded-2xl bg-[#f7f8fa] p-6 md:p-8">
                <h3 class="font-black text-[14px] text-[#1a1e2e] uppercase tracking-wide mb-5">
                    {{ session.infoCard.title }}
                </h3>
                <ul class="flex flex-col gap-4">
                    <li
                        v-for="(item, i) in session.infoCard.items"
                        :key="i"
                        class="flex items-start gap-3 text-[15px] text-[#505a63] leading-snug"
                    >
                        <span class="flex-shrink-0 w-2 h-2 rounded-full bg-[#1a1e2e] mt-[5px]"></span>
                        {{ item }}
                    </li>
                </ul>
            </div>

            <!-- Divider + links -->
            <div v-if="session.links.length" class="mt-10 pt-6 border-t border-[#eef0f4] flex flex-wrap gap-3">
                <a
                    v-for="link in session.links"
                    :key="link.label"
                    :href="link.href"
                    target="_blank"
                    rel="noopener"
                    :class="[
                        'inline-flex items-center px-6 py-2.5 rounded-full text-[15px] font-semibold transition-all duration-200',
                        link.outlined
                            ? 'border border-[#d0d5dd] text-[#1a1e2e] hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e]'
                            : 'bg-[#f2f3f6] text-[#1a1e2e] border border-[#f2f3f6] hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e]',
                    ]"
                >
                    {{ link.label }}
                </a>
            </div>
        </div>
    </div>

    <div v-else class="py-24 text-center text-[#8a94a6]">Session not found</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { sessions } from './sessionsData'

const router = useRouter()
const route = useRoute()
const session = computed(() => sessions.find((s) => s.id === Number(route.params.id)))

function gridClass(index: number): string {
    if (index < 3) return 'col-span-3 md:col-span-2 h-[200px] md:h-[280px]'
    if (index < 5) return 'col-span-3 h-[220px] md:h-[340px]'
    return 'col-span-3 md:col-span-2 h-[200px] md:h-[280px]'
}
</script>
