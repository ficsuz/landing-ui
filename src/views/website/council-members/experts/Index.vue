<template>
    <div class="experts-page">
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <!-- Intro -->
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-3xl mb-10">
                    {{ $t('expertsPage.intro') }}
                </p>

                <!-- Tab selector cards -->
                <div class="flex flex-col gap-3 mb-12">
                    <button
                        v-for="tab in tabs"
                        :key="tab.key"
                        class="group w-full flex items-center justify-between gap-6 rounded-2xl border px-7 py-6 text-left transition-all duration-300 cursor-pointer"
                        :class="
                            activeTab === tab.key
                                ? 'bg-[#1a1e2e] border-[#1a1e2e] shadow-[0_4px_24px_rgba(26,30,46,0.18)]'
                                : 'bg-[#f7f8fa] border-[#eef0f4] hover:border-[#c8cdd8] hover:bg-[#f0f2f5]'
                        "
                        @click="switchTab(tab.key)"
                    >
                        <div class="flex-1 min-w-0">
                            <h3
                                class="font-black text-[15px] md:text-[17px] uppercase tracking-wide mb-1.5"
                                :class="activeTab === tab.key ? 'text-white' : 'text-[#1a1e2e]'"
                            >
                                {{ tab.title }}
                            </h3>
                            <p
                                class="text-[13px] md:text-[14px] leading-relaxed"
                                :class="activeTab === tab.key ? 'text-white/70' : 'text-[#8a94a6]'"
                            >
                                {{ tab.desc }}
                            </p>
                        </div>
                        <span
                            class="font-black text-[52px] md:text-[64px] leading-none tabular-nums shrink-0 transition-colors duration-300"
                            :class="activeTab === tab.key ? 'text-white' : 'text-[#1a1e2e]/10 group-hover:text-[#1a1e2e]/20'"
                        >
                            {{ tab.count }}
                        </span>
                    </button>
                </div>

                <!-- Expert cards -->
                <div ref="gridEl" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <TransitionGroup name="expert-card">
                        <div
                            v-for="(expert, i) in activeExperts"
                            :key="expert.name"
                            class="group flex bg-white rounded-2xl border border-[#eef0f4] shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300"
                            :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                            :style="{ transitionDelay: visible ? `${i * 40}ms` : '0ms' }"
                        >
                            <!-- Photo -->
                            <div class="w-[130px] md:w-[170px] shrink-0 overflow-hidden bg-[#f0f2f5]">
                                <img
                                    :src="expert.photo"
                                    :alt="expert.name"
                                    class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                    @error="(e) => ((e.target as HTMLImageElement).src = defaultAvatar)"
                                />
                            </div>

                            <!-- Info -->
                            <div class="flex flex-col justify-center p-5 md:p-6 gap-1.5 min-w-0">
                                <p class="text-[12px] md:text-[13px] text-[#8a94a6] font-medium leading-snug">
                                    {{ expert.role }}
                                </p>
                                <h3 class="font-black text-[14px] md:text-[16px] text-[#1a1e2e] uppercase leading-tight tracking-wide">
                                    {{ expert.name }}
                                </h3>
                                <p v-if="expert.bio" class="text-[13px] md:text-[14px] text-[#505a63] leading-relaxed mt-1 line-clamp-4">
                                    {{ expert.bio }}
                                </p>
                            </div>
                        </div>
                    </TransitionGroup>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import defaultAvatar from '@/assets/images/avatars/default.png'
import avatar1 from '@/assets/images/avatars/image.png'
import avatar2 from '@/assets/images/avatars/image11.png'
import avatar3 from '@/assets/images/avatars/image12.png'
import avatar4 from '@/assets/images/avatars/olivia.png'

const { t } = useI18n()

type TabKey = 'international' | 'local'

interface Expert {
    name: string
    role: string
    bio: string
    photo: string
}

