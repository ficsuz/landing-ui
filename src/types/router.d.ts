import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        title?: string
        titleKey?: string
        descriptionKey?: string
        noHero?: boolean
        heroImage?: string
        roles?: string[]
    }
}
