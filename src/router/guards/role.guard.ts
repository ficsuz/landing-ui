import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '../../stores'
import { ElMessage } from 'element-plus'

interface RouteMeta {
    roles?: string[]
    [key: string]: any
}

export default function roleGuard(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext): void {
    const store = useUserStore()
    const meta = to.meta as RouteMeta

    if (!meta.roles || meta.roles.length === 0) {
        next()
        return
    }

    if (!store.user) {
        next('/admin/login')
        return
    }

    const userRole = store.user.roles?.[0]?.name
    if (!userRole) {
        store.resetToken()
        ElMessage({ message: 'Sessiya muddati tugadi. Iltimos, qayta kiring.', type: 'error', duration: 5000 })
        next('/admin/login')
        return
    }

    if (meta.roles.includes(userRole)) {
        next()
        return
    }

    ElMessage({ message: 'Bu sahifaga kirishga ruxsatingiz yoq', type: 'error', duration: 5000 })
    next('/admin')
}
