import type { UserInfo } from '/@/types/store'
import { RoleEnum } from '/@/enums/roleEnum'

export type RoleType = '' | '*' | 'admin' | 'user'

export interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  roleList: RoleEnum[]
  lastUpdateTime: number
}
