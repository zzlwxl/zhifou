import { ILoginState } from './login/types'
import {IUserInfo} from './user/types'
import {IArticleListState} from './article/types'
export interface IRootState {
  name: string
}

export interface IRootWithModule {
  login: ILoginState
  user: IUserInfo
  articleBy:IArticleListState
}

export type IStoreType = IRootState & IRootWithModule
