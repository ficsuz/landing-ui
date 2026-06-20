<template>
    <div class="wg-session-page">
        <WebEmptyState
            :title="$t('eventsPage.wgSessionPage.emptyTitle')"
            :text="$t('eventsPage.wgSessionPage.emptyText')"
        >
            <template #icon>
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="10" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="8"  cy="26" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="28" cy="26" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M14.5 13.5L10 22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <path d="M21.5 13.5L26 22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <path d="M12 26h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
            </template>
        </WebEmptyState>
    </div>
</template>

<script setup lang="ts">
import WebEmptyState from '@/components/website/WebEmptyState.vue'
</script>
