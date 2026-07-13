import img1Cover from '@/assets/images/planery-session/info3_1.png'
import img1_2 from '@/assets/images/planery-session/info3_2.png'
import img1_3 from '@/assets/images/planery-session/info3_3.png'
import img1_4 from '@/assets/images/planery-session/info3_4.png'
import img1_5 from '@/assets/images/planery-session/info3_5.png'
import img1_6 from '@/assets/images/planery-session/info3_6.png'
import img1_7 from '@/assets/images/planery-session/info3_7.png'
import img1_8 from '@/assets/images/planery-session/info3_8.png'

import img2Cover from '@/assets/images/planery-session/info2_1.png'
import img2_2 from '@/assets/images/planery-session/info2_2.png'
import img2_3 from '@/assets/images/planery-session/info2_3.png'
import img2_4 from '@/assets/images/planery-session/info2_4.png'
import img2_5 from '@/assets/images/planery-session/info2_5.png'
import img2_6 from '@/assets/images/planery-session/info2_6.png'
import img2_7 from '@/assets/images/planery-session/info2_7.png'
import img2_8 from '@/assets/images/planery-session/info2_8.png'

import img3Cover from '@/assets/images/planery-session/ps_4.png'
import img3_1 from '@/assets/images/planery-session/ps_1.png'
import img3_2 from '@/assets/images/planery-session/ps_2.png'
import img3_3 from '@/assets/images/planery-session/ps_3.png'
import img3_5 from '@/assets/images/planery-session/ps_5.png'
import img3_6 from '@/assets/images/planery-session/ps_6.png'
import img3_7 from '@/assets/images/planery-session/ps_7.png'
import img3_8 from '@/assets/images/planery-session/ps_8.png'

import img4Cover from '@/assets/images/interim-session/DSC02251.JPG'

export type SessionLink = { label: string; href: string; outlined?: boolean }
export type StatCard = { label: string; value: string; dark?: boolean }
export type StatsBlock = { title: string; cards: StatCard[] }

export type InfoCard = { title: string; items: string[] }

export type PlenarySession = {
    id: number
    cover: string
    eyebrow: string
    title: string
    summary: string
    decisions: string[]
    participants: number
    initiatives: number
    gallery: string[]
    featureImages?: string[]
    paragraphs: string[]
    statsBlock?: StatsBlock
    initiativesList?: string[]
    infoCard?: InfoCard
    links: SessionLink[]
}

