export type WeeklyResult = {
    id: number
    image: string
    dateRange: string
}

export type WeeklyResultsResponse = {
    data: WeeklyResult[]
    total: number
}
