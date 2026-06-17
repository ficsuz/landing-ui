<template>
    <section class="bg-white py-16 md:py-24 overflow-hidden">
        <!-- Title -->
        <div class="page-container mb-12 md:mb-16">
            <h2 class="section-title text-center mb-4">
                {{ $t('members.title') }}
            </h2>
            <p class="text-center text-[clamp(12px,1.2vw,14px)] font-semibold tracking-[0.18em] text-[#888] uppercase">
                {{ $t('members.foreignSubtitle') }}
            </p>
        </div>

        <!-- Foreign members ticker -->
        <div class="flex flex-col gap-4 mb-4">
            <!-- Row 1: left -->
            <div class="relative flex overflow-hidden">
                <div class="ticker-track ticker-left flex gap-4 shrink-0">
                    <div
                        v-for="(logo, i) in [...row1, ...row1]"
                        :key="`r1-${i}`"
                        class="shrink-0 h-[88px] w-[180px] bg-white rounded-xl border border-[#eef0f4] flex items-center justify-center px-6 hover:border-[#d0d5dd] hover:shadow-sm transition-all duration-200"
                    >
                        <img :src="logo.src" :alt="logo.name" class="max-h-[44px] max-w-[120px] w-auto h-auto object-contain" />
                    </div>
                </div>
            </div>

            <!-- Row 2: right -->
            <div class="relative flex overflow-hidden">
                <div class="ticker-track ticker-right flex gap-4 shrink-0">
                    <div
                        v-for="(logo, i) in [...row2, ...row2]"
                        :key="`r2-${i}`"
                        class="shrink-0 h-[88px] w-[180px] bg-white rounded-xl border border-[#eef0f4] flex items-center justify-center px-6 hover:border-[#d0d5dd] hover:shadow-sm transition-all duration-200"
                    >
                        <img :src="logo.src" :alt="logo.name" class="max-h-[44px] max-w-[120px] w-auto h-auto object-contain" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Divider -->
        <div class="page-container mt-14 mb-12">
            <div class="h-px bg-[#eef0f4]" />
        </div>

        <!-- Uzbek members -->
        <div class="mb-4">
            <div class="page-container mb-10 md:mb-12">
                <p class="text-center text-[clamp(12px,1.2vw,14px)] font-semibold tracking-[0.18em] text-[#888] uppercase">
                    {{ $t('members.uzbekSubtitle') }}
                </p>
            </div>

            <!-- Row 1: left -->
            <div class="relative flex overflow-hidden mb-4">
                <div class="ticker-track ticker-members-left flex gap-4 shrink-0">
                    <div
                        v-for="(member, i) in [...uzbekRow1, ...uzbekRow1]"
                        :key="`m1-${i}`"
                        class="shrink-0 w-[280px] h-[88px] bg-white rounded-xl border border-[#eef0f4] flex items-center gap-4 px-4 hover:border-[#d0d5dd] hover:shadow-sm transition-all duration-200 cursor-default"
                    >
                        <div class="w-[52px] h-[52px] rounded-full overflow-hidden ring-2 ring-[#eef0f4] shrink-0">
                            <img
                                :src="member.photo"
                                :alt="member.name"
                                class="w-full h-full object-cover object-top"
                                @error="(e) => ((e.target as HTMLImageElement).src = defaultAvatar)"
                            />
                        </div>
                        <div class="min-w-0">
                            <p class="font-bold text-[13px] text-[#1a1e2e] leading-snug truncate">{{ member.name }}</p>
                            <p class="text-[11px] text-[#8a94a6] leading-snug mt-1 line-clamp-2">{{ member.role }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Row 2: right -->
            <div class="relative flex overflow-hidden">
                <div class="ticker-track ticker-members-right flex gap-4 shrink-0">
                    <div
                        v-for="(member, i) in [...uzbekRow2, ...uzbekRow2]"
                        :key="`m2-${i}`"
                        class="shrink-0 w-[280px] h-[88px] bg-white rounded-xl border border-[#eef0f4] flex items-center gap-4 px-4 hover:border-[#d0d5dd] hover:shadow-sm transition-all duration-200 cursor-default"
                    >
                        <div class="w-[52px] h-[52px] rounded-full overflow-hidden ring-2 ring-[#eef0f4] shrink-0">
                            <img
                                :src="member.photo"
                                :alt="member.name"
                                class="w-full h-full object-cover object-top"
                                @error="(e) => ((e.target as HTMLImageElement).src = defaultAvatar)"
                            />
                        </div>
                        <div class="min-w-0">
                            <p class="font-bold text-[13px] text-[#1a1e2e] leading-snug truncate">{{ member.name }}</p>
                            <p class="text-[11px] text-[#8a94a6] leading-snug mt-1 line-clamp-2">{{ member.role }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import defaultAvatar from '@/assets/images/avatars/default.png'

import datavolt from '@/assets/images/brands/datavolt.png'
import deloitte from '@/assets/images/brands/deloitte.png'
import ebrd from '@/assets/images/brands/ebrd.png'
import edf from '@/assets/images/brands/edf.png'
import ey from '@/assets/images/brands/ey.png'
import halykBank from '@/assets/images/brands/halyk-bank.png'
import ifc from '@/assets/images/brands/ifc.png'
import indorama from '@/assets/images/brands/indorama.png'
import kpmg from '@/assets/images/brands/kpmg.png'
import pwc from '@/assets/images/brands/pwc.png'
import siemens from '@/assets/images/brands/siemens.png'
import jpMorgan from '@/assets/images/brands/jp-morgan.png'

import acwaPower from '@/assets/images/brands/acwa-power.png'
import adb from '@/assets/images/brands/adb.png'
import bat from '@/assets/images/brands/bat.png'
import giz from '@/assets/images/brands/giz.png'
import knauf from '@/assets/images/brands/knauf.png'
import linde from '@/assets/images/brands/linde.png'
import masdar from '@/assets/images/brands/masdar.png'
import mastercard from '@/assets/images/brands/mastercard.png'
import mitsubishi from '@/assets/images/brands/mitsubishi.png'
import usaid from '@/assets/images/brands/usaid.png'
import visa from '@/assets/images/brands/visa.png'
import wbGroup from '@/assets/images/brands/wb-group.png'

import avatar1 from '@/assets/images/avatars/image.png'
import avatar2 from '@/assets/images/avatars/image11.png'
import avatar3 from '@/assets/images/avatars/image12.png'
import avatar4 from '@/assets/images/avatars/olivia.png'

const allMembers = [
    {
        name: 'J.T. Mirzamakhmudov',
        role: 'Minister of Energy of the Republic of Uzbekistan',
        photo: defaultAvatar,
    },
    {
        name: 'Sh.Kh. Shermatov',
        role: 'Minister for Digital Technologies of the Republic of Uzbekistan',
        photo: avatar1,
    },
    {
        name: 'F.J. Pulatov',
        role: 'Chairman of the State Tax Committee of the Republic of Uzbekistan',
        photo: avatar2,
    },
    {
        name: 'Sh.A. Vafaev',
        role: 'Executive Director of the Fund for Reconstruction and Development of the Republic of Uzbekistan',
        photo: avatar3,
    },
    {
        name: 'D.A. Vakhabov',
        role: 'Chairman of the Chamber of Commerce and Industry of the Republic of Uzbekistan',
        photo: avatar4,
    },
    {
        name: 'J.O. Urunov',
        role: 'Deputy Commissioner for the Protection of Rights and Legitimate Interests of Business Entities',
        photo: defaultAvatar,
    },
    {
        name: 'A.T. Ganiev',
        role: 'Head of the Foreign Investors Council Secretariat',
        photo: defaultAvatar,
    },
    {
        name: 'B.S. Murodov',
        role: 'Deputy Minister of Investments, Industry and Trade of the Republic of Uzbekistan',
        photo: defaultAvatar,
    },
    {
        name: 'I.U. Majidov',
        role: 'Deputy Minister of Finance of the Republic of Uzbekistan',
        photo: defaultAvatar,
    },
    {
        name: 'O.T. Toshmatov',
        role: 'First Deputy Chairman of the Central Bank of the Republic of Uzbekistan',
        photo: defaultAvatar,
    },
    {
        name: 'N.A. Yusupov',
        role: 'Deputy Minister of Economy and Finance of the Republic of Uzbekistan',
        photo: defaultAvatar,
    },
    {
        name: 'A.R. Raximov',
        role: 'Chairman of the Agency for the Development of the Capital Market',
        photo: defaultAvatar,
    },
    {
        name: 'B.A. Normatov',
        role: 'Deputy Minister of Agriculture of the Republic of Uzbekistan',
        photo: defaultAvatar,
    },
    {
        name: 'Sh.R. Sodiqov',
        role: 'Chairman of the State Customs Committee of the Republic of Uzbekistan',
        photo: defaultAvatar,
    },
    {
        name: 'D.O. Qodirov',
        role: 'Deputy Prime Minister of the Republic of Uzbekistan',
        photo: defaultAvatar,
    },
    {
        name: 'U.S. Nazarov',
        role: 'Chairman of the Agency for Strategic Reforms under the President',
        photo: defaultAvatar,
    },
]

const half = Math.ceil(allMembers.length / 2)
const uzbekRow1 = allMembers.slice(0, half)
const uzbekRow2 = allMembers.slice(half)

const row1 = [
    { name: 'Datavolt', src: datavolt },
    { name: 'Deloitte', src: deloitte },
    { name: 'EBRD', src: ebrd },
    { name: 'EDF', src: edf },
    { name: 'EY', src: ey },
    { name: 'Halyk Bank', src: halykBank },
    { name: 'IFC', src: ifc },
    { name: 'Indorama', src: indorama },
    { name: 'KPMG', src: kpmg },
    { name: 'PwC', src: pwc },
    { name: 'Siemens', src: siemens },
    { name: 'JP Morgan', src: jpMorgan },
]

const row2 = [
    { name: 'ACWA Power', src: acwaPower },
    { name: 'ADB', src: adb },
    { name: 'BAT', src: bat },
    { name: 'GIZ', src: giz },
    { name: 'Knauf', src: knauf },
    { name: 'Linde', src: linde },
    { name: 'Masdar', src: masdar },
    { name: 'Mastercard', src: mastercard },
    { name: 'Mitsubishi', src: mitsubishi },
    { name: 'USAID', src: usaid },
    { name: 'Visa', src: visa },
    { name: 'World Bank Group', src: wbGroup },
]

</script>

<style scoped>
.ticker-track {
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    will-change: transform;
}

.ticker-left {
    animation-name: tickerLeft;
    animation-duration: 32s;
}

.ticker-right {
    animation-name: tickerRight;
    animation-duration: 36s;
}

@keyframes tickerLeft {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}

@keyframes tickerRight {
    0% {
        transform: translateX(-50%);
    }
    100% {
        transform: translateX(0);
    }
}

.ticker-members-left {
    animation-name: tickerLeft;
    animation-duration: 40s;
}

.ticker-members-right {
    animation-name: tickerRight;
    animation-duration: 44s;
}

.ticker-track:hover {
    animation-play-state: paused;
}
</style>
