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
                <div v-loading="membersStore.loading" class="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-5">
                    <div
                        v-for="item in memberSections[activeTab].items"
                        :key="item.id"
                        class="group flex overflow-hidden bg-white border border-[#eef0f4] rounded-2xl shadow-[0_2px_12px_rgba(25,28,31,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d0d5dd] hover:shadow-[0_12px_36px_rgba(25,28,31,0.10)]"
                    >
                        <!-- Logo box -->
                        <div
                            class="shrink-0 flex items-center justify-center w-[160px] md:w-[200px] lg:w-[240px] bg-[#f7f8fa] border-r border-[#eef0f4] p-6 md:p-8 transition-colors duration-300 group-hover:bg-[#f0f1f3]"
                        >
                            <img
                                :src="item.image"
                                :alt="item.name"
                                class="max-w-full max-h-[100px] md:max-h-[130px] lg:max-h-[150px] object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <!-- Info -->
                        <div class="flex-1 flex flex-col justify-center gap-3 px-6 py-6 lg:px-8 lg:py-8 min-w-0">
                            <h3
                                class="text-[17px] md:text-[20px] lg:text-[24px] font-extrabold uppercase tracking-[0.02em] leading-tight text-[#191c1f]"
                            >
                                {{ item.name }}
                            </h3>
                            <p v-if="item.bio" class="text-[14px] md:text-[15px] lg:text-[16px] leading-[165%] text-[#8a94a6]">
                                {{ item.bio }}
                            </p>
                        </div>
                    </div>
                </div>

                <el-empty
                    v-if="!membersStore.loading && memberSections[activeTab].items.length === 0"
                    :description="$t('common.noData')"
                    class="py-10"
                />
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCouncilMembersStore } from '@/features/councilMembers/store'
import { resolveTranslation } from '@/utils/i18n'
import { getMediaUrl } from '@/utils/media'
import type { MemberType } from '@/features/councilMembers/types'

const { locale, t } = useI18n()
const membersStore = useCouncilMembersStore()

interface DisplayCompany {
    id: string
    image: string
    name: string
    bio: string
}

function mapByType(type: MemberType): DisplayCompany[] {
    return membersStore.items
        .filter((m) => m.status && m.type === type)
        .map((m) => ({
            id: m.id,
            image: getMediaUrl(m.logoId),
            name: resolveTranslation(m.name, locale.value),
            bio: m.description ? resolveTranslation(m.description, locale.value) : '',
        }))
}

const memberSections = computed(() => {
    const sections = [
        { title: t('councilMembersPage.execBoardTitle'), targetId: 'exec-board', items: mapByType('EXECUTIVE_BOARD') },
        { title: t('councilMembersPage.fullMembersTitle'), targetId: 'full-members', items: mapByType('FULL') },
        { title: t('councilMembersPage.observersTitle'), targetId: 'observers', items: mapByType('OBSERVER') },
    ]
    return sections.map((s) => ({ ...s, count: s.items.length }))
})

// --- Tab + count-up ---
const activeTab = ref(0)
const tabsRef = ref<HTMLElement | null>(null)
const displayValues = ref([0, 0, 0])
const isVisible = ref(false)
const hasAnimated = ref(false)
let statsObserver: IntersectionObserver | null = null

function easeOutCubic(x: number) {
    return 1 - Math.pow(1 - x, 3)
}

function animateCountUp(targets: number[]) {
    if (hasAnimated.value) return
    hasAnimated.value = true
    const duration = 1800
    const startTime = performance.now()
    function update(now: number) {
        const progress = Math.min((now - startTime) / duration, 1)
        targets.forEach((t, i) => {
            displayValues.value[i] = Math.floor(easeOutCubic(progress) * t)
        })
        if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
}

// Animate once the section is on-screen AND data has loaded.
watch(
    [isVisible, memberSections],
    () => {
        const counts = memberSections.value.map((s) => s.count)
        if (isVisible.value && !hasAnimated.value && counts.some((c) => c > 0)) {
            animateCountUp(counts)
        }
    },
    { deep: true }
)

watch(tabsRef, (el) => {
    if (!el) return
    statsObserver = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) isVisible.value = true
        },
        { threshold: 0.3 }
    )
    statsObserver.observe(el)
})

onMounted(() => {
    membersStore.fetchAll({ limit: 100, sortBy: 'order', order: 'asc' })
})

onBeforeUnmount(() => statsObserver?.disconnect())
</script>

<style scoped>
.member-tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}
@media (max-width: 640px) {
    .member-tabs {
        grid-template-columns: 1fr;
    }
}

.member-tab {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 24px 28px;
    border-radius: 20px;
    border: 1.5px solid rgba(25, 28, 31, 0.1);
    background: #fff;
    cursor: pointer;
    text-align: left;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.2s;
}
.member-tab:hover {
    border-color: rgba(25, 28, 31, 0.25);
    box-shadow: 0 8px 24px rgba(25, 28, 31, 0.07);
    transform: translateY(-2px);
}
.member-tab--active {
    background: #191c1f;
    border-color: #191c1f;
    box-shadow: 0 12px 32px rgba(25, 28, 31, 0.2);
    transform: translateY(-2px);
}
.member-tab--active:hover {
    border-color: #191c1f;
}
.member-tab__count {
    font-size: clamp(36px, 5vw, 52px);
    font-weight: 700;
    line-height: 1;
    color: #191c1f;
    transition: color 0.2s;
}
.member-tab--active .member-tab__count {
    color: #fff;
}
.member-tab__label {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    color: #505a63;
    transition: color 0.2s;
}
.member-tab--active .member-tab__label {
    color: rgba(255, 255, 255, 0.75);
}
</style>
