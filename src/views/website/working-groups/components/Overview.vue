<template>
    <section class="bg-white py-16 md:py-24">
        <div class="page-container">

            <!-- Stats -->
            <div ref="statsRef" class="wg-stat-tabs mb-5">
                <div class="wg-stat-tab">
                    <span class="wg-stat-tab__count">{{ statsDisplay[0] }}</span>
                    <span class="wg-stat-tab__label">{{ $t('workingGroupsPage.councilStatLabel') }}</span>
                </div>
                <div class="wg-stat-tab">
                    <span class="wg-stat-tab__count">{{ statsDisplay[1] }}</span>
                    <span class="wg-stat-tab__label">{{ $t('workingGroupsPage.interagencyStatLabel') }}</span>
                </div>
            </div>

            <!-- Legal basis -->
            <div class="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F7F7F7] border border-[#0000000D] mb-10 flex-wrap gap-y-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#505A63" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                </svg>
                <div class="flex-1 min-w-0">
                    <span class="block text-xs font-semibold text-[#191C1F] uppercase tracking-wide mb-0.5">
                        {{ $t('workingGroupsPage.legalBasisLabel') }}
                    </span>
                    <span class="text-sm text-[#505A63] font-normal leading-relaxed">
                        {{ $t('workingGroupsPage.legalBasisText') }}
                    </span>
                </div>
                <a href="#" class="shrink-0 flex items-center gap-1 text-sm font-medium text-[#191C1F] hover:opacity-70 transition-opacity whitespace-nowrap">
                    {{ $t('workingGroupsPage.learnMore') }}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </div>

            <!-- Tabs (only when not in detail view) -->
            <Transition name="wg-fade">
                <div v-if="!selected" class="flex gap-2 mb-10 flex-wrap">
                    <button
                        @click="activeTab = 'council'"
                        class="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                        :class="activeTab === 'council'
                            ? 'bg-[#191C1F] text-white'
                            : 'border border-[#0000001A] text-[#505A63] hover:border-[#191C1F] hover:text-[#191C1F]'"
                    >
                        {{ $t('workingGroupsPage.tabCouncil') }}
                    </button>
                    <button
                        @click="activeTab = 'interagency'"
                        class="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                        :class="activeTab === 'interagency'
                            ? 'bg-[#191C1F] text-white'
                            : 'border border-[#0000001A] text-[#505A63] hover:border-[#191C1F] hover:text-[#191C1F]'"
                    >
                        {{ $t('workingGroupsPage.tabInteragency') }}
                    </button>
                </div>
            </Transition>

            <!-- Content -->
            <Transition name="wg-fade" mode="out-in">

                <!-- CWG Detail view -->
                <div v-if="selected && isCWG(selected)" :key="`cwg-detail-${selected.id}`">
                    <button @click="selected = null" class="flex items-center gap-2 text-[#505A63] hover:text-[#191C1F] transition-colors mb-8 cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        {{ $t('workingGroupsPage.backButton') }}
                    </button>

                    <h2 class="text-[clamp(22px,2.5vw,34px)] font-bold text-[#191C1F] mb-3">
                        {{ $t(selected.directionKey) }}
                    </h2>
                    <p class="text-sm text-[#505A63] max-w-3xl mb-10 leading-relaxed">
                        {{ $t(selected.directionDescKey) }}
                    </p>

                    <div class="flex flex-col lg:flex-row gap-8 items-start mb-14">
                        <div class="shrink-0">
                            <img
                                :src="selected.image"
                                :alt="selected.fullname"
                                class="w-full lg:w-[300px] rounded-2xl object-cover object-top aspect-[4/5] lg:aspect-auto lg:h-[380px]"
                            />
                        </div>
                        <div class="flex flex-col gap-3">
                            <p class="text-sm text-[#000] font-normal">{{ $t('workingGroupsPage.chairLabel') }}</p>
                            <h3 class="text-[clamp(22px,2.5vw,32px)] font-extrabold text-[#191C1F] uppercase leading-tight">
                                {{ selected.fullname }}
                            </h3>
                            <p class="text-xs text-[#505A63] mb-2">{{ selected.position }}</p>
                            <p class="text-sm text-[#505A63] leading-relaxed">{{ selected.text }}</p>
                        </div>
                    </div>

                    <h4 class="text-center text-[clamp(16px,2vw,24px)] font-extrabold uppercase text-[#191C1F] mb-8">
                        {{ $t('workingGroupsPage.participantsTitle') }}
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div
                            v-for="(logo, i) in selected.brands"
                            :key="i"
                            class="border border-gray-200 rounded-xl bg-white flex items-center justify-center h-[100px] p-4"
                        >
                            <img :src="logo" alt="" class="max-w-full max-h-full object-contain"/>
                        </div>
                    </div>
                </div>

                <!-- IWG Detail view -->
                <div v-else-if="selected && !isCWG(selected)" :key="`iwg-detail-${selected.id}`">
                    <button @click="selected = null" class="flex items-center gap-2 text-[#505A63] hover:text-[#191C1F] transition-colors mb-8 cursor-pointer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 18L9 12L15 6"/>
                        </svg>
                        {{ $t('workingGroupsPage.backButton') }}
                    </button>

                    <!-- Badge -->
                    <div class="inline-flex items-center px-3 py-1.5 rounded-full border border-[#0000001A] text-xs font-medium text-[#505A63] mb-6">
                        {{ $t('workingGroupsPage.membershipBadge') }}
                    </div>

                    <!-- Title -->
                    <h1 class="text-[clamp(32px,5vw,64px)] font-black uppercase text-[#191C1F] leading-[1.05] mb-6">
                        {{ $t(selected.nameKey) }}
                    </h1>
                    <p class="text-sm text-[#505A63] mb-12 leading-relaxed">
                        {{ $t(selected.descriptionKey) }}
                    </p>

                    <!-- Chair row -->
                    <div class="flex flex-col lg:flex-row gap-6 mb-10 items-start">
                        <div class="shrink-0">
                            <img
                                :src="selected.chairPhoto"
                                :alt="selected.chairName"
                                class="w-full lg:w-[260px] aspect-[3/4] object-cover object-top rounded-2xl"
                            />
                        </div>
                        <div class="shrink-0 lg:w-[220px]">
                            <p class="text-sm text-[#000] mb-1 font-normal">{{ $t('workingGroupsPage.chairLabel') }}</p>
                            <h2 class="text-[clamp(20px,2.5vw,32px)] font-extrabold uppercase text-[#191C1F] leading-tight mb-2">
                                {{ selected.chairName }}
                            </h2>
                            <p v-if="selected.chairPositionKey" class="text-xs text-[#505A63] leading-snug">
                                {{ $t(selected.chairPositionKey) }}
                            </p>
                        </div>
                        <div v-if="selected.chairBioKey" class="flex-1">
                            <p class="text-sm text-[#505A63] leading-relaxed">{{ $t(selected.chairBioKey) }}</p>
                        </div>
                    </div>

                    <!-- Co-chair row -->
                    <div class="flex flex-col lg:flex-row gap-6 items-start">
                        <div class="shrink-0">
                            <img
                                :src="selected.coChairPhoto"
                                :alt="selected.coChairName"
                                class="w-full lg:w-[260px] aspect-[3/4] object-cover object-top rounded-2xl"
                            />
                        </div>
                        <div class="shrink-0 lg:w-[220px]">
                            <p class="text-sm text-[#000] mb-1 font-normal">{{ $t('workingGroupsPage.coChairLabel') }}</p>
                            <h2 class="text-[clamp(20px,2.5vw,32px)] font-extrabold uppercase text-[#191C1F] leading-tight mb-2">
                                {{ selected.coChairName }}
                            </h2>
                            <p v-if="selected.coChairPositionKey" class="text-xs text-[#505A63] leading-snug">
                                {{ $t(selected.coChairPositionKey) }}
                            </p>
                        </div>
                        <div v-if="selected.coChairBioKey" class="flex-1">
                            <p class="text-sm text-[#505A63] leading-relaxed">{{ $t(selected.coChairBioKey) }}</p>
                        </div>
                    </div>
                </div>

                <!-- Card grid -->
                <div v-else key="grid">

                    <!-- Council WG cards -->
                    <div v-if="activeTab === 'council'">
                        <h2 class="text-[clamp(28px,4vw,48px)] font-black uppercase text-[#191C1F] mb-8">
                            {{ $t('workingGroupsPage.tabCouncil') }}
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div
                                v-for="(item, i) in cwgGroups"
                                :key="i"
                                @click="selected = item"
                                class="group bg-[#F7F7F7] hover:bg-[#EFEFEF] transition-colors duration-200 rounded-2xl p-6 lg:p-7 flex flex-col cursor-pointer"
                            >
                                <div class="flex items-center gap-3 flex-1">
                                    <svg :viewBox="item.viewBox" width="22" height="22" fill="none" stroke="#505A63" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
                                        <path v-for="(d, j) in item.paths" :key="j" :d="d"/>
                                    </svg>
                                    <h4 class="text-sm font-semibold text-[#191C1F] uppercase leading-snug">
                                        {{ $t(item.directionKey) }}
                                    </h4>
                                </div>

                                <div class="border-t border-[#0000000D] mt-6 mb-5"></div>

                                <div class="flex items-center justify-between gap-3">
                                    <div class="flex items-center gap-3">
                                        <div class="flex items-center">
                                            <div class="diamond-wrapper">
                                                <div class="diamond-inner-logo" :style="{ backgroundImage: `url(${item.companyImage})` }"></div>
                                            </div>
                                            <div class="diamond-wrapper -ml-4">
                                                <div class="diamond-inner-person" :style="{ backgroundImage: `url(${item.image})` }"></div>
                                            </div>
                                        </div>
                                        <div class="min-w-0">
                                            <div class="text-[11px] text-[#000] font-normal leading-tight mb-0.5">
                                                {{ $t('workingGroupsPage.chairLabel') }}
                                            </div>
                                            <div class="text-xs font-bold uppercase leading-tight text-[#191C1F] truncate">
                                                {{ item.fullname }}
                                            </div>
                                            <div class="text-[11px] text-[#505A63] leading-snug mt-0.5 line-clamp-2">
                                                {{ item.position }}
                                            </div>
                                        </div>
                                    </div>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#505A63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 group-hover:translate-x-1 transition-transform duration-200">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Interagency WG cards -->
                    <div v-if="activeTab === 'interagency'">
                        <h2 class="text-[clamp(28px,4vw,48px)] font-black uppercase text-[#191C1F] mb-8">
                            {{ $t('workingGroupsPage.tabInteragency') }}
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div
                                v-for="(item, i) in iwgGroups"
                                :key="i"
                                @click="selected = item"
                                class="group bg-[#F7F7F7] hover:bg-[#EFEFEF] transition-colors duration-200 rounded-2xl p-6 flex flex-col cursor-pointer"
                            >
                                <!-- Two large photos at top -->
                                <div class="flex gap-4 mb-6">
                                    <div class="flex-1 flex flex-col items-center gap-2">
                                        <img :src="item.chairPhoto" :alt="item.chairName"
                                            class="w-20 h-20 rounded-full object-cover object-top border-2 border-white shadow-md"/>
                                        <p class="text-[10px] text-[#8a94a6] uppercase tracking-wide text-center leading-tight">
                                            {{ $t('workingGroupsPage.chairLabel') }}
                                        </p>
                                        <p class="text-[11px] font-bold uppercase text-[#191C1F] text-center leading-tight line-clamp-2">
                                            {{ item.chairName }}
                                        </p>
                                    </div>
                                    <div class="w-px bg-[#0000000D] self-stretch"></div>
                                    <div class="flex-1 flex flex-col items-center gap-2">
                                        <img :src="item.coChairPhoto" :alt="item.coChairName"
                                            class="w-20 h-20 rounded-full object-cover object-top border-2 border-white shadow-md"/>
                                        <p class="text-[10px] text-[#8a94a6] uppercase tracking-wide text-center leading-tight">
                                            {{ $t('workingGroupsPage.coChairLabel') }}
                                        </p>
                                        <p class="text-[11px] font-bold uppercase text-[#191C1F] text-center leading-tight line-clamp-2">
                                            {{ item.coChairName }}
                                        </p>
                                    </div>
                                </div>

                                <div class="border-t border-[#0000000D] mb-4"></div>

                                <!-- Icon + name + arrow -->
                                <div class="flex items-center gap-3 mt-auto">
                                    <div class="w-9 h-9 rounded-xl bg-[#191C1F] flex items-center justify-center shrink-0">
                                        <svg :viewBox="item.viewBox" width="16" height="16" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                            <path v-for="(d, j) in item.paths" :key="j" :d="d"/>
                                        </svg>
                                    </div>
                                    <h4 class="flex-1 text-[12px] font-bold text-[#191C1F] uppercase truncate">
                                        {{ $t(item.nameKey) }}
                                    </h4>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#505A63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 group-hover:translate-x-1 transition-transform duration-200">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </Transition>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

