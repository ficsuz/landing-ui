<template>
    <div class="secretariat-page">
        <!-- Mission -->
        <section class="bg-white py-16 md:py-24">
            <div class="page-container">
                <!-- <h2 class="section-title mb-8">{{ $t('secretariatPage.title') }}</h2> -->
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
                        <div class="relative shrink-0 overflow-hidden bg-[#e9ebf0] w-[38%] min-h-[240px] sm:w-[42%] sm:min-h-[300px]">
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
                                    v-if="member.phone"
                                    :href="`tel:${member.phone.replace(/\s/g, '')}`"
                                    class="inline-flex items-center gap-3 text-[14px] text-[#505a63] hover:text-[#1a1e2e] transition-colors w-fit"
                                >
                                    <span class="w-10 h-10 rounded-full bg-[#f2f3f6] flex items-center justify-center shrink-0">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#1a1e2e"
                                            stroke-width="1.8"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path
                                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.79h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                                            />
                                        </svg>
                                    </span>
                                    {{ member.phone }}
                                </a>
                                <a
                                    v-if="member.email"
                                    :href="`mailto:${member.email}`"
                                    class="inline-flex items-center gap-3 text-[14px] text-[#505a63] hover:text-[#1a1e2e] transition-colors w-fit"
                                >
                                    <span class="w-10 h-10 rounded-full bg-[#f2f3f6] flex items-center justify-center shrink-0">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#1a1e2e"
                                            stroke-width="1.8"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
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
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
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
            <div v-if="activeMember" class="fixed inset-0 z-[100] flex items-center justify-center p-4" @click.self="activeMember = null">
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
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#1a1e2e"
                            stroke-width="2.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
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
                        <p class="text-[clamp(15px,1.2vw,17px)] text-[#444] leading-relaxed whitespace-pre-line">
                            {{ activeMember.bio }}
                        </p>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTeamStore } from '@/features/team/store'
import { resolveTranslation } from '@/utils/i18n'
import { getMediaUrl } from '@/utils/media'
import defaultPhoto from '@/assets/images/avatars/default-avatar.svg'

const { locale } = useI18n()
const teamStore = useTeamStore()

interface DisplayMember {
    name: string
    role: string
    photo: string
    phone: string
    email: string
    bio: string
}

const teamMembers = computed<DisplayMember[]>(() =>
    teamStore.items
        .filter((m) => m.status)
        .map((m) => ({
            name: resolveTranslation(m.fullName, locale.value),
            role: resolveTranslation(m.position, locale.value),
            photo: getMediaUrl(m.photoId) || defaultPhoto,
            phone: m.phone ?? '',
            email: m.email ?? '',
            bio: m.bio ? resolveTranslation(m.bio, locale.value) : '',
        }))
)

const activeMember = ref<DisplayMember | null>(null)

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
    teamStore.fetchAll({ limit: 100, sortBy: 'order', order: 'asc' })
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
