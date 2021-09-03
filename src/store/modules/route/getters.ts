import { IRoute } from './state'

export const getters = {
  breadcrumb: (state: IRoute) => state.breadcrumb,
  tabNav: (state: IRoute) => state.tabNav,
  makeTree: (state: IRoute) => state.makeTree
}
