<template>
    <div class="council-members-page">
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <!-- Intro -->
                <p class="text-[clamp(15px,1.3vw,18px)] text-[#505a63] leading-[170%] max-w-4xl mb-10">
                    {{ $t('councilMembersPage.membersIntro') }}
                </p>

                <CabinetCallout />

                <!-- Tabs -->
                <div ref="tabsRef" class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 scroll-mt-24 md:scroll-mt-28">
                    <MemberCategoryCard
                        v-for="category in memberCategories"
                        :key="category.slug"
                        :title="t(category.titleKey)"
                        :count="displayCount(category.type)"
                        :active="activeCategory.slug === category.slug"
                        @click="selectCategory(category)"
                    />
                </div>

                <!-- Company list -->
                <div v-loading="membersStore.publicLoading && !membersStore.publicMembers" class="grid grid-cols-1 gap-4 md:gap-5">
                    <div
                        v-for="item in activeMembers"
                        :id="`member-${item.id}`"
                        :key="item.id"
                        class="group flex overflow-hidden bg-white border rounded-2xl shadow-[0_2px_12px_rgba(25,28,31,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d0d5dd] hover:shadow-[0_12px_36px_rgba(25,28,31,0.10)]"
                        :class="highlightedId === item.id ? 'border-[#191c1f] ring-2 ring-[#191c1f] shadow-[0_12px_36px_rgba(25,28,31,0.12)]' : 'border-[#eef0f4]'"
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
                    v-if="!membersStore.publicLoading && !activeMembers.length"
                    :description="t(membersStore.publicError ? 'councilMembersPage.loadError' : 'common.noData')"
                    class="py-10"
                />
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter, type LocationQueryRaw } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { memberCategories, type MemberCategory } from '@/features/councilMembers/categories'
import MemberCategoryCard from '@/features/councilMembers/components/MemberCategoryCard.vue'
import { useCouncilMembersStore } from '@/features/councilMembers/store'
import CabinetCallout from './components/CabinetCallout.vue'
import { resolveTranslation } from '@/utils/i18n'
import { getMediaUrl } from '@/utils/media'
import type { MemberType } from '@/features/councilMembers/types'

const { locale, t } = useI18n()
const route = useRoute()
const router = useRouter()
const membersStore = useCouncilMembersStore()

const requestedCategory = computed(() => memberCategories.find(({ slug }) => slug === route.query.category))
const activeCategory = ref<MemberCategory>(requestedCategory.value ?? memberCategories[0])
const tabsRef = ref<HTMLElement | null>(null)
const highlightedId = ref<string | null>(null)

const activeMembers = computed(() => membersStore.publicMembersByType[activeCategory.value.type].map((member) => ({
    id: member.id,
    image: getMediaUrl(member.logoId),
    name: resolveTranslation(member.name, locale.value),
    bio: resolveTranslation(member.description, locale.value),
})))

watch(requestedCategory, (category) => {
    if (route.name === 'council-members') activeCategory.value = category ?? memberCategories[0]
})

function selectCategory(category: MemberCategory) {
    activeCategory.value = category
    const query: LocationQueryRaw = { ...route.query, category: category.slug }
    delete query.member
    router.replace({ query, hash: route.hash })
}

// Keep home-page links to individual companies working alongside category links.
const requestedMemberCategory = computed(() => {
    const id = route.query.member
    if (route.name !== 'council-members' || typeof id !== 'string') return
    return memberCategories.find(({ type }) => membersStore.publicMembersByType[type].some((member) => member.id === id))
})

watch([() => route.query.member, requestedMemberCategory], ([id, category], _previous, onCleanup) => {
    highlightedId.value = null
    if (!category || typeof id !== 'string') return

    activeCategory.value = category
    highlightedId.value = id
    nextTick(() => {
        if (highlightedId.value !== id) return
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        document.getElementById(`member-${id}`)?.scrollIntoView({ behavior, block: 'center' })
    })

    const timer = setTimeout(() => {
        const query = { ...route.query }
        delete query.member
        router.replace({ query, hash: route.hash })
    }, 3500)
    onCleanup(() => clearTimeout(timer))
}, { immediate: true })

const countProgress = ref(0)
const countsVisible = ref(false)
let animationFrame: number | undefined
let statsObserver: IntersectionObserver | undefined

function displayCount(type: MemberType) {
    if (!membersStore.publicMembers) return null
    return Math.floor(membersStore.publicMembersByType[type].length * countProgress.value)
}

watch([countsVisible, () => membersStore.publicMembers !== null], ([visible, loaded]) => {
    if (!visible || !loaded || animationFrame !== undefined || countProgress.value === 1) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        countProgress.value = 1
        return
    }
    const startTime = performance.now()
    function update(now: number) {
        const progress = Math.min((now - startTime) / 1800, 1)
        countProgress.value = 1 - Math.pow(1 - progress, 3)
        animationFrame = progress < 1 ? requestAnimationFrame(update) : undefined
    }
    animationFrame = requestAnimationFrame(update)
})

onMounted(async () => {
    membersStore.fetchPublicMembers()
    const tabs = tabsRef.value
    if (!tabs) return
    statsObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return
        countsVisible.value = true
        statsObserver?.disconnect()
    },
    { threshold: 0.3 })
    statsObserver.observe(tabs)

    if (requestedCategory.value && !requestedMemberCategory.value) {
        await nextTick()
        tabs.scrollIntoView({ block: 'start' })
        tabs.querySelector<HTMLButtonElement>('button[aria-pressed="true"]')?.focus({ preventScroll: true })
    }
})

onBeforeUnmount(() => {
    statsObserver?.disconnect()
    if (animationFrame !== undefined) cancelAnimationFrame(animationFrame)
})
</script>
