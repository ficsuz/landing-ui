import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 120,
  minimum: 0.15,
})

/**
 * Shows a global loading indicator on every route navigation:
 * starts the progress bar before each navigation and finishes it
 * once the (possibly lazy-loaded) page resolves, errors, or aborts.
 */
export function setupLoadingGuard(router: Router) {
  router.beforeEach((_to, _from, next) => {
    NProgress.start()
    next()
  })

  router.afterEach(() => {
    NProgress.done()
  })

  router.onError(() => {
    NProgress.done()
  })
}

export default setupLoadingGuard
