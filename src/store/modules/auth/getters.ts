import { IUserState } from './state'

export const getters = {
  id: (state: IUserState) => state.id,
  name: (state: IUserState) => state.name,
  phone: (state: IUserState) => state.phone,
  roles: (state: IUserState) => state.roles,
  info: (state: IUserState) => state.info,
  token: (state: IUserState) => state.token
}
