export interface IAccount {
  userName: string,
  passWord: string,
  code?:string,
  uuid?:string
}


export interface ILoginResult {
  id: number,
  name: string,
  token: string
}

export interface IDataType<T = any> {
  code: number,
  success:boolean,
  data: T,
}
