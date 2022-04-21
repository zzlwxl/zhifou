import zzlRequest from "../index";

import QS from 'qs'

import { IArticle, IDataType, ICreateCate, IGetArticleAll,IGetArticleTop,IGetAddStar } from "./type";

enum Article {
  addArticle = '/article/add',
  getCategorys = '/category/get',
  createCate = '/category/add',
  getArticleAll = '/article/getPage',
  getArticleTop = '/article/getTop',
  getArticleInfo = '/article/detail',
  getArticleByUser='/article/get',
  getArticleByCate='/article/getByCategoryId',
  getArticleBySearch='/article/fuzzySearch',
  getAddStar = '/article/star',
  unStar='/article/unStar',
  editArticle='/article/edit',
  delArticle="/article/del"
}


export function addArticle(data: IArticle) {
  return zzlRequest.post<IDataType>({
    url: Article.addArticle,
    data
  })
}
export function editArticle(data:IArticle){
  return zzlRequest.post<IDataType>({
    url:Article.editArticle,
    data
  })
}
export function delArticle(articleId:string){
  return zzlRequest.get<IDataType>({
    url:Article.delArticle,
    data:{articleId}
  })
}
export function getCategorys() {
  return zzlRequest.get<IDataType>({
    url: Article.getCategorys,
    noToken: false
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
    noToken: false,
    data
  })
}
export function getArticleTop(data:IGetArticleTop) {
  return zzlRequest.get<IDataType>({
    url: Article.getArticleTop,
    data,
    noToken: false,
  })
}
export function getArticleInfo(articleId: string) {
  return zzlRequest.get<IDataType>({
    url: Article.getArticleInfo,
    noToken: true,
    data: { articleId }
  })
}
export function getArticleByUser(data: IGetArticleAll){
  return zzlRequest.get<IDataType>({
    url:Article.getArticleByUser,
    data,
    // noToken:false
  })
}
export function getArticleByCate(data:IGetArticleAll){
  return zzlRequest.get<IDataType>({
    url:Article.getArticleByCate,
    data,
    noToken:false
  })
}
export function getArticleBySearch(data:IGetArticleAll){
  return zzlRequest.get<IDataType>({
    url:Article.getArticleBySearch,
    data,
    noToken: true,
  })
}
export function getAddStar(data:IGetAddStar){
  return zzlRequest.get<IDataType>({
    url:Article.getAddStar,
    data,
    noToken: false
  })
}
export function unStar(articleId:string){
  return zzlRequest.get<IDataType>({
    url:Article.unStar,
    data:{articleId},
    noToken: false
  })
}