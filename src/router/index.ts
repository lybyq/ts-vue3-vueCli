import {
  createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, Router, RouteRecordRaw
} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'
import dataLog from '@/utils/data-log-acquisition'
import store from '@/store'

NProgress.inc(0.2)
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false
})
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
/**
 * 全局前置守卫
 */
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  // 离开上级路由埋点
  if (from && from.fullPath) {
    dataLog.leaveRouteLog({
      page: from.fullPath,
      pageCode: from.meta && from.meta.code ? from.meta.code as string : '0'
    })
  }
  NProgress.start()
  next()
})
/**
 * 全局后置守卫
 */
router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  // 进入路由埋点
  dataLog.enterRouteLog()
  // tab多标签处理
  if (!to.meta || !to.meta.isTab) {
    store.dispatch('route/addTabNav', to)
  }
  NProgress.done()
})
export default router
