//service统一出口
import ZZLRequest from "./request"
import { BASE_URL,TIME_OUT } from "./request/config"

import localCache from '@/utils/cache'


const zzlRequest = new ZZLRequest({
  baseURL:BASE_URL,
  timeout:TIME_OUT,
  interceptors:{
    //请求拦截
    requestInterceptor:(config)=>{
      console.log('请求拦截',config)
      //携带token的拦截 
      // const token = localCache.getCache('token')
      // if(token && config.headers){
      //   config.headers.Authorization=`Bearer ${token}`
      // }
 
      console.log('请求成功')
      return config
    },
    requestInterceptorCatch:(err)=>{
      return err
    },
    //响应拦截
    responseInterceptor:(res)=>{
      console.log('响应成功')
      return res
    },
    responseInterceptorCatch:(err)=>{
      return err
    }
  }
})

// const zzlRequest2 = new ZZLRequest({
//   baseURL:'地址2'
// })
// export default zzlRequest2

export default zzlRequest