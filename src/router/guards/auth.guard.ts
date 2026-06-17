import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '../../stores'
import { ElMessage } from 'element-plus'

export default async function authGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const isAdminRoute = to.path.startsWith('/admin') && to.path !== '/admin/login'

  if (!isAdminRoute) {
    next()
    return
  }

  const store = useUserStore()

  if (!store.token) {
    ElMessage({ message: 'Iltimos, avval tizimga kiring', type: 'warning', duration: 5000 })
    next(`/admin/login?redirect=${encodeURIComponent(to.fullPath)}`)
    return
  }

  if (!store.user) {
    try {
      await store.fetchUserInfo()
    } catch {
      store.resetToken()
      ElMessage({ message: 'Sessiya muddati tugadi. Iltimos, qayta kiring.', type: 'error', duration: 5000 })
      next(`/admin/login?redirect=${encodeURIComponent(to.fullPath)}`)
      return
    }
  }

  next()
}
