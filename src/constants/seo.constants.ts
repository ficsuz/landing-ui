// SEO configuration shared by the runtime SEO guard (browser) and the build-time
// `seoPages` Vite plugin (Node), which pre-renders a localized HTML head for every
// static page and generates sitemap.xml. Keep this file free of `@/` imports,
// `import.meta.env` and browser globals so both environments can load it.

export const SITE_URL = 'https://fics.uz'

export const SUPPORTED_LOCALES = ['uz', 'ru', 'en'] as const
export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

/** Fallback language: `/` and old unprefixed URLs redirect to it; used as hreflang `x-default`. */
export const DEFAULT_LOCALE: AppLocale = 'uz'

/** Open Graph locale codes. */
export const OG_LOCALES: Record<AppLocale, string> = {
    uz: 'uz_UZ',
    ru: 'ru_RU',
    en: 'en_US',
}

/** 1200×630 social preview image (public/og-image.jpg). */
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`

export const SOCIAL_PROFILES = [
    'https://t.me/fic_uz',
    'https://www.facebook.com/fics.uz',
    'https://www.linkedin.com/company/ficsuz',
]

export interface SeoPage {
    /** Route name in website.routes.ts */
    name: string
    /** Path without locale prefix */
    path: string
    /** i18n key for the page title; omitted for the home page (uses seo.homeTitle) */
    titleKey?: string
    /** i18n key for the meta description; falls back to seo.pages.<name>, then seo.description */
    descriptionKey?: string
    priority: number
    changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
}

/**
 * Every indexable static page. Detail pages (`/:id`) are not listed — their head is
 * set at runtime by `useSeo()` from the loaded content.
 */
export const SEO_PAGES: SeoPage[] = [
    { name: 'home', path: '/', priority: 1.0, changefreq: 'daily' },

    { name: 'fic-history', path: '/fic-history', titleKey: 'nav.ficHistory', priority: 0.7, changefreq: 'yearly' },
    { name: 'association', path: '/association', titleKey: 'nav.association', priority: 0.7, changefreq: 'monthly' },
    { name: 'management', path: '/management', titleKey: 'nav.management', priority: 0.7, changefreq: 'monthly' },
    { name: 'secretariat', path: '/secretariat', titleKey: 'nav.secretariat', priority: 0.7, changefreq: 'monthly' },

    { name: 'council-members', path: '/council-members', titleKey: 'nav.councilMembers', descriptionKey: 'councilMembersPage.intro', priority: 0.8, changefreq: 'monthly' },
    { name: 'council-members-uzbek-side', path: '/council-members/uzbek-side', titleKey: 'nav.uzbekSide', descriptionKey: 'uzbekSidePage.intro', priority: 0.6, changefreq: 'monthly' },
    { name: 'council-members-experts', path: '/council-members/experts', titleKey: 'nav.experts', descriptionKey: 'expertsPage.intro', priority: 0.6, changefreq: 'monthly' },
    { name: 'council-members-become', path: '/council-members/become-a-member', titleKey: 'nav.becomeAMember', descriptionKey: 'becomeAMemberPage.intro', priority: 0.7, changefreq: 'yearly' },

    { name: 'working-groups', path: '/working-groups', titleKey: 'nav.workingGroups', priority: 0.8, changefreq: 'monthly' },

    { name: 'results', path: '/results', titleKey: 'nav.councilResults', priority: 0.7, changefreq: 'monthly' },
    { name: 'results-initiatives', path: '/results/initiatives', titleKey: 'nav.initiatives', descriptionKey: 'resultsPage.initiativesPage.intro', priority: 0.6, changefreq: 'monthly' },
    { name: 'results-investments', path: '/results/investments', titleKey: 'nav.investments', descriptionKey: 'resultsPage.investmentsPage.intro', priority: 0.6, changefreq: 'monthly' },
    { name: 'results-documents', path: '/results/documents', titleKey: 'nav.documents', descriptionKey: 'resultsPage.documentsPage.intro', priority: 0.6, changefreq: 'monthly' },

    { name: 'regional-alliance', path: '/regional-alliance', titleKey: 'regionalAlliancePage.title', descriptionKey: 'regionalAlliancePage.mission', priority: 0.7, changefreq: 'monthly' },

    { name: 'events', path: '/events', titleKey: 'nav.calendarPlan', priority: 0.7, changefreq: 'weekly' },
    { name: 'events-plenary-sessions', path: '/events/plenary-sessions', titleKey: 'nav.plenarySessions', descriptionKey: 'eventsPage.plenaryPage.intro', priority: 0.7, changefreq: 'monthly' },
    { name: 'events-interim-session', path: '/events/interim-session', titleKey: 'nav.interimSession', descriptionKey: 'eventsPage.interimPage.intro', priority: 0.6, changefreq: 'monthly' },
    { name: 'events-working-group-session', path: '/events/working-group-session', titleKey: 'nav.workingGroupSession', descriptionKey: 'eventsPage.wgSessionPage.intro', priority: 0.6, changefreq: 'monthly' },
    { name: 'events-meetings', path: '/events/meetings', titleKey: 'nav.meetings', descriptionKey: 'eventsPage.meetingsPage.intro', priority: 0.7, changefreq: 'weekly' },
    { name: 'events-weekly-results', path: '/events/weekly-results', titleKey: 'nav.weeklyResults', descriptionKey: 'eventsPage.weeklyPage.intro', priority: 0.7, changefreq: 'weekly' },

    { name: 'media', path: '/media', titleKey: 'nav.news', descriptionKey: 'mediaPage.newsIntro', priority: 0.9, changefreq: 'daily' },
    { name: 'media-analytics', path: '/media/analytics', titleKey: 'nav.analyticsAndArticles', descriptionKey: 'mediaPage.analyticsPage.intro', priority: 0.8, changefreq: 'weekly' },
    { name: 'media-special-projects', path: '/media/special-projects', titleKey: 'nav.specialProjects', descriptionKey: 'mediaPage.specialProjectsPage.intro', priority: 0.6, changefreq: 'monthly' },
    { name: 'media-blitz-interview', path: '/media/blitz-interview', titleKey: 'nav.blitzInterview', descriptionKey: 'mediaPage.blitzPage.intro', priority: 0.6, changefreq: 'monthly' },
    { name: 'media-reports', path: '/media/reports', titleKey: 'nav.reports', descriptionKey: 'mediaPage.reportsPage.intro', priority: 0.6, changefreq: 'monthly' },

    { name: 'contact', path: '/contact', titleKey: 'nav.contact', priority: 0.6, changefreq: 'yearly' },
]

/** `/media` + `ru` → `/ru/media`, `/` + `uz` → `/uz`. Every language has a prefix. */
export function localizedPath(path: string, locale: AppLocale): string {
    return path === '/' ? `/${locale}` : `/${locale}${path}`
}

/** Absolute URL of a page in a given locale. */
export function localizedUrl(path: string, locale: AppLocale): string {
    return `${SITE_URL}${localizedPath(path, locale)}`
}

const NAMED_ENTITIES: Record<string, string> = { nbsp: ' ', amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', laquo: '«', raquo: '»', mdash: '—', ndash: '–', hellip: '…' }

/** Rich-text content from the editor contains entities like &nbsp; — turn them into plain text. */
function decodeEntities(text: string): string {
    return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, code: string) => {
        if (code[0] === '#') {
            const n = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10)
            return Number.isFinite(n) ? String.fromCodePoint(n) : m
        }
        return NAMED_ENTITIES[code.toLowerCase()] ?? m
    })
}

/** Meta descriptions are cut by search engines at ~160 chars — trim on a word boundary. */
export function truncateDescription(text: string, max = 160): string {
    const clean = decodeEntities(text.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()
    if (clean.length <= max) return clean
    const cut = clean.slice(0, max - 1)
    return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), max - 30)).replace(/[\s,.;:—-]+$/, '')}…`
}

