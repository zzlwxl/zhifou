import zzlRequest from "../index";

import QS from 'qs'

import {IAccount,IDataType,ILoginResult} from './type'

enum LoginAPI{
  Register='/auth/register', 
  Login='/auth/login',
  Code='/auth/code',
  LoginUserInfo='/user/info',
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
    isToken:false
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
    data:account
  })
}
export function accountLoginRequest(account:IAccount){
  return zzlRequest.post<IDataType<ILoginResult>>({
    url:LoginAPI.Register,
    data:account
  })
}

export function requetUserInfoById(id:number){
  return zzlRequest.get<IDataType>({
    url:LoginAPI.LoginUserInfo+id
  })
}

