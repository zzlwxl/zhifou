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