import zzlRequest from "../index";

import QS from 'qs'

import {IDataType ,IComment} from "./type";

enum Comment {
  Comment='/comment'
}


export function addComment(comment:IComment) {
  return zzlRequest.post<IDataType>({
    url: Comment.Comment,
    data:comment
  })
}
