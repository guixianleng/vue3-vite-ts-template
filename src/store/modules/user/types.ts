import type { UserInfo } from '/@/types/store'

export type RoleType = '' | '*' | 'admin' | 'user'

export interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  role: string
  lastUpdateTime: number
}
