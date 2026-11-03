import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import img1 from '@/assets/images/corporation/amcham-memorandum/1.jpg'
import img2 from '@/assets/images/corporation/amcham-memorandum/2.jpg'
import img3 from '@/assets/images/corporation/amcham-memorandum/3.jpg'
import img4 from '@/assets/images/corporation/amcham-memorandum/4.jpg'
import img5 from '@/assets/images/corporation/amcham-memorandum/5.jpg'
import img6 from '@/assets/images/corporation/amcham-memorandum/6.jpg'
import img7 from '@/assets/images/corporation/amcham-memorandum/7.jpg'
import img8 from '@/assets/images/corporation/amcham-memorandum/8.jpg'
import img9 from '@/assets/images/corporation/amcham-memorandum/9.jpg'

const MEMORANDUM_DATE = '2026-10-27'

export interface CorporationMemorandum {
    cover: string
    gallery: string[]
    /** ISO date, used for machine-readable markup */
    date: string
    /** Display date in the same `dd.mm.yyyy` format as the meetings detail page */
    dateLabel: string
    eyebrow: string
    title: string
    paragraphs: string[]
}

// Static copy of the meeting "/events/meetings/01a17bea-e03a-73fa-8c89-e2bf57503dbe"
// (AmCham Uzbekistan × FIC cooperation memorandum), kept independent of the CMS.
export function useCorporationMemorandum() {
    const { t, tm, rt } = useI18n()
    const key = 'corporationPage.amchamMemorandum'

    return computed<CorporationMemorandum>(() => {
        const paragraphs = tm(`${key}.paragraphs`)

        return {
            cover: img1,
            gallery: [img1, img2, img3, img4, img5, img6, img7, img8, img9],
            date: MEMORANDUM_DATE,
            dateLabel: new Date(MEMORANDUM_DATE).toLocaleDateString('en-GB').replace(/\//g, '.'),
            eyebrow: t(`${key}.eyebrow`),
            title: t(`${key}.title`),
            paragraphs: Array.isArray(paragraphs) ? paragraphs.map((item) => rt(item as string)) : [],
        }
    })
}
