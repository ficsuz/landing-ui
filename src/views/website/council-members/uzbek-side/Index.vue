<template>
    <div class="uzbek-side-page">
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed max-w-3xl mb-14">
                    {{ $t('uzbekSidePage.intro') }}
                </p>

                <div ref="gridEl" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div
                        v-for="(member, i) in members"
                        :key="i"
                        class="group flex bg-white rounded-2xl border border-[#eef0f4] shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300"
                        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                        :style="{ transitionDelay: visible ? `${i * 50}ms` : '0ms' }"
                    >
                        <!-- Photo -->
                        <div class="w-[140px] md:w-[180px] shrink-0 overflow-hidden bg-[#f0f2f5]">
                            <img
                                :src="member.photo"
                                :alt="member.name"
                                class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                @error="(e) => ((e.target as HTMLImageElement).src = defaultAvatar)"
                            />
                        </div>

                        <!-- Info -->
                        <div class="flex flex-col justify-center p-5 md:p-6 gap-1.5 min-w-0">
                            <p class="text-[12px] md:text-[13px] text-[#8a94a6] font-medium leading-snug">
                                {{ member.role }}
                            </p>
                            <h3 class="font-black text-[15px] md:text-[17px] text-[#1a1e2e] uppercase leading-tight tracking-wide">
                                {{ member.name }}
                            </h3>
                            <p v-if="member.bio" class="text-[13px] md:text-[14px] text-[#505a63] leading-relaxed mt-1 line-clamp-4">
                                {{ member.bio }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import defaultAvatar from '@/assets/images/avatars/default.png'
import avatar1 from '@/assets/images/avatars/image.png'
import avatar2 from '@/assets/images/avatars/image11.png'
import avatar3 from '@/assets/images/avatars/image12.png'
import avatar4 from '@/assets/images/avatars/olivia.png'

interface Member {
    name: string
    role: string
    bio: string
    photo: string
}

const members: Member[] = [
    {
        name: 'Jamshid Khodjaev',
        role: 'Deputy Prime Minister of the Republic of Uzbekistan',
        bio: 'Jamshid Khodjaev is the Deputy Prime Minister of Uzbekistan overseeing investment, industry, and trade. He has extensive experience in public service and plays a key role in implementing strategic economic projects and improving the investment climate.',
        photo: avatar1,
    },
    {
        name: 'Jamshid Kuchkarov',
        role: 'Deputy Prime Minister of the Republic of Uzbekistan — Minister of Economy and Finance',
        bio: 'Jamshid Kuchkarov is the Deputy Prime Minister and Minister of Economy and Finance of Uzbekistan. He is an experienced economist with many years of public service, having previously held key senior positions at the Central Bank and the Ministry of Finance.',
        photo: avatar2,
    },
    {
        name: 'D.O. Qodirov',
        role: 'Deputy Prime Minister of the Republic of Uzbekistan',
        bio: 'Responsible for the coordination of strategic development programs and implementation of governmental economic policy at the regional and national levels.',
        photo: defaultAvatar,
    },
    {
        name: 'J.T. Mirzamakhmudov',
        role: 'Minister of Energy of the Republic of Uzbekistan',
        bio: 'Leads the Ministry of Energy, overseeing the energy sector reform, development of renewable energy sources, and attraction of foreign investments into the energy industry.',
        photo: defaultAvatar,
    },
    {
        name: 'Sh.Kh. Shermatov',
        role: 'Minister for Digital Technologies of the Republic of Uzbekistan',
        bio: 'Heads the Ministry of Digital Technologies, driving the national digital transformation agenda, e-government initiatives, and the development of the ICT sector across Uzbekistan.',
        photo: avatar3,
    },
    {
        name: 'F.J. Pulatov',
        role: 'Chairman of the State Tax Committee of the Republic of Uzbekistan',
        bio: 'Oversees the modernization of the tax administration system, improvement of the tax legislation, and creation of favorable fiscal conditions for business and investment.',
        photo: avatar4,
    },
    {
        name: 'Sh.A. Vafaev',
        role: 'Executive Director of the Fund for Reconstruction and Development',
        bio: 'Manages the Fund for Reconstruction and Development of Uzbekistan, directing strategic investments in key sectors of the economy and overseeing major national development projects.',
        photo: defaultAvatar,
    },
    {
        name: 'D.A. Vakhabov',
        role: 'Chairman of the Chamber of Commerce and Industry',
        bio: 'Leads the Chamber of Commerce and Industry, representing the interests of the business community and facilitating dialogue between entrepreneurs and government authorities.',
        photo: defaultAvatar,
    },
    {
        name: 'J.O. Urunov',
        role: 'Deputy Commissioner for Protection of Rights of Business Entities',
        bio: 'Responsible for protecting the rights of business entities, resolving disputes between businesses and government agencies, and improving the regulatory environment for entrepreneurship.',
        photo: defaultAvatar,
    },
    {
        name: 'A.T. Ganiev',
        role: 'Head of the Foreign Investors Council Secretariat',
        bio: 'Coordinates the work of the Foreign Investors Council Secretariat, ensuring effective communication between Council members and government bodies, and overseeing the implementation of Council decisions.',
        photo: defaultAvatar,
    },
    {
        name: 'B.S. Murodov',
        role: 'Deputy Minister of Investments, Industry and Trade',
        bio: 'Responsible for attracting foreign investment, developing industrial policy, and expanding trade relations with partner countries on behalf of the Ministry of Investments, Industry and Trade.',
        photo: defaultAvatar,
    },
    {
        name: 'I.U. Majidov',
        role: 'Deputy Minister of Finance of the Republic of Uzbekistan',
        bio: 'Oversees budgetary policy, public finance management, and the development of financial instruments aimed at attracting investment and ensuring macroeconomic stability.',
        photo: defaultAvatar,
    },
    {
        name: 'O.T. Toshmatov',
        role: 'First Deputy Chairman of the Central Bank',
        bio: 'Responsible for monetary policy implementation, banking sector supervision, and maintaining financial stability as the First Deputy Chairman of the Central Bank of the Republic of Uzbekistan.',
        photo: defaultAvatar,
    },
    {
        name: 'N.A. Yusupov',
        role: 'Deputy Minister of Economy and Finance',
        bio: 'Focuses on macroeconomic planning, economic forecasting, and the coordination of economic policy measures to support sustainable growth and attract foreign direct investment.',
        photo: defaultAvatar,
    },
    {
        name: 'A.R. Raximov',
        role: 'Chairman of the Agency for Capital Market Development',
        bio: 'Leads efforts to develop the Uzbek capital market, including securities regulation, stock exchange development, and initiatives to deepen the financial market and attract institutional investors.',
        photo: defaultAvatar,
    },
    {
        name: 'Sh.R. Sodiqov',
        role: 'Chairman of the State Customs Committee',
        bio: 'Heads the State Customs Committee, overseeing customs administration reform, trade facilitation, and implementation of international standards to streamline cross-border trade procedures.',
        photo: defaultAvatar,
    },
]

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
