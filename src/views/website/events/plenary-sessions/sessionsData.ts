import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import img1Cover from '@/assets/images/planery-session/2022/1.webp'
import img1_2 from '@/assets/images/planery-session/2022/2.webp'
import img1_3 from '@/assets/images/planery-session/2022/3.webp'
import img1_4 from '@/assets/images/planery-session/2022/4.webp'
import img1_5 from '@/assets/images/planery-session/2022/5.webp'
import img1_6 from '@/assets/images/planery-session/2022/6.webp'
import img1_7 from '@/assets/images/planery-session/2022/7.webp'
import img1_8 from '@/assets/images/planery-session/2022/8.webp'

import img2Cover from '@/assets/images/planery-session/2024/1.webp'
import img2_2 from '@/assets/images/planery-session/2024/2.webp'
import img2_3 from '@/assets/images/planery-session/2024/3.webp'
import img2_4 from '@/assets/images/planery-session/2024/4.webp'
import img2_5 from '@/assets/images/planery-session/2024/5.webp'
import img2_6 from '@/assets/images/planery-session/2024/6.webp'
import img2_7 from '@/assets/images/planery-session/2024/7.webp'
import img2_8 from '@/assets/images/planery-session/2024/8.webp'

import img3Cover from '@/assets/images/planery-session/2025/1.webp'
import img3_2 from '@/assets/images/planery-session/2025/2.webp'
import img3_3 from '@/assets/images/planery-session/2025/3.webp'
import img3_4 from '@/assets/images/planery-session/2025/4.webp'

import img4Cover from '@/assets/images/planery-session/2026/1.webp'
import img4_2 from '@/assets/images/planery-session/2026/2.webp'
import img4_3 from '@/assets/images/planery-session/2026/3.webp'
import img4_4 from '@/assets/images/planery-session/2026/4.webp'
import img4_5 from '@/assets/images/planery-session/2026/5.webp'
import img4_6 from '@/assets/images/planery-session/2026/6.webp'
import img4_7 from '@/assets/images/planery-session/2026/7.webp'
import img4_8 from '@/assets/images/planery-session/2026/8.webp'

export type SessionLink = { label: string; href: string; outlined?: boolean }
export type StatCard = { label: string; value: string; dark?: boolean }
export type StatsBlock = { title: string; cards: StatCard[] }

export type InfoCard = { title: string; items: string[] }

export type PlenarySession = {
    id: number
    cover: string
    eyebrow: string
    title: string
    cardTitle: string
    gallery: string[]
    featureImages?: string[]
    paragraphs: string[]
    statsBlock?: StatsBlock
    initiativesList?: string[]
    infoCard?: InfoCard
    links: SessionLink[]
}

// Structural data (images, stat values, links) — text comes from i18n.
type SessionBase = {
    id: number
    cover: string
    gallery: string[]
    featureImages?: string[]
    // Stat-card structure (count + which card is dark). Text/values come from i18n.
    statCards?: { dark?: boolean }[]
    links: SessionLink[]
}

const base: SessionBase[] = [
    {
        id: 1,
        cover: img1Cover,
        gallery: [img1Cover, img1_2, img1_3, img1_4, img1_5, img1_6, img1_7, img1_8],
        links: [{ label: 'president.uz', href: 'https://president.uz' }],
    },
    {
        id: 2,
        cover: img2Cover,
        gallery: [img2Cover, img2_2, img2_3, img2_4, img2_5, img2_6, img2_7, img2_8],
        statCards: [{}, { dark: true }, {}],
        links: [{ label: 'lex.uz', href: 'https://lex.uz' }],
    },
    {
        id: 3,
        cover: img3Cover,
        gallery: [img3Cover, img3_2, img3_3, img3_4],
        statCards: [{}, { dark: true }, {}, {}, {}, {}, {}, {}, {}],
        links: [
            { label: 'president.uz', href: 'https://president.uz' },
            { label: 'lex.uz', href: 'https://lex.uz' },
        ],
    },
    {
        id: 4,
        cover: img4Cover,
        gallery: [img4Cover, img4_2, img4_3, img4_4, img4_5, img4_6, img4_7, img4_8],
        statCards: [{}, { dark: true }, {}, {}, {}, {}, {}, {}, {}],
        links: [
            { label: 'president.uz', href: 'https://president.uz' },
            { label: 'lex.uz', href: 'https://lex.uz' },
        ],
    },
]

export function useSessions() {
    const { t, tm, rt } = useI18n()

    const resolveList = (value: unknown): string[] =>
        Array.isArray(value) ? value.map((item) => rt(item as string)) : []

    return computed<PlenarySession[]>(() =>
        base.map((b) => {
            const key = `eventsPage.plenaryPage.sessions.s${b.id}`
            const raw = tm(key) as Record<string, unknown>

            const initiativesList = resolveList(raw.initiativesList)
            const infoItems = resolveList(raw.infoItems)

            const statCards = b.statCards
            const statsLabels = resolveList(raw.statsLabels)
            const statsValues = resolveList(raw.statsValues)

            return {
                id: b.id,
                cover: b.cover,
                gallery: b.gallery,
                featureImages: b.featureImages,
                eyebrow: t(`${key}.eyebrow`),
                title: t(`${key}.title`),
                cardTitle: t(`${key}.cardTitle`),
                paragraphs: resolveList(raw.paragraphs),
                statsBlock: statCards
                    ? {
                          title: t(`${key}.statsTitle`),
                          cards: statCards.map((c, i) => ({
                              label: statsLabels[i] ?? '',
                              value: statsValues[i] ?? '',
                              dark: c.dark,
                          })),
                      }
                    : undefined,
                initiativesList: initiativesList.length ? initiativesList : undefined,
                infoCard: infoItems.length
                    ? { title: t(`${key}.infoTitle`), items: infoItems }
                    : undefined,
                links: b.links,
            }
        })
    )
}
