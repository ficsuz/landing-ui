<template>
    <!-- Keyed by slug so the gallery state resets when switching between meetings -->
    <CorporationMeeting v-if="meeting" :key="meeting.slug" :meeting="meeting" />
    <div v-else class="bg-white py-24 text-center text-[#8a94a6]">
        {{ $t('common.noData') }}
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CorporationMeeting from '@/views/website/council-members/corporation/components/CorporationMeeting.vue'
import { useCorporationMeetings } from '@/views/website/council-members/corporation/meetingsData'

const route = useRoute()
const meetings = useCorporationMeetings()
const meeting = computed(() => meetings.value.find((m) => m.slug === route.params.slug))
</script>
