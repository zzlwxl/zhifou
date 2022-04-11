import zzlRequest from "../index";

import QS from 'qs'

import { IArticle ,IDataType,ICreateCate,IGetArticleAll} from "./type";

enum Article{
  addArticle='/article/add',
  getCategorys='/category/get',
  createCate='/category/add',
    getArticleAll='/article/getPage',
    getArticleTop='/article/getTop',
    getArticleInfo='/article/detail'
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
export function getArticleAll(data:IGetArticleAll){
    return zzlRequest.get<IDataType>({
        url:Article.getArticleAll,
        data
    })
}
export function getArticleTop(){
  return zzlRequest.get<IDataType>({
    url:Article.getArticleTop
  })}
export function getArticleInfo(articleId:string){
  return zzlRequest.get<IDataType>({
    url:Article.getArticleInfo,
    data:{articleId}
  })
}