<template>
    <component :is="to ? RouterLink : 'div'" :to="to" class="app-brand" :class="[`app-brand--${size}`, { 'app-brand--light': light }]">
        <LogoIcon class="app-brand__mark" />
        <span v-if="!hideText" class="app-brand__text">
            <span class="app-brand__line">{{ $t('brand.line1') }}</span>
            <span class="app-brand__line">{{ $t('brand.line2') }}</span>
            <span class="app-brand__line">{{ $t('brand.line3') }}</span>
        </span>
    </component>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LogoIcon from '@/components/icons/LogoIcon.vue'

withDefaults(
    defineProps<{
        /** Link target; renders a plain <div> when omitted */
        to?: string
        /** sm = admin sidebar, md = navbar/footer (default), lg = auth page */
        size?: 'sm' | 'md' | 'lg'
        /** White text for dark backgrounds */
        light?: boolean
        /** Logo mark only (e.g. collapsed sidebar) */
        hideText?: boolean
    }>(),
    { size: 'md' }
)
</script>

<style scoped lang="scss">
// The single source of truth for the FIC logo + brand text.
// The brand name always renders as exactly three lines (brand.line1-3 in i18n).
.app-brand {
    display: flex;
    align-items: center;
    text-decoration: none;

    &__mark {
        flex-shrink: 0;
    }

    &__text {
        min-width: 0;
        font-weight: 700;
        text-transform: uppercase;
        text-align: left;
        color: #191c1f;
        letter-spacing: 0.02em;
        line-height: 1.35;
    }

    &--light &__text {
        color: #fff;
    }

    &__line {
        display: block;
    }

    &--md {
        gap: 8px;

        .app-brand__mark { width: 36px; height: 36px; }
        .app-brand__text { font-size: 9px; }

        @media (min-width: 768px) {
            gap: 12px;

            .app-brand__mark { width: 44px; height: 44px; }
            .app-brand__text { font-size: 11px; }
        }
    }

    &--sm {
        gap: 10px;

        .app-brand__mark { width: 40px; height: 40px; }
        .app-brand__text { font-size: 8px; }
    }

    &--lg {
        gap: 12px;

        .app-brand__mark { width: 56px; height: 56px; }
        .app-brand__text { font-size: 12px; }
    }
}
</style>
