<template>
    <div class="secretariat-page">
        <!-- Mission -->
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <h2 class="section-title mb-8">{{ $t('secretariatPage.title') }}</h2>
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-4xl mb-5">
                    {{ $t('secretariatPage.missionText') }}
                </p>
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-4xl">
                    {{ $t('secretariatPage.legalText') }}
                </p>
            </div>
        </section>

        <!-- Team -->
        <section ref="teamEl" class="bg-[#f7f8fa] py-16 md:py-24">
            <div class="page-container">
                <h2
                    class="section-title text-center mb-14"
                    :class="teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
                    style="transition: all 0.7s"
                >
                    {{ $t('secretariatPage.teamTitle') }}
                </h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
                    <div
                        v-for="(member, i) in teamMembers"
                        :key="i"
                        class="group flex bg-white rounded-3xl border border-[#eef0f4] shadow-[0_2px_20px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-400"
                        :class="teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                        :style="{ transition: 'all 0.5s', transitionDelay: teamVisible ? `${i * 80}ms` : '0ms' }"
                    >
                        <!-- Photo (left panel) -->
                        <div
                            class="relative shrink-0 overflow-hidden bg-[#e9ebf0] w-[38%] min-h-[240px] sm:w-[42%] sm:min-h-[300px]"
                        >
                            <img
                                :src="member.photo"
                                :alt="member.name"
                                class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                @error="(e) => ((e.target as HTMLImageElement).src = defaultPhoto)"
                            />
                        </div>

                        <!-- Info -->
                        <div class="flex-1 p-6 md:p-8 flex flex-col justify-center gap-5">
                            <div>
                                <p class="text-[11px] font-bold uppercase tracking-widest text-[#8a94a6] mb-2">{{ member.role }}</p>
                                <h3 class="font-black text-[clamp(18px,1.8vw,26px)] text-[#1a1e2e] uppercase leading-[1.15]">{{ member.name }}</h3>
                            </div>

                            <div class="flex flex-col gap-3">
                                <a
                                    :href="`tel:${member.phone.replace(/\s/g, '')}`"
                                    class="inline-flex items-center gap-3 text-[14px] text-[#505a63] hover:text-[#1a1e2e] transition-colors w-fit"
                                >
                                    <span class="w-10 h-10 rounded-full bg-[#f2f3f6] flex items-center justify-center shrink-0">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1e2e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                            <path
                                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.79h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                                            />
                                        </svg>
                                    </span>
                                    {{ member.phone }}
                                </a>
                                <a
                                    :href="`mailto:${member.email}`"
                                    class="inline-flex items-center gap-3 text-[14px] text-[#505a63] hover:text-[#1a1e2e] transition-colors w-fit"
                                >
                                    <span class="w-10 h-10 rounded-full bg-[#f2f3f6] flex items-center justify-center shrink-0">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1e2e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <path d="M22 6l-10 7L2 6" />
                                        </svg>
                                    </span>
                                    {{ member.email }}
                                </a>
                            </div>

                            <button
                                type="button"
                                @click="activeMember = member"
                                class="mt-1 self-start inline-flex items-center gap-2 bg-[#f2f3f6] text-[#1a1e2e] font-semibold text-[15px] px-7 py-3 rounded-full hover:bg-[#1a1e2e] hover:text-white transition-all duration-200"
                            >
                                {{ $t('management.biography') }}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Biography modal -->
        <Transition name="bio-modal">
            <div
                v-if="activeMember"
                class="fixed inset-0 z-[100] flex items-center justify-center p-4"
                @click.self="activeMember = null"
            >
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="activeMember = null"></div>

                <!-- Card -->
                <div class="bio-card relative w-full max-w-[720px] bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.3)] overflow-hidden">
                    <!-- Close -->
                    <button
                        type="button"
                        @click="activeMember = null"
                        class="absolute top-6 right-6 w-11 h-11 rounded-full bg-[#f2f3f6] hover:bg-[#e5e7eb] flex items-center justify-center transition-colors"
                        aria-label="Close"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1e2e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>

                    <!-- Header -->
                    <div class="flex items-center gap-5 p-6 md:p-8 pr-16">
                        <div class="w-[90px] h-[90px] rounded-2xl overflow-hidden bg-[#eef0f4] shrink-0">
                            <img
                                :src="activeMember.photo"
                                :alt="activeMember.name"
                                class="w-full h-full object-cover object-top"
                                @error="(e) => ((e.target as HTMLImageElement).src = defaultPhoto)"
                            />
                        </div>
                        <div class="min-w-0">
                            <p class="text-[12px] font-bold uppercase tracking-widest text-[#8a94a6] mb-1.5">{{ activeMember.role }}</p>
                            <h3 class="font-black text-[clamp(20px,2.4vw,32px)] text-[#1a1e2e] uppercase leading-tight">{{ activeMember.name }}</h3>
                        </div>
                    </div>

                    <!-- Divider -->
                    <div class="border-t border-[#eef0f4]"></div>

                    <!-- Body -->
                    <div class="p-6 md:p-8">
                        <p class="text-[11px] font-bold uppercase tracking-widest text-[#8a94a6] mb-4">
                            {{ $t('management.biography') }}
                        </p>
                        <p class="text-[clamp(15px,1.2vw,17px)] text-[#444] leading-relaxed whitespace-pre-line">{{ resolveBio(activeMember.bio) }}</p>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import defaultPhoto from '@/assets/images/avatars/default-avatar.svg'
