import img5Hero from '@/assets/images/hero/ATM_9764.jpg'
import img6Hero from '@/assets/images/hero/SUT_8193.jpg'

import is6_1 from '@/assets/images/planery-session/ps_1.png'
import is6_2 from '@/assets/images/planery-session/ps_2.png'
import is6_3 from '@/assets/images/planery-session/ps_3.png'
import is6_4 from '@/assets/images/planery-session/ps_4.png'
import is6_5 from '@/assets/images/planery-session/ps_5.png'
import is6_6 from '@/assets/images/planery-session/ps_6.png'
import is6_7 from '@/assets/images/planery-session/ps_7.png'
import is6_8 from '@/assets/images/planery-session/ps_8.png'

export type StatCard = { value: string; label: string }

export type Initiative = { title: string; description: string }

export type LegalBasis = { text: string; docHref: string }

export type ContentBlock = { type: 'text' | 'quote'; text: string }

export type InterimSessionDetail = {
    heroImage?: string
    heroTitle?: string
    gallery?: string[]
    paragraph: string
    stats: StatCard[]
    contentBlocks?: ContentBlock[]
    initiatives?: Initiative[]
    roadmap?: Initiative[]
    legalBasis?: LegalBasis
}

export type InterimSession = {
    id: number
    code: string
    date: string
    note: string
    hasDetail: boolean
    detail?: InterimSessionDetail
}