const internationalExperts: Expert[] = [
    {
        name: 'Alena Dolgova',
        role: 'International Advisory Group on the Creation of an International Financial Centre in Tashkent, Head of the Group',
        bio: 'An expert in international financial centers and investment policy who leads the development of strategies and regulatory frameworks for the establishment of an international financial hub in Tashkent.',
        photo: avatar2,
    },
    {
        name: 'Natalia Kuzmina',
        role: 'Chief Executive Officer, Solward',
        bio: 'Natalia Kuzmina is a legal expert with more than 30 years of professional experience. Her work covers corporate and personal tax law, mergers and acquisitions (M&A), business restructuring, and investment structuring.',
        photo: avatar3,
    },
    {
        name: 'Dr. Alexander Koch',
        role: 'Senior Economist, European Bank for Reconstruction and Development',
        bio: 'Provides macroeconomic analysis and policy recommendations for transition economies, with a focus on private sector development and investment climate reforms across Central Asia.',
        photo: defaultAvatar,
    },
    {
        name: 'Sarah Mitchell',
        role: 'Senior Legal Advisor, White & Case LLP',
        bio: 'Specializes in cross-border transactions, investment arbitration and regulatory compliance, advising international clients on market entry strategies and legal risk management in emerging markets.',
        photo: avatar1,
    },
    {
        name: 'Prof. Timur Rashidov',
        role: 'Energy Policy Expert, International Energy Agency',
        bio: 'Leads research on energy transition strategies for Central Asian economies, including renewable energy integration, energy security, and the alignment of national energy policies with international standards.',
        photo: defaultAvatar,
    },
    {
        name: 'James Harrington',
        role: 'Digital Economy Consultant, World Bank Group',
        bio: 'Advises governments on digital transformation agendas, fintech regulation, and the development of e-government platforms, drawing on experience across more than 20 emerging market countries.',
        photo: defaultAvatar,
    },
    {
        name: 'Dr. Elena Werner',
        role: 'Agricultural Development Expert, Food and Agriculture Organization',
        bio: 'Focuses on agri-food value chain development, rural investment facilitation, and the implementation of sustainable agricultural practices that attract international private investment.',
        photo: avatar4,
    },
    {
        name: 'Michael Bauer',
        role: 'Infrastructure & Logistics Advisor, Asian Development Bank',
        bio: 'Specializes in transport corridor development and multimodal logistics solutions for landlocked economies, with extensive project management experience in Central and South Asia.',
        photo: defaultAvatar,
    },
    {
        name: 'David Park',
        role: 'Trade Law Expert, International Finance Corporation',
        bio: 'Advises on trade facilitation reforms, customs modernization, and WTO compliance, helping governments reduce trade barriers and improve the ease of cross-border business operations.',
        photo: defaultAvatar,
    },
    {
        name: 'Dr. Omar Al-Rashid',
        role: 'Renewable Energy Expert, International Renewable Energy Agency',
        bio: 'Supports national renewable energy target-setting and project pipeline development, with expertise in solar and wind project structuring, offtake agreements, and green finance mechanisms.',
        photo: defaultAvatar,
    },
]

