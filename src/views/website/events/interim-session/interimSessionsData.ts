import type { Translation } from '@/types/server/api.types'

import img5Hero from '@/assets/images/hero/ATM_9764.jpg'
import img6Hero from '@/assets/images/hero/SUT_8193.jpg'

import is6_1 from '@/assets/images/interim-session/DSC02251.JPG'
import is6_2 from '@/assets/images/interim-session/DSC02281.JPG'
import is6_3 from '@/assets/images/interim-session/DSC02353.JPG'
import is6_4 from '@/assets/images/interim-session/DSC02388.JPG'
import is6_5 from '@/assets/images/interim-session/DSC02454.JPG'
import is6_6 from '@/assets/images/interim-session/DSC02629.JPG'
import is6_7 from '@/assets/images/interim-session/DSC03099.JPG'
import is6_8 from '@/assets/images/interim-session/DSC03437.JPG'

export type StatCard = { value: string; label: Translation }

export type Initiative = { title: Translation; description: Translation }

export type LegalBasis = { text: Translation; docHref: string }

export type ContentBlock = { type: 'text' | 'quote'; text: Translation }

export type InterimSessionDetail = {
    heroImage?: string
    heroTitle?: Translation
    gallery?: string[]
    paragraph: Translation
    stats: StatCard[]
    contentBlocks?: ContentBlock[]
    initiatives?: Initiative[]
    roadmap?: Initiative[]
    legalBasis?: LegalBasis
}

export type InterimSession = {
    id: number
    code: string
    date: Translation
    note: Translation
    hasDetail: boolean
    detail?: InterimSessionDetail
}