import imgLeader1 from '@/assets/images/leaders/leader1.png'
import imgLeader3 from '@/assets/images/leaders/leader3.png'
import imgLeader4 from '@/assets/images/leaders/leader4.png'
import imgLeader5 from '@/assets/images/leaders/leader5.png'
import imgLeader6 from '@/assets/images/leaders/leader6.png'
import imgSandro2 from '@/assets/images/leaders/sandro2.png'
import imgLaziz from '@/assets/images/leaders/laziz.png'
import imgKazbek from '@/assets/images/leaders/kazbek.png'
import imgTimur from '@/assets/images/leaders/timur.png'
import imgDavron from '@/assets/images/leaders/davron.png'
import imgVera from '@/assets/images/leaders/vera.png'
import imgKongratbay from '@/assets/images/leaders/kongratbay.png'
import imgIlhom from '@/assets/images/leaders/ilhom.png'
import imgMarius from '@/assets/images/leaders/marius.png'
import imgAxadbek2 from '@/assets/images/leaders/axadbek2.png'
import imgErlan2 from '@/assets/images/leaders/erlan2.png'
import imgSandro from '@/assets/images/leaders/sandro.png'
import imgFarrux from '@/assets/images/leaders/farrux.png'
import imgJurabek from '@/assets/images/leaders/jurabek.png'
import imgAsadbek from '@/assets/images/leaders/asadbek.png'
import imgAziz from '@/assets/images/leaders/aziz.png'
import imgMaxmud from '@/assets/images/leaders/maxmud.png'
import imgMukae from '@/assets/images/leaders/mukae.png'
import imgOlimjon2 from '@/assets/images/leaders/olimjon2.png'
import imgAzizA from '@/assets/images/leaders/aziz-a.png'

