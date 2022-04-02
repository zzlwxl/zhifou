import type {AxiosRequestConfig, AxiosResponse } from 'axios'

//对应各个拦截器
export interface ZZLRequestInterceptors<T = AxiosResponse> {
  //请求正确的拦截
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  //请求错误的拦截
  requestInterceptorCatch?: (error: any) => any

  //响应正确的拦截
  responseInterceptor?: (res: T) => T
  //响应错误的拦截
  responseInterceptorCatch?: (error: any) => any
}

/**
 * 由于ZZLRequest构造函数里使用第三方的类型后，不能进行其他类型的扩展，
 * 所以,创建个接口继承第三方的类型，然后再在自己的接口里定义自己的类型
 */
export interface ZZLRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZZLRequestInterceptors<T>
  showLoading?:boolean
}