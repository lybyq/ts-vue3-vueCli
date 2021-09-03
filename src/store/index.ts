import { createStore } from 'vuex'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import createPersistedState from 'vuex-persistedstate'
import { createStorage } from '@/utils/Storage'
import modules from './modules/index'
import { IUserState } from './modules/auth/state'

export interface IStore {
  user: IUserState
}

const Storage = createStorage({ storage: localStorage })
const isDev = process.env.NODE_ENV === 'development'
const plugins = [
  createPersistedState({
    paths: ['auth', 'route'],
    storage: {
      getItem: (key: any) => Storage.get(key),
      setItem: (key: any, value: any) => Storage.set(key, value),
      removeItem: (key: any) => Storage.remove(key)
    }
  })
]
export default createStore<IStore>({
  strict: isDev,
  plugins,
  modules
})
