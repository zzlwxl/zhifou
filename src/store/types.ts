import { ILoginState } from './login/types'
import {IUserInfo} from './user/types'
export interface IRootState {
  name: string
}

export interface IRootWithModule {
  login: ILoginState
  user: IUserInfo
}

export type IStoreType = IRootState & IRootWithModule
