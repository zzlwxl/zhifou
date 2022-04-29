import zzlRequest from "../index";

import QS from 'qs'

import {IDataType,IUserInfo,IEditPwd,IForgetPwdCode,IResetPwd,IFileForm} from './type'

enum UserInfo{
  Info='/user/info',
  editInfo='/user/edit',
  editPwd='/user/editPwd',
  getPhoneCode='/auth/getPhone',
  resetPwd='/auth/resetPwd',
  uploadFile='/cos/upload',
  logout='/auth/logout',
  userById='/user/getById',
}
export function GetUserInfo(){
  return zzlRequest.get<IDataType>({
    url:UserInfo.Info,
    // noToken:true
  })
}
export function editUserInfo(userInfo:IUserInfo){
  return zzlRequest.post<IDataType>({
    url:UserInfo.editInfo,
    data:userInfo
  })
}
export function editPwd(userPwd:IEditPwd){
  return zzlRequest.post<IDataType>({
    url:UserInfo.editPwd,
    data:userPwd
  })
}
export function getPhone(userName:IForgetPwdCode){
  return zzlRequest.get<IDataType>({
    url:UserInfo.getPhoneCode,
    data:userName
  })
}
export function resetPwd(data:IResetPwd){
  return zzlRequest.post<IDataType>({
    url:UserInfo.resetPwd,
    data
  })
}
export function logout(){
  return zzlRequest.get<IDataType>({
    url:UserInfo.logout
  })
}
export function getById(userId:string){
  return zzlRequest.get<IDataType>({
    url:UserInfo.userById,
    data:{userId},
  })
}
// export function uploadFile(data:FormData){
//   return zzlRequest.post<IDataType>({
//     url:UserInfo.uploadFile,
//     data
//   })
// }