import imgAcwaPower from '@/assets/images/brands/acwa-power.png'
import imgTbc from '@/assets/images/brands/tbc.png'
import imgIpoteka from '@/assets/images/brands/ipoteka.png'
import imgUzum from '@/assets/images/brands/uzum.png'
import imgAcdfUz from '@/assets/images/brands/acdf-uz.png'
import imgEy from '@/assets/images/brands/ey.png'
import imgAdBank from '@/assets/images/brands/ad-bank.png'
import imgIdBank from '@/assets/images/brands/id-bank.png'
import imgWbGroup from '@/assets/images/brands/wb-group.png'
import imgMiCor from '@/assets/images/brands/mi-cor.png'
import imgCola from '@/assets/images/brands/cola.png'
import imgHalyk from '@/assets/images/brands/halyk.png'
import imgMitCo from '@/assets/images/brands/mit-co.png'
import imgTbcBank from '@/assets/images/brands/tbc-bank.png'
import imgJpMorgan from '@/assets/images/brands/jp-morgan.png'
import imgEBank from '@/assets/images/brands/e-bank.png'
import imgAwPart from '@/assets/images/brands/aw-part.png'
import imgOtpBank from '@/assets/images/brands/otp-bank.png'
import imgHenleyPart from '@/assets/images/brands/henley-part.png'
import imgSojitz from '@/assets/images/brands/sojitz.png'
import imgGloboGate from '@/assets/images/brands/globo-gate.png'
import imgKnauf from '@/assets/images/brands/knauf.png'
import imgUzCarls from '@/assets/images/brands/uz-carls.png'
import imgPwc from '@/assets/images/brands/pwc.png'
import imgCentLaw from '@/assets/images/brands/cent-law.png'
import imgKostaLegal from '@/assets/images/brands/kosta-legal.png'
import imgAirProd from '@/assets/images/brands/air-prod.png'
import imgEpam from '@/assets/images/brands/epam.png'
import imgKpmg from '@/assets/images/brands/kpmg.png'
import imgEyBrand from '@/assets/images/brands/ey.png'
import imgBdo from '@/assets/images/brands/bdo.png'
import imgYandeks from '@/assets/images/brands/yandeks.png'
import imgCrowe from '@/assets/images/brands/crowe.png'
import imgVeon from '@/assets/images/brands/veon.png'
import imgChalikHolding from '@/assets/images/brands/chalik-holding.png'
import imgSuez from '@/assets/images/brands/suez.png'
import imgEdf from '@/assets/images/brands/edf.png'
import imgChinaSpg from '@/assets/images/brands/china-spg.png'
import imgMasdar from '@/assets/images/brands/masdar.png'
import imgBatBetter from '@/assets/images/brands/bat-better.png'
import imgTe from '@/assets/images/brands/te.png'
import imgEnergyChina from '@/assets/images/brands/energy-china.png'
import imgIfc from '@/assets/images/brands/ifc.png'
import imgCafa from '@/assets/images/brands/cafa.png'
import imgAmcham from '@/assets/images/brands/amcham.png'
import imgZiraatBank from '@/assets/images/brands/ziraat-bank.png'
import imgOrano from '@/assets/images/brands/orano.png'
import imgVisa from '@/assets/images/brands/visa.png'
import imgItfc from '@/assets/images/brands/itfc.png'
import imgAlvarezMar from '@/assets/images/brands/alvarez-mar.png'
import imgMastercard from '@/assets/images/brands/mastercard.png'
import imgAksa from '@/assets/images/brands/aksa.png'
import imgHudson from '@/assets/images/brands/hudson.png'
import imgOzguven from '@/assets/images/brands/ozguven.png'
import imgMinistryIit from '@/assets/images/brands/ministry-iit.png'
import imgSiemens from '@/assets/images/brands/siemens.png'
import imgSilverLeafe from '@/assets/images/brands/silver-leafe.png'
import imgWhiteCase from '@/assets/images/brands/white-case.png'
import imgDentos from '@/assets/images/brands/dentos.png'
import imgFintech from '@/assets/images/brands/fintech.png'
import imgYandeksUz from '@/assets/images/brands/yandeks-uz.png'
import imgAiiBank from '@/assets/images/brands/aii-bank.png'
import imgIndoorama from '@/assets/images/brands/indoorama.png'
import imgAvesta from '@/assets/images/brands/avesta.png'
import imgDeloitte from '@/assets/images/brands/deloitte.png'
import imgSasaIntern from '@/assets/images/brands/sasa-intern.png'
import imgAzizov from '@/assets/images/brands/azizov.png'
import imgUzumMarket from '@/assets/images/brands/uzum-market.png'
import imgLekhim from '@/assets/images/brands/lekhim.png'

