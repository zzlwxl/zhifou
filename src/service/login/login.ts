import zzlRequest from "../index";

import QS from 'qs'

import {IAccount,IDataType,ILoginResult} from './type'

enum LoginAPI{
  Register='/auth/register', 
  Login='/auth/login',
  Code='/auth/code',
  LoginUserInfo='/user/info',
  // LoginByWxCode='/auth/loginByWxCode'
  LoginByWxAuth2='/auth/getWxOAuth2Code',
  LoginByWxAuth2Callback='/auth/loginByOAuth2',
  CompleteUserInfo='/auth/completeUserInfo',
  BindWx='/auth/bindWechat',
  UnBind='/auth/unBind'
}
enum UserInfo{
  Info='/user/info'
}
// export default function GetUserInfo(){
//   return zzlRequest.get<IDataType>({
//     url:UserInfo.Info
//   })
// }
export default function Code(){
  return zzlRequest.get<IDataType>({
    url:LoginAPI.Code,
    noToken: true,
  })
}
export function Register(account:IAccount){
  return zzlRequest.post<IDataType>({
    url:LoginAPI.Register,
    data:account
  })
}
export function Login(account:IAccount){
  return zzlRequest.post<IDataType>({
    url:LoginAPI.Login,
    data:account,
    noToken:false
  })
}
export function accountLoginRequest(account:IAccount){
  return zzlRequest.post<IDataType<ILoginResult>>({
    url:LoginAPI.Register,
    data:account,
    noToken: false
  })
}

export function requetUserInfoById(id:number){
  return zzlRequest.get<IDataType>({
    url:LoginAPI.LoginUserInfo+id,
    noToken: false
  })
}
// export function LoginByWxCode(code:string){
//   return zzlRequest.get<IDataType>({
//     url:LoginAPI.LoginByWxCode,
//     data:{code},
//     noToken:true
//   })
// }
export function LoginByWxAuth2(){
  return zzlRequest.get<IDataType>({
    url:LoginAPI.LoginByWxAuth2,
    noToken:true
  })
}
export function LoginByWxAuth2Callback(state:string){
  return zzlRequest.get<IDataType>({
    url:LoginAPI.LoginByWxAuth2Callback,
    data:{state},
    noToken:true
  })
}
export function CompleteUserInfo(account:IAccount){
  return zzlRequest.post<IDataType>({
    url:LoginAPI.CompleteUserInfo,
    data:account
  })
}
export function BindWx(state:string){
  return zzlRequest.get<IDataType>({
    url:LoginAPI.BindWx,
    data:{state}
  })
}
export function UnBind(){
  return zzlRequest.get<IDataType>({
    url:LoginAPI.UnBind
  })
}