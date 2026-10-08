import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PlenarySession } from '@/views/website/events/plenary-sessions/sessionsData'

import img3Cover from '@/assets/images/planery-session/ps_4.png'
import img3_1 from '@/assets/images/planery-session/ps_1.png'
import img3_2 from '@/assets/images/planery-session/ps_2.png'
import img3_3 from '@/assets/images/planery-session/ps_3.png'
import img3_5 from '@/assets/images/planery-session/ps_5.png'
import img3_6 from '@/assets/images/planery-session/ps_6.png'
import img3_7 from '@/assets/images/planery-session/ps_7.png'
import img3_8 from '@/assets/images/planery-session/ps_8.png'

// A separate content namespace lets Corporation evolve without changing the original session.
export function useCorporationSession() {
    const { t, tm, rt } = useI18n()
    const key = 'corporationPage.session'
    const resolveList = (value: unknown): string[] =>
        Array.isArray(value) ? value.map((item) => rt(item as string)) : []

    return computed<PlenarySession>(() => {
        const raw = tm(key) as Record<string, unknown>
        const statsLabels = resolveList(raw.statsLabels)
        const statsValues = resolveList(raw.statsValues)

        return {
            id: 3,
            cover: img3Cover,
            gallery: [img3Cover, img3_1, img3_2, img3_3, img3_5, img3_6, img3_7, img3_8],
            featureImages: [img3_1, img3_2, img3_3],
            eyebrow: t(`${key}.eyebrow`),
            title: t(`${key}.title`),
            cardTitle: t(`${key}.cardTitle`),
            paragraphs: resolveList(raw.paragraphs),
            statsBlock: {
                title: t(`${key}.statsTitle`),
                cards: statsLabels.map((label, i) => ({
                    label,
                    value: statsValues[i] ?? '',
                    dark: i === 1,
                })),
            },
            initiativesList: resolveList(raw.initiativesList),
            links: [
                { label: 'president.uz', href: 'https://president.uz' },
                { label: 'lex.uz', href: 'https://lex.uz' },
            ],
        }
    })
}
