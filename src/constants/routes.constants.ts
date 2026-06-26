export type MenuEntry = { kind: 'link'; id: number; title: string; icon: string; path: string; role: string[] } | { kind: 'group'; title: string }

export const menuItems: MenuEntry[] = [
    // ─── Content ───────────────────────────────────────────────
    { kind: 'group', title: 'Content' },
    { kind: 'link', id: 1, title: 'News', icon: 'news', path: '/admin/news', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 2, title: 'Members', icon: 'members', path: '/admin/members', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 9, title: 'Experts', icon: 'members', path: '/admin/experts', role: ['super_admin', 'admin'] },
    // ─── Media ─────────────────────────────────────────────────────
    { kind: 'group', title: 'Media' },
    { kind: 'link', id: 7, title: 'Blitz Interview', icon: 'blitz', path: '/admin/media/blitz-interview', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 8, title: 'Reports', icon: 'reports', path: '/admin/media/reports', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 10, title: 'New Approaches', icon: 'reports', path: '/admin/media/analytical-reports', role: ['super_admin', 'admin'] },
    // ─── Events ─────────────────────────────────────────────────
    { kind: 'group', title: 'Events' },
    { kind: 'link', id: 3, title: 'Meetings', icon: 'meetings', path: '/admin/events/meetings', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 4, title: 'Weekly Results', icon: 'weekly', path: '/admin/events/weekly-results', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 5, title: 'Working Groups', icon: 'workgroup', path: '/admin/events/working-group', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 6, title: 'Plenary Sessions', icon: 'plenary', path: '/admin/events/plenary', role: ['super_admin', 'admin'] },
]
