import { IUserState } from './state'

export const mutations = {
  setUserInfo: (state: IUserState, userInfo: IUserState) => {
    const {
      id,
      name,
      phone,
      info
    } = userInfo
    state.id = id
    state.name = name
    state.phone = phone
    state.info = info
  }
}
