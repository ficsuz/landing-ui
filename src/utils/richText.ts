import DOMPurify from 'dompurify'

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const HAS_TAG = /<\/?[a-z][^>]*>/i
const BLOCK_TAG = /^<\/?(p|div|h[1-6]|ul|ol|li|blockquote|pre|table|thead|tbody|tfoot|tr|td|th|hr|figure|section|article)\b/i

/**
 * Turn content typed in a plain textarea into HTML, keeping its line breaks:
 * blank line → new paragraph, single newline → <br>. Tags written by hand (<b>, <hr>, <h1>…) still work;
 * lines that are block tags are kept as they are. Rich text editor output (no newlines of its own) is returned as is.
 */
export function toHtml(text: string) {
    if (!text) return text
    const hasTags = HAS_TAG.test(text)
    if (hasTags && (!text.includes('\n') || /<pre\b/i.test(text))) return text

    const blocks: string[] = []
    let paragraph: string[] = []
    const flush = () => {
        if (paragraph.length) blocks.push(`<p>${paragraph.join('\n').replace(/(?:<br\s*\/?>)?\n/gi, '<br>')}</p>`)
        paragraph = []
    }

    for (const raw of text.replace(/\r\n?/g, '\n').split('\n')) {
        const line = raw.trim()
        if (!line) flush()
        else if (hasTags && BLOCK_TAG.test(line)) {
            flush()
            blocks.push(line)
        } else paragraph.push(hasTags ? line : escapeHtml(line))
    }
    flush()
    return blocks.join('')
}

/** Safe HTML for v-html: plain text is converted, scripts/handlers are stripped */
export function renderRichText(text: string) {
    return DOMPurify.sanitize(toHtml(text), { ADD_ATTR: ['target'] })
}
