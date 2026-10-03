import { i18n } from '@/utils/i18n'
import {
    SITE_URL,
    SUPPORTED_LOCALES,
    DEFAULT_LOCALE,
    OG_LOCALES,
    OG_IMAGE,
    SEO_PAGES,
    localizedUrl,
    truncateDescription,
    buildSiteStructuredData,
    buildBreadcrumbs,
    type AppLocale,
} from '@/constants/seo.constants'

export interface HeadData {
    locale: AppLocale
    /** Path without locale prefix — used for canonical + hreflang URLs */
    path: string
    /** Page title without the site-name suffix; empty = home page title */
    title?: string
    description?: string
    image?: string
    type?: 'website' | 'article'
    publishedTime?: string
    noindex?: boolean
    /** Extra page-level JSON-LD (breadcrumbs, article, …) */
    structuredData?: Record<string, unknown> | null
}

// Narrow vue-i18n's generic signatures (they trigger TS2589 "excessively deep" here).
const translate = i18n.global as unknown as { t: (key: string) => string; te: (key: string) => boolean }
export const t = (key: string) => String(translate.t(key))
const te = (key: string) => translate.te(key)

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
    if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
    }
    el.setAttribute('content', content)
}

function upsertLink(selector: string, attrs: Record<string, string>) {
    let el = document.head.querySelector<HTMLLinkElement>(selector)
    if (!el) {
        el = document.createElement('link')
        document.head.appendChild(el)
    }
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v))
}

function upsertJsonLd(id: string, data: unknown | null) {
    let el = document.getElementById(id) as HTMLScriptElement | null
    if (!data) {
        el?.remove()
        return
    }
    if (!el) {
        el = document.createElement('script')
        el.type = 'application/ld+json'
        el.id = id
        document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(data)
}

function toAbsolute(url: string): string {
    if (/^https?:\/\//.test(url)) return url
    return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

/** Writes every SEO-relevant tag of <head> for the current page. */
export function applyHead(data: HeadData) {
    const { locale, path } = data
    const siteName = t('seo.siteName')
    const fullTitle = data.title ? `${data.title} | ${siteName}` : t('seo.homeTitle')
    const description = truncateDescription(data.description || t('seo.description'))
    const image = data.image ? toAbsolute(data.image) : OG_IMAGE
    const canonical = localizedUrl(path, locale)

    document.title = fullTitle
    document.documentElement.lang = locale

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'keywords', t('seo.keywords'))
    upsertMeta('name', 'robots', data.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')

    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonical })
    SUPPORTED_LOCALES.forEach((l) => {
        upsertLink(`link[rel="alternate"][hreflang="${l}"]`, { rel: 'alternate', hreflang: l, href: localizedUrl(path, l) })
    })
    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
        rel: 'alternate',
        hreflang: 'x-default',
        href: localizedUrl(path, DEFAULT_LOCALE),
    })

    upsertMeta('property', 'og:type', data.type || 'website')
    upsertMeta('property', 'og:site_name', siteName)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:image:alt', data.title || siteName)
    upsertMeta('property', 'og:locale', OG_LOCALES[locale])
    document.head.querySelectorAll('meta[property="og:locale:alternate"]').forEach((el) => el.remove())
    SUPPORTED_LOCALES.filter((l) => l !== locale).forEach((l) => {
        const el = document.createElement('meta')
        el.setAttribute('property', 'og:locale:alternate')
        el.setAttribute('content', OG_LOCALES[l])
        document.head.appendChild(el)
    })
    if (data.publishedTime) upsertMeta('property', 'article:published_time', data.publishedTime)
    else document.head.querySelector('meta[property="article:published_time"]')?.remove()

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)

    upsertJsonLd(
        'ld-site',
        buildSiteStructuredData(locale, { name: t('seo.orgName'), alternateName: siteName, description: t('seo.description') })
    )
    upsertJsonLd('ld-breadcrumbs', data.noindex ? null : buildBreadcrumbs(locale, path, data.title || '', t))
    upsertJsonLd('ld-page', data.structuredData ?? null)
}

/** Default title/description for a static page, by route name (see SEO_PAGES). */
export function resolvePageSeo(routeName: string | undefined, titleKey?: string, fallbackTitle?: string) {
    const page = SEO_PAGES.find((p) => p.name === routeName)
    const key = page?.titleKey ?? titleKey
    const title = routeName === 'home' ? '' : key ? t(key) : fallbackTitle || ''
    let description = ''
    if (page?.descriptionKey && te(page.descriptionKey)) description = t(page.descriptionKey)
    else if (routeName && te(`seo.pages.${routeName}`)) description = t(`seo.pages.${routeName}`)
    return { title, description }
}
