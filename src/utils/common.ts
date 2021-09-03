import { MenuItem } from '@/layouts/components/side-bar/types'

/**
 * 数组扁平化
 * @param tree
 */
export const makeTree = (tree: MenuItem[]) => {
  let tempArr: any = []
  const result: any = []
  tempArr = tempArr.concat(tree)
  while (tempArr.length) {
    const first = tempArr.shift() // 弹出第一个元素
    if (first.children) {
      // 如果有children
      tempArr = tempArr.concat(first.children)
      delete first.children
    }
    result.push(first)
  }
  return result
}
