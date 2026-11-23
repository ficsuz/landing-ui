export const memberCategories = [
    { slug: 'exec-board', type: 'EXECUTIVE_BOARD', titleKey: 'councilMembersPage.execBoardTitle' },
    { slug: 'full-members', type: 'FULL', titleKey: 'councilMembersPage.fullMembersTitle' },
    { slug: 'observers', type: 'OBSERVER', titleKey: 'councilMembersPage.observersTitle' },
] as const

export type MemberCategory = typeof memberCategories[number]
