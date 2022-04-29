import zzlRequest from "../index";

import {IDataType} from './type'

enum Word{
  getMsg="getMsg"
}
export function GetMsg(){
  return zzlRequest.get<IDataType>({
    url:Word.getMsg,
    noToken:true
  })
}

