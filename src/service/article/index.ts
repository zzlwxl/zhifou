import zzlRequest from "../index";

import QS from 'qs'

import { IArticle, IDataType, ICreateCate, IGetArticleAll,IGetArticleTop } from "./type";

enum Article {
  addArticle = '/article/add',
  getCategorys = '/category/get',
  createCate = '/category/add',
  getArticleAll = '/article/getPage',
  getArticleTop = '/article/getTop',
  getArticleInfo = '/article/detail',
  getArticleByUser='/article/get',
  getArticleByCate='/article/getByCategoryId',
  getArticleBySearch='/article/fuzzySearch'
}


export function addArticle(data: IArticle) {
  return zzlRequest.post<IDataType>({
    url: Article.addArticle,
    data
  })
}
export function getCategorys() {
  return zzlRequest.get<IDataType>({
    url: Article.getCategorys,
    isToken: false
  })
}
export function createCate(data: ICreateCate) {
  return zzlRequest.post<IDataType>({
    url: Article.createCate,
    data
  })
}
export function getArticleAll(data: IGetArticleAll) {
  return zzlRequest.get<IDataType>({
    url: Article.getArticleAll,
    isToken: false,
    data
  })
}
export function getArticleTop(data:IGetArticleTop) {
  return zzlRequest.get<IDataType>({
    url: Article.getArticleTop,
    data,
    isToken: false,
  })
}
export function getArticleInfo(articleId: string) {
  return zzlRequest.get<IDataType>({
    url: Article.getArticleInfo,
    isToken: false,
    data: { articleId }
  })
}
export function getArticleByUser(data: IGetArticleAll){
  return zzlRequest.get<IDataType>({
    url:Article.getArticleByUser,
    data
  })
}
export function getArticleByCate(data:IGetArticleAll){
  return zzlRequest.get<IDataType>({
    url:Article.getArticleByCate,
    data,
    isToken:false
  })
}
export function getArticleBySearch(data:IGetArticleAll){
  return zzlRequest.get<IDataType>({
    url:Article.getArticleBySearch,
    data,
    isToken:false
  })
}