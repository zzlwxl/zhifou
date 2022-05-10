
export interface IDataType<T = any> {
    code: number,
    success: boolean,
    data: T,
  }
export interface IPay{
    title:string,
    totalAmount:number
}