export const interimSessions: InterimSession[] = [
    {
        id: 1,
        code: 'IS-1',
        date: '20 November 2019',
        note: 'The first interim session after the Council was established: priority areas, the format of engagement with investors, and the procedure for preparing proposals were defined',
        hasDetail: false,
    },
    {
        id: 2,
        code: 'IS-2',
        date: '2022',
        note: 'Progress on the implementation of approved initiatives and preparations for the next plenary session were reviewed',
        hasDetail: false,
    },
    {
        id: 3,
        code: 'IS-3',
        date: '29 August 2023',
        note: 'Results on priority areas and preparations for the 2024 plenary session were reviewed',
        hasDetail: false,
    },
    {
        id: 4,
        code: 'IS-4',
        date: '8 November 2024',
        note: 'The outcomes of the working groups, new investor proposals, and priorities for the upcoming period were discussed',
        hasDetail: false,
    },
    {
        id: 5,
        code: 'IS-5',
        date: '19 November 2025',
        note: 'Protocol No. 1 (approved 23.01.2026). Roadmap — 21 initiatives across 8 working groups; new groups established (circular economy, AI, creative industries accelerator) and the RAIC-CAC alliance',
        hasDetail: true,
        detail: {
            heroImage: img5Hero,
            heroTitle: 'V Interim Session of the Council',
            paragraph:
                'The fifth interim session of the Council was chaired by the Minister of Investment, Industry and Trade L. Kudratov. Protocol No. 1 was approved on 23 January 2026. At the session, the interagency working groups presented their results, and Council members put forward a number of strategic initiatives.',
            stats: [
                { value: '21', label: 'initiatives in the roadmap (Appendix No. 1)' },
                { value: '3', label: 'new working groups' },
                { value: '8', label: 'interagency groups presented their results' },
            ],
            initiatives: [
                {
                    title: 'Regional Alliance of Investment Councils of Central Asia and the Caucasus (RAIC-CAC)',
                    description:
                        'harmonisation of investment-climate approaches and cross-border coordination. Curator — Asian Development Bank. Official launch — at the V TIIF.',
                },
                {
                    title: '"Circular Economy" working group',
                    description:
                        'analysis and adaptation of leading international practices; establishment of the FIC "Circular Economy" award. Curator — Coca-Cola.',
                },
                {
                    title: '"Creative Industries Accelerator" working group',
                    description:
                        'transforming creative sectors into investment- and export-oriented industries within five years. Curator — Foundation for the Development of Culture and Art.',
                },
                {
                    title: 'Artificial Intelligence working group',
                    description: 'study and adaptation of global AI practices. Curator — EY.',
                },
                {
                    title: '"Skills of the Future" national open platform',
                    description: 'development of ten key competencies. Curators — Yandex, OTP Group.',
                },
            ],
            roadmap: [
                {
                    title: 'Corporate governance (Franklin Templeton)',
                    description: 'training programmes for corporate secretaries and IFRS, capital market development.',
                },
                {
                    title: 'Tax administration (EY)',
                    description: 'simplification of tax-residency certificates; tax rules for PPP projects.',
                },
                {
                    title: 'Responsible business conduct (Crowe)',
                    description: 'draft decree on the phased adoption of RBC standards.',
                },
                {
                    title: 'Alternative investment funds (Vision Invest)',
                    description: 'turning Uzbekistan into a regional hub for private and venture capital.',
                },
                {
                    title: 'Energy (ACWA Power, EDF, China Energy)',
                    description: 'private investment in electricity distribution; grid development plan; stability of the legal and tax regime.',
                },
                {
                    title: 'Land allocation (Kosta Legal)',
                    description: 'simplification and acceleration of procedures, draft Strategy for the use of land resources.',
                },
                {
                    title: 'Workforce development (OTP Group, Yandex)',
                    description: 'national internship portal; open educational platform; Fund for mandatory technical internships.',
                },
                {
                    title: 'Collateral legislation (BDO, EY, Uzum, TBC)',
                    description: 'new types of collateral; Islamic finance (Green Sukuk, Takaful); securitisation; secure data exchange.',
                },
            ],
            legalBasis: {
                text: 'Based on the Presidential Resolution of 18.07.2025 (entered into force on 21.07.2025) — PP-226',
                docHref: '/results/documents',
            },
        },
    },
    {
        id: 6,
        code: 'IS-6',
        date: '18 May 2026',
        note: 'Chaired for the first time by Deputy Prime Minister J. Khodjaev. 116 initiatives presented and adopted',
        hasDetail: true,
        detail: {
            heroImage: img6Hero,
            heroTitle: 'VI Interim Session of the Council',
            gallery: [is6_1, is6_2, is6_3, is6_4, is6_5, is6_6, is6_7, is6_8],
            paragraph:
                'On 18 May, the Foreign Investors Council under the President of the Republic of Uzbekistan held an Interim Session with the Deputy Prime Minister of the Republic of Uzbekistan, H.E. Mr. Jamshid Khodjaev, dedicated to the review of initiatives advanced by our membership ahead of the IV Plenary.',
            stats: [],
            contentBlocks: [
                {
                    type: 'text',
                    text: '120 initiatives were developed. The thematic blocks covered priorities identified by Council members as key for the next stage of investment climate development — from regulatory and administrative reform to sectoral and cross-border issues.',
                },
                {
                    type: 'text',
                    text: 'Each block opened with proposals from working group leaders, followed by responses from the government side and open discussion with participants.',
                },
                {
                    type: 'quote',
                    text: "The outcome: the initiatives received the Government's support across the board, with implementation pathways to be reflected in the Plenary's deliverables.",
                },
                {
                    type: 'text',
                    text: 'This is the model the FIC was built for — a Council where investor priorities are heard at the highest level and converted into commitments that move.',
                },
                {
                    type: 'text',
                    text: 'The Council now turns to the Fourth Plenary Session on 18 June 2026 in Tashkent, to be chaired by H.E. President Shavkat Mirziyoyev and co-chaired by EBRD President Ms. Odile Renaud-Basso.',
                },
                {
                    type: 'text',
                    text: 'With gratitude to Deputy Prime Minister Khodjaev, to Mr. Andi Aranitasi (EBRD Head of Uzbekistan) for moderating, and to the FIC members whose preparation made the day count.',
                },
            ],
        },
    },
]
