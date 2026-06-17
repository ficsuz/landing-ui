<template>
    <div class="working-groups-page">
        <section id="overview" class="wg-anchor">
            <Overview />
        </section>

        <section id="council-working-groups" class="wg-anchor">
            <CouncilWorkingGroups />
        </section>

        <section id="interagency-working-groups" class="wg-anchor">
            <InteragencyWorkingGroups />
        </section>

        <section id="session-outcomes" class="wg-anchor">
            <SessionOutcomes />
        </section>
    </div>
</template>

<script setup lang="ts">
import Overview from './components/Overview.vue'
import CouncilWorkingGroups from './components/CouncilWorkingGroups.vue'
import InteragencyWorkingGroups from './components/InteragencyWorkingGroups.vue'
import SessionOutcomes from './components/SessionOutcomes.vue'
</script>

<style scoped lang="scss">
.wg-anchor {
    // Offset for sticky navbar when scrolling to anchor
    scroll-margin-top: 100px;
}
</style>
