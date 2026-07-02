import img1 from '@/assets/images/hero/ATM_9764.jpg'
import img2 from '@/assets/images/hero/SUT_8193.jpg'
import img3 from '@/assets/images/hero/SUT_7962.jpg'
import img4 from '@/assets/images/hero/about-blog.jpg'
import img5 from '@/assets/images/banner/banner-img.png'
import img6 from '@/assets/images/banner/opa.png'

export type ArticleTopic = 'investment' | 'reform' | 'macroeconomy' | 'sector'

export interface Article {
    id: number
    image: string
    category: string
    topic: ArticleTopic
    title: string
    date: string
    readMin: number
    author: string
    authorInitials: string
    excerpt: string
    content: string[]
}

// Hozircha static; API tayyor bo'lganda store orqali keladi.
// Rasm backendda: getMediaUrl(article.imageId).
export const articles: Article[] = [
    {
        id: 1,
        image: img1,
        category: 'Investment Growth',
        topic: 'investment',
        title: 'Uzbekistan FDI Landscape 2026: Key Trends and Sector Shifts',
        date: '05.09.2026',
        readMin: 8,
        author: 'FIC Secretariat',
        authorInitials: 'FS',
        excerpt:
            "Foreign direct investment into Uzbekistan reached $12.4B in 2025, with energy and digital sectors driving 60% of inflows. This analysis examines structural factors and the FIC's role in regulatory improvements.",
        content: [
            "Foreign direct investment into Uzbekistan reached $12.4B in 2025, with energy and digital sectors driving 60% of inflows. This analysis examines the structural factors behind the surge and the Foreign Investors Council's role in the regulatory improvements that made it possible.",
            'The concentration of capital in renewables and data infrastructure reflects both global appetite for green assets and Uzbekistan\'s deliberate positioning as a regional hub. Auction transparency, sovereign guarantees, and predictable tariff frameworks were repeatedly cited by investors as decisive factors.',
            'Looking ahead, sustaining momentum will depend on broadening the pipeline beyond flagship projects — into manufacturing, agribusiness, and services — while preserving the macroeconomic stability that underpins investor confidence.',
        ],
    },
    {
        id: 2,
        image: img2,
        category: 'Regulatory Reform',
        topic: 'reform',
        title: 'Tax Reform Progress: From Concept to Implementation',
        date: '20.08.2026',
        readMin: 12,
        author: 'Legal Reform WG',
        authorInitials: 'LR',
        excerpt:
            "The 2024–2026 tax reform package represents the most significant overhaul of Uzbekistan's fiscal framework in a decade. We assess what has been implemented, what remains, and investor impact.",
        content: [
            "The 2024–2026 tax reform package represents the most significant overhaul of Uzbekistan's fiscal framework in a decade. This brief assesses what has been implemented, what remains outstanding, and the practical impact on foreign investors.",
            'Key wins include a simplified VAT refund mechanism and clearer transfer-pricing rules. Yet administrative predictability — how rules are applied in practice — remains the area investors watch most closely.',
            'The working group recommends prioritising digital tax administration and a binding-ruling regime to close the gap between legislative intent and day-to-day enforcement.',
        ],
    },
    {
        id: 3,
        image: img3,
        category: 'Macroeconomy',
        topic: 'macroeconomy',
        title: 'GDP Growth Composition: Investment vs. Consumption Dynamics',
        date: '12.08.2026',
        readMin: 6,
        author: 'FIC Research',
        authorInitials: 'FR',
        excerpt:
            'Q2 2026 GDP growth of 7.2% masks divergent dynamics: investment growth decelerated while private consumption strengthened. Implications for foreign investors planning capital commitments.',
        content: [
            'Q2 2026 GDP growth of 7.2% masks divergent dynamics: fixed-investment growth decelerated while private consumption strengthened, shifting the composition of demand.',
            'For investors, the rotation toward consumption signals opportunity in consumer-facing sectors, even as the investment slowdown warrants attention to financing conditions and project execution timelines.',
        ],
    },
    {
        id: 4,
        image: img4,
        category: 'Sector Brief',
        topic: 'sector',
        title: 'Green Energy Transition: Investor Roadmap 2026–2030',
        date: '28.07.2026',
        readMin: 10,
        author: 'Energy WG',
        authorInitials: 'EW',
        excerpt:
            "Uzbekistan's 8GW renewable target by 2030 creates a $7–9B investment opportunity. This sector brief maps the regulatory landscape, auction mechanisms, and identified risks for IPP developers.",
        content: [
            "Uzbekistan's 8GW renewable target by 2030 creates a $7–9B investment opportunity. This sector brief maps the regulatory landscape, auction mechanisms, and the risks IPP developers should price in.",
            'Competitive auctions have delivered record-low tariffs, but grid readiness and curtailment risk are emerging as the binding constraints on the next wave of capacity.',
            'The working group proposes coordinated transmission investment and standardised PPAs to keep the transition bankable at scale.',
        ],
    },
    {
        id: 5,
        image: img5,
        category: 'Regulatory Autonomy',
        topic: 'reform',
        title: 'Commercial Court Reform: Impact on Dispute Resolution for Foreign Investors',
        date: '15.07.2026',
        readMin: 9,
        author: 'White & Case',
        authorInitials: 'WC',
        excerpt:
            'The new Commercial Procedure Code, effective January 2026, introduces significant changes to dispute resolution mechanisms. A practical guide to enforcement and arbitration options.',
        content: [
            'The new Commercial Procedure Code, effective January 2026, introduces significant changes to dispute resolution. This practical guide covers enforcement of judgments, interim relief, and arbitration options for foreign investors.',
            'The reforms strengthen the enforceability of arbitral awards and shorten procedural timelines — a meaningful improvement for cross-border transactions.',
            'Investors are advised to revisit dispute-resolution clauses in existing contracts to take full advantage of the new framework.',
        ],
    },
    {
        id: 6,
        image: img6,
        category: 'Investment Growth',
        topic: 'investment',
        title: 'Capital Market Development: Tashkent Stock Exchange Growth Outlook',
        date: '05.07.2026',
        readMin: 7,
        author: 'Finance WG',
        authorInitials: 'FW',
        excerpt:
            "TSE market capitalisation grew 34% in H1 2026, driven by SOE privatisation listings. The Finance WG's capital market reform initiative is bearing results — this brief assesses what's next.",
        content: [
            "TSE market capitalisation grew 34% in H1 2026, driven by state-owned enterprise privatisation listings. The Finance WG's capital-market reform initiative is bearing results — this brief assesses what comes next.",
            'Deepening liquidity will require a broader institutional investor base and continued improvements in disclosure and corporate governance among listed issuers.',
        ],
    },
    {
        id: 7,
        image: img1,
        category: 'Sector Brief',
        topic: 'sector',
        title: 'Digital Infrastructure Competitiveness: Benchmarking Uzbekistan in Central Asia',
        date: '22.06.2026',
        readMin: 8,
        author: 'Digital Economy WG',
        authorInitials: 'DE',
        excerpt:
            'Uzbekistan ranks first in Central Asia on mobile internet penetration and has closed the gap on data centre capacity. Implications for technology sector investors and the e-government roadmap.',
        content: [
            'Uzbekistan ranks first in Central Asia on mobile-internet penetration and has closed the gap on data-centre capacity. This brief explores the implications for technology investors and the e-government roadmap.',
            'Sustained competitiveness will hinge on spectrum policy, cross-border connectivity, and a talent pipeline capable of supporting high-value digital services.',
        ],
    },
    {
        id: 8,
        image: img2,
        category: 'Macroeconomy',
        topic: 'macroeconomy',
        title: 'Currency and Monetary Policy: Sum Stability and Convertibility Prospects',
        date: '10.06.2026',
        readMin: 6,
        author: 'FIC Research',
        authorInitials: 'FR',
        excerpt:
            'The Central Bank of Uzbekistan maintained a managed float with 3.2% depreciation in H1 2026. Analysis of monetary policy framework and profit repatriation considerations for investors.',
        content: [
            'The Central Bank of Uzbekistan maintained a managed float with 3.2% depreciation in H1 2026. This analysis reviews the monetary-policy framework and the profit-repatriation considerations most relevant to investors.',
            'Continued disinflation and reserve accumulation support the case for gradual convertibility, though external shocks remain the principal risk to the outlook.',
        ],
    },
    {
        id: 9,
        image: img3,
        category: 'Sector Brief',
        topic: 'sector',
        title: 'Agriculture Modernisation: Export Potential and Investor Entry Points',
        date: '30.05.2026',
        readMin: 11,
        author: 'Agriculture WG',
        authorInitials: 'AW',
        excerpt:
            'Following EU export certification for 3 produce categories, Uzbek agri-exports are projected to reach $3.5B by 2027. The Agriculture WG identifies 6 key sub-sectors with strong ROI potential.',
        content: [
            'Following EU export certification for three produce categories, Uzbek agri-exports are projected to reach $3.5B by 2027. The Agriculture WG identifies six sub-sectors with strong ROI potential.',
            'Cold-chain logistics, processing capacity, and traceability systems are the enabling investments that unlock premium export markets.',
        ],
    },
]

export function getArticleById(id: number): Article | undefined {
    return articles.find((a) => a.id === id)
}
