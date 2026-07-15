export type MenuEntry = { kind: 'link'; id: number; title: string; icon: string; path: string; role: string[] } | { kind: 'group'; title: string }

export const menuItems: MenuEntry[] = [
    // ─── Content ───────────────────────────────────────────────
    { kind: 'group', title: 'Content' },
    { kind: 'link', id: 1, title: 'News', icon: 'news', path: '/admin/news', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 13, title: 'Blog / Articles', icon: 'news', path: '/admin/blog', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 2, title: 'Members', icon: 'members', path: '/admin/members', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 14, title: 'Council Members', icon: 'members', path: '/admin/council-members', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 9, title: 'Experts', icon: 'members', path: '/admin/experts', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 15, title: 'Team (Secretariat)', icon: 'members', path: '/admin/team', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 16, title: 'Chronology', icon: 'reports', path: '/admin/chronology', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 17, title: 'Council Calendar', icon: 'reports', path: '/admin/council-calendar', role: ['super_admin', 'admin'] },
    // ─── Media ─────────────────────────────────────────────────────
    { kind: 'group', title: 'Media' },
    { kind: 'link', id: 7, title: 'Blitz Interview', icon: 'blitz', path: '/admin/media/blitz-interview', role: ['super_admin', 'admin'] },
    // { kind: 'link', id: 8, title: 'Reports', icon: 'reports', path: '/admin/media/reports', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 10, title: 'Reports', icon: 'reports', path: '/admin/media/analytical-reports', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 19, title: 'Special Projects', icon: 'blitz', path: '/admin/media/special-projects', role: ['super_admin', 'admin'] },
    // ─── Documents ─────────────────────────────────────────────────
    { kind: 'group', title: 'Documents' },
    { kind: 'link', id: 11, title: 'Documents', icon: 'reports', path: '/admin/documents', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 12, title: 'Document Categories', icon: 'reports', path: '/admin/documents/categories', role: ['super_admin', 'admin'] },
    // ─── Events ─────────────────────────────────────────────────
    { kind: 'group', title: 'Events' },
    { kind: 'link', id: 4, title: 'Weekly Results', icon: 'weekly', path: '/admin/events/weekly-results', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 18, title: 'Meetings', icon: 'meetings', path: '/admin/events/meetings', role: ['super_admin', 'admin'] },
]
