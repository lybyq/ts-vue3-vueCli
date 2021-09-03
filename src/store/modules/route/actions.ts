import { ActionContext } from 'vuex'
import { IUserState } from '@/store/modules/auth/state'
import { RouteLocationNormalized } from 'vue-router'
import { IRoute } from '@/store/modules/route/state'
import { cloneDeep, findIndex, pullAllBy } from 'lodash'
import { MenuItem } from '@/layouts/components/side-bar/types'

export const actions = {
  /**
   * 保存面包屑数据
   * @param commit
   * @param route
   */
  saveBreadcrumb ({ commit }: ActionContext<IUserState, any>, route: string[]) {
    let routeLink: string[] = ['首页']
    try {
      // 组装面包屑数据
      if (route && route.length > 0) {
        routeLink = routeLink.concat(route)
      }
      commit('setBreadcrumb', routeLink)
    } catch (e) {
      console.log('e:', e)
    }
  },
  /**
   * 添加tabNav
   * @param state
   * @param commit
   * @param tab
   */
  async addTabNav ({
    state,
    getters,
    commit
  }: ActionContext<IRoute, any>, tab: RouteLocationNormalized) {
    const deepTab = cloneDeep(state.tabNav)
    if (tab) {
      // 取权限交集
      const treeList: MenuItem[] = await getters.makeTree
      const _menu = await treeList.find((item: MenuItem) => item.path === tab.path) || {}
      const _tab: MenuItem = {
        fullPath: tab?.fullPath,
        path: tab.path,
        icon: _menu.icon,
        name: _menu.name
      }
      const isExists = deepTab.some((item) => item.fullPath === _tab.fullPath)
      if (!isExists) {
        deepTab.push(_tab)
        commit('setTabNav', deepTab)
      } else {
        // 替换
        const _index = findIndex(deepTab, { fullPath: _tab.fullPath })
        deepTab.splice(_index, 1, _tab)
        commit('setTabNav', deepTab)
      }
    }
  },
  /**
   * 删除当前tab
   * @param commit
   * @param state
   * @param fullPath
   */
  closeCurrentTab ({
    commit,
    state
  }: ActionContext<IRoute, any>, fullPath: string) {
    const deepTab = cloneDeep(state.tabNav)
    const index = findIndex(deepTab, { fullPath })
    if (index > -1) {
      deepTab.splice(index, 1)
      commit('setTabNav', deepTab)
    }
  },
  /**
   * 关闭其他tab
   * @param commit
   * @param state
   * @param fullPath
   */
  closeOtherTab ({
    commit,
    state
  }: ActionContext<IRoute, any>, fullPath: string) {
    const deepTab = cloneDeep(state.tabNav)
    const other = deepTab.filter((tab: MenuItem) => tab.fullPath !== fullPath)
    pullAllBy(deepTab, other, 'fullPath')
    if (deepTab.length > 0) {
      commit('setTabNav', deepTab)
    }
  },
  /**
   * 关闭左侧tab
   * @param commit
   * @param state
   * @param fullPath
   */
  closeLeftTab ({
    commit,
    state
  }: ActionContext<IRoute, any>, fullPath: string) {
    const deepTab = cloneDeep(state.tabNav)
    // 替换
    const index = findIndex(deepTab, { fullPath: fullPath })
    console.log('index:', index)
    deepTab.splice(0, index)
    commit('setTabNav', deepTab)
  },
  /**
   * 关闭右侧tab
   * @param commit
   * @param state
   * @param fullPath
   */
  closeRightTab ({
    commit,
    state
  }: ActionContext<IRoute, any>, fullPath: string) {
    const deepTab = cloneDeep(state.tabNav)
    // 替换
    const index = findIndex(deepTab, { fullPath: fullPath })
    deepTab.splice(index + 1)
    commit('setTabNav', deepTab)
  },
  /**
   * 关闭所有tab
   * @param commit
   * @param state
   */
  closeAllTab ({
    commit
  }: ActionContext<IRoute, any>) {
    commit('setTabNav', [])
  }
}
