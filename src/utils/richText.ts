import DOMPurify from 'dompurify'

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Content saved before the rich text editor was added is plain text — turn it into HTML
 * keeping its line breaks: blank line → new paragraph, single newline → <br>. HTML is returned as is.
 */
export function toHtml(text: string) {
    if (!text || /<[a-z][\s\S]*>/i.test(text)) return text
    return text
        .replace(/\r\n?/g, '\n')
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
        .join('')
}

/** Safe HTML for v-html: legacy plain text is converted, scripts/handlers are stripped */
export function renderRichText(text: string) {
    return DOMPurify.sanitize(toHtml(text), { ADD_ATTR: ['target'] })
}
