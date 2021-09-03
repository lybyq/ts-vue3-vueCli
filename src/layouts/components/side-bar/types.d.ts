export type MenuItem = {
  path?: string
  fullPath?: string
  name?: string
  icon?: string
  regex?: any, // 正则匹配
  children?: MenuItem[]
}