export const interimSessions: InterimSession[] = [
    {
        id: 1,
        code: 'IS-1',
        date: {
            en: '20 November 2019',
            ru: '20 ноября 2019',
            uz: '2019-yil 20-noyabr',
        },
        note: {
            en: 'The first interim session after the Council was established: priority areas, the format of engagement with investors, and the procedure for preparing proposals were defined',
            ru: 'Первая промежуточная сессия после учреждения Совета: определены приоритетные направления, формат взаимодействия с инвесторами и порядок подготовки предложений',
            uz: 'Kengash tashkil etilgandan keyingi birinchi oraliq sessiya: ustuvor yo‘nalishlar, investorlar bilan hamkorlik formati va takliflarni tayyorlash tartibi belgilandi',
        },
        hasDetail: false,
    },
    {
        id: 2,
        code: 'IS-2',
        date: { en: '2022', ru: '2022', uz: '2022' },
        note: {
            en: 'Progress on the implementation of approved initiatives and preparations for the next plenary session were reviewed',
            ru: 'Рассмотрен ход реализации утверждённых инициатив и подготовка к следующей пленарной сессии',
            uz: 'Tasdiqlangan tashabbuslar ijrosi va navbatdagi plenar sessiyaga tayyorgarlik ko‘rib chiqildi',
        },
        hasDetail: false,
    },
    {
        id: 3,
        code: 'IS-3',
        date: {
            en: '29 August 2023',
            ru: '29 августа 2023',
            uz: '2023-yil 29-avgust',
        },
        note: {
            en: 'Results on priority areas and preparations for the 2024 plenary session were reviewed',
            ru: 'Рассмотрены результаты по приоритетным направлениям и подготовка к пленарной сессии 2024 года',
            uz: 'Ustuvor yo‘nalishlar bo‘yicha natijalar va 2024-yilgi plenar sessiyaga tayyorgarlik ko‘rib chiqildi',
        },
        hasDetail: false,
    },
    {
        id: 4,
        code: 'IS-4',
        date: {
            en: '8 November 2024',
            ru: '8 ноября 2024',
            uz: '2024-yil 8-noyabr',
        },
        note: {
            en: 'The outcomes of the working groups, new investor proposals, and priorities for the upcoming period were discussed',
            ru: 'Обсуждены итоги работы рабочих групп, новые предложения инвесторов и приоритеты на предстоящий период',
            uz: 'Ishchi guruhlar natijalari, investorlarning yangi takliflari va kelgusi davr uchun ustuvorliklar muhokama qilindi',
        },
        hasDetail: false,
    },
    {
        id: 5,
        code: 'IS-5',
        date: {
            en: '19 November 2025',
            ru: '19 ноября 2025',
            uz: '2025-yil 19-noyabr',
        },
        note: {
            en: 'Protocol No. 1 (approved 23.01.2026). Roadmap — 21 initiatives across 8 working groups; new groups established (circular economy, AI, creative industries accelerator) and the RAIC-CAC alliance',
            ru: 'Протокол № 1 (утверждён 23.01.2026). Дорожная карта — 21 инициатива в 8 рабочих группах; созданы новые группы (циркулярная экономика, ИИ, акселератор креативных индустрий) и альянс RAIC-CAC',
            uz: '1-son bayonnoma (23.01.2026 tasdiqlangan). Yo‘l xaritasi — 8 ta ishchi guruh bo‘yicha 21 tashabbus; yangi guruhlar tashkil etildi (aylanma iqtisodiyot, sun’iy intellekt, kreativ industriyalar akseleratori) va RAIC-CAC ittifoqi',
        },
        hasDetail: true,
        detail: {
            heroImage: img5Hero,
            heroTitle: {
                en: 'V Interim Session of the Council',
                ru: 'V промежуточная сессия Совета',
                uz: 'Kengashning V oraliq sessiyasi',
            },
            paragraph: {
                en: 'The fifth interim session of the Council was chaired by the Minister of Investment, Industry and Trade L. Kudratov. Protocol No. 1 was approved on 23 January 2026. At the session, the interagency working groups presented their results, and Council members put forward a number of strategic initiatives.',
                ru: 'Пятая промежуточная сессия Совета прошла под председательством министра инвестиций, промышленности и торговли Л. Кудратова. Протокол № 1 утверждён 23 января 2026 года. На сессии межведомственные рабочие группы представили свои результаты, а члены Совета выдвинули ряд стратегических инициатив.',
                uz: 'Kengashning beshinchi oraliq sessiyasi investitsiyalar, sanoat va savdo vaziri L. Qudratov raisligida o‘tdi. 1-son bayonnoma 2026-yil 23-yanvarda tasdiqlandi. Sessiyada idoralararo ishchi guruhlar o‘z natijalarini taqdim etdi, Kengash a’zolari esa bir qator strategik tashabbuslarni ilgari surdi.',
            },
            stats: [
                {
                    value: '21',
                    label: {
                        en: 'initiatives in the roadmap (Appendix No. 1)',
                        ru: 'инициатив в дорожной карте (Приложение № 1)',
                        uz: 'yo‘l xaritasidagi tashabbuslar (1-ilova)',
                    },
                },
                {
                    value: '3',
                    label: {
                        en: 'new working groups',
                        ru: 'новые рабочие группы',
                        uz: 'yangi ishchi guruhlar',
                    },
                },
                {
                    value: '8',
                    label: {
                        en: 'interagency groups presented their results',
                        ru: 'межведомственные группы представили свои результаты',
                        uz: 'idoralararo guruhlar o‘z natijalarini taqdim etdi',
                    },
                },
            ],
            initiatives: [
                {
                    title: {
                        en: 'Regional Alliance of Investment Councils of Central Asia and the Caucasus (RAIC-CAC)',
                        ru: 'Региональный альянс инвестиционных советов Центральной Азии и Кавказа (RAIC-CAC)',
                        uz: 'Markaziy Osiyo va Kavkaz investitsiya kengashlari mintaqaviy ittifoqi (RAIC-CAC)',
                    },
                    description: {
                        en: 'harmonisation of investment-climate approaches and cross-border coordination. Curator — Asian Development Bank. Official launch — at the V TIIF.',
                        ru: 'гармонизация подходов к инвестиционному климату и трансграничная координация. Куратор — Азиатский банк развития. Официальный запуск — на V ТИИФ.',
                        uz: 'investitsiya muhitiga yondashuvlarni uyg‘unlashtirish va chegaralararo muvofiqlashtirish. Kurator — Osiyo taraqqiyot banki. Rasmiy start — V TIIF doirasida.',
                    },
                },
                {
                    title: {
                        en: '"Circular Economy" working group',
                        ru: 'Рабочая группа «Циркулярная экономика»',
                        uz: '“Aylanma iqtisodiyot” ishchi guruhi',
                    },
                    description: {
                        en: 'analysis and adaptation of leading international practices; establishment of the FIC "Circular Economy" award. Curator — Coca-Cola.',
                        ru: 'анализ и адаптация ведущих международных практик; учреждение премии СИИ «Циркулярная экономика». Куратор — Coca-Cola.',
                        uz: 'ilg‘or xalqaro tajribalarni tahlil qilish va moslashtirish; XIK “Aylanma iqtisodiyot” mukofotini ta’sis etish. Kurator — Coca-Cola.',
                    },
                },
                {
                    title: {
                        en: '"Creative Industries Accelerator" working group',
                        ru: 'Рабочая группа «Акселератор креативных индустрий»',
                        uz: '“Kreativ industriyalar akseleratori” ishchi guruhi',
                    },
                    description: {
                        en: 'transforming creative sectors into investment- and export-oriented industries within five years. Curator — Foundation for the Development of Culture and Art.',
                        ru: 'преобразование креативных отраслей в инвестиционно- и экспортно-ориентированные в течение пяти лет. Куратор — Фонд развития культуры и искусства.',
                        uz: 'kreativ tarmoqlarni besh yil ichida investitsiya va eksportga yo‘naltirilgan sohalarga aylantirish. Kurator — Madaniyat va san’atni rivojlantirish jamg‘armasi.',
                    },
                },
                {
                    title: {
                        en: 'Artificial Intelligence working group',
                        ru: 'Рабочая группа по искусственному интеллекту',
                        uz: 'Sun’iy intellekt ishchi guruhi',
                    },
                    description: {
                        en: 'study and adaptation of global AI practices. Curator — EY.',
                        ru: 'изучение и адаптация мировых практик в области ИИ. Куратор — EY.',
                        uz: 'jahon sun’iy intellekt tajribalarini o‘rganish va moslashtirish. Kurator — EY.',
                    },
                },
                {
                    title: {
                        en: '"Skills of the Future" national open platform',
                        ru: 'Национальная открытая платформа «Навыки будущего»',
                        uz: '“Kelajak ko‘nikmalari” milliy ochiq platformasi',
                    },
                    description: {
                        en: 'development of ten key competencies. Curators — Yandex, OTP Group.',
                        ru: 'развитие десяти ключевых компетенций. Кураторы — Yandex, OTP Group.',
                        uz: 'o‘nta asosiy kompetensiyani rivojlantirish. Kuratorlar — Yandex, OTP Group.',
                    },
                },
            ],
            roadmap: [
                {
                    title: {
                        en: 'Corporate governance (Franklin Templeton)',
                        ru: 'Корпоративное управление (Franklin Templeton)',
                        uz: 'Korporativ boshqaruv (Franklin Templeton)',
                    },
                    description: {
                        en: 'training programmes for corporate secretaries and IFRS, capital market development.',
                        ru: 'программы обучения корпоративных секретарей и МСФО, развитие рынка капитала.',
                        uz: 'korporativ kotiblar va IFRS bo‘yicha o‘quv dasturlari, kapital bozorini rivojlantirish.',
                    },
                },
                {
                    title: {
                        en: 'Tax administration (EY)',
                        ru: 'Налоговое администрирование (EY)',
                        uz: 'Soliq ma’muriyatchiligi (EY)',
                    },
                    description: {
                        en: 'simplification of tax-residency certificates; tax rules for PPP projects.',
                        ru: 'упрощение сертификатов налогового резидентства; налоговые правила для проектов ГЧП.',
                        uz: 'soliq rezidentligi sertifikatlarini soddalashtirish; DXSh loyihalari uchun soliq qoidalari.',
                    },
                },
                {
                    title: {
                        en: 'Responsible business conduct (Crowe)',
                        ru: 'Ответственное ведение бизнеса (Crowe)',
                        uz: 'Mas’uliyatli biznes yuritish (Crowe)',
                    },
                    description: {
                        en: 'draft decree on the phased adoption of RBC standards.',
                        ru: 'проект указа о поэтапном внедрении стандартов ОВБ.',
                        uz: 'RBC standartlarini bosqichma-bosqich joriy etish bo‘yicha farmon loyihasi.',
                    },
                },
                {
                    title: {
                        en: 'Alternative investment funds (Vision Invest)',
                        ru: 'Альтернативные инвестиционные фонды (Vision Invest)',
                        uz: 'Muqobil investitsiya fondlari (Vision Invest)',
                    },
                    description: {
                        en: 'turning Uzbekistan into a regional hub for private and venture capital.',
                        ru: 'превращение Узбекистана в региональный хаб частного и венчурного капитала.',
                        uz: 'O‘zbekistonni xususiy va venchur kapitalning mintaqaviy markaziga aylantirish.',
                    },
                },
                {
                    title: {
                        en: 'Energy (ACWA, EDF, China Energy)',
                        ru: 'Энергетика (ACWA, EDF, China Energy)',
                        uz: 'Energetika (ACWA, EDF, China Energy)',
                    },
                    description: {
                        en: 'private investment in electricity distribution; grid development plan; stability of the legal and tax regime.',
                        ru: 'частные инвестиции в распределение электроэнергии; план развития сетей; стабильность правового и налогового режима.',
                        uz: 'elektr energiyasini taqsimlashga xususiy investitsiyalar; tarmoqlarni rivojlantirish rejasi; huquqiy va soliq rejimining barqarorligi.',
                    },
                },
                {
                    title: {
                        en: 'Land allocation (Kosta Legal)',
                        ru: 'Выделение земли (Kosta Legal)',
                        uz: 'Yer ajratish (Kosta Legal)',
                    },
                    description: {
                        en: 'simplification and acceleration of procedures, draft Strategy for the use of land resources.',
                        ru: 'упрощение и ускорение процедур, проект Стратегии использования земельных ресурсов.',
                        uz: 'jarayonlarni soddalashtirish va tezlashtirish, yer resurslaridan foydalanish Strategiyasi loyihasi.',
                    },
                },
                {
                    title: {
                        en: 'Workforce development (OTP Group, Yandex)',
                        ru: 'Развитие рабочей силы (OTP Group, Yandex)',
                        uz: 'Ishchi kuchini rivojlantirish (OTP Group, Yandex)',
                    },
                    description: {
                        en: 'national internship portal; open educational platform; Fund for mandatory technical internships.',
                        ru: 'национальный портал стажировок; открытая образовательная платформа; Фонд обязательных технических стажировок.',
                        uz: 'milliy amaliyot portali; ochiq ta’lim platformasi; majburiy texnik amaliyotlar jamg‘armasi.',
                    },
                },
                {
                    title: {
                        en: 'Collateral legislation (BDO, EY, Uzum, TBC)',
                        ru: 'Залоговое законодательство (BDO, EY, Uzum, TBC)',
                        uz: 'Garov qonunchiligi (BDO, EY, Uzum, TBC)',
                    },
                    description: {
                        en: 'new types of collateral; Islamic finance (Green Sukuk, Takaful); securitisation; secure data exchange.',
                        ru: 'новые виды залога; исламские финансы (Green Sukuk, Takaful); секьюритизация; безопасный обмен данными.',
                        uz: 'yangi garov turlari; islom moliyasi (Green Sukuk, Takaful); sekyuritizatsiya; xavfsiz ma’lumot almashinuvi.',
                    },
                },
            ],
            legalBasis: {
                text: {
                    en: 'Based on the Presidential Resolution of 18.07.2025 (entered into force on 21.07.2025) — PP-226',
                    ru: 'На основании постановления Президента от 18.07.2025 (вступило в силу 21.07.2025) — ПП-226',
                    uz: 'Prezidentning 18.07.2025-yildagi qarori asosida (21.07.2025-yilda kuchga kirgan) — PQ-226',
                },
                docHref: '/results/documents',
            },
        },
    },
    {
        id: 6,
        code: 'IS-6',
        date: {
            en: '18 May 2026',
            ru: '18 мая 2026',
            uz: '2026-yil 18-may',
        },
        note: {
            en: 'Chaired for the first time by Deputy Prime Minister J. Khodjaev. 116 initiatives presented and adopted',
            ru: 'Впервые прошла под председательством заместителя Премьер-министра Ж. Ходжаева. Представлено и принято 116 инициатив',
            uz: 'Birinchi marta Bosh vazir o‘rinbosari J. Xo‘jayev raisligida o‘tdi. 116 tashabbus taqdim etildi va qabul qilindi',
        },
        hasDetail: true,
        detail: {
            heroImage: img6Hero,
            heroTitle: {
                en: 'VI Interim Session of the Council',
                ru: 'VI промежуточная сессия Совета',
                uz: 'Kengashning VI oraliq sessiyasi',
            },
            gallery: [is6_1, is6_2, is6_3, is6_4, is6_5, is6_6, is6_7, is6_8],
            paragraph: {
                en: 'On 18 May, the Foreign Investors Council under the President of the Republic of Uzbekistan held an Interim Session with the Deputy Prime Minister of the Republic of Uzbekistan, H.E. Mr. Jamshid Khodjaev, dedicated to the review of initiatives advanced by our membership ahead of the IV Plenary.',
                ru: '18 мая Совет иностранных инвесторов при Президенте Республики Узбекистан провёл промежуточную сессию с участием заместителя Премьер-министра Республики Узбекистан Джамшида Ходжаева, посвящённую рассмотрению инициатив, выдвинутых членами Совета в преддверии IV Пленарной сессии.',
                uz: '18-may kuni O‘zbekiston Respublikasi Prezidenti huzuridagi Xorijiy investorlar kengashi O‘zbekiston Respublikasi Bosh vaziri o‘rinbosari Jamshid Xo‘jayev ishtirokida oraliq sessiya o‘tkazdi; sessiya IV Plenar sessiya arafasida a’zolarimiz ilgari surgan tashabbuslarni ko‘rib chiqishga bag‘ishlandi.',
            },
            stats: [],
            contentBlocks: [
                {
                    type: 'text',
                    text: {
                        en: '120 initiatives were developed. The thematic blocks covered priorities identified by Council members as key for the next stage of investment climate development — from regulatory and administrative reform to sectoral and cross-border issues.',
                        ru: 'Было разработано 120 инициатив. Тематические блоки охватили приоритеты, определённые членами Совета как ключевые для следующего этапа развития инвестиционного климата — от регуляторных и административных реформ до отраслевых и трансграничных вопросов.',
                        uz: '120 ta tashabbus ishlab chiqildi. Mavzuli bloklar Kengash a’zolari investitsiya muhitini rivojlantirishning keyingi bosqichi uchun kalit deb belgilagan ustuvorliklarni qamrab oldi — tartibga solish va ma’muriy islohotlardan tortib tarmoq va chegaralararo masalalargacha.',
                    },
                },
                {
                    type: 'text',
                    text: {
                        en: 'Each block opened with proposals from working group leaders, followed by responses from the government side and open discussion with participants.',
                        ru: 'Каждый блок открывался предложениями руководителей рабочих групп, за которыми следовали ответы со стороны правительства и открытое обсуждение с участниками.',
                        uz: 'Har bir blok ishchi guruh rahbarlarining takliflari bilan boshlandi, so‘ngra hukumat tomonining javoblari va ishtirokchilar bilan ochiq muhokama bo‘lib o‘tdi.',
                    },
                },
                {
                    type: 'quote',
                    text: {
                        en: "The outcome: the initiatives received the Government's support across the board, with implementation pathways to be reflected in the Plenary's deliverables.",
                        ru: 'Итог: инициативы получили всестороннюю поддержку Правительства, а пути их реализации будут отражены в итоговых документах Пленарной сессии.',
                        uz: 'Natija: tashabbuslar Hukumatning har tomonlama qo‘llab-quvvatlashiga sazovor bo‘ldi, ularni amalga oshirish yo‘llari esa Plenar sessiya yakuniy hujjatlarida aks etadi.',
                    },
                },
                {
                    type: 'text',
                    text: {
                        en: 'This is the model the FIC was built for — a Council where investor priorities are heard at the highest level and converted into commitments that move.',
                        ru: 'Именно для этого и создавался СИИ — Совет, где приоритеты инвесторов слышны на самом высоком уровне и превращаются в конкретные обязательства.',
                        uz: 'XIK aynan shu maqsadda tuzilgan — investorlar ustuvorliklari eng yuqori darajada eshitiladigan va aniq majburiyatlarga aylanadigan Kengash.',
                    },
                },
                {
                    type: 'text',
                    text: {
                        en: 'The Council now turns to the Fourth Plenary Session on 18 June 2026 in Tashkent, to be chaired by H.E. President Shavkat Mirziyoyev and co-chaired by EBRD President Ms. Odile Renaud-Basso.',
                        ru: 'Теперь Совет готовится к Четвёртой пленарной сессии, которая пройдёт 18 июня 2026 года в Ташкенте под председательством Президента Шавката Мирзиёева и сопредседательством Президента ЕБРР Одиль Рено-Бассо.',
                        uz: 'Endi Kengash 2026-yil 18-iyunda Toshkentda bo‘lib o‘tadigan To‘rtinchi plenar sessiyaga tayyorgarlik ko‘rmoqda; unga Prezident Shavkat Mirziyoyev raislik qiladi, EBRD prezidenti Odil Reno-Basso esa hamraislik qiladi.',
                    },
                },
                {
                    type: 'text',
                    text: {
                        en: 'With gratitude to Deputy Prime Minister Khodjaev, to Mr. Andi Aranitasi (EBRD Head of Uzbekistan) for moderating, and to the FIC members whose preparation made the day count.',
                        ru: 'С благодарностью заместителю Премьер-министра Ходжаеву, г-ну Анди Аранитаси (глава ЕБРР в Узбекистане) за модерацию и членам СИИ, чья подготовка сделала этот день значимым.',
                        uz: 'Bosh vazir o‘rinbosari Xo‘jayevga, moderatorlik qilgani uchun janob Andi Aranitasiga (EBRDning O‘zbekistondagi rahbari) va tayyorgarligi bilan bu kunni mazmunli qilgan XIK a’zolariga minnatdorchilik bildiramiz.',
                    },
                },
            ],
        },
    },
]
