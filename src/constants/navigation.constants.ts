export interface NavLink {
    labelKey: string
    path: string
}

export interface NavMenuItem {
    labelKey: string
    path?: string
    children?: NavLink[]
}

export const websiteMenu: NavMenuItem[] = [
    {
        labelKey: 'nav.aboutCouncil',
        children: [
            { labelKey: 'nav.home', path: '/' },
            { labelKey: 'nav.ficHistory', path: '/fic-history' },
            { labelKey: 'nav.association', path: '/association' },
            { labelKey: 'nav.management', path: '/management' },
            { labelKey: 'nav.secretariat', path: '/secretariat' },
        ],
    },
    {
        labelKey: 'nav.councilMembers',
        children: [
            { labelKey: 'nav.councilMembers', path: '/council-members' },
            { labelKey: 'nav.uzbekSide', path: '/council-members/uzbek-side' },
            { labelKey: 'nav.experts', path: '/council-members/experts' },
            { labelKey: 'nav.becomeAMember', path: '/council-members/become-a-member' },
        ],
    },
    {
        labelKey: 'nav.workingGroups',
        children: [
            { labelKey: 'nav.overview', path: '/working-groups#overview' },
            { labelKey: 'nav.sessionOutcomes', path: '/working-groups#session-outcomes' },
        ],
    },
    {
        labelKey: 'nav.results',
        children: [
            { labelKey: 'nav.councilResults', path: '/results' },
            { labelKey: 'nav.initiatives', path: '/results/initiatives' },
            { labelKey: 'nav.investments', path: '/results/investments' },
            { labelKey: 'nav.documents', path: '/results/documents' },
        ],
    },
    {
        labelKey: 'nav.events',
        children: [
            { labelKey: 'nav.calendarPlan', path: '/events' },
            { labelKey: 'nav.plenarySessions', path: '/events/plenary-sessions' },
            { labelKey: 'nav.interimSession', path: '/events/interim-session' },
            { labelKey: 'nav.workingGroupSession', path: '/events/working-group-session' },
            { labelKey: 'nav.meetings', path: '/events/meetings' },
            { labelKey: 'nav.weeklyResults', path: '/events/weekly-results' },
        ],
    },
    {
        labelKey: 'nav.media',
        children: [
            { labelKey: 'nav.news', path: '/media' },
            { labelKey: 'nav.analyticsAndArticles', path: '/media/analytics' },
            { labelKey: 'nav.blitzInterview', path: '/media/blitz-interview' },
            { labelKey: 'nav.reports', path: '/media/reports' },
        ],
    },
]

export interface LocaleOption {
    code: string
    label: string
}

export const localeOptions: LocaleOption[] = [
    { code: 'uz', label: "O'z" },
    { code: 'ru', label: 'Ру' },
    { code: 'en', label: 'En' },
]
