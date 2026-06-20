<template>
    <div class="weekly-page">

        <!-- Section heading -->
        <section class="bg-white pt-16 pb-14 md:pt-24 md:pb-20">
            <div class="page-container">

                <h2 class="weekly-section-title">
                    {{ $t('eventsPage.weeklyPage.sectionTitle') }}
                </h2>

                <!-- Cards grid -->
                <div class="weekly-grid">
                    <div
                        v-for="(item, i) in items"
                        :key="item.id"
                        class="weekly-card"
                        :style="{ '--i': i }"
                    >
                        <!-- Image -->
                        <div class="weekly-card__img-wrap">
                            <img
                                v-if="item.image"
                                :src="item.image"
                                :alt="item.dateRange"
                                class="weekly-card__img"
                            />
                            <!-- Placeholder when no image yet -->
                            <div v-else class="weekly-card__placeholder">
                                <span class="weekly-card__placeholder-logo">FIC</span>
                                <span class="weekly-card__placeholder-week">{{ item.dateRange }}</span>
                            </div>

                            <!-- Overlay on hover -->
                            <div class="weekly-card__overlay">
                                <span class="weekly-card__overlay-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                        <polyline points="15 3 21 3 21 9"/>
                                        <line x1="10" y1="14" x2="21" y2="3"/>
                                    </svg>
                                    {{ $t('common.learnMore') }}
                                </span>
                            </div>
                        </div>

                        <!-- Text -->
                        <div class="weekly-card__body">
                            <p class="weekly-card__label">{{ $t('eventsPage.weeklyPage.cardLabel') }}</p>
                            <p class="weekly-card__title">{{ $t('eventsPage.weeklyPage.cardTitle') }}</p>
                            <p class="weekly-card__date">{{ item.dateRange }}</p>
                        </div>
                    </div>
                </div>

                <!-- Load more (ready for backend) -->
                <div v-if="showMore" class="weekly-more">
                    <button class="weekly-more__btn" @click="loadMore">
                        {{ $t('eventsPage.weeklyPage.viewMore') }}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 5v14M5 12l7 7 7-7"/>
                        </svg>
                    </button>
                </div>

            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

/* ── Static data (replace with store when backend is ready) ── */
const items = ref([
    { id: 1, image: '', dateRange: '23.03.2026 – 29.03.2026' },
    { id: 2, image: '', dateRange: '16.03.2026 – 22.03.2026' },
    { id: 3, image: '', dateRange: '09.03.2026 – 15.03.2026' },
    { id: 4, image: '', dateRange: '02.03.2026 – 08.03.2026' },
    { id: 5, image: '', dateRange: '23.02.2026 – 01.03.2026' },
    { id: 6, image: '', dateRange: '16.02.2026 – 22.02.2026' },
    { id: 7, image: '', dateRange: '09.02.2026 – 15.02.2026' },
    { id: 8, image: '', dateRange: '02.02.2026 – 08.02.2026' },
    { id: 9, image: '', dateRange: '26.01.2026 – 01.02.2026' },
    { id: 10, image: '', dateRange: '19.01.2026 – 25.01.2026' },
])

const showMore = ref(false) /* set true when backend pagination is enabled */

const loadMore = () => {
    /* hook up to store.fetchItems() when backend is ready */
}

onMounted(() => {
    gsap.fromTo(
        '.weekly-card',
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out', delay: 0.1 }
    )
})
</script>

<style scoped lang="scss">
.weekly-page { background: #fff; }

/* ── Section title ── */
.weekly-section-title {
    font-size: clamp(16px, 1.6vw, 20px);
    font-weight: 800;
    color: #1a1e2e;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 36px;

    @media (min-width: 768px) { margin-bottom: 48px; }
}

/* ── Grid ── */
.weekly-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    @media (min-width: 640px)  { grid-template-columns: repeat(3, 1fr); }
    @media (min-width: 1024px) { grid-template-columns: repeat(5, 1fr); gap: 20px; }
}

/* ── Card ── */
.weekly-card {
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    border: 1.5px solid #eef0f4;
    cursor: pointer;
    transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;

    &:hover {
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.11);
        transform: translateY(-4px);
        border-color: #d0d5dd;

        .weekly-card__img  { transform: scale(1.05); }
        .weekly-card__overlay { opacity: 1; }
        .weekly-card__placeholder-logo { opacity: 0.18; }
    }

    /* ── Image ── */
    &__img-wrap {
        position: relative;
        aspect-ratio: 3 / 4;
        overflow: hidden;
        background: #1a1e2e;
    }

    &__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.5s ease;
    }

    /* Placeholder (no image) */
    &__placeholder {
        width: 100%;
        height: 100%;
        background: linear-gradient(145deg, #1a1e2e 0%, #2d3352 60%, #1a1e2e 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 16px;
    }

    &__placeholder-logo {
        font-size: clamp(28px, 4vw, 40px);
        font-weight: 900;
        color: #fff;
        opacity: 0.12;
        letter-spacing: 0.08em;
        transition: opacity 0.3s;
    }

    &__placeholder-week {
        font-size: 10px;
        font-weight: 600;
        color: rgba(255,255,255,0.3);
        letter-spacing: 0.06em;
        text-align: center;
        line-height: 1.4;
    }

    /* Hover overlay */
    &__overlay {
        position: absolute;
        inset: 0;
        background: rgba(26, 30, 46, 0.55);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 20px;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &__overlay-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #fff;
        color: #1a1e2e;
        font-size: 12px;
        font-weight: 700;
        padding: 8px 16px;
        border-radius: 999px;
    }

    /* ── Body ── */
    &__body {
        padding: 14px 14px 16px;
    }

    &__label {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #8a94a6;
        margin-bottom: 5px;
    }

    &__title {
        font-size: 13px;
        font-weight: 700;
        color: #1a1e2e;
        line-height: 1.35;
        margin-bottom: 6px;

        @media (min-width: 768px) { font-size: 14px; }
    }

    &__date {
        font-size: 12px;
        color: #505a63;
        line-height: 1.3;
    }
}

/* ── Load more ── */
.weekly-more {
    display: flex;
    justify-content: center;
    margin-top: 48px;

    &__btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: 1.5px solid #d0d5dd;
        color: #1a1e2e;
        font-size: 15px;
        font-weight: 600;
        padding: 12px 32px;
        border-radius: 999px;
        background: none;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            background: #1a1e2e;
            color: #fff;
            border-color: #1a1e2e;
        }
    }
}
</style>
