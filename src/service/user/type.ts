
export interface IDataType<T = any> {
  code: number,
  success: boolean,
  data: T,
}
export interface IGetFollowsAll<T=any>{
  userId:string
  current:number,
  size:number,
  orderBy?:string
}
export interface IUserInfo<T = any> {
  userName?: string,
  nickName?: string,
  phoneNum?: string,
  email?: string,
  sex?: number,
  headImgUrl?:string
}
export interface IEditPwd<T = any> {
  oldPwd: string,
  pwd: string
}
export interface IForgetPwdCode<T=any>{
  userName:string
}
export interface IResetPwd<T=any>{
  uuid:string,
  code:string,
  passWord:string
}
export interface IFileForm<T=any>{
  file:File
}