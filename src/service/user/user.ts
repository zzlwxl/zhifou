import zzlRequest from "../index";

import {IDataType} from './type'

enum UserInfo{
  Info='/user/info'
}
export function GetUserInfo(){
  return zzlRequest.get<IDataType>({
    url:UserInfo.Info,
    // isToken:true
  })
}


