import zzlRequest from "../index";

import QS from 'qs'

import { IArticle ,IDataType,ICreateCate} from "./type";

enum Article{
  addArticle='/article/add',
  getCategorys='/category/get',
  createCate='/category/add'
}


export function addArticle(data:IArticle){
  return zzlRequest.post<IDataType>({
    url:Article.addArticle,
    data
  })
}
export function getCategorys(){
    return zzlRequest.get<IDataType>({
        url:Article.getCategorys
    })
}
export function createCate(data:ICreateCate){
  return zzlRequest.post<IDataType>({
    url:Article.createCate,
    data
  })
}
