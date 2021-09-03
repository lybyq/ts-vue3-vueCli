import { RouteLocationNormalized } from 'vue-router'
import { MenuItem } from '@/layouts/components/side-bar/types'

export type IRoute = {
  breadcrumb: string[],
  tabNav: MenuItem[],
  makeTree: MenuItem[]
}

export const state: IRoute = {
  breadcrumb: [], // 面包屑
  tabNav: [], // tab多标签
  makeTree: [] // 扁平化路由权限数据
}
