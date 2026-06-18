<template>
    <section
        ref="sectionRef"
        class="councilTasks"
        :class="{ 'is-visible': isVisible }"
    >
        <div class="page-container">
            <!-- Header -->
            <div class="councilTasks__head">
                <h2 class="councilTasks__title">{{ $t('tasks.title') }}</h2>
                <p class="councilTasks__sub">{{ $t('tasks.subtitle') }}</p>
            </div>

            <div class="councilTasks__panel">
                <!-- Desktop: orbital diagram -->
                <div class="councilTasks__orbit">
                    <span class="councilTasks__ring" aria-hidden="true" />

                    <!-- Static hub -->
                    <div class="councilTasks__hub">
                        <span class="councilTasks__hubNum">9</span>
                        <span class="councilTasks__hubLabel">{{ $t('tasks.tasksLabel') }}</span>
                    </div>

                    <!-- Rotating orbit track -->
                    <div class="orbit-track">
                        <div
                            v-for="(item, i) in tasks"
                            :key="i"
                            class="councilTasks__node"
                            :style="orbitStyle(i)"
                        >
                            <!-- Counter-rotate so icon/label stay upright -->
                            <div class="node-content">
                                <span class="councilTasks__icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24">
                                        <path
                                            v-for="(d, di) in item.iconPaths"
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
                                <span class="councilTasks__label">{{ item.label }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile: grid -->
                <div class="councilTasks__grid">
                    <div
                        v-for="(item, i) in tasks"
                        :key="`g-${i}`"
                        class="councilTasks__cell"
                    >
                        <span class="councilTasks__icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                                <path
                                    v-for="(d, di) in item.iconPaths"
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
                        <span class="councilTasks__label">{{ item.label }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

watch(sectionRef, (el) => {
    if (!el || isVisible.value) return
    observer?.disconnect()
    observer = new IntersectionObserver(
        (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
                isVisible.value = true
                observer?.disconnect()
            }
        },
        { threshold: 0.15 },
    )
    observer.observe(el)
}, { immediate: true })

onBeforeUnmount(() => observer?.disconnect())

const tasks = computed(() => [
    {
        label: t('tasks.items.advising'),
        iconPaths: ['M3 9l9-5 9 5', 'M5 10v8M9 10v8M15 10v8M19 10v8', 'M3 20h18'],
    },
    {
        label: t('tasks.items.investment'),
        iconPaths: ['M4 4v16h16', 'M7 14l3-3 3 2 5-6', 'M17 7h3v3'],
    },
    {
        label: t('tasks.items.dialogue'),
        iconPaths: [
            'M5 5h13a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H10l-4 3v-3H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z',
            'M8 9h7M8 12h4',
        ],
    },
    {
        label: t('tasks.items.barriers'),
        iconPaths: ['M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z', 'M20 20l-4.2-4.2'],
    },
    {
        label: t('tasks.items.recommendations'),
        iconPaths: [
            'M13 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z',
            'M13 3v5h5',
            'M9 14l2 2 4-4',
        ],
    },
    {
        label: t('tasks.items.export'),
        iconPaths: [
            'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z',
            'M3.5 9h17M3.5 15h17',
            'M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18',
        ],
    },
    {
        label: t('tasks.items.quality'),
        iconPaths: ['M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z', 'M9 12l2 2 4-4'],
    },
    {
        label: t('tasks.items.legal'),
        iconPaths: [
            'M12 4v15',
            'M6 19h12',
            'M5 8h14',
            'M5 8l-2.5 5a2.5 2.5 0 0 0 5 0z',
            'M19 8l-2.5 5a2.5 2.5 0 0 0 5 0z',
        ],
    },
    {
        label: t('tasks.items.image'),
        iconPaths: ['M12 4l2.3 5 5.2.4-3.9 3.4 1.2 5L12 18.8 7.2 21.2l1.2-5L4.5 12.8 9.7 12.4z'],
    },
])

const orbitStyle = (i: number) => {
    const angle = (i / tasks.value.length) * Math.PI * 2 - Math.PI / 2
    const radius = 39
    return {
        left: `${50 + radius * Math.cos(angle)}%`,
        top: `${50 + radius * Math.sin(angle)}%`,
        animationDelay: `${0.1 + i * 0.07}s`,
    }
}
</script>

<style scoped lang="scss">
.councilTasks {
    padding: 80px 0;
    text-align: center;
    background: #fff;
}

.councilTasks__head {
    margin-bottom: 40px;
}

.councilTasks__title {
    font-size: clamp(28px, 4vw, 48px);
    line-height: 1.05;
    font-weight: 900;
    text-transform: uppercase;
    color: #191c1f;
}

.councilTasks__sub {
    margin: 14px auto 0;
    max-width: 560px;
    color: #505a63;
    font-size: 16px;
    line-height: 1.5;
}

.councilTasks__panel {
    position: relative;
}

/* ---- Orbital (desktop) ---- */
.councilTasks__orbit {
    display: none;
    position: relative;
    width: 600px;
    height: 600px;
    max-width: 100%;
    margin: 0 auto;
}

.councilTasks__ring {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 78%;
    height: 78%;
    border-radius: 50%;
    border: 1px dashed rgba(25, 28, 31, 0.12);
    transform: translate(-50%, -50%);
    pointer-events: none;
}

/* Hub */
.councilTasks__hub {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 1px solid rgba(25, 28, 31, 0.06);
    background: radial-gradient(100% 100% at 50% 22%, #ffffff 0%, #eef1f4 100%);
    box-shadow:
        0 0 0 14px rgba(25, 28, 31, 0.02),
        0 0 0 30px rgba(25, 28, 31, 0.012),
        0 24px 54px rgba(25, 28, 31, 0.12);
    transform: translate(-50%, -50%);
    z-index: 10;

    &::before,
    &::after {
        content: '';
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
    }

    &::before {
        inset: -20px;
        border: 1px solid rgba(25, 28, 31, 0.08);
    }

    &::after {
        inset: -20px;
        border: 1px solid rgba(25, 28, 31, 0.12);
        animation: councilPulse 3.4s ease-in-out infinite;
    }
}

@keyframes councilPulse {
    0%, 100% { transform: scale(1);    opacity: 0.6; }
    50%       { transform: scale(1.12); opacity: 0; }
}

.councilTasks__hubNum {
    font-size: 64px;
    line-height: 1;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: #191c1f;
}

.councilTasks__hubLabel {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #909aa6;
}

/* ---- Rotating track ---- */
.orbit-track {
    position: absolute;
    inset: 0;
    animation: orbitRotate 32s linear infinite;
}

@keyframes orbitRotate {
    to { transform: rotate(360deg); }
}

/* ---- Nodes ---- */
.councilTasks__node {
    position: absolute;
    width: 128px;
    transform: translate(-50%, -50%);
    opacity: 0;
}

.councilTasks.is-visible .councilTasks__node {
    animation: councilNodeFade 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes councilNodeFade {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Counter-rotate content so icons stay upright */
.node-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: orbitCounter 32s linear infinite;
}

@keyframes orbitCounter {
    to { transform: rotate(-360deg); }
}

/* ---- Icons ---- */
.councilTasks__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: 1px solid rgba(25, 28, 31, 0.1);
    background: #fff;
    color: #191c1f;
    box-shadow: 0 8px 22px rgba(25, 28, 31, 0.07);
    transition: background-color 0.28s ease, border-color 0.28s ease,
        color 0.28s ease, transform 0.28s ease;

    svg {
        width: 28px;
        height: 28px;
    }
}

.councilTasks__node:hover .councilTasks__icon,
.councilTasks__cell:hover .councilTasks__icon {
    background: #191c1f;
    border-color: #191c1f;
    color: #fff;
    transform: scale(1.08);
}

.councilTasks__label {
    margin-top: 10px;
    font-size: 13px;
    line-height: 1.35;
    font-weight: 500;
    color: #191c1f;
    text-align: center;
}

/* ---- Grid (mobile) ---- */
.councilTasks__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    padding: 8px;
}

.councilTasks__cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 22px 14px;
    border: 1px solid rgba(25, 28, 31, 0.08);
    border-radius: 18px;
    background: #fff;
    cursor: default;

    .councilTasks__label { margin-top: 0; }
}

@media (min-width: 1024px) {
    .councilTasks__orbit { display: block; }
    .councilTasks__grid  { display: none; }
}

@media (max-width: 420px) {
    .councilTasks__grid { grid-template-columns: 1fr; }
}
</style>
