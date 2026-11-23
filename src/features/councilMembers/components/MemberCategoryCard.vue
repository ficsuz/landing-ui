<template>
    <component
        :is="to ? RouterLink : 'button'"
        v-bind="to ? { to } : { type: 'button', 'aria-pressed': active }"
        class="member-category-card"
        :class="{ 'member-category-card--active': active }"
    >
        <span class="member-category-card__count" :aria-hidden="count === null ? true : undefined">
            {{ count ?? '—' }}
        </span>
        <span class="member-category-card__label">{{ title }}</span>
        <ArrowRight v-if="to" class="member-category-card__arrow" aria-hidden="true" />
    </component>
</template>

<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

defineProps<{
    title: string
    count: number | null
    active?: boolean
    to?: RouteLocationRaw
}>()
</script>

<style scoped>
.member-category-card {
    position: relative;
    display: flex;
    min-width: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 20px 24px;
    border-radius: 20px;
    border: 1.5px solid rgba(25, 28, 31, 0.1);
    background: #fff;
    color: #191c1f;
    cursor: pointer;
    text-align: left;
    transition: border-color 0.2s, background-color 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s;
}

@media (min-width: 768px) {
    .member-category-card {
        padding: 24px 28px;
    }
}

.member-category-card[href] {
    padding-inline-end: 68px;
}

.member-category-card:hover {
    border-color: rgba(25, 28, 31, 0.25);
    box-shadow: 0 8px 24px rgba(25, 28, 31, 0.07);
    transform: translateY(-2px);
}

.member-category-card:focus-visible {
    outline: 2px solid #191c1f;
    outline-offset: 3px;
}

.member-category-card--active,
.member-category-card--active:hover {
    background: #191c1f;
    border-color: #191c1f;
    box-shadow: 0 12px 32px rgba(25, 28, 31, 0.2);
    color: #fff;
}

.member-category-card__count {
    font-size: clamp(36px, 5vw, 52px);
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;
}

.member-category-card__label {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    color: #505a63;
    overflow-wrap: anywhere;
}

.member-category-card--active .member-category-card__label {
    color: rgba(255, 255, 255, 0.75);
}

.member-category-card__arrow {
    position: absolute;
    top: 50%;
    inset-inline-end: 20px;
    width: 36px;
    height: 36px;
    padding: 9px;
    border-radius: 50%;
    background: #f0f1f3;
    transform: translateY(-50%);
    transition: background-color 0.2s, color 0.2s;
}

.member-category-card:hover .member-category-card__arrow,
.member-category-card:focus-visible .member-category-card__arrow {
    background: #191c1f;
    color: #fff;
}

@media (prefers-reduced-motion: reduce) {
    .member-category-card,
    .member-category-card__arrow {
        transition: none;
    }

    .member-category-card:hover {
        transform: none;
    }
}
</style>
