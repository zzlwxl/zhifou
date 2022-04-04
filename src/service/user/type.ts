
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
  