export interface IArticle<T = any> {
    articleTitle?: string,
    categoryId?: string,
    articleContent?: string,
    articleState?: string,
    coverImg?:string
}
export interface IDataType<T = any> {
    code: number,
    success: boolean,
    data: T,
  }
export interface ICreateCate<T=any>{
    categoryName:string,
    categoryAlias:string,
    parentCategoryId:string
}
export interface IGetArticleAll<T=any>{
    current:number,
    size:number
    categoryId?:string
    key?:string
    userId?:string
    orderBy?:string
}
export interface IGetArticleInfo<T=any>{
    articleId:string
}
export interface IGetArticleTop<T=any>{
    orderBy?:string
    limit?:number
}
export interface IGetAddStar<T=any>{
    articleId:string
}