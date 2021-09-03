import { ActionContext } from 'vuex'
import { IUserState } from './state'
import { createStorage } from '@/utils/Storage'
import { CookieKeyEnum } from '@/config/const-enum'

const Storage = createStorage({ storage: localStorage })

export const actions = {
  /**
   * 保存用户信息
   * @param commit
   * @param userInfo
   */
  async saveUserInfo ({ commit }: ActionContext<IUserState, any>, userInfo: IUserState): Promise<any> {
    try {
      Storage.setCookie(CookieKeyEnum.AuthToken, userInfo)
      if (userInfo) {
        commit('setUserInfo', userInfo)
        return Promise.resolve('')
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
