export interface IDataType<T = any> {
    code: number,
    success: boolean,
    data: T,
}
export interface IComment<T = any> {
    articleId: string,
    commentContent: string,
    parentCommentId?: string,
}
export interface IGetCommentAll<T = any> {
    articleId: string
    current: number
    size: number
    orderBy?: string
}