import photoAziz from '@/assets/images/exports/aziz2.png'
import photoAvazbek from '@/assets/images/exports/Avazbek.jpg'
import photoHakimniyaz from '@/assets/images/exports/Hakimniyaz.png'
import photoVladislav from '@/assets/images/exports/Vladislav.png'
import photoJorabek from '@/assets/images/exports/jorabek.png'
import photoMadina from '@/assets/images/exports/Madina1.png'

const { t, locale } = useI18n()

type BioLocale = 'uz' | 'ru' | 'en'

const PHONE = '+998 88 099 88 88'

interface TeamMember {
    name: string
    role: string
    photo: string
    phone: string
    email: string
    bio: Record<BioLocale, string>
}

const teamMembers: TeamMember[] = [
    {
        name: 'Aziz Gafurov',
        role: t('secretariatPage.roles.head'),
        photo: photoAziz,
        phone: PHONE,
        email: 'head@fics.uz',
        bio: {
            uz: `Korporativ boshqaruv, risklar menejmenti, investitsion maslahat va davlat-xususiy sektor hamkorligi sohasida 20 yildan ortiq tajribaga ega yuqori darajali rahbar. Murakkab tashkilotlarni o'zgartirishdan o'tkazish, mustahkam korporativ boshqaruv tizimlarini qurish hamda moliya, energetika va infratuzilma sohalarida strategik o'zgarishlarni amalga oshirishda isbotlangan natijalar mavjud. Investorlar, regulyatorlar va xalqaro institutlar bilan yuqori darajadagi muloqot tajribasiga ega. Iqtisodiyot fanlari doktori (PhD).`,
            ru: `Руководитель высшего звена с более чем 20-летним опытом в корпоративном управлении, управлении рисками, инвестиционном консультировании и взаимодействии государственного и частного секторов. Подтверждённый опыт проведения сложных организаций через трансформацию, выстраивания надёжных систем корпоративного управления и реализации стратегических преобразований в сферах финансов, энергетики и инфраструктуры. Опыт взаимодействия на высоком уровне с инвесторами, регуляторами и международными институтами. Доктор философии (PhD) по экономическим наукам.`,
            en: `Executive-level professional with 20+ years of experience across corporate leadership, risk management, investment advisory, and public-private sector collaboration. Proven track record in steering complex organizations through transformation, establishing robust governance frameworks, and delivering strategic transformation across finance, energy, and infrastructure sectors. Experienced in high-level stakeholder engagement, including investors, regulators, and international institutions. Holds a Ph.D. in Economic Sciences.`,
        },
    },
    {
        name: 'Avazbek Mullajonov',
        role: t('secretariatPage.roles.coordinator'),
        photo: photoAvazbek,
        phone: PHONE,
        email: 'coord1@fics.uz',
        bio: {
            uz: `Investitsion muhitni rivojlantirish, xususiy-davlat hamkorligi va iqtisodiy siyosat sohasida 15 yildan ortiq tajribaga ega mutaxassis. To'g'ridan-to'g'ri xorijiy investitsiyalarni jalb etish, investitsion va KXH loyihalarini tuzish, investitsion muhit islohotlarini ilgari surish — jumladan, investor-davlat muloqoti platformasini yaratishda poydevor ishlarni olib borish sohasida isbotlangan natijalar mavjud. Xalqaro moliya institutlari, davlat organlari va xususiy investorlar bilan o'zaro aloqada ishlash tajribasiga ega.`,
            ru: `Специалист по инвестиционному климату с более чем 15-летним опытом в привлечении инвестиций, государственно-частном взаимодействии и экономической политике. Подтверждённый опыт привлечения прямых иностранных инвестиций, структурирования инвестиционных проектов и проектов ГЧП, продвижения реформ инвестиционного климата — включая работу у истоков платформы диалога инвесторов и государства. Опыт взаимодействия с международными финансовыми институтами, государственными органами и частными инвесторами.`,
            en: `Investment-climate specialist with 15+ years of experience across investment promotion, public-private collaboration, and economic policy. Proven track record in attracting foreign direct investment, structuring investment and PPP projects, and advancing investment-climate reforms — including foundational work on the platform for investor–government dialogue. Experienced in engagement with international financial institutions, government bodies, and private investors.`,
        },
    },
    {
        name: 'Hakimniyaz Kaipbergenov',
        role: t('secretariatPage.roles.coordinator'),
        photo: photoHakimniyaz,
        phone: PHONE,
        email: 'coord2@fics.uz',
        bio: {
            uz: `Investitsiyalar, savdo va JTT ga qo'shilish masalalarida ixtisoslashgan xalqaro huquqshunos. Xalqaro huquq bo'yicha akademik yutuqlari bilan mustahkamlangan huquqiy va tahliliy qo'llab-quvvatlash, shartnoma-huquqiy ish va chegaralararo huquqiy jarayonlar sohasida isbotlangan natijalar mavjud. Davlat organlari, diplomatik missiyalar va xalqaro yuridik firmalar bilan ishlash tajribasiga ega.`,
            ru: `Юрист-международник, специализирующийся на вопросах инвестиций, торговли и вступления в ВТО. Подтверждённый опыт правовой и аналитической поддержки, договорно-правовой работы и трансграничных юридических процессов, подкреплённый отличными академическими результатами в области международного права. Опыт взаимодействия с государственными органами, дипломатическими миссиями и международными юридическими фирмами.`,
            en: `International law professional specializing in investment, trade, and WTO-accession matters. Proven track record in legal and analytical support, treaty work, and cross-border legal processes, underpinned by academic distinction in international law. Experienced in engagement with government bodies, diplomatic missions, and international law firms.`,
        },
    },
    {
        name: 'Vladislav Li',
        role: t('secretariatPage.roles.coordinator'),
        photo: photoVladislav,
        phone: PHONE,
        email: 'coord3@fics.uz',
        bio: {
            uz: `Kengash dasturlari koordinatsiyasini va Kotibiyatning kundalik faoliyatini ta'minlovchi biznes va moliya sohasidagi mutaxassis. Ishtirokchilar bilan muloqot, muzokaralar va kommunikatsiya ko'nikmalariga ega bo'lib, sotuv, logistika va ta'lim sohalarida amaliy tajribaga ega. Rus, ingliz va o'zbek tillarini mukammal biladi.`,
            ru: `Специалист в области бизнеса и финансов, обеспечивающий координацию программ Совета и текущую операционную деятельность Секретариата. Развитые навыки взаимодействия с участниками, ведения переговоров и коммуникации; практический опыт в продажах, логистике и образовании. Свободно владеет русским, английским и узбекским языками.`,
            en: `Business and finance professional supporting the coordination of Council programs and day-to-day operations of the Secretariat. Skilled in stakeholder engagement, negotiation, and communication, with hands-on experience across sales, logistics, and education. Fluent in Russian, English, and Uzbek.`,
        },
    },
    {
        name: 'Jurabek Babaev',
        role: t('secretariatPage.roles.pr'),
        photo: photoJorabek,
        phone: PHONE,
        email: 'pr@fics.uz',
        bio: {
            uz: `Jamoatchilik bilan aloqalar, raqamli marketing va xizmatlar sohalarida tajribaga ega kommunikatsiyalar mutaxassisi. Xalqaro ta'lim va boshqaruv sohasidagi akademik tayyorgarlik bilan mustahkamlangan brend rivojlantirish, media bilan o'zaro aloqa va raqamli ilgari surish sohasida isbotlangan natijalar mavjud. Jamoatchilik bilan muloqot va manfaatdor tomonlar bilan kommunikatsiya tajribasiga ega.`,
            ru: `Специалист в области коммуникаций с опытом в связях с общественностью, цифровом маркетинге и сфере услуг. Подтверждённый опыт в развитии бренда, медийном взаимодействии и цифровом продвижении, подкреплённый международным образованием и академической подготовкой в области управления. Опыт публичного взаимодействия и коммуникации с заинтересованными сторонами.`,
            en: `Communications professional with experience across public relations, digital marketing, and the services sector. Proven track record in brand development, media engagement, and digital promotion, supported by an international education and an academic background in management. Experienced in public engagement and stakeholder communication.`,
        },
    },
    {
        name: 'Madinakhon Abidova',
        role: t('secretariatPage.roles.admin'),
        photo: photoMadina,
        phone: PHONE,
        email: 'admin@fics.uz',
        bio: {
            uz: `Tadbirlar, loyihalar va ishtirokchilar bilan o'zaro aloqalarni qo'llab-quvvatlash bo'yicha 7 yildan ortiq tajribaga ega ma'muriy va koordinatsion mutaxassis. Milliy va xalqaro tadbirlarni tashkil etish hamda YeI va USAID tomonidan moliyalashtiriladigan rivojlanish dasturlarini muvofiqlashtirish sohasida isbotlangan natijalar mavjud. Madaniyatlararo kommunikatsiya, hujjat aylanishi va ko'p tomonlama hamkorlik tajribasiga ega.`,
            ru: `Специалист по административной работе и координации с более чем 7-летним опытом сопровождения мероприятий, проектов и взаимодействия с участниками. Подтверждённый опыт организации национальных и международных мероприятий и координации программ развития, финансируемых ЕС и USAID. Опыт межкультурной коммуникации, документооборота и многостороннего взаимодействия.`,
            en: `Administrative and coordination professional with 7+ years of experience supporting events, projects, and stakeholder engagement. Proven track record in organizing national and international events and coordinating EU- and USAID-funded development programs. Experienced in cross-cultural communication, documentation, and multi-stakeholder collaboration.`,
        },
    },
]

