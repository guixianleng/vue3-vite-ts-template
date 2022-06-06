import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'

import DefaultLayout from '/@/layout/default-layout.vue'
import appRoutes from './routes'
import createRouteGuard from './guard'

import Login from './routes/modules/login'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    Login,
    {
      name: 'root',
      path: '/',
      component: DefaultLayout,
      children: appRoutes,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      redirect: '/exception/404',
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

createRouteGuard(router)

export default router
