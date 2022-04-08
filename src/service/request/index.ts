import axios from "axios"
import type { AxiosInstance } from 'axios'
import type { ZZLRequestInterceptors, ZZLRequestConfig } from './type'
import localCache from '@/utils/cache'
import router from "@/router";

import { ElMessage } from 'element-plus'
import QueryString from "qs";
// import { ElLoading } from 'element-plus'
// import {LoadingOptionsResolved} from 'element-plus/global'

const DEAFULT_LOADING = true
const DEAFULT_ISTOKEN = true

class ZZLRequest {
  instance: AxiosInstance
  interceptors?: ZZLRequestInterceptors
  // showLoading:boolean
  // loading?:LoadingOptionsResolved 
  isToken: boolean

  constructor(config: ZZLRequestConfig) {
    //创建 axios实例
    this.instance = axios.create(config)

    this.isToken = config.isToken ?? DEAFULT_ISTOKEN

    this.instance.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

    //保存基本信息
    // this.showLoading=config.showLoading ?? DEAFULT_LOADING
    this.interceptors = config.interceptors

    /**
     * 拦截器
     */
    //1 config中对应实例的拦截器（实例拦截）
    //请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    //响应拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )


    //2 所有实例都有的拦截器（全局拦截）
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例都有的请求拦截器-请求成功')

        // if(this.showLoading){
        //加载动画
        // this.loading = ElLoading.service({
        //   lock:true,
        //   text:'加载中'
        // })
        // }


        return config
      },
      (err) => {
        return err
      }
    ),
      this.instance.interceptors.response.use(
        (res) => {
          // console.log('所有实例都有的响应拦截器-响应成功')

          // 移除加载动画
          // this.loading?.close()

          //只要响应数据里的data数据
          const data = res.data
          return data
        },
        (error) => {
          switch (error.response.status) {
            case 401:
              ElMessage({
                message: '登录过期，请重新登录',
                type: 'warning',
              })
              localCache.deleteCache('token')
              router.push('/login')
          }
          // console.log('所有实例都有的响应拦截器-响应失败')

          // 移除加载动画
          // this.loading?.close()
          return error
        }
      )
  }

  request<T = any>(config: ZZLRequestConfig<T>): Promise<T> {
    switch(config.method){
      case 'GET':
        if(config.data){
          config.url = config.url + '?' + config.data
        }
        break
      case 'POST':
        if(config.data){
          config.data=QueryString.stringify(config.data)
        }
        break
    }
    return new Promise((resolve, reject) => {
      //3 对单个请求进行特殊拦截处理（某个请求对应的拦截）
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      this.isToken = config.isToken ?? DEAFULT_ISTOKEN
      if (this.isToken) {
        const token = localCache.getCache('token')
        if (token) {
          this.instance.defaults.headers.common['token'] = `zzl_${token}`
        }
      }
      // if(config.showLoading === false){
      //   this.showLoading=config.showLoading
      // }

      this.instance.request<any, T>(config).then((res) => {
        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }

        //每次请求完成后都要初始化showLoading，这样不会影响到下一次请求。
        // this.showLoading=DEAFULT_LOADING

        resolve(res)
      })
        .catch((err) => {
          // this.showLoading=DEAFULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: ZZLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: ZZLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: ZZLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: ZZLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default ZZLRequest