const activeMember = ref<TeamMember | null>(null)

function resolveBio(bio: Record<BioLocale, string>) {
    return bio[locale.value as BioLocale] ?? bio.ru
}

function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') activeMember.value = null
}

const teamEl = ref<HTMLElement | null>(null)
const teamVisible = ref(false)
let observer: IntersectionObserver | null = null

const getScrollParent = (el: HTMLElement): Element => {
    let parent = el.parentElement
    while (parent && parent !== document.documentElement) {
        const { overflowY } = window.getComputedStyle(parent)
        if (overflowY === 'auto' || overflowY === 'scroll') return parent
        parent = parent.parentElement
    }
    return document.documentElement
}

onMounted(() => {
    window.addEventListener('keydown', onKeydown)
    if (!teamEl.value) return
    const root = getScrollParent(teamEl.value)
    observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                teamVisible.value = true
                observer?.disconnect()
            }
        },
        { root, threshold: 0.1 }
    )
    observer.observe(teamEl.value)
})

onUnmounted(() => {
    observer?.disconnect()
    window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.bio-modal-enter-active,
.bio-modal-leave-active {
    transition: opacity 0.25s ease;
}
.bio-modal-enter-from,
.bio-modal-leave-to {
    opacity: 0;
}
.bio-modal-enter-active .bio-card,
.bio-modal-leave-active .bio-card {
    transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s ease;
}
.bio-modal-enter-from .bio-card,
.bio-modal-leave-to .bio-card {
    transform: translateY(16px) scale(0.97);
    opacity: 0;
}
</style>
