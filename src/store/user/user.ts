import { Module } from 'vuex'

import { GetUserInfo } from '@/service/user/user'

import localCache from '@/utils/cache'
import router from '@/router'
import { ElMessage } from 'element-plus'

import { IUserInfo } from './types'
import { IRootState } from '../types'
import {checkPhone} from '../../utils/checkPhone'
// import {} from '@/service/user/type'

const userModule: Module<IUserInfo, IRootState> = {
    namespaced: true,
    state() {
        return {
            userInfo: {}
        }
    },
    mutations: {
        changeUserInfo(state, userInfo: any) {
            if(JSON.stringify(userInfo)!=="{}"){
                userInfo.phoneNum=checkPhone(userInfo.phoneNum)
            }
            state.userInfo = userInfo
        },
    },
    actions:{
        async getUserInfoAction({commit}){
            const userData=await GetUserInfo()
            console.log(userData)
            if(userData.success){
                commit('changeUserInfo',userData.data)
            }
        }
    }
}

export default userModule