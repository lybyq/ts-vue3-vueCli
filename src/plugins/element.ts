// 按需引入elementUI矿建
// import 'element-plus/lib/theme-chalk/index.css'
// import '@/assets/styles/variables.scss'
// import '@/assets/styles/element-variables.scss'
// 引入组件
import {
  ElTable,
  ElTableColumn,
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElButton,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,
  ElIcon,
  ElContainer,
  ElAside,
  ElHeader
} from 'element-plus'

export const components = [
  ElTable,
  ElTableColumn,
  ElButton,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,
  ElIcon,
  ElContainer,
  ElAside,
  ElHeader
]

export const plugins = [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification
]
