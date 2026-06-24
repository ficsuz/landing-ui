export function getMediaUrl(fileId?: string | null): string {
    if (!fileId) return ''
    return `${import.meta.env.VITE_MEDIA_URL}/v1/files/${fileId}`
}

export function getEmbedUrl(url?: string | null): string {
    if (!url) return ''
    const youtubeMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]+)/)
    if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}`
    return url
}