/** BreadcrumbList JSON-LD from the path segments that are known static pages (Home › Events › Meetings). */
export function buildBreadcrumbs(locale: AppLocale, path: string, currentTitle: string, t: (key: string) => string) {
    if (path === '/') return null
    const items: { name: string; url: string }[] = [{ name: t('nav.home'), url: localizedUrl('/', locale) }]
    const segments = path.split('/').filter(Boolean)
    segments.forEach((_, i) => {
        const subPath = '/' + segments.slice(0, i + 1).join('/')
        const isLast = i === segments.length - 1
        const page = SEO_PAGES.find((p) => p.path === subPath)
        const name = isLast ? currentTitle : page?.titleKey ? t(page.titleKey) : ''
        if (name) items.push({ name, url: localizedUrl(subPath, locale) })
    })
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url })),
    }
}

interface StructuredDataText {
    name: string
    alternateName: string
    description: string
}

/** Organization + WebSite JSON-LD for the given language. */
export function buildSiteStructuredData(locale: AppLocale, text: StructuredDataText) {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'GovernmentOrganization',
                '@id': `${SITE_URL}/#organization`,
                name: text.name,
                alternateName: [text.alternateName, 'FIC', 'Foreign Investors Council of Uzbekistan'],
                description: text.description,
                url: localizedUrl('/', locale),
                logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
                image: OG_IMAGE,
                email: 'secretariat@fics.uz',
                telephone: '+998880998888',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'BoMI Finance Center',
                    addressLocality: 'Tashkent',
                    postalCode: '100135',
                    addressCountry: 'UZ',
                },
                areaServed: { '@type': 'Country', name: 'Uzbekistan' },
                sameAs: SOCIAL_PROFILES,
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: localizedUrl('/', locale),
                name: text.name,
                inLanguage: locale,
                publisher: { '@id': `${SITE_URL}/#organization` },
            },
        ],
    }
}
