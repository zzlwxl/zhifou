import { Module } from "vuex";

import { Register ,Login} from "@/service/login/login";

import localCache from '@/utils/cache'
import router from "@/router";
import { ElMessage } from 'element-plus'

import { ILoginState } from "./types";
import { IRootState } from "../types";
import { IAccount } from "@/service/login/type";

const loginModule:Module<ILoginState,IRootState>={
  namespaced:true,
  state(){
    return{
      token:'',
      isRefReshCode:false
    }
  },
  mutations:{
    changeToken(state,token:string){
      state.token=token
    },
    //刷新验证码
    changeisRefReshCode(state,isCode:boolean){
      state.isRefReshCode=isCode
    }
  },
  actions:{
    async accountLoginAction({commit},payload:IAccount){
      const loginData = await Login({
        userName:payload.userName,
        passWord:payload.passWord,
        code:payload.code,
        uuid:payload.uuid
      })
      if(loginData.success){
        commit('changeToken',loginData.data)
        localCache.setCache('token',loginData.data)
        commit('changeisRefReshCode',false)
        router.go(-1)
      }else{
        ElMessage({
          message: loginData.data,
          type: 'warning',
        })
        commit('changeisRefReshCode',true)
      }
    },
    async accountRegisterAction({commit},payload:IAccount){
      // console.log('accountLoginAction执行了action',payload)
      // 登录
      if(!payload.code){
        return ElMessage({
          message: '验证码不能为空',
          type: 'warning',
        })
      }
      const registerData = await Register({
        userName:payload.userName,
        passWord:payload.passWord
      })
      if(registerData.success){
        const loginData = await Login({
          userName:payload.userName,
          passWord:payload.passWord,
          code:payload.code,
          uuid:payload.uuid
        })
        if(loginData.success){
          commit('changeToken',loginData.data)
          localCache.setCache('token',loginData.data)
          commit('changeisRefReshCode',false)
          router.go(-1)
        }else{
          ElMessage.warning(loginData.data)
          commit('changeisRefReshCode',true)
        }
      }else{
        ElMessage({
          message: registerData.data,
          type: 'warning',
        })
        commit('changeisRefReshCode',true)
      }
      // const {id,token}= loginRequest.data
      // commit('changeToken',token)
      // localCache.setCache('token',token)

      //获取用户信息
      // const userInfoResult = await requetUserInfoById(id)
      // const userInfo = userInfoResult.data
      // localCache.setCache('userInfo',userInfo)
      // commit('changeUserInfo',userInfo)
      

    },

    loadLocalLogin({commit}){
      const token = localCache.getCache('token')
      console.log('本地初始化token',token)
      token && commit('changeToken',token)

      const userInfo = localCache.getCache('userInfo')
      userInfo && commit('changeUserInfo',userInfo)

      const userMenus = localCache.getCache('userMenus')
      userMenus && commit('changeUserMenus',userMenus)
    },

    phoneLoginAction({commit},payload:any){
      console.log('phoneLoginAction执行了action',payload)
    }

  }
}

export default loginModule