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
        uz: 'STRATEGIK TAŞABBUSLAR',
        en: 'STRATEGIC INITIATIVES',
        items: [
            { ru: 'Учреждение Регионального альянса инвестиционных советов Центральной Азии и Кавказа и проведение ежегодных форумов Совета', uz: "Markaziy Osiyo va Kavkaz investitsiya kengaşlarining Mintaqaviy alyansini taşkil etiş va Kengaşning yillik forumlarini ötkaziş", en: 'Establishment of the Regional Alliance of Investment Councils of Central Asia and the Caucasus and holding annual Council forums', speaker: 'ADB' },
            { ru: 'Создание законодательно закреплённого Проектного офиса по координации реализации приоритетных инвестиционных инициатив', uz: "Ustuvor investitsiya taşabbuslarini amalga oşirişni muvofiqlaştiriş uçun qonuniy mustahkamlangan Loyiha ofisini taşkil etiş", en: 'Creation of a legislatively established Project Office for coordinating the implementation of priority investment initiatives', speaker: 'Acwa' },
            { ru: 'Создание публичной цифровой платформы комплексной оценки инвестиционной деятельности «FIC Investment Dashboard»', uz: "Investitsiya faoliyatini kompleks baholaşning «FIC Investment Dashboard» ommaviy raqamli platformasini yaratiş", en: 'Creation of a public digital platform for comprehensive investment activity assessment «FIC Investment Dashboard»', speaker: 'ODAS Enerji / EY' },
        ],
    },
    {
        ru: 'ЭНЕРГЕТИЧЕСКИЙ СЕКТОР',
        uz: 'ENERGETIKA SEKTORI',
        en: 'ENERGY SECTOR',
        items: [
            { ru: 'Допуск частного сектора к деятельности по распределению электроэнергии (поправки в НПА)', uz: "Xususiy sektorni elektr energiyasini taqsimlaş faoliyatiga qabul qiliş (normativ-huquqiy hujjatlarga özgartiriş)", en: 'Admission of the private sector to electricity distribution activities (amendments to legislation)', speaker: 'EDF' },
            { ru: 'Освобождение проектов с иностранным финансированием от требований о перестраховании внутри страны', uz: "Xorijiy moliyalaştirişli loyihalarni mamlakatdagi qayta suğurtalaş talablaridan ozod qiliş", en: 'Exemption of projects with foreign financing from domestic reinsurance requirements', speaker: 'Acwa' },
            { ru: 'Разработка и публикация национального Генерального плана развития энергетического сектора (генерация, передача, распределение)', uz: "Energetika sektorini rivojlantirişning milliy Boş rejasini (işlab çiqariş, uzatiş, taqsimlaş) işlab çiqiş va e'lon qiliş", en: 'Development and publication of the national Master Plan for energy sector development (generation, transmission, distribution)', speaker: 'EDF' },
            { ru: 'Установление и регулярный пересмотр ставок лицензионных сборов на производство электроэнергии', uz: "Elektr energiyasi işlab çiqarişga litsenziya tölovlari stavkalarini belgilaş va muntazam körib çiqiş", en: 'Establishment and regular revision of license fee rates for electricity generation', speaker: 'Voltalia' },
            { ru: 'Реформирование порядка лицензирования производства электроэнергии: поэтапная подача документов и согласование сроков', uz: "Elektr energiyasi işlab çiqarişni litsenziyalaş tartibini isloh qiliş: bosqiçma-bosqiç hujjat topşiriş va muddatlarni muvofiqlaştiriş", en: 'Reform of the electricity generation licensing procedure: phased document submission and timeline coordination', speaker: 'Voltalia' },
        ],
    },
    {
        ru: 'ФИНАНСОВЫЙ СЕКТОР И БАНКОВСКАЯ ДЕЯТЕЛЬНОСТЬ',
        uz: 'MOLIYAVIY SEKTOR VA BANK FAOLIYATI',
        en: 'FINANCIAL SECTOR AND BANKING',
        items: [
            { ru: 'Введение риск-ориентированной гибкости в правила удалённого доступа для банков', uz: "Banklar uçun masofaviy kiriş qoidalariga xavf-xatarga yönaltirilgan moslaşuvçanlikni joriy etiş", en: 'Introduction of risk-based flexibility in remote access rules for banks', speaker: 'TBC' },
            { ru: 'Наращивание потенциала отечественных финансовых институтов и развитие инфраструктуры рынка капитала', uz: "Mahalliy moliya institutlarining salohiyatini oşiriş va kapital bozori infratuzilmasini rivojlantiriş", en: 'Building capacity of domestic financial institutions and developing capital market infrastructure', speaker: 'Acwa' },
            { ru: 'Расширение инструментов смешанного финансирования и углубление сотрудничества с международными финансовыми институтами', uz: "Aralaş moliyalaştiriş vositalarini kengaytiriş va xalqaro moliya institutlari bilan hamkorlikni çuqurlaştiriş", en: 'Expanding blended finance instruments and deepening cooperation with international financial institutions', speaker: 'Acwa' },
            { ru: 'Согласование банковских реформ с потребностями инфраструктурного финансирования в энергетическом секторе', uz: "Bank islohotlarini energetika sektoridagi infratuzilma moliyalaştiriş ehtiyojlari bilan muvofiqlaştiriş", en: 'Aligning banking reforms with infrastructure financing needs in the energy sector', speaker: 'Acwa' },
            { ru: 'Введение правовой базы гибкого механизма купли-продажи кредитных портфелей', uz: "Kredit portfellarini moslaşuvçan sotib oliş-sotiş mexanizmining huquqiy bazasini joriy etiş", en: 'Introduction of a legal framework for the flexible purchase and sale of credit portfolios', speaker: 'TBC' },
            { ru: 'Введение законодательства об исламском страховании (такафул)', uz: "Islom suğurtasi (takaful) töğrisidagi qonunçilikni joriy etiş", en: 'Introduction of Islamic insurance legislation (takaful)', speaker: 'EY' },
            { ru: 'Предоставление права использования ранее приобретённой иностранной валюты и предоплаченных импортных авансов', uz: "Oldindan sotib olingan xorijiy valyuta va oldindan tölangan import avanslaridan foydalaniş huquqini beriş", en: 'Granting the right to use previously acquired foreign currency and prepaid import advances', speaker: 'Knauf' },
            { ru: 'Снижение налоговой нагрузки на иностранный капитал: налог у источника выплаты и налог на прирост капитала', uz: "Xorijiy kapitalga soliq yukini kamaytiriş: manbadan olinadigan soliq va kapital ösişidan olinadigan soliq", en: 'Reducing the tax burden on foreign capital: withholding tax and capital gains tax', speaker: 'TBC' },
            { ru: 'Введение инструментов стимулирования участия местных инвесторов на рынке капитала (налоговые льготы для физических лиц и институтов)', uz: "Kapital bozorida mahalliy investorlar iştirokini rağbatlantiriş vositalarini joriy etiş (jismoniy şaxslar va institutlar uçun soliq imtiyozlari)", en: 'Introduction of instruments to incentivize local investor participation in the capital market (tax benefits for individuals and institutions)', speaker: 'TBC' },
            { ru: 'Введение регуляторной базы для жилищных кредитов под залог недвижимости (ЖКЗН)', uz: "Köçmas mulk garovi ostida uy-joy kreditlari uçun tartibga soluvçi bazani joriy etiş", en: 'Introduction of a regulatory framework for mortgage loans secured by real estate', speaker: 'TBC' },
            { ru: 'Создание регуляторной базы, обеспечивающей продажу портфелей проблемных кредитов (НПК)', uz: "Muammoli kreditlar portfellarini sotişni ta'minlovçi tartibga soluvçi bazani yaratiş", en: 'Creation of a regulatory framework ensuring the sale of non-performing loan portfolios (NPL)', speaker: 'TBC' },
            { ru: 'Введение правовой базы, обеспечивающей гибкую куплю-продажу кредитных портфелей', uz: "Kredit portfellarini moslaşuvçan sotib oliş-sotişni ta'minlovçi huquqiy bazani joriy etiş", en: 'Introduction of a legal framework ensuring flexible purchase and sale of credit portfolios', speaker: 'TBC' },
        ],
    },
    {
        ru: 'НАЛОГИ И НАЛОГОВОЕ АДМИНИСТРИРОВАНИЕ',
        uz: "SOLIQLAR VA SOLIQ MA'MURIYATI",
        en: 'TAXES AND TAX ADMINISTRATION',
        items: [
            { ru: 'Разработка налоговых положений в отношении соглашений о государственно-частном партнёрстве (ГЧП)', uz: "Davlat-xususiy şeriklik (DXŞ) şartnomalariga nisbatan soliq qoidalarini işlab çiqiş", en: 'Development of tax provisions for public-private partnership (PPP) agreements', speaker: 'Veolia / EY' },
            { ru: 'Уточнение применения льгот по земельному налогу и налогу на имущество к проектам систем накопления электроэнергии', uz: "Elektr energiyasini töplaş tizimlari loyihalariga yer soliği va mulk soliği böyiça imtiyozlarni qöllaşni aniqlaştiriş", en: 'Clarification of land tax and property tax exemptions for energy storage system projects', speaker: 'China energy' },
            { ru: 'Исключение требования о регистрации постоянного учреждения в каждом регионе присутствия (поправка в ст. 36 НК)', uz: "Mavjudlik mintaqasida doimiy muassasani röyxatdan ötkaziş talabini bekor qiliş (Soliq kodeksining 36-moddasiga özgartiriş)", en: 'Elimination of the requirement to register a permanent establishment in each region of presence (amendment to Art. 36 of the Tax Code)', speaker: 'Deloitte' },
            { ru: 'Совершенствование механизма внесения платежей за земельный участок', uz: "Yer uçastkalari uçun tölovlar kiritiş mexanizmini takomillaştiriş", en: 'Improvement of the mechanism for making payments for land plots', speaker: 'Kosta Legal' },
            { ru: 'Введение механизма освобождения от НДС при импорте оборудования, не производимого в Uzbekistane', uz: "Özbekistonda işlab çiqarilmaydigan uskunalar importida QQSdan ozod qiliş mexanizmini joriy etiş", en: 'Introduction of a VAT exemption mechanism for the import of equipment not produced in Uzbekistan', speaker: 'Voltalia' },
            { ru: 'Введение раздельных порогов перехода на уплату НДС для офлайн- и онлайн-торговли (ИП и самозанятые)', uz: "Oflayn va onlayn savdo uçun QQS tölaşga ötişning alohida çegaralarini joriy etiş (yakka tartibdagi tadbirkorlar va öz-özini band qiluvçilar)", en: 'Introduction of separate VAT thresholds for offline and online trade (individual entrepreneurs and self-employed)', speaker: 'Uzum' },
            { ru: 'Пересмотр порядка предоставления льгот по земельному налогу в период строительства', uz: "Quriliş davrida yer soliği böyiça imtiyozlar beriş tartibini qayta körib çiqiş", en: 'Revision of the procedure for granting land tax benefits during the construction period', speaker: 'Masdar' },
            { ru: 'Пересмотр механизма применения коэффициента 0,3 к земельному налогу для богарно-пастбищных зон', uz: "Lalmi va yaylov zonalari uçun yer soliğiga 0,3 koeffitsientini qöllaş mexanizmini qayta körib çiqiş", en: 'Revision of the mechanism for applying a coefficient of 0.3 to land tax for rainfed and pasture zones', speaker: 'Masdar' },
            { ru: 'Применение освобождения от земельного налога для ВИЭ-проектов на всю территорию земельного отвода', uz: "QEI-loyihalar uçun ajratilgan yer hududining butun maydoniga yer soliğidan ozod qilişni qöllaş", en: 'Application of land tax exemption for RES projects to the entire area of the land allocation', speaker: 'Masdar' },
            { ru: 'Введение налогового вычета для расходов на проекты корпоративной социальной ответственности (КСО)', uz: "Korporativ ijtimoiy mas'uliyat (KIM) loyihalari xarajatlari uçun soliq çegirmasini joriy etiş", en: 'Introduction of a tax deduction for expenditures on corporate social responsibility (CSR) projects', speaker: 'Acwa' },
        ],
    },
    {
        ru: 'СОВЕРШЕНСТВОВАНИЕ ИНВЕСТИЦИОННОГО КЛИМАТА',
        uz: 'INVESTITSIYA MUHITINI TAKOMILLAŞTIRIŞ',
        en: 'IMPROVEMENT OF THE INVESTMENT CLIMATE',
        items: [
            { ru: 'Упрощение визовых процедур для иностранных инвесторов при замене паспорта', uz: "Pasportni almaştiriş vaqtida xorijiy investorlar uçun viza tartiblarini soddalaştiriş", en: 'Simplification of visa procedures for foreign investors when replacing a passport', speaker: 'China energy' },
            { ru: 'Снижение таможенных пошлин на сырьё для производства табачной продукции', uz: "Tamaki mahsulotlari işlab çiqariş uçun xom aşyoga bojxona bojlarini kamaytiriş", en: 'Reduction of customs duties on raw materials for tobacco production', speaker: 'BAT' },
            { ru: 'Увеличение срока внедрения обновлённого дизайна акцизных марок на табачные изделия', uz: "Tamaki mahsulotlariga yangilangan aksiz markalarini joriy etiş muddatini uzaytiriş", en: 'Extension of the implementation period for the updated design of excise stamps on tobacco products', speaker: 'BAT' },
            { ru: 'Введение механизма гарантии правовой стабильности для иностранных инвестиций', uz: "Xorijiy investitsiyalar uçun huquqiy barqarorlik kafolatining mexanizmini joriy etiş", en: 'Introduction of a legal stability guarantee mechanism for foreign investments', speaker: 'CAMCE' },
            { ru: 'Законодательное закрепление принципа стабильности законодательства для инвестиционных и ГЧП-проектов', uz: "Investitsiya va DXŞ-loyihalar uçun qonunçilik barqarorligini qonuniy mustahkamlaş", en: 'Legislative consolidation of the principle of legislative stability for investment and PPP projects', speaker: 'Veolia' },
            { ru: 'Урегулирование учёта взносов в счёт эмиссионного дохода', uz: "Emissiya daromadi hisobiga badillarni hisobga olişni tartibga soliş", en: 'Regulation of accounting for share premium contributions', speaker: 'EY' },
            { ru: 'Установление обязательных сроков принятия подзаконных актов к законам об инвестициях', uz: "Investitsiyalar töğrisidagi qonunlarga normativ aktlarni qabul qilişning majburiy muddatlarini belgilaş", en: 'Establishment of mandatory deadlines for adopting secondary legislation to investment laws', speaker: 'Veolia' },
            { ru: 'Совершенствование механизма сопровождения реализации ГЧП-проектов', uz: "DXŞ-loyihalarini amalga oşirişni hamroh qiliş mexanizmini takomillaştiriş", en: 'Improvement of the mechanism for supporting the implementation of PPP projects', speaker: 'Veolia' },
            { ru: 'Оптимизация процедуры рассмотрения и подписания ГЧП-проектов', uz: "DXŞ-loyihalarini körib çiqiş va imzolaş tartibini optimizatsiya qiliş", en: 'Optimization of the procedure for reviewing and signing PPP projects', speaker: 'Veolia' },
            { ru: 'Формирование Межведомственного экспертного комитета по анализу экологических нормативов в градостроительстве', uz: "Şaharsozlikdagi ekologik normativlarni tahlil qiliş uçun Idoralararo ekspert komitetini taşkil etiş", en: 'Formation of an Interdepartmental Expert Committee for analyzing environmental standards in urban planning', speaker: 'IBC global / EY' },
            { ru: 'Рассмотреть возможность внедрение международных стандартов по зеленой инфраструктуре и зданиям', uz: "Yaşil infratuzilma va binolar böyiça xalqaro standartlarni joriy etiş imkoniyatini körib çiqiş", en: 'Consider the possibility of implementing international standards for green infrastructure and buildings', speaker: 'IBC global / EY' },
            { ru: 'Разработка и принятие постановления Президента «О переходных положениях применения УП-46»', uz: "«UP-46ni qöllaşning ötiş qoidalari töğrisida» Prezidentning qarorini işlab çiqiş va qabul qiliş", en: 'Development and adoption of the Presidential Decree «On transitional provisions for the application of PD-46»', speaker: 'IBC global / EY' },
        ],
    },
    {
        ru: 'КОРПОРАТИВНОЕ УПРАВЛЕНИЕ',
        uz: 'KORPORATIV BOŞQARUV',
        en: 'CORPORATE GOVERNANCE',
        items: [
            { ru: 'Подготовка новой редакции Кодекса корпоративного управления', uz: "Korporativ boşqaruv kodeksining yangi tahririni tayyorlaş", en: 'Preparation of a new edition of the Corporate Governance Code', speaker: 'Crowe / Enlawyer' },
            { ru: 'Установление минимального гендерного стандарта в советах директоров публичных компаний', uz: "Ommaviy kompaniyalar kuzatuv kengaşlarida minimal gender standartini belgilaş", en: 'Establishing a minimum gender standard on the boards of directors of public companies', speaker: 'Crowe' },
            { ru: 'Трансформация корпоративного управления в Государственных предприятиях и банках через внедрение RBC', uz: "Davlat korxonalari va banklarida RBC joriy etiş orqali korporativ boşqaruvni transformatsiya qiliş", en: 'Transformation of corporate governance in State Enterprises and banks through the introduction of RBC', speaker: 'Crowe' },
            { ru: 'Обеспечение удобства участия в общем собрании акционеров и реализации связанных прав акционеров', uz: "Aktsiyadorlarning umumiy yiğilişida iştirok etiş va tegişli aktsiyadorlik huquqlarini amalga oşiriş qulayligini ta'minlaş", en: 'Ensuring convenience of participation in the general meeting of shareholders and exercise of related shareholder rights', speaker: 'Crowe' },
            { ru: 'Создание полноценных работающих наблюдательных советов', uz: "Töliq qonli faol kuzatuv kengaşlarini yaratiş", en: 'Creation of fully functional supervisory boards', speaker: 'Crowe' },
            { ru: 'Обеспечение обязанности членов органов управления и контролирующих лиц акционерного общества действовать добросовестно и разумно в интересах акционерного общества', uz: "Aksiyadorlik jamiyatining boşqaruv organlari a'zolari va nazorat qiluvçi şaxslarning aksiyadorlik jamiyati manfaatlarida vijdonli va oqilona harakat qiliş majburiyatini ta'minlaş", en: 'Ensuring the obligation of management bodies and controlling persons of a joint-stock company to act in good faith and reasonably in the interests of the joint-stock company', speaker: 'Crowe' },
            { ru: 'Усиление регулирования сделок с аффилированными лицами и крупных сделок', uz: "Affillangan şaxslar bilan tuzilgan bitimlar va yirik bitimlarni tartibga solişni kuçaytiriş", en: 'Strengthening regulation of transactions with affiliated persons and major transactions', speaker: 'Enlawyer' },
            { ru: 'Защита акционеров от размытия их долей и прав', uz: "Aktsiyadorlarni ularning uluş va huquqlarini suyultirişdan himoya qiliş", en: 'Protection of shareholders from dilution of their stakes and rights', speaker: 'Crowe' },
            { ru: "Развитие регулирования корпоративных договоров (shareholders' agreements) в АО", uz: "Aksiyadorlik jamiyatlarida korporativ şartnomalar (shareholders' agreements) tartibga solinişini rivojlantiriş", en: "Development of regulation of corporate agreements (shareholders' agreements) in joint-stock companies", speaker: 'Enlawyer' },
            { ru: 'Совершенствование правил объявления лицом, приобретшим крупный пакет акций акционерного общества, предложения владельцам остальных акций продать ему акции', uz: "Aksiyadorlik jamiyatining yirik aksiyalar paketini sotib olgan şaxs tomonidan qolgan aksiyalar egalariga aksiyalarni sotiş taklifini e'lon qiliş qoidalarini takomillaştiriş", en: 'Improvement of the rules for announcing an offer to remaining shareholders to sell shares upon acquisition of a major stake', speaker: 'Crowe' },
            { ru: 'Продолжение повышения прозрачности акционерных обществ, акции которых публично обращаются', uz: "Aksiyalari ommaviy muomalada bölgan aksiyadorlik jamiyatlarining şaffofligini oşirişni davom ettiriş", en: 'Continuation of increasing transparency of joint-stock companies whose shares are publicly traded', speaker: 'Crowe' },
            { ru: 'Вопросы раскрытия информации и прозрачности в сфере устойчивого развития', uz: "Barqaror rivojlaniş sohasida ma'lumotlarni oşkor qiliş va şaffoflik masalalari", en: 'Issues of information disclosure and transparency in the field of sustainable development', speaker: 'EY / Crowe' },
            { ru: 'Обеспечение правоприменения, защищающего интересы миноритарных акционеров', uz: "Minoritar aktsiyadorlar manfaatlarini himoya qiluvçi huquqni qöllaşni ta'minlaş", en: 'Ensuring law enforcement that protects the interests of minority shareholders', speaker: 'Crowe' },
        ],
    },
    {
        ru: 'ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ И ЦИФРОВАЯ ЭКОНОМИКА',
        uz: "SUN'IY INTELLEKT VA RAQAMLI IQTISODIYOT",
        en: 'ARTIFICIAL INTELLIGENCE AND DIGITAL ECONOMY',
        items: [
            { ru: 'Разработка и принятие Закона РУз «Об искусственном интеллекте»', uz: "Özbekiston Respublikasining «Sun'iy intellekt töğrisida»gi Qonunini işlab çiqiş va qabul qiliş", en: 'Development and adoption of the Law of the Republic of Uzbekistan «On Artificial Intelligence»', speaker: 'Uzum' },
            { ru: 'Учреждение Межведомственной рабочей группы по ИИ в рамках Совета иностранных инвесторов', uz: "Xorijiy investorlar kengaşi doirasida SI böyiça Idoralararo işçi guruhini taşkil etiş", en: "Establishment of an Interdepartmental Working Group on AI within the Foreign Investors' Council", speaker: 'EY' },
            { ru: 'Разработка нормативно-правовой базы по обработке персональных данных граждан с применением ИИ', uz: "Fuqarolarning şaxsiy ma'lumotlarini SI yordamida qayta işlaş böyiça normativ-huquqiy bazani işlab çiqiş", en: "Development of a regulatory framework for processing citizens' personal data using AI", speaker: 'TBC / Uzum' },
            { ru: 'Цифровизация и развитие кадастровой системы для повышения доступности и точности земельных данных', uz: "Yer ma'lumotlarining mavjudligi va aniqligi uçun kadastr tizimini raqamlaştiriş va rivojlantiriş", en: 'Digitalization and development of the cadastral system to improve the availability and accuracy of land data', speaker: 'FAO / ADB' },
            { ru: 'Внедрение ИИ-системы цифровой верификации возраста покупателя в точках продаж возрастных товаров', uz: "Yoşi çeklangan tovarlar sotiş nuqtalarida xaridorning yoşini raqamli tekşirişning SI-tizimini joriy etiş", en: 'Introduction of an AI system for digital age verification of buyers at points of sale of age-restricted goods', speaker: 'BAT' },
            { ru: 'Создание правового механизма безопасного обмена данными внутри корпоративных групп', uz: "Korporativ guruhlar içida ma'lumotlarni xavfsiz almaşişning huquqiy mexanizmini yaratiş", en: 'Creation of a legal mechanism for secure data exchange within corporate groups', speaker: 'TBC' },
            { ru: 'Утверждение национальных этических принципов в области ИИ и создание Этического совета по ИИ', uz: "SI sohasida milliy etik tamoyillarni tasdiqlaş va SI böyiça Etik kengaşni taşkil etiş", en: 'Approval of national ethical principles in the field of AI and creation of an AI Ethics Council', speaker: 'Uzum' },
            { ru: 'Создание системы подготовки и переподготовки кадров в области ИИ', uz: "SI sohasida kadrlar tayyorlaş va qayta tayyorlaş tizimini yaratiş", en: 'Creation of a system for training and retraining personnel in the field of AI', speaker: 'Uzum' },
            { ru: 'Разработка нормативной базы для регуляторных «песочниц» (sandbox) в сфере ИИ', uz: "SI sohasida tartibga soluvçi «sandbox»lar uçun normativ bazani işlab çiqiş", en: 'Development of a regulatory framework for regulatory sandboxes in the field of AI', speaker: 'Uzum' },
            { ru: 'Внесение изменений в законодательство о государственных закупках для стимулирования внедрения ИИ-решений', uz: "SI-yeçimlarini joriy etişni rağbatlantiriş uçun davlat xaridlari töğrisidagi qonunçilikka özgartişlar kiritiş", en: 'Amendments to public procurement legislation to incentivize the implementation of AI solutions', speaker: 'Uzum' },
            { ru: 'Закрепление за маркетплейсами статуса информационного посредника и разграничение ответственности платформы и продавца', uz: "Marketpleyslar uçun axborot vositaçi maqomini belgilaş va platforma va sotuvçi mas'uliyatini çegaralaş", en: 'Assignment of the status of information intermediary to marketplaces and differentiation of platform and seller liability', speaker: 'Uzum' },
            { ru: 'Совершенствование антимонопольного регулирования операторов цифровых платформ', uz: "Raqamli platformalar operatorlarining monopoliyaga qarşi tartibga solinişini takomillaştiriş", en: 'Improvement of antitrust regulation of digital platform operators', speaker: 'Uzum' },
            { ru: 'Государственная программа развития логистической инфраструктуры для e-commerce', uz: "E-commerce uçun logistika infratuzilmasini rivojlantirişning davlat dasturi", en: 'State program for the development of logistics infrastructure for e-commerce', speaker: 'Uzum' },
            { ru: 'Усиление механизмов защиты прав потребителей в электронной коммерции', uz: "Elektron tijoratda iste'molçilar huquqlarini himoya qiliş mexanizmlarini kuçaytiriş", en: 'Strengthening mechanisms for protecting consumer rights in e-commerce', speaker: 'Uzum' },
            { ru: 'Формирование национальной открытой онлайн-образовательной платформы «Навыки будущего»', uz: "«Kelajak könikmalari» milliy oçiq onlayn ta'lim platformasini şakllantiriş", en: 'Formation of the national open online educational platform «Skills of the Future»', speaker: 'Yandex' },
            { ru: 'Разработка Барометра управленческих компетенций Узбекистана и дорожной карты трансформации управленческого образования', uz: "Özbekiston boşqaruv kompetensiyalari barometri va boşqaruv ta'limini transformatsiya qiliş yöl xaritasini işlab çiqiş", en: 'Development of the Uzbekistan Management Competencies Barometer and a roadmap for transforming management education', speaker: 'Yandex' },
            { ru: 'Программа «Цифровые навыки для e-commerce»: обучение населения и МСБ', uz: "«E-commerce uçun raqamli könikmalar» dasturi: aholiga va kiçik va örta biznesga öqitiş", en: 'Program «Digital Skills for e-commerce»: training of the population and SMEs', speaker: 'Uzum' },
            { ru: 'Формирование Национальной платформы управления большими данными и искусственным интеллектом', uz: "Katta ma'lumotlar va sun'iy intellektni boşqarişning Milliy platformasini şakllantiriş", en: 'Formation of the National Big Data and Artificial Intelligence Management Platform', speaker: 'EY' },
            { ru: 'Разработка платформы управления рисками в сфере гражданской защиты на основе ИИ', uz: "SI asosida fuqarolik himoyasi sohasida xatarlarni boşqariş platformasini işlab çiqiş", en: 'Development of an AI-based civil defense risk management platform', speaker: 'EY' },
            { ru: 'Создание единой цифровой платформы торговли и сертификации сельскохозяйственной продукции (AgriTrade Platform)', uz: "Qişloq xöjaligi mahsulotlarini savdo qiliş va sertifikatlaşning yagona raqamli platformasini (AgriTrade Platform) yaratiş", en: 'Creation of a unified digital platform for trade and certification of agricultural products (AgriTrade Platform)', speaker: 'EY / UBC' },
        ],
    },
    {
        ru: 'ЗЕМЕЛЬНЫЕ ВОПРОСЫ',
        uz: 'YER MASALALARI',
        en: 'LAND ISSUES',
        items: [
            { ru: 'Разработка единого НПА, устанавливающего комплексный порядок предоставления земельных участков инвесторам', uz: "Investorlarga yer uçastkalarini beriş kompleks tartibini belgilovçi yagona normativ-huquqiy hujjatni işlab çiqiş", en: 'Development of a single regulatory act establishing a comprehensive procedure for providing land plots to investors', speaker: 'Kosta Legal' },
            { ru: 'Введение обязательного дотендерного подтверждения осуществимости рекатегоризации земель', uz: "Yerlarni qayta tasniflaşning amalga oşirilişi imkoniyatini tender oldi majburiy tasdiqlaşini joriy etiş", en: 'Introduction of mandatory pre-tender confirmation of the feasibility of land recategorization', speaker: 'Kosta Legal' },
            { ru: 'Установление единого правового порядка подготовки и приобретения земельных участков', uz: "Yer uçastkalarini tayyorlaş va sotib olişning yagona huquqiy tartibini belgilaş", en: 'Establishment of a unified legal procedure for the preparation and acquisition of land plots', speaker: 'Kosta Legal / ACWA' },
            { ru: 'Закрепление права инвестора на финансирование расходов, связанных с подготовкой земельного участка', uz: "Investorning yer uçastkasini tayyorlaş bilan boğliq xarajatlarni moliyalaştiriş huquqini mustahkamlaş", en: "Consolidation of the investor's right to finance costs associated with the preparation of a land plot", speaker: 'Kosta Legal' },
            { ru: 'Установление правового режима судьбы объектов, возведённых арендатором на арендованном земельном участке', uz: "Ijaraçi tomonidan ijaraga olingan yer uçastkasida qurilgan ob'ektlarning qismati huquqiy rejimini belgilaş", en: 'Establishment of the legal regime for the fate of objects erected by a tenant on a leased land plot', speaker: 'Kosta Legal' },
            { ru: 'Введение упрощённого механизма предоставления инвестору временного доступа к земельному участку', uz: "Investorga yer uçastkasiga vaqtinçalik kirişning soddalaştirilgan mexanizmini joriy etiş", en: 'Introduction of a simplified mechanism for providing the investor with temporary access to a land plot', speaker: 'Kosta Legal' },
            { ru: 'Разграничение регистрации сделок с недвижимостью и регистрации прав на недвижимое имущество', uz: "Köçmas mulk bilan tuzilgan bitimlarni röyxatdan ötkaziş va köçmas mulk huquqlarini röyxatdan ötkazişni çegaralaş", en: 'Differentiation of registration of real estate transactions and registration of rights to real property', speaker: 'Kosta Legal' },
            { ru: 'Закрепление порядка преобразования права постоянного пользования в аренду для иностранных инвесторов', uz: "Xorijiy investorlar uçun doimiy foydalaniş huquqini ijaraga ötkaziş tartibini mustahkamlaş", en: 'Consolidation of the procedure for converting the right of permanent use into a lease for foreign investors', speaker: 'Kosta Legal' },
            { ru: 'Вовлечение негосударственных объединений фермеров в разработку земельной политики', uz: "Yer siyosatini işlab çiqişda nodavlat fermer birlaşmalarini jalb qiliş", en: "Involvement of non-governmental farmers' associations in the development of land policy", speaker: 'FAO / ADB' },
            { ru: 'Создание института земельного омбудсмена для защиты прав инвесторов', uz: "Investorlar huquqlarini himoya qiliş uçun yer ombudsmeni institutini yaratiş", en: "Creation of the institution of a land ombudsman to protect investors' rights", speaker: 'FAO / ADB' },
            { ru: 'Создание института апелляционных комиссий для досудебного урегулирования земельных споров', uz: "Yer nizolarini sudgaça tartibga soliş uçun apellyatsiya komissiyalari institutini yaratiş", en: 'Creation of the institution of appeal commissions for pre-trial settlement of land disputes', speaker: 'FAO / ADB' },
            { ru: 'Обеспечение доступа инвесторов к сельскохозяйственным земельным участкам', uz: "Investorlarning qişloq xöjaligi yer uçastkalariga kirişini ta'minlaş", en: "Ensuring investors' access to agricultural land plots", speaker: 'FAO / ADB' },
            { ru: 'Совершенствование механизмов доступа к сельскохозяйственным землям для реальных производителей', uz: "Haqiqiy işlab çiqaruvçilar uçun qişloq xöjaligi yerlariga kiriş mexanizmlarini takomillaştiriş", en: 'Improvement of mechanisms for access to agricultural land for actual producers', speaker: 'FAO / ADB' },
            { ru: 'Предотвращение чрезмерной фрагментации землепользования', uz: "Yerdan foydalanişning haddan ziyod parçalanişini oldini oliş", en: 'Prevention of excessive fragmentation of land use', speaker: 'FAO / ADB' },
            { ru: 'Предотвращение чрезмерной концентрации сельскохозяйственных земель', uz: "Qişloq xöjaligi yerlarining haddan ziyod töplanişini oldini oliş", en: 'Prevention of excessive concentration of agricultural land', speaker: 'FAO / ADB' },
            { ru: 'Совершенствование процедур оценки сельскохозяйственных земель', uz: "Qişloq xöjaligi yerlarini baholaş tartiblarini takomillaştiriş", en: 'Improvement of procedures for assessing agricultural land', speaker: 'FAO / ADB' },
            { ru: 'Совершенствование экологической и водной политики в сфере землепользования', uz: "Yerdan foydalaniş sohasidagi ekologik va suv siyosatini takomillaştiriş", en: 'Improvement of environmental and water policy in the field of land use', speaker: 'FAO / ADB' },
            { ru: 'Совершенствование гарантий и защиты прав землепользователей при прекращении прав на землю', uz: "Yer huquqlari bekor qilinganida yer foydalanuvçilarning kafolatlari va huquqlarini himoya qilişni takomillaştiriş", en: "Improvement of guarantees and protection of land users' rights upon termination of land rights", speaker: 'FAO / ADB' },
            { ru: 'Обеспечение доступа уязвимых категорий землепользователей к правосудию по земельным спорам', uz: "Zaif toifadagi yer foydalanuvçilarning yer nizolari böyiça adolatga murojaat qiliş imkoniyatini ta'minlaş", en: 'Ensuring access of vulnerable categories of land users to justice in land disputes', speaker: 'FAO / ADB' },
            { ru: 'Обеспечение равенства сторон в земельных спорах между арендаторами и государственными структурами', uz: "Ijaraçilar va davlat tuzilmalari örtasidagi yer nizolarida tomonlar tengligini ta'minlaş", en: 'Ensuring equality of parties in land disputes between tenants and state structures', speaker: 'FAO / ADB' },
            { ru: 'Обеспечение справедливой компенсации арендаторам при досрочном прекращении прав землепользования', uz: "Yer foydalaniş huquqlari muddatidan oldin bekor qilinganda ijaraçilarga adolatli kompensatsiya ta'minlaş", en: 'Ensuring fair compensation to tenants upon early termination of land use rights', speaker: 'FAO / ADB' },
            { ru: 'Развитие механизмов кредитования под залог прав пользования сельскохозяйственными землями', uz: "Qişloq xöjaligi yerlaridan foydalaniş huquqlari garovi ostida kreditlaş mexanizmlarini rivojlantiriş", en: 'Development of lending mechanisms secured by agricultural land use rights', speaker: 'FAO / ADB' },
        ],
    },
    {
        ru: 'АЛЬТЕРНАТИВНЫЕ ИНВЕСТИЦИИ',
        uz: 'MUQOBIL INVESTITSIYALAR',
        en: 'ALTERNATIVE INVESTMENTS',
        items: [
            { ru: 'Разработка дорожной карты по трансформации Узбекистана в региональный хаб PE/VC', uz: "Özbekistonni PE/VC mintaqaviy hubiga aylantiriş yöl xaritasini işlab çiqiş", en: 'Development of a roadmap for transforming Uzbekistan into a regional PE/VC hub', speaker: 'Vision Invest' },
            { ru: 'Введение специального регуляторного и налогового режима для альтернативных инвестиционных фондов (АИФ) и их инвесторов', uz: "Muqobil investitsiya fondlari (MIF) va ularning investorlari uçun maxsus tartibga soliş va soliq rejimini joriy etiş", en: 'Introduction of a special regulatory and tax regime for alternative investment funds (AIF) and their investors', speaker: 'Vision Invest' },
            { ru: 'Проведение ежегодного международного саммита по альтернативным инвестициям в Узбекистане', uz: "Özbekistonda muqobil investitsiyalar böyiça yillik xalqaro sammit ötkaziş", en: 'Holding an annual international summit on alternative investments in Uzbekistan', speaker: 'Vision Invest' },
            { ru: 'Развитие локальных управляющих компаний и инвестиционных фондов', uz: "Mahalliy boşqaruvçi kompaniyalar va investitsiya fondlarini rivojlantiriş", en: 'Development of local management companies and investment funds', speaker: 'Vision Invest' },
        ],
    },
    {
        ru: 'УСТОЙЧИВОЕ РАЗВИТИЕ',
        uz: 'BARQAROR RIVOJLANIŞ',
        en: 'SUSTAINABLE DEVELOPMENT',
        items: [
            { ru: 'Учреждение Межведомственной рабочей группы по вопросам циркулярной экономики и ежегодной специализированной премии по ESG в рамках Совета', uz: "Kengaş doirasida sirkular iqtisodiyot masalalari böyiça Idoralararo işçi guruhini taşkil etiş va ESG böyiça yillik ixtisoslaşgan mukofotni ta'sis etiş", en: 'Establishment of an Interdepartmental Working Group on circular economy issues and an annual specialized ESG award within the Council', speaker: 'Coca Cola' },
            { ru: 'Внедрение национального стандарта качества принятия решений (Tayanch Uzbekistan)', uz: "Qaror qabul qilişning milliy sifat standartini (Tayanç Uzbekistan) joriy etiş", en: 'Introduction of the national decision-making quality standard (Tayanch Uzbekistan)', speaker: 'Crowe' },
            { ru: 'Введение национальной системы оценки регулирующего воздействия (RIA) и обязательного последующего анализа (ex-post review)', uz: "Tartibga soluvçi ta'sirni baholaşning milliy tizimini (RIA) va majburiy keyingi tahlilni (ex-post review) joriy etiş", en: 'Introduction of the national regulatory impact assessment system (RIA) and mandatory ex-post review', speaker: 'Crowe' },
            { ru: 'Внедрение национальной системы Pre-Mortem и After-Action Review (AAR) для мегапроектов (RBC Strategic Review System)', uz: "Megaproyektlar uçun milliy Pre-Mortem va After-Action Review (AAR) tizimini (RBC Strategic Review System) joriy etiş", en: 'Introduction of the national Pre-Mortem and After-Action Review (AAR) system for mega-projects (RBC Strategic Review System)', speaker: 'Crowe' },
            { ru: 'Формирование национальной системы KPI, подотчётности и «архитектуры внимания» в контексте RBC (Uzbekistan–2030)', uz: "RBC kontekstida KPI, hisobdorlik va «e'tibor arxitekturasi»ning milliy tizimini şakllantiriş (Uzbekistan–2030)", en: 'Formation of the national KPI, accountability and «attention architecture» system in the context of RBC (Uzbekistan–2030)', speaker: 'Crowe' },
            { ru: 'Внедрение национального стандарта квалификации поставщиков на основе принципов RBC', uz: "RBC tamoyillari asosida etkazib beruvçilar malakasining milliy standartini joriy etiş", en: 'Introduction of the national supplier qualification standard based on RBC principles', speaker: 'Crowe' },
            { ru: 'Разработка национальной политики RBC и механизма рассмотрения жалоб (по модели NCP)', uz: "Milliy RBC siyosatini va şikoyatlarni körib çiqiş mexanizmini (NCP modeli böyiça) işlab çiqiş", en: 'Development of the national RBC policy and complaints review mechanism (based on the NCP model)', speaker: 'Crowe' },
            { ru: 'Создание национальной системы рассмотрения жалоб и разрешения споров по принципам RBC (RBC Grievance Mechanism)', uz: "RBC tamoyillari böyiça şikoyatlarni körib çiqiş va nizolarni hal etişning milliy tizimini yaratiş (RBC Grievance Mechanism)", en: 'Creation of a national system for reviewing complaints and resolving disputes on RBC principles (RBC Grievance Mechanism)', speaker: 'Crowe' },
            { ru: 'Введение единых стандартов раскрытия ESG-информации для компаний', uz: "Kompaniyalar uçun ESG-ma'lumotlarini oşkor qilişning yagona standartlarini joriy etiş", en: 'Introduction of uniform ESG information disclosure standards for companies', speaker: 'KPMG' },
            { ru: 'Установление критериев включения организаций в Реестр ответственного ведения бизнеса', uz: "Taşkilotlarni Mas'uliyatli biznes yuritiş Reestriga kiritiş mezonlarini belgilaş", en: 'Establishment of criteria for including organizations in the Register of Responsible Business Conduct', speaker: 'KPMG' },
            { ru: 'Введение требований к климатическому планированию и управлению климатическими рисками на уровне компаний', uz: "Kompaniya darajasida iqlimiy rejalaştiriş va iqlimiy xatarlarni boşqarişga talablarni joriy etiş", en: 'Introduction of requirements for climate planning and climate risk management at the company level', speaker: 'KPMG' },
            { ru: 'Создание правовой и институциональной базы для выпуска «зелёных сукук»', uz: "«Yaşil sukuk» çiqariş uçun huquqiy va institutsional bazani yaratiş", en: 'Creation of the legal and institutional framework for issuing «green sukuk»', speaker: 'EY / ISDB' },
            { ru: 'Разработка национальных стандартов маркировки и методологии «зелёных» кредитов', uz: "«Yaşil» kreditlarning milliy markalaş standartlari va metodologiyasini işlab çiqiş", en: 'Development of national labeling standards and methodology for «green» loans', speaker: 'EY' },
            { ru: 'Разработка мер пруденциального стимулирования зелёного и устойчивого кредитования', uz: "Yaşil va barqaror kreditlaşni prudentsial rağbatlantiriş çoralarini işlab çiqiş", en: 'Development of prudential incentive measures for green and sustainable lending', speaker: 'EY' },
            { ru: 'Разработка комплексного реестра зелёных и устойчивых проектов («Книга зелёных проектов»)', uz: "Yaşil va barqaror loyihalarning kompleks reestrini işlab çiqiş («Yaşil loyihalar kitobi»)", en: 'Development of a comprehensive register of green and sustainable projects («Green Projects Book»)', speaker: 'EY' },
            { ru: 'Разработка Национальной стратегии устойчивого финансирования Республики Узбекистан', uz: "Özbekiston Respublikasining Barqaror moliyalaştiriş Milliy strategiyasini işlab çiqiş", en: 'Development of the National Sustainable Finance Strategy of the Republic of Uzbekistan', speaker: 'EY' },
            { ru: 'Развитие ESG-рейтингования государственных предприятий и публичных эмитентов у глобальных агентств', uz: "Global agentliklarda davlat korxonalari va ommaviy emitentlarning ESG-reytingini rivojlantiriş", en: 'Development of ESG ratings of state enterprises and public issuers at global agencies', speaker: 'EY' },
            { ru: 'Модернизация экологических и социальных стандартов в энергетике с учётом международного опыта', uz: "Xalqaro tajribani hisobga olib energetikadagi ekologik va ijtimoiy standartlarni modernizatsiya qiliş", en: 'Modernization of environmental and social standards in the energy sector taking into account international experience', speaker: 'Acwa' },
            { ru: 'Предоставление инвестору прав собственности на экологические атрибуты (environmental attributes)', uz: "Investorga ekologik atributlar (environmental attributes) böyiça mulk huquqlarini beriş", en: 'Granting the investor ownership rights to environmental attributes', speaker: 'Voltalia' },
        ],
    },
]
