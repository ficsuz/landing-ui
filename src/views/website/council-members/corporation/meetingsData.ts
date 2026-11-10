import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import raic1 from '@/assets/images/corporation/raic-cac-session/1.jpg'
import raic2 from '@/assets/images/corporation/raic-cac-session/2.jpg'
import raic3 from '@/assets/images/corporation/raic-cac-session/3.jpg'
import raic4 from '@/assets/images/corporation/raic-cac-session/4.jpg'
import raic5 from '@/assets/images/corporation/raic-cac-session/5.jpg'
import raic6 from '@/assets/images/corporation/raic-cac-session/6.jpg'
import raic7 from '@/assets/images/corporation/raic-cac-session/7.jpg'
import raic8 from '@/assets/images/corporation/raic-cac-session/8.jpg'
import raic9 from '@/assets/images/corporation/raic-cac-session/9.jpg'
import raic10 from '@/assets/images/corporation/raic-cac-session/10.jpg'
import raic11 from '@/assets/images/corporation/raic-cac-session/11.jpg'

import amcham1 from '@/assets/images/corporation/amcham-memorandum/1.jpg'
import amcham2 from '@/assets/images/corporation/amcham-memorandum/2.jpg'
import amcham3 from '@/assets/images/corporation/amcham-memorandum/3.jpg'
import amcham4 from '@/assets/images/corporation/amcham-memorandum/4.jpg'
import amcham5 from '@/assets/images/corporation/amcham-memorandum/5.jpg'
import amcham6 from '@/assets/images/corporation/amcham-memorandum/6.jpg'
import amcham7 from '@/assets/images/corporation/amcham-memorandum/7.jpg'
import amcham8 from '@/assets/images/corporation/amcham-memorandum/8.jpg'
import amcham9 from '@/assets/images/corporation/amcham-memorandum/9.jpg'

import eurouz1 from '@/assets/images/corporation/eurouz-memorandum/1.jpg'
import eurouz2 from '@/assets/images/corporation/eurouz-memorandum/2.jpg'
import eurouz3 from '@/assets/images/corporation/eurouz-memorandum/3.jpg'
import eurouz4 from '@/assets/images/corporation/eurouz-memorandum/4.jpg'
import eurouz5 from '@/assets/images/corporation/eurouz-memorandum/5.jpg'

export interface CorporationMeeting {
    /** URL segment: /council-members/corporation/<slug> */
    slug: string
    cover: string
    /** CSS object-position for the card cover — keeps the important part of a photo in the 3:2 frame */
    coverPosition: string
    gallery: string[]
    /** ISO date, used for machine-readable markup */
    date: string
    /** Display date in the same `dd.mm.yyyy` format as the meetings detail page */
    dateLabel: string
    eyebrow: string
    title: string
    paragraphs: string[]
}

interface MeetingSource {
    slug: string
    /** i18n namespace holding eyebrow / title / paragraphs */
    key: string
    date: string
    gallery: string[]
    /** Defaults to `center` */
    coverPosition?: string
}

// Static copies of meetings from "/events/meetings/<id>", kept independent of the CMS.
// Cards are sorted by ISO date, newest first, in useCorporationMeetings.
// Slugs must match the `:slug(...)` pattern of the `council-members-corporation-meeting` route.
const MEETINGS: MeetingSource[] = [
    {
        // /events/meetings/01a100f8-2491-7328-a44e-9c14180ca294 (+ an extra cover photo prepended)
        slug: 'raic-cac-strategic-session',
        key: 'corporationPage.raicCacSession',
        date: '2026-06-16',
        // 4:3 photo: anchor to the top so the emblem, captions and all signatories stay in the 3:2 card
        // frame — only the empty front edge of the table falls outside.
        coverPosition: 'center top',
        gallery: [raic1, raic2, raic3, raic4, raic5, raic6, raic7, raic8, raic9, raic10, raic11],
    },
    {
        // /events/meetings/01a17bea-e03a-73fa-8c89-e2bf57503dbe
        slug: 'amcham-memorandum',
        key: 'corporationPage.amchamMemorandum',
        date: '2026-10-27',
        gallery: [amcham1, amcham2, amcham3, amcham4, amcham5, amcham6, amcham7, amcham8, amcham9],
    },
    {
        // EUROUZ × FIC memorandum — content and photos provided directly (no CMS source)
        slug: 'eurouz-memorandum',
        key: 'corporationPage.eurouzMemorandum',
        date: '2026-11-03',
        gallery: [eurouz1, eurouz2, eurouz3, eurouz4, eurouz5],
    },
]

export function useCorporationMeetings() {
    const { t, tm, rt } = useI18n()

    return computed<CorporationMeeting[]>(() =>
        MEETINGS.map(({ slug, key, date, gallery, coverPosition = 'center' }) => {
            const paragraphs = tm(`${key}.paragraphs`)

            return {
                slug,
                cover: gallery[0],
                coverPosition,
                gallery,
                date,
                dateLabel: new Date(date).toLocaleDateString('en-GB').replace(/\//g, '.'),
                eyebrow: t(`${key}.eyebrow`),
                title: t(`${key}.title`),
                paragraphs: Array.isArray(paragraphs) ? paragraphs.map((item) => rt(item as string)) : [],
            }
        }).sort((a, b) => b.date.localeCompare(a.date))
    )
}
