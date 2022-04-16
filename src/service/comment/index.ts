import zzlRequest from "../index";

import QS from 'qs'

import {IDataType ,IComment,IGetCommentAll} from "./type";

enum Comment {
  Comment='/comment',
  getComment='/comment/get'
}


export function addComment(comment:IComment) {
  return zzlRequest.post<IDataType>({
    url: Comment.Comment,
    data:comment
  })
}
export function getComment(comment:IGetCommentAll){
  return zzlRequest.get<IDataType>({
    url:Comment.getComment,
    data:comment
  })
}
