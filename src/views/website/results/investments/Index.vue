<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t, locale } = useI18n();
const router = useRouter();

type Stat = {
  value?: number;
  raw?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  labelKey: string;
};

const stats: Stat[] = [
  { value: 135, prefix: ">$", suffix: " B", decimals: 0, labelKey: "investments.gdp" },
  { value: 7.7, prefix: "", suffix: "%", decimals: 1, labelKey: "investments.gdpGrowth" },
  { value: 42, prefix: "~$", suffix: " B", decimals: 0, labelKey: "investments.foreignInflow" },
  { raw: "BB", labelKey: "investments.rating" },
  { value: 55, prefix: "$", suffix: " B", decimals: 0, labelKey: "investments.reserves" },
  { value: 7.3, prefix: "", suffix: "%", decimals: 1, labelKey: "investments.inflation" },
  { value: 23, prefix: "+", suffix: "%", decimals: 0, labelKey: "investments.exportGrowth" },
  { value: 31.9, prefix: "", suffix: "%", decimals: 1, labelKey: "investments.totalInvestment" },
  { value: 4.8, prefix: "", suffix: "%", decimals: 1, labelKey: "investments.unemployment" },
];

function formatStat(stat: Stat, currentVal: number): string {
  const decimals = stat.decimals ?? 0;
  const sep = locale.value === "en" ? "." : ",";
  const formatted =
    decimals > 0
      ? currentVal.toFixed(decimals).replace(".", sep)
      : Math.floor(currentVal).toString();
  return `${stat.prefix ?? ""}${formatted}${stat.suffix ?? ""}`;
}

const displayValues = ref(
  stats.map((stat) => (stat.raw !== undefined ? stat.raw : formatStat(stat, 0)))
);
const statsContainer = ref<HTMLElement | null>(null);
const statsVisible = ref(false);
const hasAnimated = ref(false);
let observer: IntersectionObserver | null = null;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function animateCountUp() {
  if (hasAnimated.value) return;
  hasAnimated.value = true;
  statsVisible.value = true;

  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);
    stats.forEach((stat, index) => {
      if (stat.raw !== undefined) return;
      displayValues.value[index] = formatStat(stat, easedProgress * (stat.value ?? 0));
    });
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

watch(
  statsContainer,
  (el) => {
    if (!el || hasAnimated.value) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      animateCountUp();
      return;
    }
    observer?.disconnect();
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          animateCountUp();
          observer?.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
  },
  { immediate: true }
);

onBeforeUnmount(() => observer?.disconnect());

function boldStats(text: string): string {
  return text.replace(
    /(~?\$[\d.,]+\s*(?:bn|B|млрд|mlrd\s*dollar)?|\d[\d.,]*\s*(?:million|миллиона|million)?%|\d[\d.,]+\s*million|\d[\d.,]+\s*миллиона|\d[\d.,]*%|\b\d{4}\b|\bBB\b|\bBa3\b)/g,
    "<strong>$1</strong>"
  );
}

const timeline = [
  { year: "2017", textKey: "investments.timeline.y2017" },
  { year: "2019", textKey: "investments.timeline.y2019" },
  { year: "2024", textKey: "investments.timeline.y2024" },
  { year: "2025", textKey: "investments.timeline.y2025" },
  { year: "2026", textKey: "investments.timeline.y2026" },
];

