import type { Router, LocationQueryRaw } from 'vue-router'
import NProgress from 'nprogress' // progress bar

import usePermission from '/@/hooks/permission'
import { useUserStore } from '/@/store'
import { isLogin } from '/@/utils/auth'
import appRoutes from '../routes'

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    NProgress.start()
    const userStore = useUserStore()
    async function crossroads() {
      const Permission = usePermission()
      if (Permission.accessRouter(to)) next()
      else {
        const destination = Permission.findFirstPermissionRoute(appRoutes, userStore.role) || {
          name: 'notFound',
        }
        next(destination)
      }
      NProgress.done()
    }
    if (isLogin()) {
      if (userStore.role) {
        crossroads()
      } else {
        try {
          await userStore.getUserInfo()
          crossroads()
        } catch (error) {
          next({
            name: 'login',
            query: {
              redirect: to.name,
              ...to.query,
            } as LocationQueryRaw,
          })
          // next()
          NProgress.done()
        }
      }
    } else {
      if (to.name === 'login') {
        next()
        NProgress.done()
        return
      }
      next({
        name: 'login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      })
      // next()
      NProgress.done()
    }
  })
}
