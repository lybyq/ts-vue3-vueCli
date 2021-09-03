import { IRoute } from './state'
import { RouteLocationNormalized } from 'vue-router'
import { MenuItem } from '@/layouts/components/side-bar/types'

export const mutations = {
  /**
   * 设置面包屑数据
   * @param state
   * @param list
   */
  setBreadcrumb: (state: IRoute, list: string[]) => {
    state.breadcrumb = list
  },
  /**
   * 设置扁平化权限数据
   * @param state
   * @param tree
   */
  initMakeTree: (state: IRoute, tree: MenuItem[]) => {
    state.makeTree = tree
  },
  /**
   * 设置tabNav数据
   * @param state
   * @param list 处理后的tabNav数据
   */
  setTabNav: (state: IRoute, list: MenuItem[]) => {
    // 判断当前list中是否包含 /home 首页
    if (list.findIndex((item: MenuItem) => item.fullPath === '/home') < 0) {
      list.unshift({
        name: '首页',
        path: '/home',
        fullPath: '/home',
        icon: 'el-icon-monitor'
      })
    }
    state.tabNav = list
  },
  /**
   * 清空tabNav数据
   * @param state
   */
  emptyTabNav: (state: IRoute) => {
    state.tabNav = []
  }
}