export const sessions: PlenarySession[] = [
    {
        id: 1,
        cover: img1Cover,
        eyebrow: 'PLENARY SESSION 2022',
        title: 'First plenary session of the Foreign Investors Council',
        summary: 'Residence «Kuksaroy». More than 150 participants, over 40 proposals. Priorities: business environment, tax stability, PPP, green economy, digitalization.',
        decisions: [
            'Council Charter adopted',
            'Executive Committee of 5 members confirmed',
            'Priority reform areas identified for 2022–2024',
        ],
        participants: 58,
        initiatives: 15,
        gallery: [img1Cover, img1_2, img1_3, img1_4, img1_5, img1_6, img1_7, img1_8],
        paragraphs: [
            'On November 16, 2022, the first plenary session of the Foreign Investors Council was held at the Kuksaroy residence in Tashkent, under the chairmanship of the President of the Republic of Uzbekistan. The session opened an institutional format for direct dialogue between the Government and international investors.',
            'More than 150 high-level representatives participated in the session — international financial institutions, leading industrial and investment companies, ministries and agencies.',
            'Discussions covered improving the business environment, stability of the tax and legal system, development of public-private partnerships, green economy, and digital transformation.',
            'As a result of the session, more than 40 specific proposals and initiatives were developed, launching the Council\'s systematic work.',
        ],
        links: [
            { label: 'president.uz', href: 'https://president.uz' },
            { label: 'doc', href: '#', outlined: true },
        ],
    },
    {
        id: 2,
        cover: img2Cover,
        eyebrow: 'PLENARY SESSION 2024',
        title: 'Second plenary session of the Foreign Investors Council',
        summary: 'Held within the III TIIF under the chairmanship of the President. As a result — PP-179 with a roadmap of 14 initiatives, including the creation of four working groups.',
        decisions: [
            'PP-179 signed: four working groups established',
            'Investment attraction targets 2024–2026 set',
            'Legal reform roadmap approved',
        ],
        participants: 74,
        initiatives: 28,
        gallery: [img2Cover, img2_2, img2_3, img2_4, img2_5, img2_6, img2_7, img2_8],
        paragraphs: [
            'On May 3, 2024, within the framework of the III Tashkent International Investment Forum, the second plenary session of the Foreign Investors Council was held under the chairmanship of the President of the Republic of Uzbekistan. The session consolidated the transition from developing proposals to their systematic implementation.',
            'Following the session, Presidential Decree No. PP-179 of May 15, 2024 was adopted, approving a roadmap of 14 initiatives.',
            'These include new editions of the laws on investments and special economic zones, a law on alternative (venture) investments, implementation of the OECD Investment Policy Review project, and the establishment of four Council working groups on key areas.',
        ],
        initiativesList: [
            'Drafting the Law «On Investments and Investment Activity» (new edition) in line with WTO rules',
            'Drafting the Law «On Special Economic Zones» (new edition)',
            'Drafting the Law «On Alternative (Venture) Investments» for startups and innovative projects',
            'Establishing the Tashkent International Commercial Court at the International Center for Digital Technologies',
            'Implementing the OECD «Investment Policy Review» project',
            'Studying the abolition of taxation of exchange-rate differences when forming the charter capital',
            'Studying a mechanism to keep tax rates unchanged for projects exceeding $100 million',
            'Creating four working groups within the Council (see the block below)',
            'Implementing the «Unified Investment Platform» information system',
            'Strategy for developing artificial intelligence and updating digital maps (with Yandex)',
            'Accelerating territorial master plans and a temporary land reservation mechanism',
            'Improving the procedure for taxing investor dividends',
            'Modern mechanisms for regulating contractual relations (corporate agreement, warranty, indemnity)',
            'Legal framework for branches of foreign companies without legal-entity status',
        ],
        statsBlock: {
            title: 'ROADMAP OF THE II PLENARY SESSION — 14 INITIATIVES (PP-179, ANNEX NO. 3)',
            cards: [
                { label: 'Initiatives in the roadmap', value: '14' },
                { label: 'Working groups (initiative No. 8)', value: '4', dark: true },
                { label: 'Of May 16, 2024', value: 'PP-179' },
            ],
        },
        infoCard: {
            title: 'FOUR WORKING GROUPS (PP-179)',
            items: [
                'developing the capital market and transforming it into an international financial center',
                'responsible business conduct (OECD principles)',
                'alternative (venture) investments — drafting the bill',
                'digitalizing the investor relations system — electronic platform',
            ],
        },
        links: [
            { label: 'lex.uz', href: 'https://lex.uz' },
            { label: 'doc', href: '#', outlined: true },
        ],
    },
    {
        id: 3,
        cover: img3Cover,
        eyebrow: 'PLENARY SESSION 2025',
        title: 'Third plenary session of the Foreign Investors Council',
        summary: 'The third plenary session was chaired by President Mirziyoyev and co-chaired by the EBRD President. New investment initiatives were presented, results of working groups reported, and PP-226 was signed expanding the council structure.',
        decisions: [
            'PP-226 signed: restructuring and expansion of working groups to 16',
            '47 initiatives reviewed, 31 marked as completed',
            'New investment targets set for 2026–2028',
            'Secretariat formally established as FIC Association',
        ],
        participants: 86,
        initiatives: 47,
        gallery: [img3Cover, img3_1, img3_2, img3_3, img3_5, img3_6, img3_7, img3_8],
        featureImages: [img3_1, img3_2, img3_3],
        paragraphs: [
            'International Congress Centre, under the chairmanship of the President and with the participation of the EBRD President. Over 40 initiatives were selected; basic tax rates for businesses will remain unchanged until 2028. As a result — PP-226 of 18.07.2025 (entered into force on 21.07.2025).',
            'On June 11, 2025, the third plenary session of the Foreign Investors Council was held at the International Congress Center under the chairmanship of the President of the Republic of Uzbekistan and with the participation of the EBRD President. The session was attended by heads of Masdar, ACWA Power, Indorama, Vision Invest, DataVolt, VEON, Boeing, SpaceX, Meta, Franklin Templeton, TotalEnergies and other companies, as well as representatives of the OECD, IFC, ADB and the Islamic Development Bank.',
            'The effectiveness of the platform was highlighted: the EBRD invested a record amount of approximately $1 billion in Uzbekistan over the year, becoming the country\'s largest partner in the region; the volume of joint projects with the private sector exceeded $1 billion; leading energy companies invested over $8 billion in the green economy.',
            'It was announced that basic tax rates for business will not change until 2028; over two years, 5,500 new enterprises with foreign capital were established, bringing the total to 16,000.',
            'More than 40 initiatives were selected for the session. Following the session, Presidential Decree No. PP-226 of July 18, 2025 was adopted, approving the roadmap and formalizing the transformation of the Council Secretariat into an independent legal entity.',
        ],
        statsBlock: {
            title: 'WHAT WAS ENSHRINED BY DECREE PP-226',
            cards: [
                { label: 'Initiatives', value: '22' },
                { label: 'Working groups', value: '8', dark: true },
                { label: '18-07-2025 year', value: 'PP-226' },
                { label: 'Initiatives selected for the session', value: '40+' },
                { label: 'Basic tax rates frozen until', value: '2028' },
                { label: 'Enterprises with foreign capital', value: '16,000' },
                { label: 'PPP projects launched', value: '$4.5 bn' },
                { label: 'Investments in the «green» economy', value: '$8 bn' },
                { label: 'Record EBRD investment for the year', value: '~$1 bn' },
            ],
        },
        initiativesList: [
            'An Action Plan for implementing the proposals and initiatives of the III plenary session was approved (Annex No. 1)',
            'An updated composition of the Uzbek side of the Council was approved (Annex No. 2)',
            'The Council was granted the right to create working groups by area, involving heads and staff of ministries and agencies',
            'The Council Secretariat was established as a non-governmental non-profit organization with the participation of international financial institutions (new edition of paragraphs 29–31 of PP-4519); the head is appointed in coordination with the Executive Committee',
            'Implementation of the «Unified Investment Platform» information system (responsible — Deputy Prime Minister J. Khodjaev)',
            'Oversight of execution — Prime Minister A. N. Aripov',
        ],
        links: [
            { label: 'president.uz', href: 'https://president.uz' },
            { label: 'lex.uz', href: 'https://lex.uz' },
            { label: 'doc', href: '#', outlined: true },
        ],
    },
    {
        id: 4,
        cover: img4Cover,
        eyebrow: 'PLENARY SESSION 2026',
        title: 'Fourth plenary session of the Foreign Investors Council',
        summary: 'The third plenary session was chaired by President Mirziyoyev and co-chaired by the EBRD President. New investment initiatives were presented, results of working groups reported, and PP-226 was signed expanding the council structure.',
        decisions: [
            'PP-226 signed: restructuring and expansion of working groups to 16',
            '47 initiatives reviewed, 31 marked as completed',
            'New investment targets set for 2026–2028',
            'Secretariat formally established as FIC Association',
        ],
        participants: 86,
        initiatives: 47,
        gallery: [img3Cover, img3_1, img3_2, img3_3, img3_5, img3_6, img3_7, img3_8],
        featureImages: [img3_1, img3_2, img3_3],
        paragraphs: [
            'International Congress Centre, under the chairmanship of the President and with the participation of the EBRD President. Over 40 initiatives were selected; basic tax rates for businesses will remain unchanged until 2028. As a result — PP-226 of 18.07.2025 (entered into force on 21.07.2025).',
            'On June 11, 2025, the third plenary session of the Foreign Investors Council was held at the International Congress Center under the chairmanship of the President of the Republic of Uzbekistan and with the participation of the EBRD President. The session was attended by heads of Masdar, ACWA Power, Indorama, Vision Invest, DataVolt, VEON, Boeing, SpaceX, Meta, Franklin Templeton, TotalEnergies and other companies, as well as representatives of the OECD, IFC, ADB and the Islamic Development Bank.',
            'The effectiveness of the platform was highlighted: the EBRD invested a record amount of approximately $1 billion in Uzbekistan over the year, becoming the country\'s largest partner in the region; the volume of joint projects with the private sector exceeded $1 billion; leading energy companies invested over $8 billion in the green economy.',
            'It was announced that basic tax rates for business will not change until 2028; over two years, 5,500 new enterprises with foreign capital were established, bringing the total to 16,000.',
            'More than 40 initiatives were selected for the session. Following the session, Presidential Decree No. PP-226 of July 18, 2025 was adopted, approving the roadmap and formalizing the transformation of the Council Secretariat into an independent legal entity.',
        ],
        statsBlock: {
            title: 'WHAT WAS ENSHRINED BY DECREE PP-226',
            cards: [
                { label: 'Initiatives', value: '22' },
                { label: 'Working groups', value: '8', dark: true },
                { label: '18-07-2025 year', value: 'PP-226' },
                { label: 'Initiatives selected for the session', value: '40+' },
                { label: 'Basic tax rates frozen until', value: '2028' },
                { label: 'Enterprises with foreign capital', value: '16,000' },
                { label: 'PPP projects launched', value: '$4.5 bn' },
                { label: 'Investments in the «green» economy', value: '$8 bn' },
                { label: 'Record EBRD investment for the year', value: '~$1 bn' },
            ],
        },
        initiativesList: [
            'An Action Plan for implementing the proposals and initiatives of the III plenary session was approved (Annex No. 1)',
            'An updated composition of the Uzbek side of the Council was approved (Annex No. 2)',
            'The Council was granted the right to create working groups by area, involving heads and staff of ministries and agencies',
            'The Council Secretariat was established as a non-governmental non-profit organization with the participation of international financial institutions (new edition of paragraphs 29–31 of PP-4519); the head is appointed in coordination with the Executive Committee',
            'Implementation of the «Unified Investment Platform» information system (responsible — Deputy Prime Minister J. Khodjaev)',
            'Oversight of execution — Prime Minister A. N. Aripov',
        ],
        links: [
            { label: 'president.uz', href: 'https://president.uz' },
            { label: 'lex.uz', href: 'https://lex.uz' },
            { label: 'doc', href: '#', outlined: true },
        ],
    },
]
