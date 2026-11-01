<template>
    <!-- Entry point to the members' cabinet (cabinet.fics.uz) — BIZNES_TZ §3: one shared button under the section title. -->
    <aside class="cabinet-callout" :aria-label="t('councilMembersPage.cabinet.eyebrow')">
        <span class="cabinet-callout__glow" aria-hidden="true" />
        <div class="cabinet-callout__icon" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="10.5" width="16" height="10.5" rx="2.5" />
                <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
                <circle cx="12" cy="15.5" r="1.3" fill="currentColor" stroke="none" />
            </svg>
        </div>

        <div class="cabinet-callout__body">
            <span class="cabinet-callout__eyebrow">{{ t('councilMembersPage.cabinet.eyebrow') }}</span>
            <h2 class="cabinet-callout__title">{{ t('councilMembersPage.cabinet.title') }}</h2>
            <p class="cabinet-callout__text">{{ t('councilMembersPage.cabinet.text') }}</p>
        </div>

        <div class="cabinet-callout__action">
            <a :href="cabinetUrl" target="_blank" rel="noopener" class="cabinet-callout__btn">
                {{ t('councilMembersPage.cabinet.button') }}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                </svg>
            </a>
            <span class="cabinet-callout__note">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
                </svg>
                {{ t('councilMembersPage.cabinet.note') }}
            </span>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

/** Cabinet login, opened in the visitor's current site language. */
const CABINET_URL = (import.meta.env.VITE_CABINET_URL as string | undefined) || 'https://cabinet.fics.uz'
const cabinetUrl = computed(() => `${CABINET_URL.replace(/\/$/, '')}/login?lang=${encodeURIComponent(locale.value)}`)
</script>

<style scoped>
.cabinet-callout {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 28px;
    margin-bottom: 40px;
    padding: 32px 36px;
    border-radius: 20px;
    background: linear-gradient(120deg, #1a1e2e 0%, #222842 60%, #26306a 100%);
    color: #fff;
    box-shadow: 0 18px 40px -18px rgba(26, 30, 46, 0.55);
}
.cabinet-callout__glow {
    position: absolute;
    right: -120px;
    top: -140px;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(67, 97, 238, 0.35) 0%, rgba(67, 97, 238, 0) 70%);
    pointer-events: none;
}
.cabinet-callout__icon {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #c7d2fe;
}
.cabinet-callout__body {
    position: relative;
    min-width: 0;
}
.cabinet-callout__eyebrow {
    display: inline-block;
    margin-bottom: 8px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #a5b4fc;
}
.cabinet-callout__title {
    margin: 0 0 8px;
    font-size: clamp(19px, 1.7vw, 24px);
    font-weight: 800;
    line-height: 1.25;
}
.cabinet-callout__text {
    margin: 0;
    max-width: 720px;
    font-size: clamp(14px, 1.1vw, 16px);
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.72);
}
.cabinet-callout__action {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
.cabinet-callout__btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 15px 28px;
    border-radius: 999px;
    background: #fff;
    color: #1a1e2e;
    font-size: 15px;
    font-weight: 700;
    white-space: nowrap;
    text-decoration: none;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        background 0.2s ease;
}
.cabinet-callout__btn svg {
    transition: transform 0.2s ease;
}
.cabinet-callout__btn:hover {
    transform: translateY(-1px);
    background: #eef1ff;
    box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.45);
}
.cabinet-callout__btn:hover svg {
    transform: translate(2px, -2px);
}
.cabinet-callout__btn:focus-visible {
    outline: 3px solid #a5b4fc;
    outline-offset: 3px;
}
.cabinet-callout__note {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.55);
}

@media (max-width: 900px) {
    .cabinet-callout {
        grid-template-columns: auto 1fr;
        padding: 28px;
    }
    .cabinet-callout__action {
        grid-column: 1 / -1;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 12px 16px;
    }
}
@media (max-width: 560px) {
    .cabinet-callout {
        grid-template-columns: 1fr;
        gap: 18px;
        padding: 24px 20px;
        border-radius: 16px;
    }
    .cabinet-callout__icon {
        width: 52px;
        height: 52px;
    }
    .cabinet-callout__btn {
        width: 100%;
        justify-content: center;
    }
    .cabinet-callout__action {
        flex-direction: column;
        align-items: stretch;
    }
    .cabinet-callout__note {
        justify-content: center;
    }
}
</style>
