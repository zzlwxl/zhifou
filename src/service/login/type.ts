export interface IAccount {
  userName: string,
  passWord: string
}


export interface ILoginResult {
  id: number,
  name: string,
  token: string
}

export interface IDataType<T = any> {
  code: number,
  data: T,
}
