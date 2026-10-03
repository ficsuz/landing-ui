import fs from 'node:fs'
import path from 'node:path'
import type { Plugin, ResolvedConfig } from 'vite'
import {
    SITE_URL,
    SUPPORTED_LOCALES,
    DEFAULT_LOCALE,
    OG_LOCALES,
    OG_IMAGE,
    SEO_PAGES,
    localizedPath,
    localizedUrl,
    truncateDescription,
    buildSiteStructuredData,
    buildBreadcrumbs,
    type AppLocale,
    type SeoPage,
} from '../src/constants/seo.constants'

/**
 * Pre-renders the SEO <head> of every static website page in every language.
 *
 * The app is a client-rendered SPA, so without this every URL would be served the same
 * index.html (Uzbek home title, no hreflang). Crawlers that don't run JS (Yandex, social
 * previews, Telegram) and Google's first indexing pass would then see identical pages.
 *
 * - dev + build: index.html gets the Uzbek home head injected (`<!-- seo:head -->`).
 * - build: writes `<locale>/<path>.html` copies with a localized head + <noscript>
 *   summary for each page, plus a multilingual sitemap.xml with hreflang alternates.
 *   nginx serves them via `try_files $uri $uri.html /spa.html`; spa.html is a neutral
 *   shell (no canonical/hreflang) for detail pages and unknown URLs.
 */

const HEAD_START = '<!-- seo:head:start -->'
const HEAD_END = '<!-- seo:head:end -->'
const BODY_START = '<!-- seo:body:start -->'
const BODY_END = '<!-- seo:body:end -->'

type Messages = Record<AppLocale, Record<string, unknown>>

function loadMessages(root: string): Messages {
    const out = {} as Messages
    for (const l of SUPPORTED_LOCALES) {
        out[l] = JSON.parse(fs.readFileSync(path.resolve(root, `src/assets/locales/${l}.json`), 'utf-8'))
    }
    return out
}

function translator(messages: Messages, locale: AppLocale) {
    const lookup = (dict: Record<string, unknown>, key: string): string | undefined => {
        const v = key.split('.').reduce<unknown>((acc, k) => (acc && typeof acc === 'object' ? (acc as any)[k] : undefined), dict)
        return typeof v === 'string' ? v.replace(/\{'([^']*)'\}/g, '$1') : undefined
    }
    const has = (key: string) => lookup(messages[locale], key) !== undefined
    const t = (key: string) => lookup(messages[locale], key) ?? lookup(messages[DEFAULT_LOCALE], key) ?? key
    return { t, has }
}

const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** JSON inside <script> must not be able to close the tag. */
const jsonLd = (id: string, data: unknown) =>
    `<script type="application/ld+json" id="${id}">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`

function pageText(page: SeoPage, messages: Messages, locale: AppLocale) {
    const { t, has } = translator(messages, locale)
    const title = page.name === 'home' ? '' : page.titleKey ? t(page.titleKey) : ''
    let description = t('seo.description')
    if (page.descriptionKey && has(page.descriptionKey)) description = t(page.descriptionKey)
    else if (has(`seo.pages.${page.name}`)) description = t(`seo.pages.${page.name}`)
    return {
        t,
        title,
        fullTitle: title ? `${title} | ${t('seo.siteName')}` : t('seo.homeTitle'),
        description: truncateDescription(description),
    }
}

function renderHead(page: SeoPage, messages: Messages, locale: AppLocale): string {
    const { t, title, fullTitle, description } = pageText(page, messages, locale)
    const canonical = localizedUrl(page.path, locale)
    const siteName = t('seo.siteName')
    const breadcrumbs = buildBreadcrumbs(locale, page.path, title, t)

    const tags = [
        `<title>${esc(fullTitle)}</title>`,
        `<meta name="description" content="${esc(description)}" />`,
        `<meta name="keywords" content="${esc(t('seo.keywords'))}" />`,
        `<meta name="robots" content="index, follow, max-image-preview:large" />`,
        `<link rel="canonical" href="${canonical}" />`,
        ...SUPPORTED_LOCALES.map((l) => `<link rel="alternate" hreflang="${l}" href="${localizedUrl(page.path, l)}" />`),
        `<link rel="alternate" hreflang="x-default" href="${localizedUrl(page.path, DEFAULT_LOCALE)}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="${esc(siteName)}" />`,
        `<meta property="og:title" content="${esc(fullTitle)}" />`,
        `<meta property="og:description" content="${esc(description)}" />`,
        `<meta property="og:url" content="${canonical}" />`,
        `<meta property="og:image" content="${OG_IMAGE}" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta property="og:image:alt" content="${esc(title || siteName)}" />`,
        `<meta property="og:locale" content="${OG_LOCALES[locale]}" />`,
        ...SUPPORTED_LOCALES.filter((l) => l !== locale).map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALES[l]}" />`),
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${esc(fullTitle)}" />`,
        `<meta name="twitter:description" content="${esc(description)}" />`,
        `<meta name="twitter:image" content="${OG_IMAGE}" />`,
        jsonLd('ld-site', buildSiteStructuredData(locale, { name: t('seo.orgName'), alternateName: siteName, description: t('seo.description') })),
        ...(breadcrumbs ? [jsonLd('ld-breadcrumbs', breadcrumbs)] : []),
    ]
    return `${HEAD_START}\n    ${tags.join('\n    ')}\n    ${HEAD_END}`
}

