import type { Router } from 'vue-router'
import { i18n } from '@/utils/i18n'

const SITE_NAME = 'Foreign Investors Council'
const SITE_URL = 'https://fics.uz'
const DEFAULT_DESCRIPTION =
    "Foreign Investors Council under the President of the Republic of Uzbekistan — uniting international investors, FIC working groups and government bodies to improve the investment climate and drive economic reform in Uzbekistan."

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
    let el = document.querySelector(`meta[${attr}="${key}"]`)
    if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
    }
    el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
    let el = document.querySelector('link[rel="canonical"]')
    if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', 'canonical')
        document.head.appendChild(el)
    }
    el.setAttribute('href', href)
}

/**
 * Keeps <title>, meta description, canonical link and OG/Twitter tags in
 * sync with the active route — index.html only sets sitewide defaults.
 */
export function setupSeoGuard(router: Router) {
    router.afterEach((to) => {
        const { t } = i18n.global
        const pageTitle = to.meta.titleKey ? String(t(to.meta.titleKey)) : to.meta.title
        const description = to.meta.descriptionKey ? String(t(to.meta.descriptionKey)) : DEFAULT_DESCRIPTION
        const fullTitle = pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_NAME
        const canonicalUrl = `${SITE_URL}${to.path}`

        document.title = fullTitle

        upsertMeta('name', 'description', description)
        upsertMeta('property', 'og:title', fullTitle)
        upsertMeta('property', 'og:description', description)
        upsertMeta('property', 'og:url', canonicalUrl)
        upsertMeta('name', 'twitter:title', fullTitle)
        upsertMeta('name', 'twitter:description', description)
        upsertCanonical(canonicalUrl)
    })
}

export default setupSeoGuard
