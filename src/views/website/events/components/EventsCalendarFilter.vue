<template>
    <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <!-- Event type -->
        <div role="group" :aria-label="t('eventsPage.calendar.typeFilter')" class="no-scrollbar flex gap-2 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible">
            <button type="button" :class="[chip, !hasTypeFilter ? chipOn : chipOff]" :aria-pressed="!hasTypeFilter" @click="clearTypes">
                {{ t('eventsPage.calendar.allTypes') }}
            </button>
            <button
                v-for="type in EVENT_TYPES"
                :key="type.value"
                type="button"
                :class="[chip, isOn(type.value) ? chipOn : chipOff]"
                :aria-pressed="isOn(type.value)"
                @click="toggleType(type.value)"
            >
                {{ t(type.labelKey) }}
                <span v-if="typeCounts[type.value]" class="text-[12px] tabular-nums" :class="isOn(type.value) ? 'text-white/60' : 'text-[#8a94a6]'">
                    {{ typeCounts[type.value] }}
                </span>
            </button>
        </div>

        <!-- Date + reset -->
        <div class="flex items-center gap-4 shrink-0">
            <EventsDatePicker @update="setDate" @clear="clearDate" />
            <button
                v-if="isFiltered"
                type="button"
                class="text-[14px] font-semibold text-[#8a94a6] hover:text-[#1a1e2e] underline-offset-4 hover:underline transition-colors"
                @click="resetFilters"
            >
                {{ t('eventsPage.calendar.resetFilters') }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import EventsDatePicker from './EventsDatePicker.vue'
import { useEventsCalendar } from '@/features/calendarEvents/composables/useEventsCalendar'
import { EVENT_TYPES } from '@/features/calendarEvents/constants'
import type { CalendarEventType } from '@/features/calendarEvents/types'

const { t } = useI18n()
const { types, typeCounts, hasTypeFilter, isFiltered, toggleType, clearTypes, setDate, clearDate, resetFilters } = useEventsCalendar()

const isOn = (type: CalendarEventType) => types.value.includes(type)

const chip = 'inline-flex items-center gap-2 h-10 px-4 rounded-full border text-[14px] font-medium whitespace-nowrap shrink-0 transition-all duration-200'
const chipOn = 'bg-[#1a1e2e] text-white border-[#1a1e2e]'
const chipOff = 'bg-white text-[#1a1e2e] border-[#d0d5dd] hover:border-[#1a1e2e]'
</script>

<style scoped>
.no-scrollbar {
    scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>
