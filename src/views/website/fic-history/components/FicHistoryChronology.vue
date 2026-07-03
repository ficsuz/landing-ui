<template>
    <section class="bg-[#f8f9fb] py-16 md:py-24">
        <div class="page-container">
            <!-- Header -->
            <div class="text-center mb-10">
                <h2 class="section-title mb-3">{{ $t('chronology.title') }}</h2>
                <p class="text-[#888] text-[clamp(14px,1.2vw,17px)]">{{ $t('chronology.subtitle') }}</p>
            </div>

            <!-- Tab pills -->
            <div class="flex justify-center gap-2 flex-wrap mb-14">
                <button
                    v-for="(m, i) in milestones"
                    :key="m.id"
                    class="px-5 py-2.5 rounded-full border text-[14px] font-medium transition-all duration-200 whitespace-nowrap"
                    :class="active === i
                        ? 'bg-[#1a1e2e] text-white border-[#1a1e2e]'
                        : 'bg-white text-[#1a1e2e] border-[#d0d5dd] hover:border-[#1a1e2e]'"
                    @click="active = i"
                >
                    {{ m.title }}
                </button>
            </div>

            <!-- Carousel -->
            <div class="relative overflow-hidden" style="height: 380px">
                <div
                    v-for="(m, i) in milestones"
                    :key="m.id"
                    class="absolute transition-all duration-500 select-none flex flex-col justify-between"
                    :style="getCardStyle(i)"
                    @click="active = i"
                >
                    <!-- Number -->
                    <span
                        class="font-black leading-none transition-colors duration-500"
                        :class="active === i ? 'text-[#1a1e2e] text-[72px]' : 'text-[#e0e0e0] text-[56px]'"
                    >
                        {{ String(i + 1).padStart(2, '0') }}
                    </span>

                    <!-- Date + Description -->
                    <div>
                        <p
                            class="font-black text-[22px] mb-2 transition-colors duration-500 leading-tight"
                            :class="active === i ? 'text-[#1a1e2e]' : 'text-[#c0c0c0]'"
                        >
                            {{ m.title }}
                        </p>
                        <p
                            class="text-[13.5px] leading-relaxed transition-colors duration-500"
                            :class="active === i ? 'text-[#666]' : 'text-[#b0b0b0]'"
                        >
                            {{ m.description }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Nav arrows -->
            <div class="flex justify-center gap-3 mt-6">
                <button
                    class="w-11 h-11 rounded-full border border-[#d0d5dd] flex items-center justify-center transition-all duration-200 hover:bg-[#1a1e2e] hover:border-[#1a1e2e] hover:text-white"
                    :style="{ opacity: active === 0 ? 0.3 : 1, cursor: active === 0 ? 'not-allowed' : 'pointer' }"
                    @click="prev"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    class="w-11 h-11 rounded-full border border-[#d0d5dd] flex items-center justify-center transition-all duration-200 hover:bg-[#1a1e2e] hover:border-[#1a1e2e] hover:text-white"
                    :style="{ opacity: active === milestones.length - 1 ? 0.3 : 1, cursor: active === milestones.length - 1 ? 'not-allowed' : 'pointer' }"
                    @click="next"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useChronologyStore } from '@/features/chronology/store'
import { resolveTranslation } from '@/utils/i18n'

const { locale } = useI18n()
const chronologyStore = useChronologyStore()

const active = ref(0)

const milestones = computed(() =>
    chronologyStore.items
        .filter((c) => c.status === 1)
        .map((c) => ({
            id: c.id,
            title: resolveTranslation(c.title, locale.value),
            description: c.description ? resolveTranslation(c.description, locale.value) : '',
        }))
)

onMounted(async () => {
    await chronologyStore.fetchAll({ limit: 100, sortBy: 'order', order: 'asc' })
    active.value = Math.min(2, Math.max(0, milestones.value.length - 1))
})

const CARD_W = 340
const CARD_H = 300
const GAP = 240

const getCardStyle = (i: number) => {
    const offset = i - active.value
    const absOffset = Math.abs(offset)

    const base = {
        left: '50%',
        top: '50%',
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        borderRadius: '24px',
        padding: '32px',
        transform: `translate(calc(-50% + ${offset * GAP}px), -50%) scale(${1 - absOffset * 0.07})`,
        zIndex: absOffset > 2 ? 0 : 10 - absOffset,
        opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.22,
        pointerEvents: (absOffset > 2 ? 'none' : 'auto') as 'none' | 'auto',
        background: offset === 0 ? '#ffffff' : '#efefef',
        boxShadow: offset === 0 ? '0 12px 48px rgba(0,0,0,0.12)' : 'none',
        cursor: offset === 0 ? 'default' : 'pointer',
    }

    return base
}

const prev = () => { if (active.value > 0) active.value-- }
const next = () => { if (active.value < milestones.value.length - 1) active.value++ }
</script>
