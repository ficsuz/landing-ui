<template>
    <nav class="web-navbar">
        <!-- Main bar -->
        <div class="web-navbar__inner">
            <!-- Logo -->
            <router-link to="/" class="web-navbar__logo">
                <LogoIcon class="web-navbar__logo-mark" />
                <span class="web-navbar__logo-text">
                    {{ $t('footer.brand') }}
                </span>
            </router-link>

            <!-- Desktop menu -->
            <ul class="web-navbar__menu">
                <li
                    v-for="item in websiteMenu"
                    :key="item.labelKey"
                    class="web-navbar__item"
                    :class="{ 'has-dropdown': item.children }"
                    @mouseenter="openMenu = item.labelKey"
                    @mouseleave="openMenu = null"
                >
                    <template v-if="item.children">
                        <!-- Parent is a link if it has a path, otherwise just a toggle button -->
                        <router-link
                            v-if="item.path"
                            :to="item.path"
                            class="web-navbar__link"
                            :class="{ active: isParentActive(item) }"
                            active-class=""
                            exact-active-class=""
                        >
                            {{ $t(item.labelKey) }}
                        </router-link>
                        <button
                            v-else
                            class="web-navbar__link"
                            :class="{ active: isParentActive(item) }"
                        >
                            {{ $t(item.labelKey) }}
                        </button>

                        <div class="web-navbar__dropdown" :class="{ 'is-open': openMenu === item.labelKey }">
                            <router-link
                                v-for="child in item.children"
                                :key="child.path"
                                :to="child.path"
                                class="web-navbar__dropdown-link"
                                :class="{ 'is-active': isActive(child.path, item.children?.map(c => c.path)) }"
                                active-class=""
                                exact-active-class=""
                                @click="openMenu = null"
                            >
                                {{ $t(child.labelKey) }}
                            </router-link>
                        </div>
                    </template>

                    <router-link
                        v-else
                        :to="item.path!"
                        class="web-navbar__link"
                        :class="{ active: isActive(item.path!) }"
                    >
                        {{ $t(item.labelKey) }}
                    </router-link>
                </li>
            </ul>

            <!-- Desktop right -->
            <div class="web-navbar__right">
                <div class="web-navbar__locales">
                    <button
                        v-for="loc in localeOptions"
                        :key="loc.code"
                        class="web-navbar__locale"
                        :class="{ active: currentLocale === loc.code }"
                        @click="switchLocale(loc.code as any)"
                    >
                        {{ loc.label }}
                    </button>
                </div>

                <router-link to="/contact" class="web-navbar__contact">
                    {{ $t('nav.contact') }}
                </router-link>
            </div>

            <!-- Mobile: locale + hamburger -->
            <div class="web-navbar__mobile-controls">
                <div class="web-navbar__locales">
                    <button
                        v-for="loc in localeOptions"
                        :key="loc.code"
                        class="web-navbar__locale"
                        :class="{ active: currentLocale === loc.code }"
                        @click="switchLocale(loc.code as any)"
                    >
                        {{ loc.label }}
                    </button>
                </div>

                <button class="web-navbar__hamburger" @click="mobileOpen = !mobileOpen" :aria-expanded="mobileOpen">
                    <span class="web-navbar__hamburger-line" :class="{ open: mobileOpen }"></span>
                    <span class="web-navbar__hamburger-line" :class="{ open: mobileOpen }"></span>
                    <span class="web-navbar__hamburger-line" :class="{ open: mobileOpen }"></span>
                </button>
            </div>
        </div>

        <!-- Mobile slide-down panel -->
        <Transition name="panel">
            <div v-if="mobileOpen" class="web-navbar__panel">
                <div class="web-navbar__panel-inner">
                    <div
                        v-for="item in websiteMenu"
                        :key="item.labelKey"
                        class="web-navbar__panel-group"
                    >
                        <!-- Group with children: whole row toggles the accordion -->
                        <button
                            v-if="item.children"
                            class="web-navbar__panel-header"
                            :class="{ expanded: expandedGroup === item.labelKey }"
                            :aria-expanded="expandedGroup === item.labelKey"
                            @click="expandedGroup = expandedGroup === item.labelKey ? null : item.labelKey"
                        >
                            <span class="web-navbar__panel-title" :class="{ active: isParentActive(item) }">
                                {{ $t(item.labelKey) }}
                            </span>
                            <svg class="web-navbar__panel-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>

                        <Transition name="accordion">
                            <ul v-if="item.children && expandedGroup === item.labelKey" class="web-navbar__panel-links">
                                <li v-for="child in item.children" :key="child.path">
                                    <router-link
                                        :to="child.path"
                                        class="web-navbar__panel-link"
                                        :class="{ 'is-active': isActive(child.path, item.children?.map(c => c.path)) }"
                                        active-class=""
                                        exact-active-class=""
                                        @click="closeAll"
                                    >
                                        {{ $t(child.labelKey) }}
                                    </router-link>
                                </li>
                            </ul>
                        </Transition>
                    </div>

                    <router-link to="/contact" class="web-navbar__panel-contact" @click="closeAll">
                        {{ $t('nav.contact') }}
                    </router-link>
                </div>
            </div>
        </Transition>
    </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import { websiteMenu, type NavMenuItem } from '@/constants/navigation.constants'
