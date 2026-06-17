<template>
    <section
        class="web-hero"
        :style="[
            image ? { backgroundImage: `url(${image})` } : {},
            height ? { height } : {},
        ]"
    >
        <div class="web-hero__overlay" />
        <div class="web-hero__inner">
            <h1 class="web-hero__title">{{ title }}</h1>
            <p v-if="text" class="web-hero__text">{{ text }}</p>
        </div>
    </section>
</template>

<script setup lang="ts">
defineProps<{
    title: string
    image?: string
    text?: string
    height?: string
}>()
</script>

<style scoped lang="scss">
.web-hero {
    width: 100%;
    height: 500px;
    background-color: #1a1e28;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    align-items: flex-end;

    &__overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%);
    }

    &__inner {
        position: relative;
        max-width: 1400px;
        width: 100%;
        margin: 0 auto;
        padding: 0 24px 48px;
    }

    &__title {
        font-size: clamp(32px, 7vw, 96px);
        font-weight: 900;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: -0.01em;
        line-height: 1;
        margin: 0;
    }

    &__text {
        font-size: clamp(14px, 1.5vw, 18px);
        color: rgba(255, 255, 255, 0.75);
        margin: 12px 0 0;
        line-height: 1.6;
        max-width: 600px;
    }

    @media (max-width: 1024px) {
        height: 420px;

        &__inner {
            padding: 0 24px 40px;
        }
    }

    @media (max-width: 768px) {
        height: 280px;

        &__inner {
            padding: 0 16px 28px;
        }

        &__text {
            font-size: 13px;
            margin-top: 8px;
        }
    }

    @media (max-width: 480px) {
        height: 220px;

        &__inner {
            padding: 0 16px 24px;
        }
    }
}
</style>
