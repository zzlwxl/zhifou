export interface IArticle<T = any> {
    articleTitle: string,
    categoryId: string,
    articleContent: string,
    articleState: string
}
export interface IDataType<T = any> {
    code: number,
    success: boolean,
    data: T,
  }