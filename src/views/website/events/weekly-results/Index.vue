<template>
    <div class="weekly-page">
        <section class="bg-white pt-16 pb-14 md:pt-24 md:pb-20">
            <div class="page-container">

                <h2 class="section-title text-center mb-10 md:mb-14">
                    {{ $t('eventsPage.weeklyPage.sectionTitle') }}
                </h2>

                <div v-loading="store.loading" class="weekly-grid">
                    <router-link
                        v-for="(item, i) in events"
                        :key="item.id"
                        :to="{ name: 'events-weekly-results-detail', params: { id: item.id } }"
                        class="weekly-card"
                        :style="{ '--i': i }"
                    >
                        <div class="weekly-card__img-wrap">
                            <img
                                v-if="getMediaUrl(item.previewImageId)"
                                :src="getMediaUrl(item.previewImageId)"
                                :alt="item.dateRange"
                                class="weekly-card__img"
                            />
                            <div v-else class="weekly-card__placeholder">
                                <span class="weekly-card__placeholder-logo">FIC</span>
                                <span class="weekly-card__placeholder-week">{{ item.dateRange }}</span>
                            </div>

                        </div>

                        <div class="weekly-card__body">
                            <p class="weekly-card__label">{{ $t('eventsPage.weeklyPage.cardLabel') }}</p>
                            <p class="weekly-card__title">{{ item.title }}</p>
                            <p class="weekly-card__date">{{ item.dateRange }}</p>
                        </div>
                    </router-link>
                </div>

                <el-empty
                    v-if="!store.loading && events.length === 0"
                    :description="$t('common.noData')"
                    class="py-16"
                />

                <div v-if="hasMore" class="weekly-more">
                    <button class="weekly-more__btn" :disabled="store.loading" @click="loadMore">
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
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { useEventsStore } from '@/features/events/store'
import { getMediaUrl } from '@/utils/media'
import type { Translation } from '@/types/server/api.types'

const { locale } = useI18n()
const store = useEventsStore()

const page = ref(1)
const PAGE_SIZE = 10

function resolveTranslation(t: Translation | null | undefined) {
    if (!t) return ''
    return t[locale.value as keyof Translation] || t.uz || ''
}

function fmtDate(iso?: string | null) {
    if (!iso) return ''
    const d = new Date(iso)
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('ru-RU')
}

const events = computed(() =>
    store.items.map(e => ({
        id: e.id,
        previewImageId: e.previewImageId,
        title: resolveTranslation(e.title),
        dateRange: [fmtDate(e.startDate), fmtDate(e.endDate)].filter(Boolean).join(' – '),
    }))
)

const hasMore = computed(() => store.total > store.items.length)

async function loadMore() {
    page.value++
    const res = await store.fetchAll({ page: page.value, limit: PAGE_SIZE, sortBy: 'startDate', order: 'desc' })
    store.items.push(...res.data)
}

onMounted(async () => {
    await store.fetchAll({ page: 1, limit: PAGE_SIZE, sortBy: 'startDate', order: 'desc' })
    gsap.fromTo(
        '.weekly-card',
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out', delay: 0.1 }
    )
})
</script>

<style scoped lang="scss">
.weekly-page { background: #fff; }


.weekly-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    min-height: 80px;

    @media (min-width: 640px)  { grid-template-columns: repeat(3, 1fr); }
    @media (min-width: 1024px) { grid-template-columns: repeat(5, 1fr); gap: 20px; }
}

.weekly-card {
    display: block;
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    border: 1.5px solid #eef0f4;
    cursor: pointer;
    text-decoration: none;
    transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;

    &:hover {
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.11);
        transform: translateY(-4px);
        border-color: #d0d5dd;

        .weekly-card__img  { transform: scale(1.05); }

        .weekly-card__placeholder-logo { opacity: 0.18; }
    }

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
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;

        @media (min-width: 768px) { font-size: 14px; }
    }

    &__date {
        font-size: 12px;
        color: #505a63;
        line-height: 1.3;
    }
}

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

        &:disabled { opacity: 0.5; cursor: default; }
    }
}
</style>
