import { createStore,Store, useStore as useVuexStore } from 'vuex'
import { IRootState,IStoreType } from './types'

import login from './login/login'
import user from './user/user'
import articleBy from './article/article'

const store = createStore<IRootState>({
  state() {
    return{
      name:'wxl',
      userInfo:{}
    }
  },
  mutations: {
    
  },
  actions: {
  },  
  modules: {
    login,
    user,
    articleBy
  }
})

export function setupStore(){
  store.dispatch('login/loadLocalLogin')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store