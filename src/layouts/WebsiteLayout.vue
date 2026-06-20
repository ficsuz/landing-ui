<template>
    <div class="website-layout" ref="layoutRef">
        <WebHeader />
        <WebHeroSection
            v-if="!route.meta.noHero"
            :title="route.meta.titleKey ? t(route.meta.titleKey) : (route.meta.title || '')"
            :image="route.meta.heroImage"
        />
        <main class="website-main">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>
        <WebFooter />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import WebHeader from '@/components/website/WebHeader.vue'
import WebFooter from '@/components/website/WebFooter.vue'
import WebHeroSection from '@/components/website/WebHeroSection.vue'

const route = useRoute()
const { t } = useI18n()

const layoutRef = ref<HTMLElement | null>(null)

watch(() => route.path, () => {
    layoutRef.value?.scrollTo({ top: 0, behavior: 'instant' })
})
</script>

<style scoped lang="scss">
.website-layout {
    min-height: 100vh;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.website-main {
    flex: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