const localExperts: Expert[] = [
    {
        name: 'Aziz Karimov',
        role: 'Senior Partner, Karimov & Partners Law Firm',
        bio: 'One of Uzbekistan\'s leading corporate lawyers with extensive experience advising foreign investors on regulatory compliance, joint ventures, and dispute resolution under Uzbek law.',
        photo: avatar1,
    },
    {
        name: 'Dilnoza Yusupova',
        role: 'Head of Analytics, National Agency for Project Management',
        bio: 'Leads strategic investment project evaluation and monitoring, coordinating between government agencies and international investors to ensure timely implementation of priority projects.',
        photo: avatar4,
    },
    {
        name: 'Rustam Nazarov',
        role: 'Independent Financial Analyst & Former Deputy Minister of Finance',
        bio: 'Brings deep expertise in public finance, budgetary reform, and sovereign debt management, having shaped fiscal policy at the highest levels of the Uzbek government for over a decade.',
        photo: defaultAvatar,
    },
    {
        name: 'Shahlo Mirzaeva',
        role: 'Director of Investment Climate Research, Institute of Economics',
        bio: 'Conducts applied research on foreign direct investment trends, business environment reforms, and the competitiveness of Uzbekistan as an investment destination within the Central Asian region.',
        photo: avatar2,
    },
    {
        name: 'Bobur Tursunov',
        role: 'Head of Legal Department, Uzpromstroybank',
        bio: 'Specializes in banking law, project finance structuring, and collateral regulation, providing legal support for large-scale infrastructure and industrial investment transactions.',
        photo: defaultAvatar,
    },
    {
        name: 'Gulnora Raximova',
        role: 'Corporate Governance Consultant, CFA Institute Member',
        bio: 'Advises state-owned enterprises and private companies on governance best practices, board effectiveness, and alignment with international ESG standards and reporting frameworks.',
        photo: avatar3,
    },
    {
        name: 'Jasur Abdullaev',
        role: 'Tax Policy Advisor, PwC Uzbekistan',
        bio: 'Provides strategic tax planning and transfer pricing advice to multinational corporations operating in Uzbekistan, specializing in tax treaty interpretation and investment incentive schemes.',
        photo: defaultAvatar,
    },
    {
        name: 'Nargiza Xolmatova',
        role: 'Capital Markets Specialist, Tashkent Stock Exchange',
        bio: 'Drives the development of equity and debt capital markets in Uzbekistan, working on regulatory reforms to deepen market liquidity and attract domestic and international institutional investors.',
        photo: defaultAvatar,
    },
    {
        name: 'Sanjar Eshmatov',
        role: 'Digital Transformation Expert, Ministry of Digital Technologies',
        bio: 'Leads national programs on digital economy development, e-government service delivery, and the regulatory framework for emerging technologies including AI and blockchain.',
        photo: defaultAvatar,
    },
    {
        name: 'Iroda Toshqo\'lova',
        role: 'Agribusiness Investment Specialist, Uzbek-German Chamber of Commerce',
        bio: 'Facilitates agricultural investment partnerships between Uzbek enterprises and European agribusiness companies, focusing on food processing, horticulture, and sustainable farming technology.',
        photo: defaultAvatar,
    },
    {
        name: 'Firdavs Umarov',
        role: 'Energy Sector Consultant, Uzbekenergo',
        bio: 'Specializes in power sector reform, tariff regulation, and the structuring of public-private partnerships for electricity generation and distribution infrastructure projects.',
        photo: defaultAvatar,
    },
    {
        name: 'Malohat Kalandarova',
        role: 'Environmental Law Expert, National University of Uzbekistan',
        bio: 'Conducts research and advises on environmental regulation, green investment frameworks, and climate policy, helping align Uzbekistan\'s legislative environment with international sustainability standards.',
        photo: defaultAvatar,
    },
    {
        name: 'Ulugbek Norqo\'ziev',
        role: 'Logistics & Trade Facilitation Expert, TRACECA Secretariat',
        bio: 'Focuses on the development of international transport corridors through Central Asia, advising on trade facilitation measures, border infrastructure, and multimodal freight solutions.',
        photo: defaultAvatar,
    },
    {
        name: 'Zulfiya Ahmedova',
        role: 'Financial Inclusion Specialist, Central Bank of Uzbekistan',
        bio: 'Works on expanding access to financial services, developing microfinance regulatory frameworks, and promoting digital payment ecosystems to support small business growth and investment.',
        photo: defaultAvatar,
    },
    {
        name: 'Mirzo Hamidov',
        role: 'Industrial Policy Advisor, Ministry of Investments, Industry and Trade',
        bio: 'Shapes industrial development strategy, special economic zone policy, and sector-specific investment incentive programs to attract and retain foreign manufacturing investment.',
        photo: defaultAvatar,
    },
]

const activeTab = ref<TabKey>('international')

const tabs = computed(() => [
    {
        key: 'international' as TabKey,
        title: t('expertsPage.internationalTitle'),
        desc: t('expertsPage.internationalDesc'),
        count: internationalExperts.length,
    },
    {
        key: 'local' as TabKey,
        title: t('expertsPage.localTitle'),
        desc: t('expertsPage.localDesc'),
        count: localExperts.length,
    },
])

const activeExperts = computed(() =>
    activeTab.value === 'international' ? internationalExperts : localExperts,
)

const switchTab = (key: TabKey) => {
    activeTab.value = key
}

const gridEl = ref<HTMLElement | null>(null)
const visible = ref(false)
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
    if (!gridEl.value) return
    const root = getScrollParent(gridEl.value)
    observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                visible.value = true
                observer?.disconnect()
            }
        },
        { root, threshold: 0.05 },
    )
    observer.observe(gridEl.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.expert-card-enter-active,
.expert-card-leave-active {
    transition: all 0.3s ease;
}
.expert-card-enter-from {
    opacity: 0;
    transform: translateY(16px);
}
.expert-card-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