/** Plain-HTML summary + site navigation for crawlers that don't execute JavaScript. */
function renderBody(page: SeoPage, messages: Messages, locale: AppLocale): string {
    const { t, title, description } = pageText(page, messages, locale)
    const links = SEO_PAGES.map((p) => {
        const label = p.name === 'home' ? t('nav.home') : p.titleKey ? t(p.titleKey) : p.path
        return `<li><a href="${localizedPath(p.path, locale)}">${esc(label)}</a></li>`
    }).join('')
    const languages = SUPPORTED_LOCALES.map(
        (l) => `<a href="${localizedPath(page.path, l)}" hreflang="${l}" lang="${l}">${l.toUpperCase()}</a>`
    ).join(' · ')
    return `${BODY_START}
    <noscript>
        <h1>${esc(title || t('seo.orgName'))}</h1>
        <p>${esc(description)}</p>
        <nav><ul>${links}</ul></nav>
        <p>${languages}</p>
    </noscript>
    ${BODY_END}`
}

function replaceBetween(html: string, start: string, end: string, replacement: string): string {
    const i = html.indexOf(start)
    const j = html.indexOf(end)
    if (i === -1 || j === -1) throw new Error(`[seo] markers ${start} … ${end} not found in index.html`)
    return html.slice(0, i) + replacement + html.slice(j + end.length)
}

function renderPage(template: string, page: SeoPage, messages: Messages, locale: AppLocale): string {
    let html = template.replace(/<html lang="[^"]*"/, `<html lang="${locale}"`)
    html = replaceBetween(html, HEAD_START, HEAD_END, renderHead(page, messages, locale))
    html = replaceBetween(html, BODY_START, BODY_END, renderBody(page, messages, locale))
    return html
}

function renderSitemap(): string {
    const today = new Date().toISOString().slice(0, 10)
    const urls = SEO_PAGES.flatMap((page) =>
        SUPPORTED_LOCALES.map((locale) => {
            const alternates = [
                ...SUPPORTED_LOCALES.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${localizedUrl(page.path, l)}" />`),
                `<xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrl(page.path, DEFAULT_LOCALE)}" />`,
            ]
            return [
                '  <url>',
                `    <loc>${localizedUrl(page.path, locale)}</loc>`,
                ...alternates.map((a) => `    ${a}`),
                `    <lastmod>${today}</lastmod>`,
                `    <changefreq>${page.changefreq}</changefreq>`,
                `    <priority>${page.priority.toFixed(1)}</priority>`,
                '  </url>',
            ].join('\n')
        })
    )
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}

/**
 * SPA fallback for URLs that are not pre-rendered (detail pages, unknown URLs).
 * No canonical/hreflang/og:url here: the router sets the correct ones at runtime, and a
 * wrong static canonical (e.g. pointing at the home page) would confuse search engines.
 */
function renderShell(template: string, messages: Messages): string {
    const { t } = translator(messages, DEFAULT_LOCALE)
    const tags = [
        `<title>${esc(t('seo.homeTitle'))}</title>`,
        `<meta name="description" content="${esc(t('seo.description'))}" />`,
        `<meta property="og:site_name" content="${esc(t('seo.siteName'))}" />`,
        `<meta property="og:image" content="${OG_IMAGE}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
    ]
    let html = replaceBetween(template, HEAD_START, HEAD_END, `${HEAD_START}\n    ${tags.join('\n    ')}\n    ${HEAD_END}`)
    html = replaceBetween(html, BODY_START, BODY_END, `${BODY_START}${BODY_END}`)
    return html
}

/** `/` → index.html, `/ru` → ru.html, `/ru/media` → ru/media.html */
function outputFile(page: SeoPage, locale: AppLocale): string {
    const p = localizedPath(page.path, locale)
    return p === '/' ? 'index.html' : `${p.slice(1)}.html`
}

export function seoPlugin(): Plugin {
    let config: ResolvedConfig
    const home = SEO_PAGES.find((p) => p.name === 'home')!

    return {
        name: 'fic-seo',
        configResolved(resolved) {
            config = resolved
        },
        transformIndexHtml(html) {
            const messages = loadMessages(config.root)
            return html
                .replace('<!-- seo:head -->', renderHead(home, messages, DEFAULT_LOCALE))
                .replace('<!-- seo:body -->', renderBody(home, messages, DEFAULT_LOCALE))
        },
        closeBundle() {
            if (config.command !== 'build') return
            const outDir = path.resolve(config.root, config.build.outDir)
            const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf-8')
            const messages = loadMessages(config.root)

            let count = 0
            for (const page of SEO_PAGES) {
                for (const locale of SUPPORTED_LOCALES) {
                    const file = path.join(outDir, outputFile(page, locale))
                    fs.mkdirSync(path.dirname(file), { recursive: true })
                    fs.writeFileSync(file, renderPage(template, page, messages, locale))
                    count++
                }
            }
            fs.writeFileSync(path.join(outDir, 'spa.html'), renderShell(template, messages))
            fs.writeFileSync(path.join(outDir, 'sitemap.xml'), renderSitemap())
            config.logger.info(`[seo] ${count} localized pages + sitemap.xml generated for ${SITE_URL}`)
        },
    }
}