const { t } = useI18n()

interface CWGroup {
    type: 'cwg'
    id: number
    viewBox: string
    paths: string[]
    directionKey: string
    directionDescKey: string
    image: string
    fullname: string
    position: string
    companyImage: string
    text: string
    brands: string[]
}

interface IWGroup {
    type: 'iwg'
    id: number
    viewBox: string
    paths: string[]
    nameKey: string
    descriptionKey: string
    chairName: string
    chairPhoto: string
    chairPositionKey?: string
    chairBioKey?: string
    coChairName: string
    coChairPhoto: string
    coChairPositionKey?: string
    coChairBioKey?: string
}

type AnyGroup = CWGroup | IWGroup

function isCWG(g: AnyGroup): g is CWGroup {
    return g.type === 'cwg'
}

const activeTab = ref<'council' | 'interagency'>('council')
const selected = ref<AnyGroup | null>(null)

const cwgGroups: CWGroup[] = [
    {
        type: 'cwg', id: 1,
        viewBox: '0 0 24 24',
        paths: ['M13 2L3 14h9l-1 8 10-12h-9l1-8z'],
        directionKey: 'workingGroupsPage.councilGroups.c1.name',
        directionDescKey: 'workingGroupsPage.councilGroups.c1.description',
        image: imgLeader6, fullname: t('wg.johnZaidi'), position: t('wg.johnZaidiPos'),
        companyImage: imgAcwaPower, text: t('wg.johnZaidiText'),
        brands: [imgAdBank, imgAcwaPower, imgMasdar, imgEdf, imgTe, imgEyBrand, imgBdo, imgKostaLegal, imgDentos, imgAzizov, imgAirProd, imgSiemens],
    },
    {
        type: 'cwg', id: 2,
        viewBox: '0 0 24 24',
        paths: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
        directionKey: 'workingGroupsPage.councilGroups.c2.name',
        directionDescKey: 'workingGroupsPage.councilGroups.c2.description',
        image: imgLeader1, fullname: t('wg.spartak'), position: t('wg.spartakPos'),
        companyImage: imgTbc, text: t('wg.spartakText'),
        brands: [imgAdBank, imgIdBank, imgWbGroup, imgMiCor, imgCola, imgHalyk, imgMitCo, imgTbcBank, imgJpMorgan, imgEBank, imgAwPart],
    },
    {
        type: 'cwg', id: 3,
        viewBox: '0 0 24 24',
        paths: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
        directionKey: 'workingGroupsPage.councilGroups.c3.name',
        directionDescKey: 'workingGroupsPage.councilGroups.c3.description',
        image: imgSandro2, fullname: t('wg.sandro'), position: t('wg.sandroPos'),
        companyImage: imgIpoteka, text: t('wg.sandroText'),
        brands: [imgOtpBank, imgHenleyPart, imgSojitz, imgGloboGate, imgKnauf, imgUzCarls, imgPwc, imgCentLaw, imgKostaLegal, imgTbcBank, imgAirProd, imgEpam, imgKpmg, imgEyBrand, imgBdo, imgYandeks, imgCrowe, imgVeon, imgChalikHolding, imgSuez, imgEdf, imgMiCor, imgIdBank, imgChinaSpg, imgHalyk, imgMasdar, imgBatBetter, imgTe, imgEnergyChina, imgAcwaPower, imgAdBank, imgIfc, imgCafa, imgAmcham, imgZiraatBank, imgOrano, imgVisa, imgItfc, imgMitCo, imgAlvarezMar, imgMastercard, imgCola, imgAksa, imgHudson, imgOzguven, imgMinistryIit],
    },
    {
        type: 'cwg', id: 4,
        viewBox: '0 0 24 24',
        paths: ['M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z'],
        directionKey: 'workingGroupsPage.councilGroups.c4.name',
        directionDescKey: 'workingGroupsPage.councilGroups.c4.description',
        image: imgLeader3, fullname: t('wg.sergey'), position: t('wg.sergeyPos'),
        companyImage: imgUzum, text: t('wg.sergeyText'),
        brands: [imgSiemens, imgAdBank, imgWbGroup, imgCola, imgHalyk, imgEBank, imgSilverLeafe, imgSuez, imgTbcBank, imgChalikHolding, imgPwc, imgWhiteCase, imgDentos, imgFintech, imgYandeksUz],
    },
    {
        type: 'cwg', id: 5,
        viewBox: '0 0 24 24',
        paths: ['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z', 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'],
        directionKey: 'workingGroupsPage.councilGroups.c5.name',
        directionDescKey: 'workingGroupsPage.councilGroups.c5.description',
        image: imgLeader4, fullname: t('wg.gayana'), position: t('wg.gayanaPos'),
        companyImage: imgAcdfUz, text: t('wg.gayanaText'),
        brands: [imgWbGroup, imgAcwaPower, imgTbcBank, imgUzumMarket, imgAcdfUz, imgEyBrand, imgHalyk, imgLekhim],
    },
    {
        type: 'cwg', id: 6,
        viewBox: '0 0 24 24',
        paths: ['M18 20V10', 'M12 20V4', 'M6 20v-6'],
        directionKey: 'workingGroupsPage.councilGroups.c6.name',
        directionDescKey: 'workingGroupsPage.councilGroups.c6.description',
        image: imgLeader5, fullname: t('wg.erlan'), position: t('wg.erlanPos'),
        companyImage: imgEy, text: t('wg.erlanText'),
        brands: [imgAiiBank, imgIndoorama, imgAvesta, imgBatBetter, imgDeloitte, imgSuez, imgSasaIntern, imgAzizov, imgAmcham, imgPwc, imgUzCarls, imgAdBank, imgMasdar, imgMiCor, imgEyBrand, imgCola, imgMastercard],
    },
]

const iwgGroups: IWGroup[] = [
    {
        type: 'iwg', id: 1,
        viewBox: '0 0 24 24',
        paths: ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
        nameKey: 'workingGroupsPage.interagencyGroups.i1.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i1.description',
        chairName: 'Laziz Kudratov', chairPhoto: imgLaziz,
        chairPositionKey: 'wg.lazizPos', chairBioKey: 'wg.lazizBio',
        coChairName: 'Kazbek Bassiev', coChairPhoto: imgKazbek,
        coChairPositionKey: 'wg.kazbekPos', coChairBioKey: 'wg.kazbekBio',
    },
    {
        type: 'iwg', id: 2,
        viewBox: '0 0 24 24',
        paths: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
        nameKey: 'workingGroupsPage.interagencyGroups.i2.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i2.description',
        chairName: 'Timur Ishmetov', chairPhoto: imgTimur,
        coChairName: 'Davron Yakubov', coChairPhoto: imgDavron,
    },
    {
        type: 'iwg', id: 3,
        viewBox: '0 0 24 24',
        paths: ['M18 20V10', 'M12 20V4', 'M6 20v-6'],
        nameKey: 'workingGroupsPage.interagencyGroups.i3.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i3.description',
        chairName: 'Laziz Kudratov', chairPhoto: imgLaziz,
        coChairName: 'Vera Bell', coChairPhoto: imgVera,
    },
    {
        type: 'iwg', id: 4,
        viewBox: '0 0 24 24',
        paths: ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', 'M12 7v.01M12 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'],
        nameKey: 'workingGroupsPage.interagencyGroups.i4.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i4.description',
        chairName: 'Kongratbay Sharipov', chairPhoto: imgKongratbay,
        coChairName: 'Sandro Rtveladze', coChairPhoto: imgSandro,
    },
    {
        type: 'iwg', id: 5,
        viewBox: '0 0 24 24',
        paths: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
        nameKey: 'workingGroupsPage.interagencyGroups.i5.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i5.description',
        chairName: 'Ilkhom Norkulov', chairPhoto: imgIlhom,
        coChairName: 'Marius Dan', coChairPhoto: imgMarius,
    },
    {
        type: 'iwg', id: 6,
        viewBox: '0 0 24 24',
        paths: ['M22 12h-4l-3 9L9 3l-3 9H2'],
        nameKey: 'workingGroupsPage.interagencyGroups.i6.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i6.description',
        chairName: 'Ahadbek Haydarov', chairPhoto: imgAxadbek2,
        coChairName: 'Erlan Dosimbekov', coChairPhoto: imgErlan2,
    },
    {
        type: 'iwg', id: 7,
        viewBox: '0 0 24 24',
        paths: ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
        nameKey: 'workingGroupsPage.interagencyGroups.i7.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i7.description',
        chairName: 'Farrux Tashmatov', chairPhoto: imgFarrux,
        coChairName: 'Jurabek Yusupov', coChairPhoto: imgJurabek,
    },
    {
        type: 'iwg', id: 8,
        viewBox: '0 0 24 24',
        paths: ['M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3', 'M9 21h6m-3-3v3', 'M13 13h8a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z'],
        nameKey: 'workingGroupsPage.interagencyGroups.i8.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i8.description',
        chairName: 'Asadbek Nazarov', chairPhoto: imgAsadbek,
        coChairName: 'Aziz Karimov', coChairPhoto: imgAziz,
    },
    {
        type: 'iwg', id: 9,
        viewBox: '0 0 24 24',
        paths: ['M13 2L3 14h9l-1 8 10-12h-9l1-8z'],
        nameKey: 'workingGroupsPage.interagencyGroups.i9.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i9.description',
        chairName: 'Maxmud Aliyev', chairPhoto: imgMaxmud,
        coChairName: 'Mukae Sobirov', coChairPhoto: imgMukae,
    },
    {
        type: 'iwg', id: 10,
        viewBox: '0 0 24 24',
        paths: ['M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z', 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'],
        nameKey: 'workingGroupsPage.interagencyGroups.i10.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i10.description',
        chairName: 'Olimjon Nazarov', chairPhoto: imgOlimjon2,
        coChairName: 'Aziz Akhmedov', coChairPhoto: imgAzizA,
    },
]

// Animated stats
const ANIM_DURATION = 1500
const statsTargets = [6, 10]
const statsDisplay = ref([0, 0])
const statsRef = ref<HTMLElement | null>(null)
const observer = ref<IntersectionObserver | null>(null)

function easeOutCubic(x: number) {
    return 1 - Math.pow(1 - x, 3)
}

function animateStats() {
    const start = performance.now()
    const step = (now: number) => {
        const progress = Math.min((now - start) / ANIM_DURATION, 1)
        const eased = easeOutCubic(progress)
        statsDisplay.value = statsTargets.map((t) => Math.floor(eased * t))
        if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
}

onMounted(() => {
    if (!statsRef.value) return
    let done = false
    observer.value = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && !done) {
                done = true
                animateStats()
            }
        },
        { threshold: 0.3 }
    )
    observer.value.observe(statsRef.value)
})

