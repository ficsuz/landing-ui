<template>
    <div class="council-members-page">
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <!-- Intro -->
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#505a63] leading-[170%] max-w-4xl mb-10">
                    {{ $t('councilMembersPage.membersIntro') }}
                </p>

                <!-- Tabs -->
                <div ref="tabsRef" class="member-tabs mb-8">
                    <button
                        v-for="(section, i) in memberSections"
                        :key="section.targetId"
                        class="member-tab"
                        :class="{ 'member-tab--active': activeTab === i }"
                        @click="activeTab = i"
                    >
                        <span class="member-tab__count">{{ displayValues[i] }}</span>
                        <span class="member-tab__label">{{ section.title }}</span>
                    </button>
                </div>

                <!-- Company list -->
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-5">
                    <div
                        v-for="item in memberSections[activeTab].items"
                        :key="item.filename"
                        class="group flex overflow-hidden bg-white border border-[#eef0f4] rounded-2xl shadow-[0_2px_12px_rgba(25,28,31,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d0d5dd] hover:shadow-[0_12px_36px_rgba(25,28,31,0.10)]"
                    >
                        <!-- Logo box -->
                        <div class="shrink-0 flex items-center justify-center w-[160px] md:w-[200px] lg:w-[240px] bg-[#f7f8fa] border-r border-[#eef0f4] p-6 md:p-8 transition-colors duration-300 group-hover:bg-[#f0f1f3]">
                            <img
                                :src="item.image"
                                :alt="item.name"
                                class="max-w-full max-h-[100px] md:max-h-[130px] lg:max-h-[150px] object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <!-- Info -->
                        <div class="flex-1 flex flex-col justify-center gap-3 px-6 py-6 lg:px-8 lg:py-8 min-w-0">
                            <h3 class="text-[17px] md:text-[20px] lg:text-[24px] font-extrabold uppercase tracking-[0.02em] leading-tight text-[#191c1f]">
                                {{ item.name }}
                            </h3>
                            <p class="text-[14px] md:text-[15px] lg:text-[16px] leading-[165%] text-[#8a94a6]">
                                {{ item.bio }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

// --- Brand images ---
const brandImages = import.meta.glob(
    '/src/assets/images/brands/*.png',
    { eager: true, import: 'default' }
) as Record<string, string>

function getLogoSrc(filename: string): string {
    return brandImages[`/src/assets/images/brands/${filename}`] ?? ''
}

// --- Bios per locale ---
type Locale = 'en' | 'ru' | 'uz'

const bios: Record<string, Record<Locale, string>> = {
    ebrd: {
        en: 'EBRD is an international financial institution that finances projects to support the transition to open, market-oriented and sustainable economies, mainly by investing in the private sector across Europe, Central Asia, and neighbouring regions.',
        ru: 'ЕБРР — международная финансовая организация, которая финансирует проекты для поддержки перехода к открытым, рыночным и устойчивым экономикам, преимущественно путём инвестиций в частный сектор в Европе, Центральной Азии и соседних регионах.',
        uz: 'YTTB — ochiq, bozorga yo\'naltirilgan va barqaror iqtisodiyotlarga o\'tishni qo\'llab-quvvatlash maqsadida asosan Yevropa, Markaziy Osiyo va qo\'shni mintaqalarda xususiy sektor loyihalarini moliyalashtiruvchi xalqaro moliya institutidir.',
    },
    adb: {
        en: 'The Asian Development Bank (ADB) is a regional multilateral development bank that finances the economic and social development of countries in Asia and the Pacific.',
        ru: 'Азиатский банк развития (АБР) — региональный многосторонний банк развития, финансирующий экономическое и социальное развитие стран Азии и Тихоокеанского региона.',
        uz: 'Osiyo taraqqiyot banki (OTB) Osiyo va Tinch okeani mintaqasi mamlakatlarining iqtisodiy va ijtimoiy rivojlanishini moliyalashtiruvchi mintaqaviy ko\'p tomonlama taraqqiyot bankidir.',
    },
    ifc: {
        en: 'IFC is one of the world\'s largest development institutions supporting private sector growth.',
        ru: 'IFC — одна из крупнейших международных организаций, поддерживающих развитие частного сектора.',
        uz: 'XMK — xususiy sektorni qo\'llab-quvvatlaydigan dunyoning eng yirik rivojlanish institutlaridan biri.',
    },
    acwapower: {
        en: 'ACWA is today one of the important and rapidly growing companies in the global energy and water infrastructure sector.',
        ru: 'ACWA на сегодняшний день является одной из важных и быстро развивающихся компаний в сфере энергетики и водной инфраструктуры в мировом масштабе.',
        uz: 'ACWA bugungi kunda energetika va suv infratuzilmasi sohasida dunyo miqyosida muhim va tez o\'sayotgan kompaniyalardan biridir.',
    },
    alkhorayef: {
        en: 'Alkhorayef Water and Power Technologies is an engineering and infrastructure company based in Saudi Arabia that mainly provides services in the water and energy sectors.',
        ru: 'Alkhorayef Water and Power Technologies — инжиниринговая и инфраструктурная компания из Саудовской Аравии, работающая в сферах водоснабжения и энергетики.',
        uz: 'Alkhorayef Water and Power Technologies — Saudiya Arabistonida joylashgan muhandislik va infratuzilma kompaniyasi bo\'lib, asosan suv va energetika sohalariga xizmat ko\'rsatadi.',
    },
    odas: {
        en: 'ODAS is a company operating in the energy sector, mainly focused on electricity generation through thermal and renewable power plants, as well as investments in mining and infrastructure projects.',
        ru: 'ODAS — компания в энергетическом секторе, основное направление — производство электроэнергии на тепловых и возобновляемых электростанциях, а также инвестиции в горнодобывающие и инфраструктурные проекты.',
        uz: 'ODAS — energetika sohasida faoliyat yurituvchi kompaniya bo\'lib, issiqlik va qayta tiklanuvchi elektr stansiyalari orqali elektr energiyasi ishlab chiqarish hamda konchilik va infratuzilma loyihalariga investitsiya qilish bilan shug\'ullanadi.',
    },
    chinacamc: {
        en: 'China CAMC Engineering is a global engineering, procurement and construction company that delivers large infrastructure, energy, industrial, water, and transportation projects worldwide.',
        ru: 'China CAMC Engineering — международная инжиниринговая компания, реализующая крупные инфраструктурные, энергетические, промышленные и водные проекты по всему миру.',
        uz: 'China CAMC Engineering — dunyo bo\'ylab yirik infratuzilma, energetika, sanoat, suv va transport loyihalarini amalga oshiruvchi xalqaro muhandislik kompaniyasidir.',
    },
    halykbank: {
        en: 'Halyk Bank is a large financial services bank and is considered one of the biggest banks in Central Asia.',
        ru: 'Halyk Bank — крупный банк финансовых услуг, один из крупнейших банков в Центральной Азии.',
        uz: 'Halyk Bank — yirik moliyaviy xizmatlar ko\'rsatuvchi bank bo\'lib, Markaziy Osiyodagi eng katta banklardan biri hisoblanadi.',
    },
    calikenerji: {
        en: 'Çalık Enerji is an internationally operating energy company that develops and executes projects in electricity generation, transmission, and energy infrastructure.',
        ru: 'Çalık Enerji — международная энергетическая компания, занимающаяся производством электроэнергии, её передачей и реализацией инфраструктурных проектов.',
        uz: 'Çalık Enerji — xalqaro miqyosda faoliyat yurituvchi energetika kompaniyasi bo\'lib, elektr energiyasi ishlab chiqarish, uzatish va infratuzilma loyihalarini amalga oshiradi.',
    },
    orascom: {
        en: 'Orascom Holdings is an international company specializing in long-term investments, with operations in the mining and agro-industrial sectors.',
        ru: 'Orascom Holdings — международная компания, специализирующаяся на долгосрочных инвестициях в горнодобывающей и агропромышленной отраслях.',
        uz: 'Orascom Holdings — tog\'-kon sanoati va agro-industrial yo\'nalishlarda faoliyat yurituvchi, uzoq muddatli investitsiyalarga ixtisoslashgan xalqaro kompaniya.',
    },
    bat: {
        en: 'British American Tobacco is one of the world\'s largest tobacco companies, producing cigarettes, vaping products, and other nicotine-based products on a global scale.',
        ru: 'British American Tobacco — одна из крупнейших табачных компаний мира, производящая сигареты, вейп-продукцию и другие никотиновые изделия.',
        uz: 'British American Tobacco — dunyodagi eng yirik tamaki kompaniyalaridan biri bo\'lib, sigaretalar, veyp mahsulotlari va boshqa nikotin asosidagi mahsulotlarni global miqyosda ishlab chiqaradi.',
    },
    indorama: {
        en: 'Indorama Corporation is a global manufacturing group involved in chemicals, textiles, fertilizers, and polymer production, supplying materials to various industries worldwide.',
        ru: 'Indorama Corporation — международная производственная группа в сферах химии, текстиля, удобрений и полимеров.',
        uz: 'Indorama Corporation — kimyo, to\'qimachilik, o\'g\'itlar va polimerlar ishlab chiqarish bilan shug\'ullanuvchi global ishlab chiqarish guruhi.',
    },
    suez: {
        en: 'Suez is a global company specializing in water and waste management services, providing solutions for drinking water supply, wastewater treatment, and recycling.',
        ru: 'Suez — международная компания, специализирующаяся на управлении водными ресурсами и отходами.',
        uz: 'Suez — suv va chiqindilarni boshqarish xizmatlariga ixtisoslashgan global kompaniya.',
    },
    ey: {
        en: 'EY has been present in Uzbekistan for nearly 30 years. Starting as a small office in 1995, it has grown into a team of almost 300 professionals.',
        ru: 'EY работает в Узбекистане почти 30 лет. Начав в 1995 году как небольшое представительство, компания сегодня объединяет около 300 специалистов.',
        uz: 'EY O\'zbekistonda qariyb 30 yildan beri faoliyat yuritmoqda. 1995-yilda kichik vakolatxona sifatida boshlagan, bugun 300 nafarga yaqin mutaxassisga ega.',
    },
    tbcbank: {
        en: 'TBC Bank is a leading financial institution that provides retail and corporate banking services, including loans, deposits, and digital banking solutions.',
        ru: 'TBC Bank — ведущий финансовый институт, предоставляющий розничные и корпоративные банковские услуги, включая кредиты, депозиты и цифровой банкинг.',
        uz: 'TBC Bank — chakana va korporativ bank xizmatlarini ko\'rsatuvchi yetakchi moliyaviy muassasa.',
    },
    masdar: {
        en: 'Masdar is a global renewable energy company implementing solar, wind, and green hydrogen projects worldwide to support the global clean energy transition.',
        ru: 'Masdar — международная компания в сфере ВИЭ, реализующая проекты солнечной, ветровой и водородной энергетики.',
        uz: 'Masdar — qayta tiklanadigan energetika bo\'yicha xalqaro kompaniya bo\'lib, dunyo bo\'ylab quyosh, shamol va yashil vodorod loyihalarini amalga oshiradi.',
    },
    veon: {
        en: 'VEON is a global telecommunications company that provides mobile and digital communication services across multiple countries.',
        ru: 'VEON — глобальная телекоммуникационная компания, предоставляющая мобильные и цифровые услуги связи в разных странах.',
        uz: 'VEON — mobil va raqamli aloqa xizmatlarini ko\'rsatuvchi global telekommunikatsiya kompaniyasi.',
    },
    visioninvest: {
        en: 'Vision Invest is an investment and infrastructure company focused on developing and managing large-scale projects in energy, water, and transportation.',
        ru: 'Vision Invest — инвестиционная и инфраструктурная компания, занимающаяся разработкой крупных проектов в энергетике, водоснабжении и транспорте.',
        uz: 'Vision Invest — energetika, suv va transport sohalarida yirik loyihalarni ishlab chiqish va boshqarish bilan shug\'ullanuvchi investitsiya va infratuzilma kompaniyasi.',
    },
    datavolt: {
        en: 'DataVolt is a digital infrastructure company building next-generation data centers to support the AI era and global digital transformation.',
        ru: 'DataVolt — компания в сфере цифровой инфраструктуры, создающая дата-центры нового поколения для развития ИИ и цифровой экономики.',
        uz: 'DataVolt — sun\'iy intellekt davriga mo\'ljallangan yangi avlod ma\'lumotlar markazlarini barpo etuvchi raqamli infratuzilma kompaniyasidir.',
    },
    mangoldconsulting: {
        en: 'Mangold Consulting is a consulting and advisory firm providing services in financial analysis, investment advisory, and strategic business consulting.',
        ru: 'Mangold Consulting — консалтинговая компания в области финансового анализа, инвестиционного консультирования и стратегического бизнес-консалтинга.',
        uz: 'Mangold Consulting — moliyaviy tahlil, investitsiya bo\'yicha maslahat va strategik biznes konsalting xizmatlarini ko\'rsatuvchi konsalting kompaniyasi.',
    },
    eurasiandevelopmentbank: {
        en: 'The Eurasian Development Bank is a multilateral development bank financing infrastructure, energy, transport, and industrial projects across member countries.',
        ru: 'Евразийский банк развития — многосторонний банк развития, финансирующий инфраструктурные, энергетические, транспортные и промышленные проекты.',
        uz: 'Yevroosiyo taraqqiyot banki — a\'zo davlatlarda infratuzilma, energetika, transport va sanoat loyihalarini moliyalashtiruvchi ko\'p tomonlama taraqqiyot bankidir.',
    },
    edf: {
        en: 'EDF is a major electricity generation and distribution company operating nuclear, renewable, and conventional power plants, supplying energy to millions worldwide.',
        ru: 'EDF — крупная энергетическая компания, эксплуатирующая атомные, возобновляемые и традиционные электростанции, обеспечивая энергией миллионы клиентов.',
        uz: 'EDF — atom, qayta tiklanuvchi va an\'anaviy elektr stansiyalarini boshqaruvchi yirik energetika kompaniyasi.',
    },
    knauf: {
        en: 'Knauf is a global building materials company producing gypsum-based products, drywall systems, plaster, insulation materials, and construction solutions.',
        ru: 'Knauf — международная компания по производству строительных материалов: гипсовые изделия, системы гипсокартона, штукатурка и теплоизоляция.',
        uz: 'Knauf — gips asosidagi mahsulotlar, gipsokarton tizimlari, suvoq va issiqlik izolyatsiya materiallarini ishlab chiqaruvchi global qurilish materiallari kompaniyasi.',
    },
    chinaenergy: {
        en: 'China Energy Overseas Investment Company focuses on renewable energy and infrastructure development within the Belt and Road Initiative.',
        ru: 'China Energy Overseas Investment Company реализует проекты в области возобновляемой энергетики и инфраструктуры в рамках инициативы «Один пояс, один путь».',
        uz: 'China Energy Overseas Investment Company — "Bir makon, bir yo\'l" tashabbusi doirasida qayta tiklanuvchi energiya va infratuzilma loyihalariga sarmoya kirituvchi kompaniya.',
    },
    uzum: {
        en: 'Uzum is a digital ecosystem company offering e-commerce, fintech, and delivery services through an integrated platform.',
        ru: 'Uzum — цифровая экосистема, предоставляющая услуги электронной коммерции, финтеха и доставки.',
        uz: 'Uzum — elektron tijorat, fintex va yetkazib berish xizmatlarini taqdim etuvchi raqamli ekotizim kompaniyasi.',
    },
    veolia: {
        en: 'Veolia is a global leader in depollution, decarbonization, and resource regeneration. In Uzbekistan, the company operates Tashkent\'s district heating network, serving 1.2 million residents.',
        ru: 'Veolia — мировой лидер в сфере деполлюции, декарбонизации и регенерации ресурсов. В Узбекистане управляет системой теплоснабжения Ташкента для 1,2 млн жителей.',
        uz: 'Veolia — depollutsiya, dekarbonizatsiya va resurslarni qayta tiklash sohasida global yetakchi. O\'zbekistonda Toshkentning markaziy issiqlik ta\'minoti tizimini boshqarib 1,2 million aholiga xizmat ko\'rsatadi.',
    },
    yandex: {
        en: 'Yandex is a technology company providing internet-related services including search engine, maps, ride-hailing, e-commerce, and AI-based digital solutions.',
        ru: 'Yandex — технологическая компания, предоставляющая интернет-сервисы: поисковая система, карты, такси, электронная коммерция и решения на основе ИИ.',
        uz: 'Yandex — qidiruv tizimi, xaritalar, taksi xizmatlari, elektron tijorat va sun\'iy intellekt asosidagi yechimlarni taqdim etuvchi texnologiya kompaniyasi.',
    },
    cengizenerji: {
        en: 'Cengiz Enerji is an energy company engaged in electricity generation, distribution, and infrastructure projects with a focus on thermal and renewable power plants.',
        ru: 'Cengiz Enerji — энергетическая компания в области производства и распределения электроэнергии, а также инфраструктурных проектов.',
        uz: 'Cengiz Enerji — elektr energiyasi ishlab chiqarish, taqsimlash va infratuzilma loyihalari bilan shug\'ullanuvchi energetika kompaniyasi.',
    },
    sojitz: {
        en: 'Sojitz Corporation is a Japanese general trading and investment company engaged in global trade, infrastructure development, energy, automotive, and industrial projects.',
        ru: 'Sojitz Corporation — японская торгово-инвестиционная компания в сферах международной торговли, инфраструктуры, энергетики и автомобильной промышленности.',
        uz: 'Sojitz Corporation — xalqaro savdo va investitsiya kompaniyasi bo\'lib, global savdo, infratuzilma rivojlanishi, energetika va sanoat loyihalari bilan shug\'ullanadi.',
    },
    wildberries: {
        en: 'Wildberries is one of the largest e-commerce platforms in Eurasia, offering online retail, logistics, and digital services for consumers and businesses.',
        ru: 'Wildberries — одна из крупнейших платформ электронной коммерции в Евразии, предоставляющая услуги онлайн-торговли, логистики и цифровых сервисов.',
        uz: 'Wildberries — iste\'molchilar va tadbirkorlar uchun onlayn savdo, logistika va raqamli xizmatlarni taqdim etuvchi Yevroosiyodagi eng yirik elektron tijorat platformalaridan biri.',
    },
    jpmorgan: {
        en: 'JP Morgan is one of the world\'s largest financial institutions, providing investment banking, asset management, corporate banking, and financial advisory services.',
        ru: 'JP Morgan — один из крупнейших мировых финансовых институтов в области инвестиционного банкинга, управления активами и корпоративного банкинга.',
        uz: 'JPMorgan — investitsiya banki, aktivlarni boshqarish, korporativ banking va moliyaviy maslahat xizmatlarini ko\'rsatuvchi dunyo miqyosidagi yirik moliyaviy institutlardan biri.',
    },
    otpbank: {
        en: 'OTP Bank is a leading banking group in Central and Eastern Europe, providing retail, corporate, and investment banking services.',
        ru: 'OTP Bank — ведущая банковская группа Центральной и Восточной Европы, предоставляющая широкий спектр банковских услуг.',
        uz: 'OTP Bank — Markaziy va Sharqiy Yevropadagi yetakchi bank guruhi bo\'lib, chakana, korporativ va investitsiya-banking xizmatlarini taqdim etadi.',
    },
    cocacola: {
        en: 'The Coca-Cola Company is one of the world\'s leading beverage companies, operating a diverse portfolio of brands in over 200 countries.',
        ru: 'The Coca-Cola Company — одна из крупнейших мировых компаний по производству безалкогольных напитков в более чем 200 странах.',
        uz: 'The Coca-Cola Company — 200 dan ortiq mamlakatda faoliyat yurituvchi dunyo yetakchi ichimlik kompaniyalaridan biri.',
    },
    bomi: {
        en: 'BoMI Engineering & Construction is an engineering and construction company specializing in infrastructure, industrial, and commercial projects.',
        ru: 'BoMI Engineering & Construction — инжиниринговая и строительная компания, специализирующаяся на инфраструктурных, промышленных и коммерческих проектах.',
        uz: 'BoMI Engineering & Construction — infratuzilma, sanoat va tijorat loyihalarini amalga oshirishga ixtisoslashgan muhandislik va qurilish kompaniyasi.',
    },
    whitecase: {
        en: 'White & Case is a leading international law firm specializing in cross-border transactions, project finance, international arbitration, and corporate law.',
        ru: 'White & Case — международная юридическая фирма, специализирующаяся на трансграничных сделках, проектном финансировании и международном арбитраже.',
        uz: 'White & Case — chegara oshgan bitimlar, loyiha moliyalashtirish, xalqaro arbitraj va korporativ huquqqa ixtisoslashgan yetakchi xalqaro yuridik firma.',
    },
    crowe: {
        en: 'Crowe Global is an international network of accounting, audit, tax, and consulting firms providing professional services worldwide.',
        ru: 'Crowe Global — международная сеть компаний по аудиту, бухгалтерскому учёту, налогообложению и консалтингу.',
        uz: 'Crowe Global — xalqaro audit, buxgalteriya, soliq va konsalting xizmatlarini ko\'rsatuvchi professional kompaniyalar tarmog\'i.',
    },
    pashaholding: {
        en: 'PASHA Holding is an investment holding company operating in banking, insurance, construction, tourism, and real estate sectors.',
        ru: 'PASHA Holding — инвестиционный холдинг в сферах банковского дела, страхования, строительства, туризма и недвижимости.',
        uz: 'PASHA Holding — bank, sug\'urta, qurilish, turizm va ko\'chmas mulk kabi turli sohalarda faoliyat yurituvchi investitsion xolding kompaniyasi.',
    },
    mitsubishi: {
        en: 'Mitsubishi Corporation has been operating in Uzbekistan since 1993, focusing on large-scale infrastructure and gas chemical projects valued at over USD 1 billion each.',
        ru: 'Mitsubishi Corporation работает в Узбекистане с 1993 года, реализуя крупные инфраструктурные и газохимические проекты стоимостью свыше 1 млрд долларов.',
        uz: 'Mitsubishi Corporation 1993-yildan buyon O\'zbekistonda faoliyat yuritib, har biri 1 milliard dollardan ortiq qiymatga ega yirik infratuzilma va gaz-kimyo loyihalarini amalga oshirmoqda.',
    },
    linde: {
        en: 'Linde is a global industrial gases and engineering company producing oxygen, nitrogen, hydrogen, and CO₂ for healthcare, manufacturing, and energy industries.',
        ru: 'Linde — глобальная компания по производству промышленных газов: кислород, азот, водород и CO₂ для медицины, промышленности и энергетики.',
        uz: 'Linde — tibbiyot, sanoat va energetika sohalari uchun kislorod, azot, vodorod va CO₂ ishlab chiqaruvchi global sanoat gazlari kompaniyasi.',
    },
    voltalia: {
        en: 'Voltalia is an international renewable energy company developing and operating solar and wind power plants worldwide.',
        ru: 'Voltalia — международная компания возобновляемой энергетики, разрабатывающая и эксплуатирующая солнечные и ветряные электростанции.',
        uz: 'Voltalia — dunyo bo\'ylab quyosh va shamol elektr stansiyalarini rivojlantiruvchi va boshqaruvchi xalqaro qayta tiklanuvchi energiya kompaniyasi.',
    },
    miahona: {
        en: 'Miahona is a company specializing in water infrastructure, including water treatment, wastewater management, and utility services focused on sustainable water solutions.',
        ru: 'Miahona — компания, специализирующаяся на водной инфраструктуре: очистка воды, управление сточными водами и коммунальные услуги.',
        uz: 'Miahona — suvni tozalash, oqava suvlarni boshqarish va kommunal xizmatlar bilan shug\'ullanuvchi suv infratuzilmasi kompaniyasi.',
    },
    deloitte: {
        en: 'Deloitte is one of the world\'s largest professional services firms, providing audit, consulting, tax, and advisory services globally.',
        ru: 'Deloitte — одна из крупнейших в мире компаний профессиональных услуг: аудит, консалтинг, налогообложение и консультирование.',
        uz: 'Deloitte — dunyodagi eng yirik professional xizmatlar ko\'rsatuvchi kompaniyalardan biri: audit, konsalting, soliq va maslahat xizmatlarini taqdim etadi.',
    },
    curtis: {
        en: 'Curtis, Mallet-Prevost, Colt & Mosle LLP is an international law firm providing services in arbitration, corporate law, international trade, tax, and dispute resolution.',
        ru: 'Curtis, Mallet-Prevost, Colt & Mosle LLP — международная юридическая фирма в области арбитража, корпоративного права, международной торговли и разрешения споров.',
        uz: 'Curtis, Mallet-Prevost, Colt & Mosle LLP — arbitraj, korporativ huquq, xalqaro savdo va nizolarni hal qilish sohalarida xizmat ko\'rsatuvchi xalqaro yuridik firma.',
    },
}

const bioAliases: Record<string, string> = {
    'acwa-power': 'acwapower',
    'alkhoraev': 'alkhorayef',
    'halyk-bank': 'halykbank',
    'calik-enerji': 'calikenerji',
    'china-camc': 'chinacamc',
    'china-energy': 'chinaenergy',
    'EDB': 'eurasiandevelopmentbank',
    'ebdr': 'ebrd',
    'logo-mangold': 'mangoldconsulting',
    'otp-bank': 'otpbank',
    'vision': 'visioninvest',
    'miohona': 'miahona',
    'pasha': 'pashaholding',
    'cengiz-enerji': 'cengizenerji',
    'cola': 'cocacola',
    'CURTIS': 'curtis',
    'white-case': 'whitecase',
}

function getBio(filename: string): string {
    const key = filename.replace(/\.[^.]+$/, '')
    const resolved = bioAliases[key] ?? key.toLowerCase().replace(/[^a-z0-9]/g, '')
    const bioObj = bios[resolved]
    if (!bioObj) return ''
    const loc = (['en', 'ru', 'uz'].includes(locale.value) ? locale.value : 'ru') as Locale
    return bioObj[loc]
}

// --- Company list ---
const companies = [
    { id: 'E-01', filename: 'ebdr.png',         name: 'European Bank for Reconstruction and Development', website: 'https://www.ebrd.com' },
    { id: 'E-02', filename: 'adb.png',           name: 'Asian Development Bank',                           website: 'https://www.adb.org' },
    { id: 'E-03', filename: 'ifc.png',           name: 'International Finance Corporation',                website: 'https://www.ifc.org' },
    { id: 'F-01', filename: 'acwa-power.png',    name: 'ACWA Power',                                       website: 'https://acwapower.com' },
    { id: 'F-02', filename: 'alkhoraev.png',     name: 'Alkhorayef Water & Power Technologies',            website: 'https://www.alkhorayef.com' },
    { id: 'F-03', filename: 'odas.png',          name: 'ODAS',                                             website: 'https://www.odas.com.tr' },
    { id: 'F-04', filename: 'china-camc.png',    name: 'China CAMC Engineering',                           website: 'https://www.camceng.com' },
    { id: 'F-05', filename: 'halyk-bank.png',    name: 'Halyk Bank',                                       website: 'https://halykbank.kz' },
    { id: 'F-06', filename: 'calik-enerji.png',  name: 'Çalık Enerji',                                     website: 'https://www.calikenerji.com' },
    { id: 'F-07', filename: 'orascom.png',       name: 'Orascom Investment',                               website: 'https://www.orascom.com' },
    { id: 'F-08', filename: 'bat.png',           name: 'BAT',                                              website: 'https://www.bat.com' },
    { id: 'F-09', filename: 'indorama.png',      name: 'Indorama Corporation',                             website: 'https://www.indoramaventures.com' },
    { id: 'F-10', filename: 'suez.png',          name: 'Suez',                                             website: 'https://www.suez.com' },
    { id: 'F-11', filename: 'ey.png',            name: 'EY',                                               website: 'https://www.ey.com' },
    { id: 'F-12', filename: 'tbcbank.png',       name: 'TBC Bank',                                         website: 'https://tbcbank.ge/en' },
    { id: 'F-13', filename: 'masdar.png',        name: 'Masdar',                                           website: 'https://masdar.ae' },
    { id: 'F-14', filename: 'veon.png',          name: 'Veon',                                             website: 'https://www.veon.com' },
    { id: 'F-15', filename: 'vision.png',        name: 'Vision Invest',                                    website: 'https://vision-invest.com' },
    { id: 'F-16', filename: 'datavolt.png',      name: 'Data Volt',                                        website: 'https://www.datavolt.com' },
    { id: 'F-17', filename: 'logo-mangold.png',  name: 'Mangold Consulting',                               website: 'https://mangoldconsulting.com' },
    { id: 'F-18', filename: 'EDB.png',           name: 'Eurasian Development Bank',                        website: 'https://eabr.org' },
    { id: 'F-19', filename: 'edf.png',           name: 'EDF',                                              website: 'https://www.edf.fr' },
    { id: 'F-20', filename: 'knauf.png',         name: 'Knauf',                                            website: 'https://www.knauf.com' },
    { id: 'F-21', filename: 'china-energy.png',  name: 'China Energy Overseas Investment Company',         website: 'https://www.ceec.net.cn' },
    { id: 'F-22', filename: 'uzum.png',          name: 'Uzum',                                             website: 'https://uzum.uz' },
    { id: 'F-23', filename: 'veolia.png',        name: 'Veolia',                                           website: 'https://www.veolia.com' },
    { id: 'F-25', filename: 'sojitz.png',        name: 'Sojitz Corporation',                               website: 'https://www.sojitz.com' },
    { id: 'F-26', filename: 'cengiz-enerji.png', name: 'Cengiz Enerji',                                    website: 'https://www.cengizenerji.com.tr' },
    { id: 'F-28', filename: 'yandex.png',        name: 'Yandex',                                           website: 'https://yandex.com' },
    { id: 'F-29', filename: 'wildberries.png',   name: 'Wildberries',                                      website: 'https://www.wildberries.ru' },
    { id: 'F-30', filename: 'jpmorgan.png',      name: 'JPMorgan Chase',                                   website: 'https://www.jpmorgan.com' },
    { id: 'F-31', filename: 'otp-bank.png',      name: 'OTP Bank',                                         website: 'https://www.otpbank.com' },
    { id: 'F-32', filename: 'cola.png',          name: 'Coca-Cola',                                        website: 'https://www.coca-cola.com' },
    { id: 'F-33', filename: 'bomi.png',          name: 'Bomi',                                             website: '' },
    { id: 'F-34', filename: 'white-case.png',    name: 'White & Case',                                     website: 'https://www.whitecase.com' },
    { id: 'O-01', filename: 'crowe.png',         name: 'CROWE',                                            website: 'https://www.crowe.com' },
    { id: 'O-02', filename: 'pasha.png',         name: 'PASHA Holding',                                    website: 'https://www.pasha-holding.com' },
    { id: 'O-03', filename: 'mitsubishi.png',    name: 'Mitsubishi Corporation',                            website: 'https://www.mitsubishicorp.com' },
    { id: 'O-04', filename: 'linde.png',         name: 'Linde',                                            website: 'https://www.linde.com' },
    { id: 'O-05', filename: 'voltalia.png',      name: 'Voltalia',                                         website: 'https://www.voltalia.com' },
    { id: 'O-06', filename: 'miohona.png',       name: 'Miahona',                                          website: 'https://www.miahona.com/en/about-miahona' },
    { id: 'O-07', filename: 'deloitte.png',      name: 'Deloitte',                                         website: 'https://www.deloitte.com' },
    { id: 'O-08', filename: 'CURTIS.png',        name: 'CURTIS',                                           website: 'https://www.curtis.com' },
]

const sortById = (a: { id: string }, b: { id: string }) => {
    const [, aNum] = a.id.split('-')
    const [, bNum] = b.id.split('-')
    return Number(aNum) - Number(bNum)
}

const enriched = computed(() =>
    companies.map((c) => ({ ...c, image: getLogoSrc(c.filename), bio: getBio(c.filename) }))
)

const founders    = computed(() => enriched.value.filter((c) => c.id.startsWith('E')).sort(sortById))
const fullMembers = computed(() => enriched.value.filter((c) => c.id.startsWith('F')).sort(sortById))
const observers   = computed(() => enriched.value.filter((c) => c.id.startsWith('O')).sort(sortById))

const memberSections = computed(() => [
    { title: t('councilMembersPage.execBoardTitle'),   targetId: 'exec-board',   items: founders.value,    count: founders.value.length },
    { title: t('councilMembersPage.fullMembersTitle'), targetId: 'full-members', items: fullMembers.value, count: fullMembers.value.length },
    { title: t('councilMembersPage.observersTitle'),   targetId: 'observers',    items: observers.value,   count: observers.value.length },
])

// --- Tab + count-up ---
const activeTab = ref(0)
const tabsRef = ref<HTMLElement | null>(null)
const displayValues = ref([0, 0, 0])
const hasAnimated = ref(false)
let statsObserver: IntersectionObserver | null = null

function easeOutCubic(x: number) { return 1 - Math.pow(1 - x, 3) }

function animateCountUp(targets: number[]) {
    if (hasAnimated.value) return
    hasAnimated.value = true
    const duration = 1800
    const startTime = performance.now()
    function update(now: number) {
        const progress = Math.min((now - startTime) / duration, 1)
        targets.forEach((t, i) => { displayValues.value[i] = Math.floor(easeOutCubic(progress) * t) })
        if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
}

watch(tabsRef, (el) => {
    if (!el) return
    statsObserver = new IntersectionObserver(
        (entries) => { if (entries[0].isIntersecting) animateCountUp(memberSections.value.map((s) => s.count)) },
        { threshold: 0.3 }
    )
    statsObserver.observe(el)
})

onBeforeUnmount(() => statsObserver?.disconnect())
</script>

<style scoped>
.member-tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}
@media (max-width: 640px) { .member-tabs { grid-template-columns: 1fr; } }

.member-tab {
    display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
    padding: 24px 28px; border-radius: 20px;
    border: 1.5px solid rgba(25,28,31,0.1); background: #fff;
    cursor: pointer; text-align: left;
    transition: border-color .2s, background .2s, box-shadow .2s, transform .2s;
}
.member-tab:hover { border-color: rgba(25,28,31,0.25); box-shadow: 0 8px 24px rgba(25,28,31,0.07); transform: translateY(-2px); }
.member-tab--active { background: #191c1f; border-color: #191c1f; box-shadow: 0 12px 32px rgba(25,28,31,0.2); transform: translateY(-2px); }
.member-tab--active:hover { border-color: #191c1f; }
.member-tab__count { font-size: clamp(36px,5vw,52px); font-weight: 700; line-height: 1; color: #191c1f; transition: color .2s; }
.member-tab--active .member-tab__count { color: #fff; }
.member-tab__label { font-size: 14px; font-weight: 500; line-height: 1.4; color: #505a63; transition: color .2s; }
.member-tab--active .member-tab__label { color: rgba(255,255,255,0.75); }
</style>