import { useLocale } from '@/composables'

const route = useRoute()
const { currentLocale, localeOptions, switchLocale } = useLocale()

const openMenu = ref<string | null>(null)
const mobileOpen = ref(false)
const expandedGroup = ref<string | null>(null)

const closeAll = () => {
    mobileOpen.value = false
    expandedGroup.value = null
}

watch(() => route.path, closeAll)

// Exact-match active check for dropdown links.
// Hash paths: match base path + hash (default is #overview for working-groups).
// Regular paths: exact match only — prevents sibling routes from appearing active simultaneously.
// Detail pages (e.g. /events/plenary-sessions/1): also matched via startsWith when
// the remaining segment contains no '/' (one level deep, ID-like).
// siblings: explicit child paths — if current route matches one of them, skip detail matching.
const isActive = (path: string, siblings?: string[]): boolean => {
    const hashIndex = path.indexOf('#')
    if (hashIndex !== -1) {
        const cleanPath = path.substring(0, hashIndex)
        const hash = '#' + path.substring(hashIndex + 1)
        const pathMatches = cleanPath === '/' ? route.path === '/' : route.path === cleanPath
        if (!pathMatches) return false
        if (route.hash) return route.hash === hash
        return hash === '#overview'
    }
    if (path === '/') return route.path === '/'
    if (route.path === path) return true
    // Match detail sub-pages (/path/123) but NOT named sibling routes (/path/sub)
    const suffix = route.path.slice(path.length)
    if (suffix.startsWith('/') && !suffix.slice(1).includes('/')) {
        // If the current route exactly matches a known sibling, it's not a detail page
        if (siblings?.includes(route.path)) return false
        return true
    }
    return false
}

// Parent button is active when any of its children's base paths match the current route.
// Uses startsWith so it stays active on detail pages too.
const isParentActive = (item: NavMenuItem): boolean => {
    if (!item.children) return false
    return item.children.some((c) => {
        const basePath = c.path.split('#')[0]
        if (!basePath || basePath === '/') return false
        return route.path === basePath || route.path.startsWith(basePath + '/')
    })
}
</script>

