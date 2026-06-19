export interface PlenaryRow {
    sessionKey: string
    documentKey: string
    groupsKey: string
    count: number
}

export interface InitiativeItem {
    ru: string
    uz: string
    en: string
    speaker: string
}

export interface Category {
    ru: string
    uz: string
    en: string
    items: InitiativeItem[]
}

export const PLENARY_ROWS: PlenaryRow[] = [
    { sessionKey: 'resultsPage.initiativesPage.r1.session', documentKey: 'resultsPage.initiativesPage.r1.document', groupsKey: 'resultsPage.initiativesPage.r1.groups', count: 0 },
    { sessionKey: 'resultsPage.initiativesPage.r2.session', documentKey: 'resultsPage.initiativesPage.r2.document', groupsKey: 'resultsPage.initiativesPage.r2.groups', count: 14 },
    { sessionKey: 'resultsPage.initiativesPage.r3.session', documentKey: 'resultsPage.initiativesPage.r3.document', groupsKey: 'resultsPage.initiativesPage.r3.groups', count: 22 },
]

export const CATEGORIES: Category[] = [
    {
        ru: 'СТРАТЕГИЧЕСКИЕ ИНИЦИАТИВЫ',
        uz: 'STRATEGIK TASHABBUSLAR',
        en: 'STRATEGIC INITIATIVES',
        items: [
            { ru: 'Учреждение Регионального альянса инвестиционных советов Центральной Азии и Кавказа и проведение ежегодных форумов Совета', uz: "Markaziy Osiyo va Kavkaz investitsiya kengashlarining Mintaqaviy alyansini tashkil etish va Kengashning yillik forumlarini o'tkazish", en: 'Establishment of the Regional Alliance of Investment Councils of Central Asia and the Caucasus and holding annual Council forums', speaker: 'ADB' },
            { ru: 'Создание законодательно закреплённого Проектного офиса по координации реализации приоритетных инвестиционных инициатив', uz: "Ustuvor investitsiya tashabbuslarini amalga oshirishni muvofiqlashtirish uchun qonuniy mustahkamlangan Loyiha ofisini tashkil etish", en: 'Creation of a legislatively established Project Office for coordinating the implementation of priority investment initiatives', speaker: 'Acwa' },
            { ru: 'Создание публичной цифровой платформы комплексной оценки инвестиционной деятельности «FIC Investment Dashboard»', uz: "Investitsiya faoliyatini kompleks baholashning «FIC Investment Dashboard» ommaviy raqamli platformasini yaratish", en: 'Creation of a public digital platform for comprehensive investment activity assessment «FIC Investment Dashboard»', speaker: 'ODAS Enerji / EY' },
        ],
    },
    {
        ru: 'ЭНЕРГЕТИЧЕСКИЙ СЕКТОР',
        uz: 'ENERGETIKA SEKTORI',
        en: 'ENERGY SECTOR',
        items: [
            { ru: 'Допуск частного сектора к деятельности по распределению электроэнергии (поправки в НПА)', uz: "Xususiy sektorni elektr energiyasini taqsimlash faoliyatiga qabul qilish (normativ-huquqiy hujjatlarga o'zgartirish)", en: 'Admission of the private sector to electricity distribution activities (amendments to legislation)', speaker: 'EDF' },
            { ru: 'Освобождение проектов с иностранным финансированием от требований о перестраховании внутри страны', uz: "Xorijiy moliyalashtirishli loyihalarni mamlakatdagi qayta sug'urtalash talablaridan ozod qilish", en: 'Exemption of projects with foreign financing from domestic reinsurance requirements', speaker: 'Acwa' },
            { ru: 'Разработка и публикация национального Генерального плана развития энергетического сектора (генерация, передача, распределение)', uz: "Energetika sektorini rivojlantirishning milliy Bosh rejasini (ishlab chiqarish, uzatish, taqsimlash) ishlab chiqish va e'lon qilish", en: 'Development and publication of the national Master Plan for energy sector development (generation, transmission, distribution)', speaker: 'EDF' },
            { ru: 'Установление и регулярный пересмотр ставок лицензионных сборов на производство электроэнергии', uz: "Elektr energiyasi ishlab chiqarishga litsenziya to'lovlari stavkalarini belgilash va muntazam ko'rib chiqish", en: 'Establishment and regular revision of license fee rates for electricity generation', speaker: 'Voltalia' },
            { ru: 'Реформирование порядка лицензирования производства электроэнергии: поэтапная подача документов и согласование сроков', uz: "Elektr energiyasi ishlab chiqarishni litsenziyalash tartibini isloh qilish: bosqichma-bosqich hujjat topshirish va muddatlarni muvofiqlashtirish", en: 'Reform of the electricity generation licensing procedure: phased document submission and timeline coordination', speaker: 'Voltalia' },
        ],
    },
    {
        ru: 'ФИНАНСОВЫЙ СЕКТОР И БАНКОВСКАЯ ДЕЯТЕЛЬНОСТЬ',
        uz: 'MOLIYAVIY SEKTOR VA BANK FAOLIYATI',
        en: 'FINANCIAL SECTOR AND BANKING',
        items: [
            { ru: 'Введение риск-ориентированной гибкости в правила удалённого доступа для банков', uz: "Banklar uchun masofaviy kirish qoidalariga xavf-xatarga yo'naltirilgan moslashuvchanlikni joriy etish", en: 'Introduction of risk-based flexibility in remote access rules for banks', speaker: 'TBC' },
            { ru: 'Наращивание потенциала отечественных финансовых институтов и развитие инфраструктуры рынка капитала', uz: "Mahalliy moliya institutlarining salohiyatini oshirish va kapital bozori infratuzilmasini rivojlantirish", en: 'Building capacity of domestic financial institutions and developing capital market infrastructure', speaker: 'Acwa' },
            { ru: 'Расширение инструментов смешанного финансирования и углубление сотрудничества с международными финансовыми институтами', uz: "Aralash moliyalashtirish vositalarini kengaytirish va xalqaro moliya institutlari bilan hamkorlikni chuqurlashtirish", en: 'Expanding blended finance instruments and deepening cooperation with international financial institutions', speaker: 'Acwa' },
            { ru: 'Согласование банковских реформ с потребностями инфраструктурного финансирования в энергетическом секторе', uz: "Bank islohotlarini energetika sektoridagi infratuzilma moliyalashtirish ehtiyojlari bilan muvofiqlashtirish", en: 'Aligning banking reforms with infrastructure financing needs in the energy sector', speaker: 'Acwa' },
            { ru: 'Введение правовой базы гибкого механизма купли-продажи кредитных портфелей', uz: "Kredit portfellarini moslashuvchan sotib olish-sotish mexanizmining huquqiy bazasini joriy etish", en: 'Introduction of a legal framework for the flexible purchase and sale of credit portfolios', speaker: 'TBC' },
            { ru: 'Введение законодательства об исламском страховании (такафул)', uz: "Islom sug'urtasi (takaful) to'g'risidagi qonunchilikni joriy etish", en: 'Introduction of Islamic insurance legislation (takaful)', speaker: 'EY' },
            { ru: 'Предоставление права использования ранее приобретённой иностранной валюты и предоплаченных импортных авансов', uz: "Oldindan sotib olingan xorijiy valyuta va oldindan to'langan import avanslaridan foydalanish huquqini berish", en: 'Granting the right to use previously acquired foreign currency and prepaid import advances', speaker: 'Knauf' },
            { ru: 'Снижение налоговой нагрузки на иностранный капитал: налог у источника выплаты и налог на прирост капитала', uz: "Xorijiy kapitalga soliq yukini kamaytirish: manbadan olinadigan soliq va kapital o'sishidan olinadigan soliq", en: 'Reducing the tax burden on foreign capital: withholding tax and capital gains tax', speaker: 'TBC' },
            { ru: 'Введение инструментов стимулирования участия местных инвесторов на рынке капитала (налоговые льготы для физических лиц и институтов)', uz: "Kapital bozorida mahalliy investorlar ishtirokini rag'batlantirish vositalarini joriy etish (jismoniy shaxslar va institutlar uchun soliq imtiyozlari)", en: 'Introduction of instruments to incentivize local investor participation in the capital market (tax benefits for individuals and institutions)', speaker: 'TBC' },
            { ru: 'Введение регуляторной базы для жилищных кредитов под залог недвижимости (ЖКЗН)', uz: "Ko'chmas mulk garovi ostida uy-joy kreditlari uchun tartibga soluvchi bazani joriy etish", en: 'Introduction of a regulatory framework for mortgage loans secured by real estate', speaker: 'TBC' },
            { ru: 'Создание регуляторной базы, обеспечивающей продажу портфелей проблемных кредитов (НПК)', uz: "Muammoli kreditlar portfellarini sotishni ta'minlovchi tartibga soluvchi bazani yaratish", en: 'Creation of a regulatory framework ensuring the sale of non-performing loan portfolios (NPL)', speaker: 'TBC' },
            { ru: 'Введение правовой базы, обеспечивающей гибкую куплю-продажу кредитных портфелей', uz: "Kredit portfellarini moslashuvchan sotib olish-sotishni ta'minlovchi huquqiy bazani joriy etish", en: 'Introduction of a legal framework ensuring flexible purchase and sale of credit portfolios', speaker: 'TBC' },
        ],
    },
    {
        ru: 'НАЛОГИ И НАЛОГОВОЕ АДМИНИСТРИРОВАНИЕ',
        uz: "SOLIQLAR VA SOLIQ MA'MURIYATI",
        en: 'TAXES AND TAX ADMINISTRATION',
        items: [
            { ru: 'Разработка налоговых положений в отношении соглашений о государственно-частном партнёрстве (ГЧП)', uz: "Davlat-xususiy sheriklik (DXSh) shartnomalariga nisbatan soliq qoidalarini ishlab chiqish", en: 'Development of tax provisions for public-private partnership (PPP) agreements', speaker: 'Veolia / EY' },
            { ru: 'Уточнение применения льгот по земельному налогу и налогу на имущество к проектам систем накопления электроэнергии', uz: "Elektr energiyasini to'plash tizimlari loyihalariga yer solig'i va mulk solig'i bo'yicha imtiyozlarni qo'llashni aniqlashtirish", en: 'Clarification of land tax and property tax exemptions for energy storage system projects', speaker: 'China energy' },
            { ru: 'Исключение требования о регистрации постоянного учреждения в каждом регионе присутствия (поправка в ст. 36 НК)', uz: "Mavjudlik mintaqasida doimiy muassasani ro'yxatdan o'tkazish talabini bekor qilish (Soliq kodeksining 36-moddasiga o'zgartirish)", en: 'Elimination of the requirement to register a permanent establishment in each region of presence (amendment to Art. 36 of the Tax Code)', speaker: 'Deloitte' },
            { ru: 'Совершенствование механизма внесения платежей за земельный участок', uz: "Yer uchastkalari uchun to'lovlar kiritish mexanizmini takomillashtirish", en: 'Improvement of the mechanism for making payments for land plots', speaker: 'Kosta Legal' },
            { ru: 'Введение механизма освобождения от НДС при импорте оборудования, не производимого в Uzbekistane', uz: "O'zbekistonda ishlab chiqarilmaydigan uskunalar importida QQSdan ozod qilish mexanizmini joriy etish", en: 'Introduction of a VAT exemption mechanism for the import of equipment not produced in Uzbekistan', speaker: 'Voltalia' },
            { ru: 'Введение раздельных порогов перехода на уплату НДС для офлайн- и онлайн-торговли (ИП и самозанятые)', uz: "Oflayn va onlayn savdo uchun QQS to'lashga o'tishning alohida chegaralarini joriy etish (yakka tartibdagi tadbirkorlar va o'z-o'zini band qiluvchilar)", en: 'Introduction of separate VAT thresholds for offline and online trade (individual entrepreneurs and self-employed)', speaker: 'Uzum' },
            { ru: 'Пересмотр порядка предоставления льгот по земельному налогу в период строительства', uz: "Qurilish davrida yer solig'i bo'yicha imtiyozlar berish tartibini qayta ko'rib chiqish", en: 'Revision of the procedure for granting land tax benefits during the construction period', speaker: 'Masdar' },
            { ru: 'Пересмотр механизма применения коэффициента 0,3 к земельному налогу для богарно-пастбищных зон', uz: "Lalmi va yaylov zonalari uchun yer solig'iga 0,3 koeffitsientini qo'llash mexanizmini qayta ko'rib chiqish", en: 'Revision of the mechanism for applying a coefficient of 0.3 to land tax for rainfed and pasture zones', speaker: 'Masdar' },
            { ru: 'Применение освобождения от земельного налога для ВИЭ-проектов на всю территорию земельного отвода', uz: "QEI-loyihalar uchun ajratilgan yer hududining butun maydoniga yer solig'idan ozod qilishni qo'llash", en: 'Application of land tax exemption for RES projects to the entire area of the land allocation', speaker: 'Masdar' },
            { ru: 'Введение налогового вычета для расходов на проекты корпоративной социальной ответственности (КСО)', uz: "Korporativ ijtimoiy mas'uliyat (KIM) loyihalari xarajatlari uchun soliq chegirmasini joriy etish", en: 'Introduction of a tax deduction for expenditures on corporate social responsibility (CSR) projects', speaker: 'Acwa' },
        ],
    },
    {
        ru: 'СОВЕРШЕНСТВОВАНИЕ ИНВЕСТИЦИОННОГО КЛИМАТА',
        uz: 'INVESTITSIYA MUHITINI TAKOMILLASHTIRISH',
        en: 'IMPROVEMENT OF THE INVESTMENT CLIMATE',
        items: [
            { ru: 'Упрощение визовых процедур для иностранных инвесторов при замене паспорта', uz: "Pasportni almashtirish vaqtida xorijiy investorlar uchun viza tartiblarini soddalashtirish", en: 'Simplification of visa procedures for foreign investors when replacing a passport', speaker: 'China energy' },
            { ru: 'Снижение таможенных пошлин на сырьё для производства табачной продукции', uz: "Tamaki mahsulotlari ishlab chiqarish uchun xom ashyoga bojxona bojlarini kamaytirish", en: 'Reduction of customs duties on raw materials for tobacco production', speaker: 'BAT' },
            { ru: 'Увеличение срока внедрения обновлённого дизайна акцизных марок на табачные изделия', uz: "Tamaki mahsulotlariga yangilangan aksiz markalarini joriy etish muddatini uzaytirish", en: 'Extension of the implementation period for the updated design of excise stamps on tobacco products', speaker: 'BAT' },
            { ru: 'Введение механизма гарантии правовой стабильности для иностранных инвестиций', uz: "Xorijiy investitsiyalar uchun huquqiy barqarorlik kafolatining mexanizmini joriy etish", en: 'Introduction of a legal stability guarantee mechanism for foreign investments', speaker: 'CAMCE' },
            { ru: 'Законодательное закрепление принципа стабильности законодательства для инвестиционных и ГЧП-проектов', uz: "Investitsiya va DXSh-loyihalar uchun qonunchilik barqarorligini qonuniy mustahkamlash", en: 'Legislative consolidation of the principle of legislative stability for investment and PPP projects', speaker: 'Veolia' },
            { ru: 'Урегулирование учёта взносов в счёт эмиссионного дохода', uz: "Emissiya daromadi hisobiga badillarni hisobga olishni tartibga solish", en: 'Regulation of accounting for share premium contributions', speaker: 'EY' },
            { ru: 'Установление обязательных сроков принятия подзаконных актов к законам об инвестициях', uz: "Investitsiyalar to'g'risidagi qonunlarga normativ aktlarni qabul qilishning majburiy muddatlarini belgilash", en: 'Establishment of mandatory deadlines for adopting secondary legislation to investment laws', speaker: 'Veolia' },
            { ru: 'Совершенствование механизма сопровождения реализации ГЧП-проектов', uz: "DXSh-loyihalarini amalga oshirishni hamroh qilish mexanizmini takomillashtirish", en: 'Improvement of the mechanism for supporting the implementation of PPP projects', speaker: 'Veolia' },
            { ru: 'Оптимизация процедуры рассмотрения и подписания ГЧП-проектов', uz: "DXSh-loyihalarini ko'rib chiqish va imzolash tartibini optimizatsiya qilish", en: 'Optimization of the procedure for reviewing and signing PPP projects', speaker: 'Veolia' },
            { ru: 'Формирование Межведомственного экспертного комитета по анализу экологических нормативов в градостроительстве', uz: "Shaharsozlikdagi ekologik normativlarni tahlil qilish uchun Idoralararo ekspert komitetini tashkil etish", en: 'Formation of an Interdepartmental Expert Committee for analyzing environmental standards in urban planning', speaker: 'IBC global / EY' },
            { ru: 'Рассмотреть возможность внедрение международных стандартов по зеленой инфраструктуре и зданиям', uz: "Yashil infratuzilma va binolar bo'yicha xalqaro standartlarni joriy etish imkoniyatini ko'rib chiqish", en: 'Consider the possibility of implementing international standards for green infrastructure and buildings', speaker: 'IBC global / EY' },
            { ru: 'Разработка и принятие постановления Президента «О переходных положениях применения УП-46»', uz: "«UP-46ni qo'llashning o'tish qoidalari to'g'risida» Prezidentning qarorini ishlab chiqish va qabul qilish", en: 'Development and adoption of the Presidential Decree «On transitional provisions for the application of PD-46»', speaker: 'IBC global / EY' },
        ],
    },
    {
        ru: 'КОРПОРАТИВНОЕ УПРАВЛЕНИЕ',
        uz: 'KORPORATIV BOSHQARUV',
        en: 'CORPORATE GOVERNANCE',
        items: [
            { ru: 'Подготовка новой редакции Кодекса корпоративного управления', uz: "Korporativ boshqaruv kodeksining yangi tahririni tayyorlash", en: 'Preparation of a new edition of the Corporate Governance Code', speaker: 'Crowe / Enlawyer' },
            { ru: 'Установление минимального гендерного стандарта в советах директоров публичных компаний', uz: "Ommaviy kompaniyalar kuzatuv kengashlarida minimal gender standartini belgilash", en: 'Establishing a minimum gender standard on the boards of directors of public companies', speaker: 'Crowe' },
            { ru: 'Трансформация корпоративного управления в Государственных предприятиях и банках через внедрение RBC', uz: "Davlat korxonalari va banklarida RBC joriy etish orqali korporativ boshqaruvni transformatsiya qilish", en: 'Transformation of corporate governance in State Enterprises and banks through the introduction of RBC', speaker: 'Crowe' },
            { ru: 'Обеспечение удобства участия в общем собрании акционеров и реализации связанных прав акционеров', uz: "Aktsiyadorlarning umumiy yig'ilishida ishtirok etish va tegishli aktsiyadorlik huquqlarini amalga oshirish qulayligini ta'minlash", en: 'Ensuring convenience of participation in the general meeting of shareholders and exercise of related shareholder rights', speaker: 'Crowe' },
            { ru: 'Создание полноценных работающих наблюдательных советов', uz: "To'liq qonli faol kuzatuv kengashlarini yaratish", en: 'Creation of fully functional supervisory boards', speaker: 'Crowe' },
            { ru: 'Обеспечение обязанности членов органов управления и контролирующих лиц акционерного общества действовать добросовестно и разумно в интересах акционерного общества', uz: "Aksiyadorlik jamiyatining boshqaruv organlari a'zolari va nazorat qiluvchi shaxslarning aksiyadorlik jamiyati manfaatlarida vijdonli va oqilona harakat qilish majburiyatini ta'minlash", en: 'Ensuring the obligation of management bodies and controlling persons of a joint-stock company to act in good faith and reasonably in the interests of the joint-stock company', speaker: 'Crowe' },
            { ru: 'Усиление регулирования сделок с аффилированными лицами и крупных сделок', uz: "Affillangan shaxslar bilan tuzilgan bitimlar va yirik bitimlarni tartibga solishni kuchaytirish", en: 'Strengthening regulation of transactions with affiliated persons and major transactions', speaker: 'Enlawyer' },
            { ru: 'Защита акционеров от размытия их долей и прав', uz: "Aktsiyadorlarni ularning ulush va huquqlarini suyultirishdan himoya qilish", en: 'Protection of shareholders from dilution of their stakes and rights', speaker: 'Crowe' },
            { ru: "Развитие регулирования корпоративных договоров (shareholders' agreements) в АО", uz: "Aksiyadorlik jamiyatlarida korporativ shartnomalar (shareholders' agreements) tartibga solinishini rivojlantirish", en: "Development of regulation of corporate agreements (shareholders' agreements) in joint-stock companies", speaker: 'Enlawyer' },
            { ru: 'Совершенствование правил объявления лицом, приобретшим крупный пакет акций акционерного общества, предложения владельцам остальных акций продать ему акции', uz: "Aksiyadorlik jamiyatining yirik aksiyalar paketini sotib olgan shaxs tomonidan qolgan aksiyalar egalariga aksiyalarni sotish taklifini e'lon qilish qoidalarini takomillashtirish", en: 'Improvement of the rules for announcing an offer to remaining shareholders to sell shares upon acquisition of a major stake', speaker: 'Crowe' },
            { ru: 'Продолжение повышения прозрачности акционерных обществ, акции которых публично обращаются', uz: "Aksiyalari ommaviy muomalada bo'lgan aksiyadorlik jamiyatlarining shaffofligini oshirishni davom ettirish", en: 'Continuation of increasing transparency of joint-stock companies whose shares are publicly traded', speaker: 'Crowe' },
            { ru: 'Вопросы раскрытия информации и прозрачности в сфере устойчивого развития', uz: "Barqaror rivojlanish sohasida ma'lumotlarni oshkor qilish va shaffoflik masalalari", en: 'Issues of information disclosure and transparency in the field of sustainable development', speaker: 'EY / Crowe' },
            { ru: 'Обеспечение правоприменения, защищающего интересы миноритарных акционеров', uz: "Minoritar aktsiyadorlar manfaatlarini himoya qiluvchi huquqni qo'llashni ta'minlash", en: 'Ensuring law enforcement that protects the interests of minority shareholders', speaker: 'Crowe' },
        ],
    },
    {
        ru: 'ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ И ЦИФРОВАЯ ЭКОНОМИКА',
        uz: "SUN'IY INTELLEKT VA RAQAMLI IQTISODIYOT",
        en: 'ARTIFICIAL INTELLIGENCE AND DIGITAL ECONOMY',
        items: [
            { ru: 'Разработка и принятие Закона РУз «Об искусственном интеллекте»', uz: "O'zbekiston Respublikasining «Sun'iy intellekt to'g'risida»gi Qonunini ishlab chiqish va qabul qilish", en: 'Development and adoption of the Law of the Republic of Uzbekistan «On Artificial Intelligence»', speaker: 'Uzum' },
            { ru: 'Учреждение Межведомственной рабочей группы по ИИ в рамках Совета иностранных инвесторов', uz: "Xorijiy investorlar kengashi doirasida SI bo'yicha Idoralararo ishchi guruhini tashkil etish", en: "Establishment of an Interdepartmental Working Group on AI within the Foreign Investors' Council", speaker: 'EY' },
            { ru: 'Разработка нормативно-правовой базы по обработке персональных данных граждан с применением ИИ', uz: "Fuqarolarning shaxsiy ma'lumotlarini SI yordamida qayta ishlash bo'yicha normativ-huquqiy bazani ishlab chiqish", en: "Development of a regulatory framework for processing citizens' personal data using AI", speaker: 'TBC / Uzum' },
            { ru: 'Цифровизация и развитие кадастровой системы для повышения доступности и точности земельных данных', uz: "Yer ma'lumotlarining mavjudligi va aniqligi uchun kadastr tizimini raqamlashtirish va rivojlantirish", en: 'Digitalization and development of the cadastral system to improve the availability and accuracy of land data', speaker: 'FAO / ADB' },
            { ru: 'Внедрение ИИ-системы цифровой верификации возраста покупателя в точках продаж возрастных товаров', uz: "Yoshi cheklangan tovarlar sotish nuqtalarida xaridorning yoshini raqamli tekshirishning SI-tizimini joriy etish", en: 'Introduction of an AI system for digital age verification of buyers at points of sale of age-restricted goods', speaker: 'BAT' },
            { ru: 'Создание правового механизма безопасного обмена данными внутри корпоративных групп', uz: "Korporativ guruhlar ichida ma'lumotlarni xavfsiz almashishning huquqiy mexanizmini yaratish", en: 'Creation of a legal mechanism for secure data exchange within corporate groups', speaker: 'TBC' },
            { ru: 'Утверждение национальных этических принципов в области ИИ и создание Этического совета по ИИ', uz: "SI sohasida milliy etik tamoyillarni tasdiqlash va SI bo'yicha Etik kengashni tashkil etish", en: 'Approval of national ethical principles in the field of AI and creation of an AI Ethics Council', speaker: 'Uzum' },
            { ru: 'Создание системы подготовки и переподготовки кадров в области ИИ', uz: "SI sohasida kadrlar tayyorlash va qayta tayyorlash tizimini yaratish", en: 'Creation of a system for training and retraining personnel in the field of AI', speaker: 'Uzum' },
            { ru: 'Разработка нормативной базы для регуляторных «песочниц» (sandbox) в сфере ИИ', uz: "SI sohasida tartibga soluvchi «sandbox»lar uchun normativ bazani ishlab chiqish", en: 'Development of a regulatory framework for regulatory sandboxes in the field of AI', speaker: 'Uzum' },
            { ru: 'Внесение изменений в законодательство о государственных закупках для стимулирования внедрения ИИ-решений', uz: "SI-yechimlarini joriy etishni rag'batlantirish uchun davlat xaridlari to'g'risidagi qonunchilikka o'zgartishlar kiritish", en: 'Amendments to public procurement legislation to incentivize the implementation of AI solutions', speaker: 'Uzum' },
            { ru: 'Закрепление за маркетплейсами статуса информационного посредника и разграничение ответственности платформы и продавца', uz: "Marketpleyslar uchun axborot vositachi maqomini belgilash va platforma va sotuvchi mas'uliyatini chegaralash", en: 'Assignment of the status of information intermediary to marketplaces and differentiation of platform and seller liability', speaker: 'Uzum' },
            { ru: 'Совершенствование антимонопольного регулирования операторов цифровых платформ', uz: "Raqamli platformalar operatorlarining monopoliyaga qarshi tartibga solinishini takomillashtirish", en: 'Improvement of antitrust regulation of digital platform operators', speaker: 'Uzum' },
            { ru: 'Государственная программа развития логистической инфраструктуры для e-commerce', uz: "E-commerce uchun logistika infratuzilmasini rivojlantirishning davlat dasturi", en: 'State program for the development of logistics infrastructure for e-commerce', speaker: 'Uzum' },
            { ru: 'Усиление механизмов защиты прав потребителей в электронной коммерции', uz: "Elektron tijoratda iste'molchilar huquqlarini himoya qilish mexanizmlarini kuchaytirish", en: 'Strengthening mechanisms for protecting consumer rights in e-commerce', speaker: 'Uzum' },
            { ru: 'Формирование национальной открытой онлайн-образовательной платформы «Навыки будущего»', uz: "«Kelajak ko'nikmalari» milliy ochiq onlayn ta'lim platformasini shakllantirish", en: 'Formation of the national open online educational platform «Skills of the Future»', speaker: 'Yandex' },
            { ru: 'Разработка Барометра управленческих компетенций Узбекистана и дорожной карты трансформации управленческого образования', uz: "O'zbekiston boshqaruv kompetensiyalari barometri va boshqaruv ta'limini transformatsiya qilish yo'l xaritasini ishlab chiqish", en: 'Development of the Uzbekistan Management Competencies Barometer and a roadmap for transforming management education', speaker: 'Yandex' },
            { ru: 'Программа «Цифровые навыки для e-commerce»: обучение населения и МСБ', uz: "«E-commerce uchun raqamli ko'nikmalar» dasturi: aholiga va kichik va o'rta biznesga o'qitish", en: 'Program «Digital Skills for e-commerce»: training of the population and SMEs', speaker: 'Uzum' },
            { ru: 'Формирование Национальной платформы управления большими данными и искусственным интеллектом', uz: "Katta ma'lumotlar va sun'iy intellektni boshqarishning Milliy platformasini shakllantirish", en: 'Formation of the National Big Data and Artificial Intelligence Management Platform', speaker: 'EY' },
            { ru: 'Разработка платформы управления рисками в сфере гражданской защиты на основе ИИ', uz: "SI asosida fuqarolik himoyasi sohasida xatarlarni boshqarish platformasini ishlab chiqish", en: 'Development of an AI-based civil defense risk management platform', speaker: 'EY' },
            { ru: 'Создание единой цифровой платформы торговли и сертификации сельскохозяйственной продукции (AgriTrade Platform)', uz: "Qishloq xo'jaligi mahsulotlarini savdo qilish va sertifikatlashning yagona raqamli platformasini (AgriTrade Platform) yaratish", en: 'Creation of a unified digital platform for trade and certification of agricultural products (AgriTrade Platform)', speaker: 'EY / UBC' },
        ],
    },
    {
        ru: 'ЗЕМЕЛЬНЫЕ ВОПРОСЫ',
        uz: 'YER MASALALARI',
        en: 'LAND ISSUES',
        items: [
            { ru: 'Разработка единого НПА, устанавливающего комплексный порядок предоставления земельных участков инвесторам', uz: "Investorlarga yer uchastkalarini berish kompleks tartibini belgilovchi yagona normativ-huquqiy hujjatni ishlab chiqish", en: 'Development of a single regulatory act establishing a comprehensive procedure for providing land plots to investors', speaker: 'Kosta Legal' },
            { ru: 'Введение обязательного дотендерного подтверждения осуществимости рекатегоризации земель', uz: "Yerlarni qayta tasniflashning amalga oshirilishi imkoniyatini tender oldi majburiy tasdiqlashini joriy etish", en: 'Introduction of mandatory pre-tender confirmation of the feasibility of land recategorization', speaker: 'Kosta Legal' },
            { ru: 'Установление единого правового порядка подготовки и приобретения земельных участков', uz: "Yer uchastkalarini tayyorlash va sotib olishning yagona huquqiy tartibini belgilash", en: 'Establishment of a unified legal procedure for the preparation and acquisition of land plots', speaker: 'Kosta Legal / ACWA' },
            { ru: 'Закрепление права инвестора на финансирование расходов, связанных с подготовкой земельного участка', uz: "Investorning yer uchastkasini tayyorlash bilan bog'liq xarajatlarni moliyalashtirish huquqini mustahkamlash", en: "Consolidation of the investor's right to finance costs associated with the preparation of a land plot", speaker: 'Kosta Legal' },
            { ru: 'Установление правового режима судьбы объектов, возведённых арендатором на арендованном земельном участке', uz: "Ijarachi tomonidan ijaraga olingan yer uchastkasida qurilgan ob'ektlarning qismati huquqiy rejimini belgilash", en: 'Establishment of the legal regime for the fate of objects erected by a tenant on a leased land plot', speaker: 'Kosta Legal' },
            { ru: 'Введение упрощённого механизма предоставления инвестору временного доступа к земельному участку', uz: "Investorga yer uchastkasiga vaqtinchalik kirishning soddalashtirilgan mexanizmini joriy etish", en: 'Introduction of a simplified mechanism for providing the investor with temporary access to a land plot', speaker: 'Kosta Legal' },
            { ru: 'Разграничение регистрации сделок с недвижимостью и регистрации прав на недвижимое имущество', uz: "Ko'chmas mulk bilan tuzilgan bitimlarni ro'yxatdan o'tkazish va ko'chmas mulk huquqlarini ro'yxatdan o'tkazishni chegaralash", en: 'Differentiation of registration of real estate transactions and registration of rights to real property', speaker: 'Kosta Legal' },
            { ru: 'Закрепление порядка преобразования права постоянного пользования в аренду для иностранных инвесторов', uz: "Xorijiy investorlar uchun doimiy foydalanish huquqini ijaraga o'tkazish tartibini mustahkamlash", en: 'Consolidation of the procedure for converting the right of permanent use into a lease for foreign investors', speaker: 'Kosta Legal' },
            { ru: 'Вовлечение негосударственных объединений фермеров в разработку земельной политики', uz: "Yer siyosatini ishlab chiqishda nodavlat fermer birlashmalarini jalb qilish", en: "Involvement of non-governmental farmers' associations in the development of land policy", speaker: 'FAO / ADB' },
            { ru: 'Создание института земельного омбудсмена для защиты прав инвесторов', uz: "Investorlar huquqlarini himoya qilish uchun yer ombudsmeni institutini yaratish", en: "Creation of the institution of a land ombudsman to protect investors' rights", speaker: 'FAO / ADB' },
            { ru: 'Создание института апелляционных комиссий для досудебного урегулирования земельных споров', uz: "Yer nizolarini sudgacha tartibga solish uchun apellyatsiya komissiyalari institutini yaratish", en: 'Creation of the institution of appeal commissions for pre-trial settlement of land disputes', speaker: 'FAO / ADB' },
            { ru: 'Обеспечение доступа инвесторов к сельскохозяйственным земельным участкам', uz: "Investorlarning qishloq xo'jaligi yer uchastkalariga kirishini ta'minlash", en: "Ensuring investors' access to agricultural land plots", speaker: 'FAO / ADB' },
            { ru: 'Совершенствование механизмов доступа к сельскохозяйственным землям для реальных производителей', uz: "Haqiqiy ishlab chiqaruvchilar uchun qishloq xo'jaligi yerlariga kirish mexanizmlarini takomillashtirish", en: 'Improvement of mechanisms for access to agricultural land for actual producers', speaker: 'FAO / ADB' },
            { ru: 'Предотвращение чрезмерной фрагментации землепользования', uz: "Yerdan foydalanishning haddan ziyod parchalanishini oldini olish", en: 'Prevention of excessive fragmentation of land use', speaker: 'FAO / ADB' },
            { ru: 'Предотвращение чрезмерной концентрации сельскохозяйственных земель', uz: "Qishloq xo'jaligi yerlarining haddan ziyod to'planishini oldini olish", en: 'Prevention of excessive concentration of agricultural land', speaker: 'FAO / ADB' },
            { ru: 'Совершенствование процедур оценки сельскохозяйственных земель', uz: "Qishloq xo'jaligi yerlarini baholash tartiblarini takomillashtirish", en: 'Improvement of procedures for assessing agricultural land', speaker: 'FAO / ADB' },
            { ru: 'Совершенствование экологической и водной политики в сфере землепользования', uz: "Yerdan foydalanish sohasidagi ekologik va suv siyosatini takomillashtirish", en: 'Improvement of environmental and water policy in the field of land use', speaker: 'FAO / ADB' },
            { ru: 'Совершенствование гарантий и защиты прав землепользователей при прекращении прав на землю', uz: "Yer huquqlari bekor qilinganida yer foydalanuvchilarning kafolatlari va huquqlarini himoya qilishni takomillashtirish", en: "Improvement of guarantees and protection of land users' rights upon termination of land rights", speaker: 'FAO / ADB' },
            { ru: 'Обеспечение доступа уязвимых категорий землепользователей к правосудию по земельным спорам', uz: "Zaif toifadagi yer foydalanuvchilarning yer nizolari bo'yicha adolatga murojaat qilish imkoniyatini ta'minlash", en: 'Ensuring access of vulnerable categories of land users to justice in land disputes', speaker: 'FAO / ADB' },
            { ru: 'Обеспечение равенства сторон в земельных спорах между арендаторами и государственными структурами', uz: "Ijarachilar va davlat tuzilmalari o'rtasidagi yer nizolarida tomonlar tengligini ta'minlash", en: 'Ensuring equality of parties in land disputes between tenants and state structures', speaker: 'FAO / ADB' },
            { ru: 'Обеспечение справедливой компенсации арендаторам при досрочном прекращении прав землепользования', uz: "Yer foydalanish huquqlari muddatidan oldin bekor qilinganda ijarachilarga adolatli kompensatsiya ta'minlash", en: 'Ensuring fair compensation to tenants upon early termination of land use rights', speaker: 'FAO / ADB' },
            { ru: 'Развитие механизмов кредитования под залог прав пользования сельскохозяйственными землями', uz: "Qishloq xo'jaligi yerlaridan foydalanish huquqlari garovi ostida kreditlash mexanizmlarini rivojlantirish", en: 'Development of lending mechanisms secured by agricultural land use rights', speaker: 'FAO / ADB' },
        ],
    },
    {
        ru: 'АЛЬТЕРНАТИВНЫЕ ИНВЕСТИЦИИ',
        uz: 'MUQOBIL INVESTITSIYALAR',
        en: 'ALTERNATIVE INVESTMENTS',
        items: [
            { ru: 'Разработка дорожной карты по трансформации Узбекистана в региональный хаб PE/VC', uz: "O'zbekistonni PE/VC mintaqaviy hubiga aylantirish yo'l xaritasini ishlab chiqish", en: 'Development of a roadmap for transforming Uzbekistan into a regional PE/VC hub', speaker: 'Vision Invest' },
            { ru: 'Введение специального регуляторного и налогового режима для альтернативных инвестиционных фондов (АИФ) и их инвесторов', uz: "Muqobil investitsiya fondlari (MIF) va ularning investorlari uchun maxsus tartibga solish va soliq rejimini joriy etish", en: 'Introduction of a special regulatory and tax regime for alternative investment funds (AIF) and their investors', speaker: 'Vision Invest' },
            { ru: 'Проведение ежегодного международного саммита по альтернативным инвестициям в Узбекистане', uz: "O'zbekistonda muqobil investitsiyalar bo'yicha yillik xalqaro sammit o'tkazish", en: 'Holding an annual international summit on alternative investments in Uzbekistan', speaker: 'Vision Invest' },
            { ru: 'Развитие локальных управляющих компаний и инвестиционных фондов', uz: "Mahalliy boshqaruvchi kompaniyalar va investitsiya fondlarini rivojlantirish", en: 'Development of local management companies and investment funds', speaker: 'Vision Invest' },
        ],
    },
    {
        ru: 'УСТОЙЧИВОЕ РАЗВИТИЕ',
        uz: 'BARQAROR RIVOJLANISH',
        en: 'SUSTAINABLE DEVELOPMENT',
        items: [
            { ru: 'Учреждение Межведомственной рабочей группы по вопросам циркулярной экономики и ежегодной специализированной премии по ESG в рамках Совета', uz: "Kengash doirasida sirkular iqtisodiyot masalalari bo'yicha Idoralararo ishchi guruhini tashkil etish va ESG bo'yicha yillik ixtisoslashgan mukofotni ta'sis etish", en: 'Establishment of an Interdepartmental Working Group on circular economy issues and an annual specialized ESG award within the Council', speaker: 'Coca Cola' },
            { ru: 'Внедрение национального стандарта качества принятия решений (Tayanch Uzbekistan)', uz: "Qaror qabul qilishning milliy sifat standartini (Tayanch Uzbekistan) joriy etish", en: 'Introduction of the national decision-making quality standard (Tayanch Uzbekistan)', speaker: 'Crowe' },
            { ru: 'Введение национальной системы оценки регулирующего воздействия (RIA) и обязательного последующего анализа (ex-post review)', uz: "Tartibga soluvchi ta'sirni baholashning milliy tizimini (RIA) va majburiy keyingi tahlilni (ex-post review) joriy etish", en: 'Introduction of the national regulatory impact assessment system (RIA) and mandatory ex-post review', speaker: 'Crowe' },
            { ru: 'Внедрение национальной системы Pre-Mortem и After-Action Review (AAR) для мегапроектов (RBC Strategic Review System)', uz: "Megaproyektlar uchun milliy Pre-Mortem va After-Action Review (AAR) tizimini (RBC Strategic Review System) joriy etish", en: 'Introduction of the national Pre-Mortem and After-Action Review (AAR) system for mega-projects (RBC Strategic Review System)', speaker: 'Crowe' },
            { ru: 'Формирование национальной системы KPI, подотчётности и «архитектуры внимания» в контексте RBC (Uzbekistan–2030)', uz: "RBC kontekstida KPI, hisobdorlik va «e'tibor arxitekturasi»ning milliy tizimini shakllantirish (Uzbekistan–2030)", en: 'Formation of the national KPI, accountability and «attention architecture» system in the context of RBC (Uzbekistan–2030)', speaker: 'Crowe' },
            { ru: 'Внедрение национального стандарта квалификации поставщиков на основе принципов RBC', uz: "RBC tamoyillari asosida etkazib beruvchilar malakasining milliy standartini joriy etish", en: 'Introduction of the national supplier qualification standard based on RBC principles', speaker: 'Crowe' },
            { ru: 'Разработка национальной политики RBC и механизма рассмотрения жалоб (по модели NCP)', uz: "Milliy RBC siyosatini va shikoyatlarni ko'rib chiqish mexanizmini (NCP modeli bo'yicha) ishlab chiqish", en: 'Development of the national RBC policy and complaints review mechanism (based on the NCP model)', speaker: 'Crowe' },
            { ru: 'Создание национальной системы рассмотрения жалоб и разрешения споров по принципам RBC (RBC Grievance Mechanism)', uz: "RBC tamoyillari bo'yicha shikoyatlarni ko'rib chiqish va nizolarni hal etishning milliy tizimini yaratish (RBC Grievance Mechanism)", en: 'Creation of a national system for reviewing complaints and resolving disputes on RBC principles (RBC Grievance Mechanism)', speaker: 'Crowe' },
            { ru: 'Введение единых стандартов раскрытия ESG-информации для компаний', uz: "Kompaniyalar uchun ESG-ma'lumotlarini oshkor qilishning yagona standartlarini joriy etish", en: 'Introduction of uniform ESG information disclosure standards for companies', speaker: 'KPMG' },
            { ru: 'Установление критериев включения организаций в Реестр ответственного ведения бизнеса', uz: "Tashkilotlarni Mas'uliyatli biznes yuritish Reestriga kiritish mezonlarini belgilash", en: 'Establishment of criteria for including organizations in the Register of Responsible Business Conduct', speaker: 'KPMG' },
            { ru: 'Введение требований к климатическому планированию и управлению климатическими рисками на уровне компаний', uz: "Kompaniya darajasida iqlimiy rejalashtirish va iqlimiy xatarlarni boshqarishga talablarni joriy etish", en: 'Introduction of requirements for climate planning and climate risk management at the company level', speaker: 'KPMG' },
            { ru: 'Создание правовой и институциональной базы для выпуска «зелёных сукук»', uz: "«Yashil sukuk» chiqarish uchun huquqiy va institutsional bazani yaratish", en: 'Creation of the legal and institutional framework for issuing «green sukuk»', speaker: 'EY / ISDB' },
            { ru: 'Разработка национальных стандартов маркировки и методологии «зелёных» кредитов', uz: "«Yashil» kreditlarning milliy markalash standartlari va metodologiyasini ishlab chiqish", en: 'Development of national labeling standards and methodology for «green» loans', speaker: 'EY' },
            { ru: 'Разработка мер пруденциального стимулирования зелёного и устойчивого кредитования', uz: "Yashil va barqaror kreditlashni prudentsial rag'batlantirish choralarini ishlab chiqish", en: 'Development of prudential incentive measures for green and sustainable lending', speaker: 'EY' },
            { ru: 'Разработка комплексного реестра зелёных и устойчивых проектов («Книга зелёных проектов»)', uz: "Yashil va barqaror loyihalarning kompleks reestrini ishlab chiqish («Yashil loyihalar kitobi»)", en: 'Development of a comprehensive register of green and sustainable projects («Green Projects Book»)', speaker: 'EY' },
            { ru: 'Разработка Национальной стратегии устойчивого финансирования Республики Узбекистан', uz: "O'zbekiston Respublikasining Barqaror moliyalashtirish Milliy strategiyasini ishlab chiqish", en: 'Development of the National Sustainable Finance Strategy of the Republic of Uzbekistan', speaker: 'EY' },
            { ru: 'Развитие ESG-рейтингования государственных предприятий и публичных эмитентов у глобальных агентств', uz: "Global agentliklarda davlat korxonalari va ommaviy emitentlarning ESG-reytingini rivojlantirish", en: 'Development of ESG ratings of state enterprises and public issuers at global agencies', speaker: 'EY' },
            { ru: 'Модернизация экологических и социальных стандартов в энергетике с учётом международного опыта', uz: "Xalqaro tajribani hisobga olib energetikadagi ekologik va ijtimoiy standartlarni modernizatsiya qilish", en: 'Modernization of environmental and social standards in the energy sector taking into account international experience', speaker: 'Acwa' },
            { ru: 'Предоставление инвестору прав собственности на экологические атрибуты (environmental attributes)', uz: "Investorga ekologik atributlar (environmental attributes) bo'yicha mulk huquqlarini berish", en: 'Granting the investor ownership rights to environmental attributes', speaker: 'Voltalia' },
        ],
    },
]