const sectors = [
  {
    nameKey: "investments.sector.energy",
    icon: ["M13 2L4 14h7l-1 8 9-12h-7z"],
    points: ["investments.sector.energyP1", "investments.sector.energyP2", "investments.sector.energyP3"],
  },
  {
    nameKey: "investments.sector.digital",
    icon: ["M7 7h10v10H7z", "M10 10h4v4h-4z", "M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"],
    points: ["investments.sector.digitalP1", "investments.sector.digitalP2", "investments.sector.digitalP3"],
  },
  {
    nameKey: "investments.sector.infra",
    icon: ["M3 21h18", "M5 21V5l8-2v18", "M13 21V9l6 2v10", "M8 8h2M8 12h2M8 16h2"],
    points: ["investments.sector.infraP1", "investments.sector.infraP2", "investments.sector.infraP3"],
  },
  {
    nameKey: "investments.sector.finance",
    icon: ["M3 10l9-6 9 6", "M5 10v8M9 10v8M15 10v8M19 10v8", "M3 21h18"],
    points: ["investments.sector.financeP1", "investments.sector.financeP2", "investments.sector.financeP3"],
  },
  {
    nameKey: "investments.sector.mfg",
    icon: ["M3 21V10l6 4V10l6 4V7l6 4v10z", "M3 21h18"],
    points: ["investments.sector.mfgP1", "investments.sector.mfgP2", "investments.sector.mfgP3"],
  },
  {
    nameKey: "investments.sector.mining",
    icon: ["M6 3h12l3 6-9 12L3 9z", "M3 9h18M9 3l-3 6 6 12M15 3l3 6-6 12"],
    points: ["investments.sector.miningP1", "investments.sector.miningP2", "investments.sector.miningP3"],
  },
];

const guarantees = [
  {
    icon: ["M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z", "M9 12l2 2 4-4"],
    termKey: "investments.g1term",
    textKey: "investments.g1text",
  },
  {
    icon: ["M19 5L5 19", "M7.5 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z", "M16.5 14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"],
    termKey: "investments.g2term",
    textKey: "investments.g2text",
  },
  {
    icon: ["M5 5h13a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H10l-4 3v-3H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z", "M8 9h7M8 12h4"],
    termKey: "investments.g3term",
    textKey: "investments.g3text",
  },
  {
    icon: ["M12 4v15", "M6 19h12", "M5 8h14", "M5 8l-2.5 5a2.5 2.5 0 0 0 5 0z", "M19 8l-2.5 5a2.5 2.5 0 0 0 5 0z"],
    termKey: "investments.g4term",
    textKey: "investments.g4text",
  },
  {
    icon: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M3.5 9h17M3.5 15h17", "M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18"],
    termKey: "investments.g5term",
    textKey: "investments.g5text",
  },
];
</script>

