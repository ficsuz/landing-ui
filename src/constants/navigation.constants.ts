export interface NavLink {
    labelKey: string
    path: string
}

export interface NavMenuItem {
    labelKey: string
    path?: string
    /** Footer-only: standalone sections (no children) show this line instead of a link list. */
    noteKey?: string
    children?: NavLink[]
}

export const websiteMenu: NavMenuItem[] = [
    {
        labelKey: 'nav.aboutCouncil',
        path: '/',
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
        path: '/council-members',
        children: [
            { labelKey: 'nav.councilMembers', path: '/council-members' },
            { labelKey: 'nav.uzbekSide', path: '/council-members/uzbek-side' },
            { labelKey: 'nav.experts', path: '/council-members/experts' },
            { labelKey: 'nav.becomeAMember', path: '/council-members/become-a-member' },
        ],
    },
    {
        labelKey: 'nav.workingGroups',
        path: '/working-groups',
        children: [
            { labelKey: 'nav.workingGroups', path: '/working-groups#interagency-groups' },
            { labelKey: 'nav.sessionOutcomes', path: '/working-groups#session-outcomes' },
        ],
    },
    {
        labelKey: 'nav.results',
        path: '/results',
        children: [
            { labelKey: 'nav.councilResults', path: '/results' },
            { labelKey: 'nav.initiatives', path: '/results/initiatives' },
            { labelKey: 'nav.investments', path: '/results/investments' },
            { labelKey: 'nav.documents', path: '/results/documents' },
        ],
    },
    // Standalone section — single page, no dropdown.
    {
        labelKey: 'nav.regionalAlliance',
        path: '/regional-alliance',
        noteKey: 'regionalAlliancePage.tagline',
    },
    {
        labelKey: 'nav.events',
        path: '/events',
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
        path: '/media',
        children: [
            { labelKey: 'nav.news', path: '/media' },
            { labelKey: 'nav.analyticsAndArticles', path: '/media/analytics' },
            { labelKey: 'nav.specialProjects', path: '/media/special-projects' },
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
