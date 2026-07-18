<template>
    <section class="bg-white py-16 md:py-24">
        <div class="page-container">
            <!-- Stats (act as tabs) -->
            <div v-if="!interagencyOnly && !councilOnly" ref="statsRef" class="wg-stat-tabs mb-5">
                <div
                    class="wg-stat-tab"
                    :class="{ 'wg-stat-tab--active': activeTab === 'council' }"
                    @click="selectTab('council')"
                >
                    <span class="wg-stat-tab__count">{{ statsDisplay[0] }}</span>
                    <span class="wg-stat-tab__label">{{ $t('workingGroupsPage.councilStatLabel') }}</span>
                </div>
                <div
                    class="wg-stat-tab"
                    :class="{ 'wg-stat-tab--active': activeTab === 'interagency' }"
                    @click="selectTab('interagency')"
                >
                    <span class="wg-stat-tab__count">{{ statsDisplay[1] }}</span>
                    <span class="wg-stat-tab__label">{{ $t('workingGroupsPage.interagencyStatLabel') }}</span>
                </div>
            </div>

            <!-- Legal basis -->
            <div v-if="!interagencyOnly && !councilOnly" class="flex items-start md:items-center gap-3 px-4 py-3 rounded-xl bg-[#F7F7F7] border border-[#0000000D] mb-10 flex-wrap gap-y-3">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#505A63"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="shrink-0 mt-0.5"
                >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                </svg>
                <div class="flex-1 min-w-0">
                    <span class="block text-xs font-semibold text-[#191C1F] uppercase tracking-wide mb-0.5">
                        {{ $t('workingGroupsPage.legalBasisLabel') }}
                    </span>
                    <span class="text-sm text-[#505A63] font-normal leading-relaxed">
                        {{ $t('workingGroupsPage.legalBasisText') }}
                    </span>
                </div>
                <router-link
                    :to="{ name: 'results-documents' }"
                    class="shrink-0 flex items-center gap-1 text-sm font-medium text-[#191C1F] hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                    {{ $t('workingGroupsPage.learnMore') }}
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </router-link>
            </div>

            <!-- Content -->
            <Transition name="wg-fade" mode="out-in">
                <!-- CWG Detail view -->
                <div v-if="selected && isCWG(selected)" :key="`cwg-detail-${selected.id}`">
                    <button
                        @click="selected = null"
                        class="flex items-center gap-2 text-[#505A63] hover:text-[#191C1F] transition-colors mb-8 cursor-pointer"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M19 12H5M12 19l-7-7 7-7" />
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
                                :alt="$t(selected.fullnameKey)"
                                class="w-48 sm:w-56 lg:w-[300px] rounded-2xl object-cover object-top aspect-[4/5] lg:aspect-auto lg:h-[380px]"
                            />
                        </div>
                        <div class="flex flex-col gap-3">
                            <p class="text-sm text-[#000] font-normal">{{ $t('workingGroupsPage.chairLabel') }}</p>
                            <h3 class="text-[clamp(22px,2.5vw,32px)] font-extrabold text-[#191C1F] uppercase leading-tight">
                                {{ $t(selected.fullnameKey) }}
                            </h3>
                            <p class="text-xs text-[#505A63] mb-2">{{ $t(selected.positionKey) }}</p>
                            <p class="text-sm text-[#505A63] leading-relaxed">{{ $t(selected.textKey) }}</p>
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
                            <img :src="logo" alt="" class="max-w-full max-h-full object-contain" />
                        </div>
                    </div>
                </div>

                <!-- IWG Detail view -->
                <div v-else-if="selected && !isCWG(selected)" :key="`iwg-detail-${selected.id}`">
                    <button
                        @click="selected = null"
                        class="flex items-center gap-2 text-[#505A63] hover:text-[#191C1F] transition-colors mb-8 cursor-pointer"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M15 18L9 12L15 6" />
                        </svg>
                        {{ $t('workingGroupsPage.backButton') }}
                    </button>

                    <!-- Badge -->
                    <div class="inline-flex items-center px-3 py-1.5 rounded-full border border-[#0000001A] text-xs font-medium text-[#505A63] mb-6">
                        {{ $t('workingGroupsPage.membershipBadge') }}
                    </div>

                    <!-- Title -->
                    <h1 class="text-[clamp(32px,5vw,64px)] font-black uppercase text-[#191C1F] leading-[1.05] mb-6 break-words">
                        {{ $t(selected.nameKey) }}
                    </h1>
                    <p class="text-base md:text-lg text-[#505A63] font-medium mb-10 md:mb-12 leading-relaxed">
                        {{ $t(selected.descriptionKey) }}
                    </p>

                    <!-- Chair row -->
                    <div class="flex flex-col lg:flex-row gap-6 mb-10 items-start">
                        <div class="shrink-0">
                            <img
                                :src="selected.chairDetailPhoto || selected.chairPhoto"
                                :alt="$t(selected.chairNameKey)"
                                class="w-40 sm:w-48 lg:w-[260px] aspect-[3/4] object-cover object-top rounded-2xl"
                            />
                        </div>
                        <div class="shrink-0 lg:w-[320px]">
                            <p class="text-sm text-[#000] mb-1 font-normal">{{ $t('workingGroupsPage.chairLabel') }}</p>
                            <h2 class="text-[clamp(20px,2.5vw,32px)] font-extrabold uppercase text-[#191C1F] leading-tight mb-2">
                                {{ $t(selected.chairNameKey) }}
                            </h2>
                            <p v-if="selected.chairPositionKey" class="text-xs text-[#505A63] leading-snug">
                                {{ $t(selected.chairPositionKey) }}
                            </p>
                        </div>
                        <div v-if="selected.chairBioKey" class="flex-1">
                            <p class="text-base md:text-lg text-[#505A63] leading-relaxed">{{ $t(selected.chairBioKey) }}</p>
                        </div>
                    </div>

                    <!-- Co-chair row -->
                    <div class="flex flex-col lg:flex-row gap-6 items-start">
                        <div class="shrink-0">
                            <img
                                :src="selected.coChairPhoto"
                                :alt="$t(selected.coChairNameKey)"
                                class="w-40 sm:w-48 lg:w-[260px] aspect-[3/4] object-cover object-top rounded-2xl"
                            />
                        </div>
                        <div class="shrink-0 lg:w-[320px]">
                            <p class="text-sm text-[#000] mb-1 font-normal">{{ $t('workingGroupsPage.coChairLabel') }}</p>
                            <h2 class="text-[clamp(20px,2.5vw,32px)] font-extrabold uppercase text-[#191C1F] leading-tight mb-2">
                                {{ $t(selected.coChairNameKey) }}
                            </h2>
                            <p v-if="selected.coChairPositionKey" class="text-xs text-[#505A63] leading-snug">
                                {{ $t(selected.coChairPositionKey) }}
                            </p>
                        </div>
                        <div v-if="selected.coChairBioKey" class="flex-1">
                            <p class="text-base md:text-lg text-[#505A63] leading-relaxed">{{ $t(selected.coChairBioKey) }}</p>
                        </div>
                    </div>

                    <!-- From the State -->
                    <div v-if="selected.stateMembers.length" class="mt-12 md:mt-16">
                        <h4 class="text-[clamp(22px,3vw,40px)] font-extrabold uppercase text-[#191C1F] mb-8">
                            {{ $t('workingGroupsPage.stateMembersTitle') }}
                        </h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div
                                v-for="(member, i) in selected.stateMembers"
                                :key="i"
                                class="border border-[#00000026] rounded-xl p-4 text-center flex flex-col items-center"
                            >
                                <img :src="member.image" :alt="$t(member.nameKey)" class="w-[93px] h-[93px] rounded-3xl object-cover object-top" />
                                <p class="mt-2 text-[17px] font-bold text-[#191C1F] leading-tight">
                                    {{ $t(member.nameKey) }}
                                </p>
                                <span class="mt-1 text-xs text-[#505A63] leading-snug font-normal">
                                    {{ $t(member.positionKey) }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- From the Council -->
                    <div v-if="selected.councilBrands.length" class="mt-12 md:mt-16">
                        <h4 class="text-[clamp(22px,3vw,40px)] font-extrabold uppercase text-[#191C1F] mb-8">
                            {{ $t('workingGroupsPage.councilMembersTitle') }}
                        </h4>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div
                                v-for="(logo, i) in selected.councilBrands"
                                :key="i"
                                class="border border-gray-200 rounded-xl bg-white flex items-center justify-center h-[100px] p-4"
                            >
                                <img :src="logo" alt="" class="max-w-full max-h-full object-contain" />
                            </div>
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
                                <div class="flex items-center gap-3.5 min-h-[64px]">
                                    <svg
                                        :viewBox="item.viewBox"
                                        width="30"
                                        height="30"
                                        fill="none"
                                        stroke="#505A63"
                                        stroke-width="1.8"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="shrink-0"
                                    >
                                        <path v-for="(d, j) in item.paths" :key="j" :d="d" />
                                    </svg>
                                    <h4 class="text-base lg:text-lg font-semibold text-[#191C1F] uppercase leading-snug">
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
                                            <div class="text-[13px] text-[#000] font-normal leading-tight mb-0.5">
                                                {{ $t('workingGroupsPage.chairLabel') }}
                                            </div>
                                            <div class="text-sm font-bold uppercase leading-tight text-[#191C1F]">
                                                {{ $t(item.fullnameKey) }}
                                            </div>
                                            <div class="text-[13px] text-[#505A63] leading-snug mt-0.5">
                                                {{ $t(item.positionKey) }}
                                            </div>
                                        </div>
                                    </div>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#505A63"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="shrink-0 group-hover:translate-x-1 transition-transform duration-200"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
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
                                class="group bg-[#F7F7F7] hover:bg-[#EFEFEF] transition-colors duration-200 rounded-2xl p-6 lg:p-7 flex flex-col cursor-pointer"
                            >
                                <div class="flex items-center gap-3.5 min-h-[64px]">
                                    <svg
                                        :viewBox="item.viewBox"
                                        width="30"
                                        height="30"
                                        fill="none"
                                        stroke="#505A63"
                                        stroke-width="1.8"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="shrink-0"
                                    >
                                        <path v-for="(d, j) in item.paths" :key="j" :d="d" />
                                    </svg>
                                    <h4 class="text-base lg:text-lg font-semibold text-[#191C1F] uppercase leading-snug">
                                        {{ $t(item.nameKey) }}
                                    </h4>
                                </div>

                                <div class="border-t border-[#0000000D] mt-6 mb-5"></div>

                                <div class="flex items-center justify-between gap-3">
                                    <div class="flex flex-col gap-6 min-w-0">
                                        <div class="flex items-center gap-3">
                                            <div class="diamond-wrapper">
                                                <div class="diamond-inner-person" :style="{ backgroundImage: `url(${item.chairPhoto})` }"></div>
                                            </div>
                                            <div class="min-w-0">
                                                <div class="text-[13px] text-[#000] font-normal leading-tight mb-0.5">
                                                    {{ $t('workingGroupsPage.chairLabel') }}
                                                </div>
                                                <div class="text-sm font-bold uppercase leading-tight text-[#191C1F]">
                                                    {{ $t(item.chairNameKey) }}
                                                </div>
                                                <div
                                                    v-if="item.chairPositionKey"
                                                    class="text-[13px] text-[#505A63] leading-snug mt-0.5"
                                                >
                                                    {{ $t(item.chairPositionKey) }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <div class="diamond-wrapper">
                                                <div class="diamond-inner-person" :style="{ backgroundImage: `url(${item.coChairPhoto})` }"></div>
                                            </div>
                                            <div class="min-w-0">
                                                <div class="text-[13px] text-[#000] font-normal leading-tight mb-0.5">
                                                    {{ $t('workingGroupsPage.coChairLabel') }}
                                                </div>
                                                <div class="text-sm font-bold uppercase leading-tight text-[#191C1F]">
                                                    {{ $t(item.coChairNameKey) }}
                                                </div>
                                                <div
                                                    v-if="item.coChairPositionKey"
                                                    class="text-[13px] text-[#505A63] leading-snug mt-0.5"
                                                >
                                                    {{ $t(item.coChairPositionKey) }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#505A63"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="shrink-0 group-hover:translate-x-1 transition-transform duration-200"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
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

// interagencyOnly: render only the Interagency (IWG) cards; councilOnly: render only the Council (CWG) cards.
// Either one hides the stat tabs and legal-basis bar, leaving just that single section.
const props = defineProps<{ interagencyOnly?: boolean; councilOnly?: boolean }>()

import imgLeader1 from '@/assets/images/leaders/leader1.png'
import imgLeader3 from '@/assets/images/leaders/leader3.png'
import imgLeader4 from '@/assets/images/leaders/leader4.png'
import imgLeader5 from '@/assets/images/leaders/leader5.png'
import imgLeader6 from '@/assets/images/leaders/leader6.png'
import imgSandro2 from '@/assets/images/leaders/sandro2.png'
import imgLaziz from '@/assets/images/leaders/laziz2.png'
import imgKazbek from '@/assets/images/leaders/kazbek2.png'
import imgTimur from '@/assets/images/leaders/timur2.png'
import imgDavron from '@/assets/images/leaders/davron2.png'
import imgVera from '@/assets/images/leaders/vera2.png'
import imgKongratbay from '@/assets/images/leaders/kongratbay2.png'
import imgAxadbek2 from '@/assets/images/leaders/axadbek2.png'
import imgErlan2 from '@/assets/images/leaders/erlan2.png'
import imgAziz2 from '@/assets/images/leaders/aziz2.png'
import imgJurabek2 from '@/assets/images/leaders/jurabek2.png'
import imgMukae from '@/assets/images/leaders/mukae.png'
import imgAzizA from '@/assets/images/leaders/aziz-a.png'

import usrXurshid from '@/assets/images/users/xurshid.png'
import usrAsrar from '@/assets/images/users/asrar.png'
import usrJaxongir from '@/assets/images/users/jaxongir.png'
import usrNodirbek from '@/assets/images/users/nodirbek.png'
import usrAskar from '@/assets/images/users/askar2.png'
import usrAxadbek from '@/assets/images/users/axadbek.png'
import usrMaxmud from '@/assets/images/users/maxmud.png'
import usrFarrux from '@/assets/images/users/farrux.png'
import usrPak from '@/assets/images/users/pak.png'
import defaultAvatar from '@/assets/images/avatars/default-avatar.svg'
import usrGeorgiy from '@/assets/images/users/georgiy.png'
import usrBotir from '@/assets/images/users/botir.png'
import usrBexzod from '@/assets/images/users/bexzod.png'
import usrDavron from '@/assets/images/users/davron.png'
import usrIlxom from '@/assets/images/users/ilxom.png'
import usrFeruza from '@/assets/images/users/feruza.png'
import usrMarat from '@/assets/images/users/marat.png'
import usrAgzam from '@/assets/images/users/agzam.png'
import usrObidjon from '@/assets/images/users/obidjon.png'
import usrJaxongirAbdiyev from '@/assets/images/users/jaxongirabdiyev.png'
import usrAkbar from '@/assets/images/users/akbar.png'
import usrSherzod from '@/assets/images/users/sherzod.png'
import usrShuxrat from '@/assets/images/users/shuxrat.png'

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
import imgVoltalia from '@/assets/images/brands/voltalia.png'
import imgWildberries from '@/assets/images/brands/wildberries.png'
import imgHalykBank from '@/assets/images/brands/halyk-bank.png'

interface CWGroup {
    type: 'cwg'
    id: number
    viewBox: string
    paths: string[]
    directionKey: string
    directionDescKey: string
    image: string
    fullnameKey: string
    positionKey: string
    companyImage: string
    textKey: string
    brands: string[]
}

interface WGMember {
    image: string
    nameKey: string
    positionKey: string
}

interface IWGroup {
    type: 'iwg'
    id: number
    viewBox: string
    paths: string[]
    nameKey: string
    descriptionKey: string
    chairNameKey: string
    chairPhoto: string
    // Optional override shown only in the detail view; falls back to chairPhoto (e.g. keep the card photo but use a placeholder in detail).
    chairDetailPhoto?: string
    chairPositionKey?: string
    chairBioKey?: string
    coChairNameKey: string
    coChairPhoto: string
    coChairPositionKey?: string
    coChairBioKey?: string
    stateMembers: WGMember[]
    councilBrands: string[]
}

type AnyGroup = CWGroup | IWGroup

function isCWG(g: AnyGroup): g is CWGroup {
    return g.type === 'cwg'
}

const activeTab = ref<'council' | 'interagency'>(props.interagencyOnly ? 'interagency' : 'council')
const selected = ref<AnyGroup | null>(null)

function selectTab(tab: 'council' | 'interagency') {
    activeTab.value = tab
    selected.value = null
}

const cwgGroups: CWGroup[] = [
    {
        type: 'cwg',
        id: 1,
        viewBox: '0 0 24 24',
        paths: ['M13 2L3 14h9l-1 8 10-12h-9l1-8z'],
        directionKey: 'workingGroupsPage.councilGroups.c1.name',
        directionDescKey: 'workingGroupsPage.councilGroups.c1.description',
        image: imgLeader6,
        fullnameKey: 'wg.johnZaidi',
        positionKey: 'wg.johnZaidiPos',
        companyImage: imgAcwaPower,
        textKey: 'wg.johnZaidiText',
        brands: [imgAdBank, imgAcwaPower, imgMasdar, imgEdf, imgTe, imgEyBrand, imgBdo, imgKostaLegal, imgDentos, imgAzizov, imgAirProd, imgSiemens],
    },
    {
        type: 'cwg',
        id: 2,
        viewBox: '0 0 24 24',
        paths: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
        directionKey: 'workingGroupsPage.councilGroups.c2.name',
        directionDescKey: 'workingGroupsPage.councilGroups.c2.description',
        image: imgLeader1,
        fullnameKey: 'wg.spartak',
        positionKey: 'wg.spartakPos',
        companyImage: imgTbc,
        textKey: 'wg.spartakText',
        brands: [imgAdBank, imgIdBank, imgWbGroup, imgMiCor, imgCola, imgHalyk, imgMitCo, imgTbcBank, imgJpMorgan, imgEBank, imgAwPart],
    },
    {
        type: 'cwg',
        id: 3,
        viewBox: '0 0 24 24',
        paths: [
            'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
            'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
            'M23 21v-2a4 4 0 0 0-3-3.87',
            'M16 3.13a4 4 0 0 1 0 7.75',
        ],
        directionKey: 'workingGroupsPage.councilGroups.c3.name',
        directionDescKey: 'workingGroupsPage.councilGroups.c3.description',
        image: imgSandro2,
        fullnameKey: 'wg.sandro',
        positionKey: 'wg.sandroPos',
        companyImage: imgIpoteka,
        textKey: 'wg.sandroText',
        brands: [
            imgOtpBank,
            imgHenleyPart,
            imgSojitz,
            imgGloboGate,
            imgKnauf,
            imgUzCarls,
            imgPwc,
            imgCentLaw,
            imgKostaLegal,
            imgTbcBank,
            imgAirProd,
            imgEpam,
            imgKpmg,
            imgEyBrand,
            imgBdo,
            imgYandeks,
            imgCrowe,
            imgVeon,
            imgChalikHolding,
            imgSuez,
            imgEdf,
            imgMiCor,
            imgIdBank,
            imgChinaSpg,
            imgHalyk,
            imgMasdar,
            imgBatBetter,
            imgTe,
            imgEnergyChina,
            imgAcwaPower,
            imgAdBank,
            imgIfc,
            imgCafa,
            imgAmcham,
            imgZiraatBank,
            imgOrano,
            imgVisa,
            imgItfc,
            imgMitCo,
            imgAlvarezMar,
            imgMastercard,
            imgCola,
            imgAksa,
            imgHudson,
            imgOzguven,
            imgMinistryIit,
        ],
    },
    {
        type: 'cwg',
        id: 4,
        viewBox: '0 0 24 24',
        paths: ['M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z'],
        directionKey: 'workingGroupsPage.councilGroups.c4.name',
        directionDescKey: 'workingGroupsPage.councilGroups.c4.description',
        image: imgLeader3,
        fullnameKey: 'wg.sergey',
        positionKey: 'wg.sergeyPos',
        companyImage: imgUzum,
        textKey: 'wg.sergeyText',
        brands: [
            imgSiemens,
            imgAdBank,
            imgWbGroup,
            imgCola,
            imgHalyk,
            imgEBank,
            imgSilverLeafe,
            imgSuez,
            imgTbcBank,
            imgChalikHolding,
            imgPwc,
            imgWhiteCase,
            imgDentos,
            imgFintech,
            imgYandeksUz,
        ],
    },
    {
        type: 'cwg',
        id: 5,
        viewBox: '0 0 24 24',
        paths: ['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z', 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'],
        directionKey: 'workingGroupsPage.councilGroups.c5.name',
        directionDescKey: 'workingGroupsPage.councilGroups.c5.description',
        image: imgLeader4,
        fullnameKey: 'wg.gayana',
        positionKey: 'wg.gayanaPos',
        companyImage: imgAcdfUz,
        textKey: 'wg.gayanaText',
        brands: [imgWbGroup, imgAcwaPower, imgTbcBank, imgUzumMarket, imgAcdfUz, imgEyBrand, imgHalyk, imgLekhim],
    },
    {
        type: 'cwg',
        id: 6,
        viewBox: '0 0 24 24',
        paths: ['M18 20V10', 'M12 20V4', 'M6 20v-6'],
        directionKey: 'workingGroupsPage.councilGroups.c6.name',
        directionDescKey: 'workingGroupsPage.councilGroups.c6.description',
        image: imgLeader5,
        fullnameKey: 'wg.erlan',
        positionKey: 'wg.erlanPos',
        companyImage: imgEy,
        textKey: 'wg.erlanText',
        brands: [
            imgAiiBank,
            imgIndoorama,
            imgAvesta,
            imgBatBetter,
            imgDeloitte,
            imgSuez,
            imgSasaIntern,
            imgAzizov,
            imgAmcham,
            imgPwc,
            imgUzCarls,
            imgAdBank,
            imgMasdar,
            imgMiCor,
            imgEyBrand,
            imgCola,
            imgMastercard,
        ],
    },
]

const iwgGroups: IWGroup[] = [
    {
        type: 'iwg',
        id: 1,
        viewBox: '0 0 24 24',
        paths: ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
        nameKey: 'workingGroupsPage.interagencyGroups.i1.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i1.description',
        chairNameKey: 'wg.laziz',
        chairPhoto: imgLaziz,
        chairPositionKey: 'wg.lazizPos',
        chairBioKey: 'wg.lazizBio',
        coChairNameKey: 'wg.kazbek',
        coChairPhoto: imgKazbek,
        coChairPositionKey: 'wg.kazbekPos',
        coChairBioKey: 'wg.kazbekBio',
        stateMembers: [
            { image: imgTimur, nameKey: 'wg.timur', positionKey: 'wg.posCentralBankChair' },
            { image: usrAkbar, nameKey: 'wg.akbarTashkulov', positionKey: 'wg.posJusticeMinister' },
            { image: usrPak, nameKey: 'wg.vyacheslavPak', positionKey: 'wg.posNappDeputy' },
            { image: usrSherzod, nameKey: 'wg.sherzodShermatov', positionKey: 'wg.posDigitalMinister' },
            { image: defaultAvatar, nameKey: 'wg.tashov', positionKey: 'wg.posActingStockExchange' },
            { image: defaultAvatar, nameKey: 'wg.karamatov', positionKey: 'wg.posItPark' },
            { image: usrIlxom, nameKey: 'wg.ilkhom', positionKey: 'wg.posFirstDeputyEcoFin' },
            { image: usrFarrux, nameKey: 'wg.farrukh', positionKey: 'wg.posTaxChairman' },
            { image: usrShuxrat, nameKey: 'wg.shukhratVafaev', positionKey: 'wg.posRdfDirector' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepKostaLegal' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepIfc' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepAdb' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepEbrd' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepFicMembers' },
            { image: defaultAvatar, nameKey: 'wg.temirov', positionKey: 'wg.posSecretary' },
        ],
        councilBrands: [imgEBank, imgAdBank, imgIfc, imgEyBrand, imgMastercard, imgTbcBank, imgCentLaw],
    },
    {
        type: 'iwg',
        id: 2,
        viewBox: '0 0 24 24',
        paths: [
            'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
            'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
            'M23 21v-2a4 4 0 0 0-3-3.87',
            'M16 3.13a4 4 0 0 1 0 7.75',
        ],
        nameKey: 'workingGroupsPage.interagencyGroups.i2.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i2.description',
        chairNameKey: 'wg.timur',
        chairPhoto: imgTimur,
        chairPositionKey: 'wg.timurPos',
        chairBioKey: 'wg.timurBio',
        coChairNameKey: 'wg.davron',
        coChairPhoto: imgDavron,
        coChairPositionKey: 'wg.davronPos',
        coChairBioKey: 'wg.davronBio',
        stateMembers: [
            { image: usrMaxmud, nameKey: 'wg.maxmudIstamov', positionKey: 'wg.posDeputyJustice' },
            { image: usrAxadbek, nameKey: 'wg.ahadbek', positionKey: 'wg.posDeputyEcoFin' },
            { image: usrJaxongirAbdiyev, nameKey: 'wg.jahongirAbdiev', positionKey: 'wg.posDeputyTax' },
            { image: usrGeorgiy, nameKey: 'wg.georgiyParesishvili', positionKey: 'wg.posStockExchange' },
        ],
        councilBrands: [imgEBank, imgAdBank, imgIfc, imgEyBrand, imgZiraatBank, imgCrowe, imgAzizov, imgIndoorama, imgVeon],
    },
    {
        type: 'iwg',
        id: 3,
        viewBox: '0 0 24 24',
        paths: ['M18 20V10', 'M12 20V4', 'M6 20v-6'],
        nameKey: 'workingGroupsPage.interagencyGroups.i3.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i3.description',
        chairNameKey: 'wg.laziz',
        chairPhoto: imgLaziz,
        chairPositionKey: 'wg.lazizPos',
        chairBioKey: 'wg.lazizBio',
        coChairNameKey: 'wg.vera',
        coChairPhoto: imgVera,
        coChairPositionKey: 'wg.veraPos',
        coChairBioKey: 'wg.veraBio',
        stateMembers: [
            { image: defaultAvatar, nameKey: 'wg.istamov', positionKey: 'wg.posDeputyJustice' },
            { image: usrIlxom, nameKey: 'wg.ilkhom', positionKey: 'wg.posFirstDeputyEcoFin' },
            { image: usrFeruza, nameKey: 'wg.feruzaEshmatova', positionKey: 'wg.posOmbudsperson' },
            { image: defaultAvatar, nameKey: 'wg.buriev', positionKey: 'wg.posBusinessOmbudsman' },
            { image: usrObidjon, nameKey: 'wg.obidjonKudratov', positionKey: 'wg.posEcologyDeputy' },
            { image: usrMarat, nameKey: 'wg.maratJuraev', positionKey: 'wg.posDeputyPoverty' },
            { image: defaultAvatar, nameKey: 'wg.byPositionShort', positionKey: 'wg.posFirstDeputyAntiCorruption' },
            { image: usrFarrux, nameKey: 'wg.farrukhKarabaev', positionKey: 'wg.posCompetition' },
            { image: usrAgzam, nameKey: 'wg.rustemMahmammadiev', positionKey: 'wg.posStatistics' },
            { image: defaultAvatar, nameKey: 'wg.fayzibaev', positionKey: 'wg.posFirstDeputyTax' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepIfc' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepAdb' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepEbrd' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepFicMembers' },
            { image: defaultAvatar, nameKey: 'wg.kushmatov', positionKey: 'wg.posDeputySecretary' },
        ],
        councilBrands: [imgEBank, imgAdBank, imgIfc, imgAzizov, imgCrowe, imgVoltalia, imgBatBetter, imgMiCor, imgCola, imgIndoorama, imgVeon],
    },
    {
        type: 'iwg',
        id: 4,
        viewBox: '0 0 24 24',
        paths: ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', 'M12 7v.01M12 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'],
        nameKey: 'workingGroupsPage.interagencyGroups.i4.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i4.description',
        chairNameKey: 'wg.kongratbay',
        chairPhoto: imgKongratbay,
        chairPositionKey: 'wg.kongratbayPos',
        chairBioKey: 'wg.kongratbayBio',
        coChairNameKey: 'wg.kadyrov',
        coChairPhoto: defaultAvatar,
        coChairPositionKey: 'wg.kadyrovPos',
        coChairBioKey: 'wg.kadyrovBio',
        stateMembers: [
            { image: defaultAvatar, nameKey: 'wg.husainov', positionKey: 'wg.posMgmtEfficiency' },
            { image: defaultAvatar, nameKey: 'wg.salikhov', positionKey: 'wg.posPublicPolicyRector' },
            { image: usrBotir, nameKey: 'wg.botirZahidov', positionKey: 'wg.posEmployment' },
            { image: defaultAvatar, nameKey: 'wg.aliev', positionKey: 'wg.posDeputyInvestMinister' },
            { image: usrBexzod, nameKey: 'wg.bexzodMusaev', positionKey: 'wg.posLaborMigration' },
            { image: usrDavron, nameKey: 'wg.davronVahobov', positionKey: 'wg.posChamber' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepIfc' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepAdb' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepEbrd' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepFicMembers' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posMinHigherEduSecretary' },
        ],
        councilBrands: [imgEBank, imgAdBank, imgIfc, imgUzCarls, imgVeon, imgBdo, imgEyBrand, imgIndoorama, imgCrowe],
    },
    {
        type: 'iwg',
        id: 5,
        viewBox: '0 0 24 24',
        paths: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
        nameKey: 'workingGroupsPage.interagencyGroups.i5.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i5.description',
        chairNameKey: 'wg.vyacheslavPak',
        chairPhoto: usrPak,
        chairDetailPhoto: defaultAvatar,
        chairPositionKey: 'wg.pakChairPos',
        chairBioKey: 'wg.pakBio',
        coChairNameKey: 'wg.hammerson',
        coChairPhoto: defaultAvatar,
        coChairPositionKey: 'wg.hammersonPos',
        coChairBioKey: 'wg.hammersonBio',
        stateMembers: [
            { image: defaultAvatar, nameKey: 'wg.istamov', positionKey: 'wg.posDeputyJustice' },
            { image: usrIlxom, nameKey: 'wg.ilkhom', positionKey: 'wg.posFirstDeputyEcoFin' },
            { image: defaultAvatar, nameKey: 'wg.tashov', positionKey: 'wg.posActingStockExchange' },
            { image: defaultAvatar, nameKey: 'wg.aliev', positionKey: 'wg.posDeputyInvestMinister' },
            { image: defaultAvatar, nameKey: 'wg.murodov', positionKey: 'wg.posStateAssetsDirector' },
            { image: usrDavron, nameKey: 'wg.davronVahobov', positionKey: 'wg.posChamber' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepIfc' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepAdb' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepEbrd' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepFicMembers' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posNappSecretary' },
        ],
        councilBrands: [
            imgEBank,
            imgAdBank,
            imgIfc,
            imgDentos,
            imgCrowe,
            imgKostaLegal,
            imgCentLaw,
            imgAzizov,
            imgBatBetter,
            imgMiCor,
            imgIndoorama,
            imgVeon,
            imgAvesta,
        ],
    },
    {
        type: 'iwg',
        id: 6,
        viewBox: '0 0 24 24',
        paths: ['M22 12h-4l-3 9L9 3l-3 9H2'],
        nameKey: 'workingGroupsPage.interagencyGroups.i6.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i6.description',
        chairNameKey: 'wg.ahadbek',
        chairPhoto: imgAxadbek2,
        chairPositionKey: 'wg.ahadbekPos',
        chairBioKey: 'wg.ahadbekBio',
        coChairNameKey: 'wg.erlan',
        coChairPhoto: imgErlan2,
        coChairPositionKey: 'wg.dosimbekovPos',
        coChairBioKey: 'wg.erlanText',
        stateMembers: [
            { image: defaultAvatar, nameKey: 'wg.istamov', positionKey: 'wg.posDeputyJustice' },
            { image: usrFarrux, nameKey: 'wg.farrukh', positionKey: 'wg.posTaxChairman' },
            { image: defaultAvatar, nameKey: 'wg.aliev', positionKey: 'wg.posDeputyInvestMinister' },
            { image: usrDavron, nameKey: 'wg.davronVahobov', positionKey: 'wg.posChamber' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepIfc' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepAdb' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepEbrd' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepFicMembers' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posMinEcoFinSecretary' },
        ],
        councilBrands: [imgEBank, imgAdBank, imgIfc, imgDeloitte, imgPwc, imgDentos, imgBatBetter, imgCrowe, imgIndoorama, imgSuez],
    },
    {
        type: 'iwg',
        id: 7,
        viewBox: '0 0 24 24',
        paths: ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
        nameKey: 'workingGroupsPage.interagencyGroups.i7.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i7.description',
        chairNameKey: 'wg.turdiev',
        chairPhoto: defaultAvatar,
        chairPositionKey: 'wg.turdievPos',
        chairBioKey: 'wg.turdievBio',
        coChairNameKey: 'wg.azizbekAkhmadjonov',
        coChairPhoto: imgAziz2,
        coChairPositionKey: 'wg.azizbekAkhmadjonovPos',
        coChairBioKey: 'wg.azizbekAkhmadjonovBio',
        stateMembers: [
            { image: defaultAvatar, nameKey: 'wg.kutbiev', positionKey: 'wg.posUrbanization' },
            { image: usrMaxmud, nameKey: 'wg.istamov', positionKey: 'wg.posDeputyJustice' },
            { image: defaultAvatar, nameKey: 'wg.abdurakhmonov', positionKey: 'wg.posAgriMinister' },
            { image: usrAxadbek, nameKey: 'wg.ahadbek', positionKey: 'wg.posDeputyEcoFin' },
            { image: defaultAvatar, nameKey: 'wg.aliev', positionKey: 'wg.posDeputyInvestMinister' },
            { image: defaultAvatar, nameKey: 'wg.murodov', positionKey: 'wg.posAuctionCenter' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepIfc' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepAdb' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepEbrd' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepFicMembers' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posCadastreSecretary' },
        ],
        councilBrands: [imgEBank, imgAdBank, imgIfc, imgAzizov, imgTe, imgCrowe, imgVoltalia, imgIndoorama, imgEyBrand, imgMastercard],
    },
    {
        type: 'iwg',
        id: 8,
        viewBox: '0 0 24 24',
        paths: [
            'M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3',
            'M9 21h6m-3-3v3',
            'M13 13h8a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z',
        ],
        nameKey: 'workingGroupsPage.interagencyGroups.i8.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i8.description',
        chairNameKey: 'wg.jurabek',
        chairPhoto: imgJurabek2,
        chairPositionKey: 'wg.jurabekPos',
        chairBioKey: 'wg.jurabekBio',
        coChairNameKey: 'wg.johnZaidi',
        coChairPhoto: imgLeader6,
        coChairPositionKey: 'wg.zaidiPos',
        coChairBioKey: 'wg.johnZaidiText',
        stateMembers: [
            { image: usrXurshid, nameKey: 'wg.khurshedMustafaev', positionKey: 'wg.posDeputyEcoFin' },
            { image: defaultAvatar, nameKey: 'wg.pekos', positionKey: 'wg.posFirstDeputyDigital' },
            { image: defaultAvatar, nameKey: 'wg.aliev', positionKey: 'wg.posDeputyInvestMinister' },
            { image: defaultAvatar, nameKey: 'wg.khodjaev', positionKey: 'wg.posElectricityMarket' },
            { image: usrAskar, nameKey: 'wg.askarIsakov', positionKey: 'wg.posUztransgaz' },
            { image: usrAsrar, nameKey: 'wg.asrarjonAskarov', positionKey: 'wg.posHududiy' },
            { image: usrJaxongir, nameKey: 'wg.jahongirObidjonov', positionKey: 'wg.posUzenergo' },
            { image: usrNodirbek, nameKey: 'wg.nodirbekNasretdinov', positionKey: 'wg.posYashilEnergiya' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepIfc' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepAdb' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepEbrd' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepFicMembers' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posMinEnergySecretary' },
        ],
        councilBrands: [
            imgEBank,
            imgAdBank,
            imgIfc,
            imgMasdar,
            imgTe,
            imgEdf,
            imgDentos,
            imgEyBrand,
            imgSiemens,
            imgAzizov,
            imgCentLaw,
            imgMiCor,
            imgCrowe,
            imgVoltalia,
            imgMitCo,
            imgIndoorama,
        ],
    },
    {
        type: 'iwg',
        id: 9,
        viewBox: '0 0 24 24',
        paths: ['M13 2L3 14h9l-1 8 10-12h-9l1-8z'],
        nameKey: 'workingGroupsPage.interagencyGroups.i9.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i9.description',
        chairNameKey: 'wg.azizAbdukhakimov',
        chairPhoto: imgAzizA,
        chairPositionKey: 'wg.azizAbdukhakimovPos',
        chairBioKey: 'wg.azizAbdukhakimovBio',
        coChairNameKey: 'wg.kazumasa',
        coChairPhoto: imgMukae,
        coChairPositionKey: 'wg.kazumasaPos',
        coChairBioKey: 'wg.kazumasaBio',
        stateMembers: [
            { image: usrIlxom, nameKey: 'wg.ilkhom', positionKey: 'wg.posDeputyEcoFin' },
            { image: defaultAvatar, nameKey: 'wg.mamadaminov', positionKey: 'wg.posDeputyEnergyMinister' },
            { image: defaultAvatar, nameKey: 'wg.ishpulatov', positionKey: 'wg.posDeputyWaterMinister' },
            { image: defaultAvatar, nameKey: 'wg.aliev', positionKey: 'wg.posDeputyInvestMinister' },
            { image: defaultAvatar, nameKey: 'wg.hasanov', positionKey: 'wg.posWasteAgency' },
            { image: usrFarrux, nameKey: 'wg.farrukh', positionKey: 'wg.posTaxChairman' },
            { image: defaultAvatar, nameKey: 'wg.suvankulov', positionKey: 'wg.posUzsuv' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepIfc' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepAdb' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepEbrd' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepFicMembers' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posEcoCommitteeSecretary' },
        ],
        councilBrands: [imgEBank, imgAdBank, imgIfc, imgEyBrand, imgZiraatBank, imgCrowe, imgAzizov, imgIndoorama, imgVeon],
    },
    {
        type: 'iwg',
        id: 10,
        viewBox: '0 0 24 24',
        paths: ['M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z', 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'],
        nameKey: 'workingGroupsPage.interagencyGroups.i10.name',
        descriptionKey: 'workingGroupsPage.interagencyGroups.i10.description',
        chairNameKey: 'wg.sherzodShermatov',
        chairPhoto: usrSherzod,
        chairDetailPhoto: defaultAvatar,
        chairPositionKey: 'wg.sherzodChairPos',
        chairBioKey: 'wg.sherzodShermatovBio',
        coChairNameKey: 'wg.nastradin',
        coChairPhoto: defaultAvatar,
        coChairPositionKey: 'wg.nastradinPos',
        coChairBioKey: 'wg.nastradinBio',
        stateMembers: [
            { image: defaultAvatar, nameKey: 'wg.bakhodjaev', positionKey: 'wg.posPresidentDeptFintech' },
            { image: defaultAvatar, nameKey: 'wg.istamov', positionKey: 'wg.posDeputyJustice' },
            { image: defaultAvatar, nameKey: 'wg.aliev', positionKey: 'wg.posDeputyInvestMinister' },
            { image: defaultAvatar, nameKey: 'wg.karamatov', positionKey: 'wg.posItPark' },
            { image: usrFarrux, nameKey: 'wg.farrukh', positionKey: 'wg.posTaxChairman' },
            { image: defaultAvatar, nameKey: 'wg.mardiev', positionKey: 'wg.posEnterpriseUz' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepIfc' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepAdb' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepEbrd' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posRepFicMembers' },
            { image: defaultAvatar, nameKey: 'wg.byPosition', positionKey: 'wg.posDigitalMinSecretary' },
        ],
        councilBrands: [
            imgEBank,
            imgAdBank,
            imgIndoorama,
            imgDentos,
            imgCrowe,
            imgHalykBank,
            imgYandeks,
            imgAcwaPower,
            imgWildberries,
            imgMiCor,
            imgCafa,
            imgBdo,
            imgIpoteka,
            imgUzum,
            imgEnergyChina,
        ],
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
    .wg-stat-tabs {
        grid-template-columns: 1fr;
    }
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
    cursor: pointer;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
}

.wg-stat-tab:hover {
    border-color: rgba(25, 28, 31, 0.25);
    box-shadow: 0 8px 24px rgba(25, 28, 31, 0.07);
    transform: translateY(-2px);
}

.wg-stat-tab--active {
    border-color: #191c1f;
    background: #191c1f;
}

.wg-stat-tab--active:hover {
    border-color: #191c1f;
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

.wg-stat-tab--active .wg-stat-tab__count {
    color: #fff;
}

.wg-stat-tab--active .wg-stat-tab__label {
    color: rgba(255, 255, 255, 0.7);
}

.diamond-wrapper {
    width: 56px;
    height: 56px;
    transform: rotate(45deg);
    border-radius: 14px;
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