<template>
  <div>

    <!-- ===== Intro ===== -->
    <section class="bg-white py-16 md:py-24">
      <div class="page-container">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:items-start">
          <div>
            <span class="text-[13px] text-[#8a94a6] font-semibold uppercase tracking-widest">
              {{ t("investments.introEyebrow") }}
            </span>
            <h2 class="mt-3 font-bold text-[17px] text-[#1a1e2e] md:text-[clamp(22px,2.5vw,30px)] leading-snug">
              {{ t("investments.introHeading") }}
            </h2>
          </div>
          <div class="flex flex-col gap-4 text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed">
            <p v-html="boldStats(t('investments.intro1'))"></p>
            <p v-html="boldStats(t('investments.intro2'))"></p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Key macro indicators ===== -->
    <section class="bg-[#f7f8fa] py-16 md:py-24">
      <div class="page-container">
        <div class="mb-10 md:mb-14 text-center">
          <span class="text-[13px] text-[#8a94a6] font-semibold uppercase tracking-widest">
            {{ t("resultsPage.investmentsPage.macroEyebrow") }}
          </span>
          <h2 class="section-title mt-3">
            {{ t("resultsPage.investmentsPage.macroTitle") }}
          </h2>
          <p class="mt-3 mx-auto max-w-[520px] text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed">
            {{ t("resultsPage.investmentsPage.macroSub") }}
          </p>
        </div>

        <div
          ref="statsContainer"
          class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
        >
          <div
            v-for="(stat, index) in stats"
            :key="stat.labelKey"
            class="flex flex-col rounded-2xl border border-[#eef0f4] bg-white shadow-[0_2px_24px_rgba(0,0,0,0.07)] p-5 md:p-7 transition-[opacity,transform,box-shadow] duration-[600ms] ease-out hover:shadow-[0_4px_32px_rgba(0,0,0,0.12)] hover:border-[#d0d5dd]"
            :class="statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: statsVisible ? `${index * 60}ms` : '0ms' }"
          >
            <div class="font-black text-[clamp(24px,3vw,40px)] leading-none tracking-tight text-[#1a1e2e]">
              {{ displayValues[index] }}
            </div>
            <div class="mt-auto pt-4 text-[13px] text-[#8a94a6] leading-snug">
              {{ t(stat.labelKey) }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Reform trajectory timeline ===== -->
    <section class="bg-white py-16 md:py-24">
      <div class="page-container">
        <div class="mb-10 md:mb-14 text-center">
          <span class="text-[13px] text-[#8a94a6] font-semibold uppercase tracking-widest">
            {{ t("investments.timeline.eyebrow") }}
          </span>
          <h2 class="section-title mt-3">
            {{ t("investments.timeline.title") }}
          </h2>
          <p class="mt-3 mx-auto max-w-[520px] text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed">
            {{ t("investments.timeline.sub") }}
          </p>
        </div>

        <ol class="relative mt-10 lg:mt-14">
          <!-- Spine -->
          <div
            class="pointer-events-none absolute top-1 bottom-10 left-[11px] lg:left-1/2 lg:-translate-x-px border-l border-dashed border-[#eef0f4]"
            aria-hidden="true"
          ></div>

          <li
            v-for="(item, index) in timeline"
            :key="`tl-${index}`"
            class="relative pl-11 pb-7 last:pb-0 lg:pl-0 lg:pb-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-x-10"
          >
            <!-- Card -->
            <div
              class="rounded-2xl border border-[#eef0f4] bg-white shadow-[0_2px_24px_rgba(0,0,0,0.07)] p-5 md:p-7 lg:row-start-1 lg:max-w-[430px]"
              :class="index % 2 === 0 ? 'lg:col-start-1 lg:justify-self-end' : 'lg:col-start-3 lg:justify-self-start'"
            >
              <div class="flex items-center justify-between gap-3 mb-3">
                <span
                  class="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#f7f8fa] text-[#1a1e2e]"
                  aria-hidden="true"
                >
                  <svg class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none">
                    <path d="M4 15l5-5 4 4 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15 7h5v5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                <span class="lg:hidden flex-none px-3 py-1 rounded-full bg-[#1a1e2e] text-white text-[12px] font-bold tracking-wide">
                  {{ item.year }}
                </span>
              </div>
              <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed">
                {{ t(item.textKey) }}
              </p>
            </div>

            <!-- Node -->
            <span
              class="absolute top-2 left-[11px] -translate-x-1/2 flex items-center justify-center w-[18px] h-[18px] rounded-full border-2 border-[#eef0f4] bg-white shadow-[0_0_0_5px_white] lg:static lg:col-start-2 lg:row-start-1 lg:justify-self-center lg:translate-x-0"
              aria-hidden="true"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-[#1a1e2e]"></span>
            </span>

            <!-- Big faded year (desktop only) -->
            <span
              class="hidden lg:block lg:row-start-1 font-black text-[clamp(40px,4vw,62px)] leading-none text-[#1a1e2e]/[0.07]"
              :class="index % 2 === 0 ? 'lg:col-start-3 lg:justify-self-start lg:pl-2' : 'lg:col-start-1 lg:justify-self-end lg:pr-2 lg:text-right'"
              aria-hidden="true"
            >
              {{ item.year }}
            </span>
          </li>

          <!-- Closing arrow -->
          <li class="relative h-10" aria-hidden="true">
            <svg
              class="absolute top-0.5 left-[11px] -translate-x-1/2 lg:left-1/2 w-5 h-5 text-[#8a94a6]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M12 4v15M6 13l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </li>
        </ol>
      </div>
    </section>

    <!-- ===== Sectors for investment ===== -->
    <section class="bg-[#f7f8fa] py-16 md:py-24">
      <div class="page-container">
        <div class="mb-10 md:mb-14 text-center">
          <span class="text-[13px] text-[#8a94a6] font-semibold uppercase tracking-widest">
            {{ t("resultsPage.investmentsPage.sectorsEyebrow") }}
          </span>
          <h2 class="section-title mt-3">
            {{ t("resultsPage.investmentsPage.sectorsTitle") }}
          </h2>
          <p class="mt-3 mx-auto max-w-[520px] text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed">
            {{ t("resultsPage.investmentsPage.sectorsIntro") }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <article
            v-for="sector in sectors"
            :key="sector.nameKey"
            class="group flex flex-col rounded-2xl border border-[#eef0f4] bg-white shadow-[0_2px_24px_rgba(0,0,0,0.07)] p-5 md:p-7 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:border-[#d0d5dd] transition-all duration-300"
          >
            <div class="flex items-center gap-3 mb-5">
              <span
                class="inline-flex flex-none items-center justify-center w-11 h-11 rounded-xl border border-[#eef0f4] bg-[#f7f8fa] text-[#1a1e2e] transition-all duration-300 group-hover:bg-[#1a1e2e] group-hover:text-white group-hover:border-[#1a1e2e]"
                aria-hidden="true"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    v-for="(d, di) in sector.icon"
                    :key="di"
                    :d="d"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <h3 class="font-bold text-[17px] text-[#1a1e2e] leading-snug">
                {{ t(sector.nameKey) }}
              </h3>
            </div>
            <ul class="mt-auto flex flex-col gap-2.5">
              <li
                v-for="(pointKey, pi) in sector.points"
                :key="pi"
                class="relative pl-5 text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed before:content-[''] before:absolute before:top-[10px] before:left-0 before:w-2 before:h-0.5 before:rounded before:bg-[#8a94a6]"
              >
                {{ t(pointKey) }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- ===== Guarantees ===== -->
    <section class="bg-white py-16 md:py-24">
      <div class="page-container">
        <div class="mb-10 md:mb-14 text-center">
          <h2 class="section-title">
            {{ t("resultsPage.investmentsPage.guaranteesTitle") }}
          </h2>
          <p class="mt-3 mx-auto max-w-[520px] text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed">
            {{ t("resultsPage.investmentsPage.guaranteesSub") }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <article
            v-for="(item, index) in guarantees"
            :key="index"
            class="group flex gap-4 rounded-2xl border border-[#eef0f4] bg-white shadow-[0_2px_24px_rgba(0,0,0,0.07)] p-5 md:p-7 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:border-[#d0d5dd] transition-all duration-300"
          >
            <span
              class="inline-flex flex-none items-center justify-center w-11 h-11 rounded-xl border border-[#eef0f4] bg-[#f7f8fa] text-[#1a1e2e] transition-all duration-300 group-hover:bg-[#1a1e2e] group-hover:text-white group-hover:border-[#1a1e2e]"
              aria-hidden="true"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path
                  v-for="(d, di) in item.icon"
                  :key="di"
                  :d="d"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <p class="text-[clamp(15px,1.3vw,18px)] text-[#444] leading-relaxed">
              <span class="block mb-1 font-bold text-[17px] text-[#1a1e2e]">{{ t(item.termKey) }}</span>
              {{ t(item.textKey) }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- ===== Data sources ===== -->
    <div class="page-container pb-16 md:pb-24">
      <div
        class="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#f7f8fa] border border-[#eef0f4] cursor-pointer hover:border-[#d0d5dd] transition-colors duration-200"
        @click="router.push({ name: 'results-documents' })"
      >
        <i class="icon-file-text flex-none text-lg text-[#8a94a6]"></i>
        <div class="flex-1 min-w-0">
          <span class="block text-[11px] font-semibold text-[#1a1e2e] uppercase tracking-widest mb-0.5">
            {{ t("investments.sourcesLabel") }}
          </span>
          <span class="text-[13px] text-[#8a94a6] leading-relaxed">
            {{ t("investments.sourcesText") }}
          </span>
        </div>
        <span
          class="flex-none inline-flex items-center gap-2 border border-[#d0d5dd] text-[#1a1e2e] font-semibold text-[15px] px-5 py-2 rounded-full transition-all duration-200 hover:bg-[#1a1e2e] hover:text-white hover:border-[#1a1e2e] whitespace-nowrap"
        >
          {{ t("common.viewDocuments") }}
          <i class="icon-move-right text-base"></i>
        </span>
      </div>
    </div>

  </div>
</template>
