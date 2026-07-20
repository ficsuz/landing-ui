<template>
    <section class="bg-white py-16 md:py-24 overflow-hidden">
        <!-- Title -->
        <div class="page-container mb-12 md:mb-16">
            <h2 class="section-title text-center mb-4">
                {{ $t('members.title') }}
            </h2>
            <p class="text-center text-[clamp(15px,1.5vw,18px)] text-[#505a63]">
                {{ $t('members.foreignSubtitle') }}
            </p>
        </div>

        <!-- Foreign members ticker -->
        <div class="flex flex-col gap-4 mb-4">
            <!-- Row 1: left -->
            <div v-if="row1.length" class="relative flex overflow-hidden">
                <div class="ticker-track ticker-left flex gap-4 shrink-0">
                    <router-link
                        v-for="(logo, i) in [...row1, ...row1]"
                        :key="`r1-${i}`"
                        :to="{ name: 'council-members', query: { member: logo.id } }"
                        class="shrink-0 h-[108px] w-[280px] bg-white rounded-xl border border-[#eef0f4] flex items-center justify-center px-6 hover:border-[#d0d5dd] hover:shadow-sm transition-all duration-200 cursor-pointer"
                    >
                        <img :src="logo.src" :alt="logo.name" class="max-h-[76px] max-w-[220px] w-auto h-auto object-contain" />
                    </router-link>
                </div>
            </div>

            <!-- Row 2: right -->
            <div v-if="row2.length" class="relative flex overflow-hidden">
                <div class="ticker-track ticker-right flex gap-4 shrink-0">
                    <router-link
                        v-for="(logo, i) in [...row2, ...row2]"
                        :key="`r2-${i}`"
                        :to="{ name: 'council-members', query: { member: logo.id } }"
                        class="shrink-0 h-[108px] w-[280px] bg-white rounded-xl border border-[#eef0f4] flex items-center justify-center px-6 hover:border-[#d0d5dd] hover:shadow-sm transition-all duration-200 cursor-pointer"
                    >
                        <img :src="logo.src" :alt="logo.name" class="max-h-[76px] max-w-[220px] w-auto h-auto object-contain" />
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Divider -->
        <div class="page-container mt-14 mb-12">
            <div class="h-px bg-[#eef0f4]" />
        </div>

        <!-- Uzbek members -->
        <div class="mb-4">
            <div class="page-container mb-10 md:mb-12">
                <p class="text-center text-[clamp(15px,1.5vw,18px)] text-[#505a63]">
                    {{ $t('members.uzbekSubtitle') }}
                </p>
            </div>

            <!-- Row 1: left -->
            <div class="relative flex overflow-hidden mb-4">
                <div class="ticker-track ticker-members-left flex gap-4 shrink-0">
                    <router-link
                        v-for="(member, i) in [...uzbekRow1, ...uzbekRow1]"
                        :key="`m1-${i}`"
                        :to="{ name: 'council-members-uzbek-side' }"
                        class="shrink-0 w-[340px] h-[104px] bg-white rounded-xl border border-[#eef0f4] flex items-center gap-4 px-5 hover:border-[#d0d5dd] hover:shadow-sm transition-all duration-200 cursor-pointer"
                    >
                        <div class="w-[68px] h-[68px] rounded-full overflow-hidden ring-2 ring-[#eef0f4] shrink-0">
                            <img
                                :src="getMediaUrl(member.photoId)"
                                :alt="resolveTranslation(member.fullName, locale)"
                                class="w-full h-full object-cover object-top"
                            />
                        </div>
                        <div class="min-w-0">
                            <p class="font-bold text-[15px] text-[#1a1e2e] leading-snug truncate">
                                {{ resolveTranslation(member.fullName, locale) }}
                            </p>
                            <p class="text-[13px] text-[#8a94a6] leading-snug mt-1 line-clamp-2">{{ resolveTranslation(member.position, locale) }}</p>
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- Row 2: right -->
            <div class="relative flex overflow-hidden">
                <div class="ticker-track ticker-members-right flex gap-4 shrink-0">
                    <router-link
                        v-for="(member, i) in [...uzbekRow2, ...uzbekRow2]"
                        :key="`m2-${i}`"
                        :to="{ name: 'council-members-uzbek-side' }"
                        class="shrink-0 w-[340px] h-[104px] bg-white rounded-xl border border-[#eef0f4] flex items-center gap-4 px-5 hover:border-[#d0d5dd] hover:shadow-sm transition-all duration-200 cursor-pointer"
                    >
                        <div class="w-[68px] h-[68px] rounded-full overflow-hidden ring-2 ring-[#eef0f4] shrink-0">
                            <img
                                :src="getMediaUrl(member.photoId)"
                                :alt="resolveTranslation(member.fullName, locale)"
                                class="w-full h-full object-cover object-top"
                            />
                        </div>
                        <div class="min-w-0">
                            <p class="font-bold text-[15px] text-[#1a1e2e] leading-snug truncate">
                                {{ resolveTranslation(member.fullName, locale) }}
                            </p>
                            <p class="text-[13px] text-[#8a94a6] leading-snug mt-1 line-clamp-2">{{ resolveTranslation(member.position, locale) }}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMembersStore } from '@/features/members/store'
import { useCouncilMembersStore } from '@/features/councilMembers/store'
import { resolveTranslation } from '@/utils/i18n'
import { getMediaUrl } from '@/utils/media'

const { locale } = useI18n()
const membersStore = useMembersStore()
const councilMembersStore = useCouncilMembersStore()

const members = computed(() => membersStore.items)

const half = computed(() => Math.ceil(members.value.length / 2))
const uzbekRow1 = computed(() => members.value.slice(0, half.value))
const uzbekRow2 = computed(() => members.value.slice(half.value))

// Foreign member logos — same source as the council-members page.
const brands = computed(() =>
    councilMembersStore.items
        .filter((m) => m.status && m.logoId)
        .map((m) => ({
            id: m.id,
            name: resolveTranslation(m.name, locale.value),
            src: getMediaUrl(m.logoId),
        }))
)

const brandsHalf = computed(() => Math.ceil(brands.value.length / 2))
const row1 = computed(() => brands.value.slice(0, brandsHalf.value))
const row2 = computed(() => brands.value.slice(brandsHalf.value))

onMounted(() => {
    membersStore.fetchAll({ limit: 100, sortBy: 'order', order: 'asc' })
    councilMembersStore.fetchAll({ limit: 100, sortBy: 'order', order: 'asc' })
})
</script>

<style scoped>
.ticker-track {
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    will-change: transform;
}

.ticker-left {
    animation-name: tickerLeft;
    animation-duration: 60s;
}

.ticker-right {
    animation-name: tickerRight;
    animation-duration: 66s;
}

@keyframes tickerLeft {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}

@keyframes tickerRight {
    0% {
        transform: translateX(-50%);
    }
    100% {
        transform: translateX(0);
    }
}

.ticker-members-left {
    animation-name: tickerLeft;
    animation-duration: 72s;
}

.ticker-members-right {
    animation-name: tickerRight;
    animation-duration: 78s;
}
</style>
