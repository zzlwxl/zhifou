export interface IComment<T = any> {
    articleId: string,
    commentContent: string,
    parentCommentId?: string,
}
export interface IDataType<T = any> {
    code: number,
    success: boolean,
    data: T,
  }