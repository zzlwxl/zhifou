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
      // console.log('请求拦截',config)
      // const token = localCache.getCache('token')
      // if(token){
      //   console.log('设置token')
      //   config.headers.Authorization=`Bearer ${token}`
      // }
      return config
    },
    requestInterceptorCatch:(err)=>{
      return err
    },
    //响应拦截
    responseInterceptor:(res)=>{
      console.log('res2',res)
      // console.log('响应成功')
      return res
    },
    responseInterceptorCatch:(err)=>{
      console.log('err2',err)
      return err
    }
  }
})

// const zzlRequest2 = new ZZLRequest({
//   baseURL:'地址2'
// })
// export default zzlRequest2

export default zzlRequest