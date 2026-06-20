<template>
    <div class="meetings-page">
        <WebEmptyState
            :title="$t('eventsPage.meetingsPage.emptyTitle')"
            :text="$t('eventsPage.meetingsPage.emptyText')"
        >
            <template #icon>
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="8" width="20" height="20" rx="5" stroke="currentColor" stroke-width="2"/>
                    <path d="M13 14v8M9 18h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M25 12h2a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M29 16v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </template>
        </WebEmptyState>
    </div>
</template>

<script setup lang="ts">
import WebEmptyState from '@/components/website/WebEmptyState.vue'
</script>
