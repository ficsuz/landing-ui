export type NewsItem = {
    id: number
    title: string
    excerpt: string
    date: string
    category: string
    image: string
    isFeatured?: boolean
}

export type NewsResponse = {
    data: NewsItem[]
    total: number
}
