export type MenuEntry =
    | { kind: 'link'; id: number; title: string; icon: string; path: string; role: string[] }
    | { kind: 'group'; title: string }

export const menuItems: MenuEntry[] = [
    // ─── Yangiliklar ───────────────────────────────────────────────
    { kind: 'group', title: 'Kontent' },
    { kind: 'link', id: 1, title: 'Yangiliklar',         icon: 'news',     path: '/admin/news',     role: ['super_admin', 'admin'] },
    { kind: 'link', id: 2, title: "A'zolar",             icon: 'members',  path: '/admin/members',  role: ['super_admin', 'admin'] },

    // ─── Tadbirlar ─────────────────────────────────────────────────
    { kind: 'group', title: 'Tadbirlar' },
    { kind: 'link', id: 3, title: 'Uchrashuvlar',        icon: 'meetings', path: '/admin/events/meetings',       role: ['super_admin', 'admin'] },
    { kind: 'link', id: 4, title: 'Haftalik natijalar',  icon: 'weekly',   path: '/admin/events/weekly-results', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 5, title: 'Ishchi guruhlar',     icon: 'workgroup',path: '/admin/events/working-group',  role: ['super_admin', 'admin'] },
    { kind: 'link', id: 6, title: 'Plenara sessiyalari', icon: 'plenary',  path: '/admin/events/plenary',        role: ['super_admin', 'admin'] },

    // ─── Media ─────────────────────────────────────────────────────
    { kind: 'group', title: 'Media' },
    { kind: 'link', id: 7, title: 'Blitz-intervyu',      icon: 'blitz',   path: '/admin/media/blitz-interview', role: ['super_admin', 'admin'] },
    { kind: 'link', id: 8, title: 'Hisobotlar',          icon: 'reports', path: '/admin/media/reports',         role: ['super_admin', 'admin'] },
]
