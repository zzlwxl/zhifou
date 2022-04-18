import zzlRequest from "../index";

import QS from 'qs'

import {IDataType ,IComment,IGetCommentAll} from "./type";

enum Comment {
  Comment='/comment',
  GetComment='/comment/get',
  CommentStar='/comment/star',
  CommentUnStar='/comment/unStar',
  DelComment='/comment/del'
}


export function addComment(comment:IComment) {
  return zzlRequest.post<IDataType>({
    url: Comment.Comment,
    data:comment
  })
}
export function getComment(comment:IGetCommentAll){
  return zzlRequest.get<IDataType>({
    url:Comment.GetComment,
    data:comment
  })
}
export function getCommentStar(commentId:string,isUnStar:boolean){
  return zzlRequest.get<IDataType>({
    url:isUnStar ? Comment.CommentUnStar : Comment.CommentStar,
    data:{commentId}
  })
}
export function getDelComment(commentId:string){
  return zzlRequest.get<IDataType>({
    url:Comment.DelComment,
    data:{commentId}
  })
}