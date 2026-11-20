<template>
    <div class="working-groups-page">
        <section id="interagency-groups" class="wg-anchor">
            <Overview interagency-only @group-change="groupOpen = $event" />
        </section>
        <!-- Session outcomes belong to the groups list only, not to a single group's detail view. -->
        <section v-if="!groupOpen" id="session-outcomes" class="wg-anchor">
            <SessionOutcomes />
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Overview from './components/Overview.vue'
import SessionOutcomes from './components/SessionOutcomes.vue'

const route = useRoute()
const groupOpen = ref(false)

function scrollToHash(hash: string) {
    if (!hash || hash === '#overview') {
        const layout = document.querySelector('.website-layout') as HTMLElement | null
        ;(layout ?? document.documentElement).scrollTo({ top: 0, behavior: 'smooth' })
        return
    }
    const el = document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(async () => {
    await nextTick()
    scrollToHash(route.hash)
})

watch(() => route.hash, async (hash) => {
    await nextTick()
    scrollToHash(hash)
})
</script>

<style scoped lang="scss">
.wg-anchor {
    scroll-margin-top: 100px;
}
</style>
