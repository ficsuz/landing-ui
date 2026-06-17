<template>
    <footer class="bg-[#191C1F] text-gray-400">
        <div class="max-w-[1400px] mx-auto px-4 md:px-8 pt-10 md:pt-16 pb-8">
            <!-- Top -->
            <div class="flex flex-col lg:flex-row gap-10 pb-10 border-b border-white">
                <!-- Left: brand + contact + social -->
                <div class="flex-shrink-0 lg:w-64">
                    <!-- Logo -->
                    <router-link to="/" class="flex items-center gap-3 mb-10">
                        <LogoIcon class="w-11 h-11 flex-shrink-0" />
                        <span class="text-white text-[10px] font-bold leading-snug tracking-normal uppercase">
                            Foreign Investors Council<br />
                            Under the President of the<br />
                            Republic of Uzbekistan
                        </span>
                    </router-link>

                    <!-- Contact info -->
                    <div class="flex flex-col gap-5">
                        <div>
                            <p class="text-[10px] uppercase tracking-[0.12em] text-gray-500 mb-1">
                                {{ $t('footer.phoneLabel') }}
                            </p>
                            <a href="tel:+998880998888" class="text-white font-semibold text-sm hover:text-gray-300 transition-colors">
                                +998 88 099 88 88
                            </a>
                        </div>
                        <div>
                            <p class="text-[10px] uppercase tracking-[0.12em] text-gray-500 mb-1">
                                {{ $t('footer.emailLabel') }}
                            </p>
                            <a href="mailto:secretariat@fics.uz" class="text-white font-semibold text-sm hover:text-gray-300 transition-colors">
                                secretariat@fics.uz
                            </a>
                        </div>
                        <div>
                            <p class="text-[10px] uppercase tracking-[0.12em] text-gray-500 mb-1">
                                {{ $t('footer.addressLabel') }}
                            </p>
                            <p class="text-white font-semibold text-sm">BoMI Finance Center, 100135, Tashkent</p>
                        </div>
                    </div>

                    <!-- Social icons -->
                    <div class="flex gap-3 mt-8">
                        <a
                            v-for="social in socials"
                            :key="social.name"
                            :href="social.href"
                            target="_blank"
                            rel="noopener"
                            :aria-label="social.name"
                            class="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:border-gray-400 hover:text-white transition-colors"
                        >
                            <component :is="social.icon" class="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <!-- Right: nav columns -->
                <div class="grid grid-cols-2 md:grid-cols-3 gap-x-8 md:gap-x-16 gap-y-8 lg:ml-auto justify-items-start">
                    <div v-for="col in websiteMenu" :key="col.labelKey" class="lg:w-44">
                        <h4 class="text-white text-[11px] font-bold uppercase tracking-widest mb-4">
                            {{ $t(col.labelKey) }}
                        </h4>
                        <ul class="flex flex-col gap-3">
                            <li v-for="link in col.children" :key="link.path">
                                <router-link :to="link.path" class="text-gray-400 text-sm leading-snug hover:text-white transition-colors">
                                    {{ $t(link.labelKey) }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Bottom: copyright -->
            <p class="pt-6 text-sm text-gray-500">
                {{ $t('footer.copyright', { year: currentYear }) }}
            </p>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { h } from 'vue'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import { websiteMenu } from '@/constants/navigation.constants'

const currentYear = new Date().getFullYear()

// Inline SVG icon components to avoid extra icon dependencies
const TelegramIcon = () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
        h('path', {
            d: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
        }),
    ])

const FacebookIcon = () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
        h('path', {
            d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
        }),
    ])

const LinkedInIcon = () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
        h('path', {
            d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
        }),
    ])

const socials = [
    { name: 'Telegram', href: 'https://t.me/fics_uz', icon: TelegramIcon },
    { name: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedInIcon },
]
</script>