onBeforeUnmount(() => observer.value?.disconnect())
</script>

<style scoped>
.wg-stat-tabs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

@media (max-width: 480px) {
    .wg-stat-tabs { grid-template-columns: 1fr; }
}

.wg-stat-tab {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 24px 28px;
    border-radius: 20px;
    border: 1.5px solid rgba(25, 28, 31, 0.1);
    background: #fff;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.wg-stat-tab:hover {
    border-color: rgba(25, 28, 31, 0.25);
    box-shadow: 0 8px 24px rgba(25, 28, 31, 0.07);
    transform: translateY(-2px);
}

.wg-stat-tab__count {
    font-size: clamp(36px, 5vw, 52px);
    font-weight: 900;
    line-height: 1;
    color: #191c1f;
}

.wg-stat-tab__label {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    color: #505a63;
}

.diamond-wrapper {
    width: 44px;
    height: 44px;
    transform: rotate(45deg);
    border-radius: 12px;
    overflow: hidden;
    background: white;
    border: 1.5px solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
}

.diamond-inner-logo {
    width: 100%;
    height: 100%;
    transform: rotate(-45deg) scale(1.4);
    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
}

.diamond-inner-person {
    width: 100%;
    height: 100%;
    transform: rotate(-45deg) scale(1.4);
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
}

.wg-fade-enter-active,
.wg-fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.wg-fade-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.wg-fade-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
</style>