<style scoped lang="scss">
.web-navbar {
    background: #fff;
    position: relative;
    z-index: 100;

    a, button { cursor: pointer; }

    /* ── Main bar ── */
    &__inner {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 24px;
        height: 80px;
        display: flex;
        align-items: center;
        gap: 40px;
    }

    &__logo {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
        text-decoration: none;
    }

    &__logo-mark { width: 44px; height: 44px; }

    &__logo-text {
        font-size: 11px;
        font-weight: 700;
        line-height: 1.3;
        color: #191c1f;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        max-width: 220px;
    }

    /* ── Desktop menu ── */
    &__menu {
        display: flex;
        align-items: center;
        gap: 28px;
        list-style: none;
        flex: 1;
        justify-content: center;
    }

    &__item {
        position: relative;

        .web-navbar__dropdown.is-open {
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, 0);
        }
    }

    &__link {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        color: #667085;
        text-decoration: none;
        padding: 8px 0;
        position: relative;
        transition: color 0.15s;
        white-space: nowrap;
        display: inline-block;

        &:hover { color: #191c1f; }

        &.active {
            color: #191c1f;
            font-weight: 600;

            &::after {
                content: '';
                position: absolute;
                left: 0; right: 0; bottom: -2px;
                height: 2px;
                border-radius: 2px;
                background: #191c1f;
            }
        }
    }

    &__dropdown {
        position: absolute;
        top: calc(100% + 12px);
        left: 50%;
        transform: translate(-50%, 8px);
        min-width: 240px;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 12px 32px rgba(16, 24, 40, 0.12);
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease;
        z-index: 50;

        &::before {
            content: '';
            position: absolute;
            top: -12px; left: 0; right: 0;
            height: 12px;
        }
    }

    &__dropdown-link {
        padding: 10px 14px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 500;
        color: #667085;
        text-decoration: none;
        cursor: pointer;
        transition: background 0.15s, color 0.15s;
        display: flex;
        align-items: center;
        gap: 10px;

        &::before {
            content: '';
            width: 6px; height: 6px;
            border-radius: 50%;
            background: transparent;
            flex-shrink: 0;
            transition: background 0.15s;
        }

        &:hover { background: #f2f4f7; color: #191c1f; }

        &.is-active {
            background: #191c1f;
            color: #fff;
            font-weight: 600;

            &::before { background: #fff; }
        }
    }

    /* ── Right (desktop) ── */
    &__right {
        display: flex;
        align-items: center;
        gap: 24px;
        flex-shrink: 0;
    }

    &__locales {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    &__locale {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: #667085;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        transition: all 0.15s;

        &.active {
            background: #191c1f;
            color: #fff;
        }
    }

    &__contact {
        background: #191c1f;
        color: #fff;
        font-size: 15px;
        font-weight: 600;
        padding: 10px 22px;
        border-radius: 999px;
        text-decoration: none;
        transition: opacity 0.2s;
        white-space: nowrap;

        &:hover { opacity: 0.85; }
    }

    /* ── Mobile controls (hamburger + locale) ── */
    &__mobile-controls {
        display: none;
        align-items: center;
        gap: 12px;
        margin-left: auto;
    }

    &__hamburger {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        width: 40px;
        height: 40px;
        background: none;
        border: none;
        padding: 8px;
    }

    &__hamburger-line {
        display: block;
        width: 100%;
        height: 2px;
        background: #191c1f;
        border-radius: 2px;
        transition: transform 0.25s ease, opacity 0.25s ease;
        transform-origin: center;

        &:nth-child(1).open { transform: translateY(7px) rotate(45deg); }
        &:nth-child(2).open { opacity: 0; transform: scaleX(0); }
        &:nth-child(3).open { transform: translateY(-7px) rotate(-45deg); }
    }

    /* ── Mobile panel ── */
    &__panel {
        background: #191c1f;
        overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.08);
    }

    &__panel-inner {
        max-width: 1400px;
        margin: 0 auto;
        padding: 16px 24px 32px;
        display: flex;
        flex-direction: column;
        gap: 0;
    }

    &__panel-group {
        border-bottom: 1px solid rgba(255,255,255,0.08);
    }

    /* Header row: full-width accordion toggle */
    &__panel-header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 16px 0;
        background: none;
        border: none;
        text-align: left;
        -webkit-tap-highlight-color: transparent;

        &.expanded .web-navbar__panel-chevron { transform: rotate(180deg); }
    }

    &__panel-title {
        flex: 1;
        font-size: 16px;
        font-weight: 500;
        color: rgba(255,255,255,0.65);
        transition: color 0.15s;

        &:hover, &.active { color: #fff; }
        &.active { font-weight: 600; }
    }

    &__panel-chevron {
        flex-shrink: 0;
        width: 18px;
        height: 18px;
        color: rgba(255,255,255,0.4);
        transition: transform 0.25s ease;
    }

    &__panel-links {
        list-style: none;
        padding: 4px 0 12px;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    &__panel-link {
        display: block;
        padding: 13px 16px 13px 28px;
        border-radius: 10px;
        -webkit-tap-highlight-color: transparent;
        font-size: 15px;
        font-weight: 400;
        color: rgba(255,255,255,0.55);
        text-decoration: none;
        transition: background 0.15s, color 0.15s;

        &:hover { background: rgba(255,255,255,0.06); color: #fff; }

        &.is-active {
            background: rgba(255,255,255,0.1);
            color: #fff;
            font-weight: 600;
        }
    }

    &__panel-contact {
        display: block;
        margin-top: 20px;
        text-align: center;
        background: #fff;
        color: #191c1f;
        font-size: 15px;
        font-weight: 600;
        padding: 14px 24px;
        border-radius: 999px;
        text-decoration: none;
        transition: opacity 0.2s;

        &:hover { opacity: 0.88; }
    }
}

/* ── Responsive ── */

@media (min-width: 1400px) {
    .web-navbar__mobile-controls { display: none !important; }
}

@media (min-width: 1280px) and (max-width: 1399px) {
    .web-navbar__mobile-controls { display: none !important; }
    .web-navbar__logo-text { display: none; }
    .web-navbar__inner { gap: 20px; }
    .web-navbar__menu { gap: 16px; }
    .web-navbar__link { font-size: 14px; }
}

@media (max-width: 1279px) {
    .web-navbar__menu,
    .web-navbar__right { display: none; }

    .web-navbar__mobile-controls {
        display: flex;
        gap: 8px;
    }

    .web-navbar__inner { gap: 0; padding: 0 16px; }

    .web-navbar__logo { gap: 8px; }
    .web-navbar__logo-mark { width: 36px; height: 36px; }
    .web-navbar__logo-text {
        display: block;
        font-size: 9px;
        letter-spacing: 0.01em;
        line-height: 1.4;
    }

    .web-navbar__locale {
        width: 28px;
        height: 28px;
        font-size: 12px;
    }
}

@media (max-width: 374px) {
    .web-navbar__logo-text { display: none; }
    .web-navbar__logo-mark { width: 32px; height: 32px; }
}

/* ── Transitions ── */
.panel-enter-active,
.panel-leave-active { transition: max-height 0.35s ease, opacity 0.25s ease; max-height: 100vh; }
.panel-enter-from,
.panel-leave-to { max-height: 0; opacity: 0; }

.accordion-enter-active,
.accordion-leave-active { transition: max-height 0.25s ease, opacity 0.2s ease; max-height: 500px; overflow: hidden; }
.accordion-enter-from,
.accordion-leave-to { max-height: 0; opacity: 0; }
</style>
