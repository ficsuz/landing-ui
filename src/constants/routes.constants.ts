export interface MenuItem {
    id: number
    title: string
    icon: string
    path: string
    role: string[]
}

export const menuItems: MenuItem[] = [
    {
        id: 1,
        title: 'Ustozlar',
        icon: 'teachers',
        path: '/admin/teachers',
        role: ['super_admin', 'admin']
    },
    {
        id: 2,
        title: "O'quvchilar",
        icon: 'students',
        path: '/admin/students',
        role: ['super_admin', 'admin']
    },
    {
        id: 3,
        title: 'Guruhlar',
        icon: 'groups',
        path: '/admin/groups',
        role: ['super_admin', 'admin']
    },
    {
        id: 4,
        title: 'Kurslar',
        icon: 'courses',
        path: '/admin/courses',
        role: ['super_admin', 'admin']
    },
    {
        id: 5,
        title: 'Kurslarim',
        icon: 'courses',
        path: '/admin/teacher-courses',
        role: ['teacher']
    },
]
