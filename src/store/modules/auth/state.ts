/**
 * 平台用户auth
 */
import { createStorage } from '@/utils/Storage'
import { CookieKeyEnum } from '@/config/const-enum'

const Storage = createStorage({ storage: localStorage })
export type IUserState = {
  id: number
  name: string
  phone: string
  info?: any
  roles?: string
  token: string
}
export const state: IUserState = {
  id: 0,
  name: '',
  roles: '',
  phone: '',
  info: {
    sourceCode: '',
    channelCode: ''
  },
  token: Storage.getCookie(CookieKeyEnum.AuthToken)
}
