import { Module } from "vuex";

import { Register,Code ,Login,requetUserInfoById} from "@/service/login/login";
import localCache from '@/utils/cache'
import router from "@/router";

import { ILoginState } from "./types";
import { IRootState } from "../types";
import { IAccount } from "@/service/login/type";

const loginModule:Module<ILoginState,IRootState>={
  namespaced:true,
  state(){
    return{
      token:'',
      userInfo:{},
      userMenus:[]
    }
  },
  mutations:{
    changeToken(state,token:string){
      state.token=token
    },
    changeUserInfo(state,userInfo:any){
      state.userInfo=userInfo
    },
    changeUserMenus(state,userMenus:any){
      state.userMenus=userMenus
    }
  },
  actions:{
    async accountLoginAction({commit},payload:IAccount){
      // console.log('accountLoginAction执行了action',payload)
      // 登录
      const registerData = await Register(payload)
      if(registerData.code === 200){
        const loginData = await Login(payload)
        console.log(loginData)
      }else{

      }
      // const {id,token}= loginRequest.data
      // commit('changeToken',token)
      // localCache.setCache('token',token)

      //获取用户信息
      // const userInfoResult = await requetUserInfoById(id)
      // const userInfo = userInfoResult.data
      // localCache.setCache('userInfo',userInfo)
      // commit('changeUserInfo',userInfo)
      

      //跳到首页
      router.push('/main')
    },

    loadLocalLogin({commit}){
      const token = localCache.getCache('token')
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