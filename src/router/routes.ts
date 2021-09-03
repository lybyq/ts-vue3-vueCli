import Layout from '../layouts/index.vue'

const asyncRoutes: Array<any> = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home-index/index.vue'),
    meta: { isTab: false }
  },
  {
    path: '/cards/card-1',
    name: '卡片1',
    meta: {},
    component: () => import(/* webpackChunkName: "home" */ '../views/card/index.vue')
  }, {
    path: '/cards/card-2',
    name: '卡片2',
    meta: {},
    component: () => import(/* webpackChunkName: "home" */ '../views/card/index-2.vue')
  }
]
const routes: Array<any> = [
  {
    path: '/',
    redirect: '/login',
    meta: { isTab: false }
  },
  {
    path: '/login',
    name: '登录',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
    meta: { isTab: false }
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: asyncRoutes
  }
]
export default routes
