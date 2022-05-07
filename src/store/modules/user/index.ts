import { defineStore } from 'pinia'
import { doLogout, getUserInfo, loginApi } from '/@/api/sys/user'
import { LoginParams, GetUserInfoModel } from '/@/api/sys/model/userModel'
import { setToken, clearToken, getToken } from '/@/utils/auth'
import { removeRouteListener } from '/@/utils/route-listener'

import type { UserInfo } from '/@/types/store'
import { UserState } from './types'

import { RoleEnum } from '/@/enums/roleEnum'

import { isArray } from '/@/utils/is'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Last fetch time
    lastUpdateTime: 0,
  }),

  getters: {
    getSysToken(): string {
      return this.token || getToken()
    },
  },

  actions: {
    setSysToken(token: string) {
      this.token = token ?? '' // for null or undefined value
      setToken(token)
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList
    },
    switchRoles() {
      return new Promise((resolve) => {
        this.roleList = this.roleList[0] === 'admin' ? this.roleList : []
        resolve(this.roleList)
      })
    },
    // Set user's information
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
    },

    // Reset user's information
    resetInfo() {
      this.$reset()
    },

    async login(params: LoginParams): Promise<GetUserInfoModel | null> {
      try {
        const { ...loginParams } = params
        const data = await loginApi(loginParams)
        const { token } = data

        // save token
        this.setSysToken(token)
        return this.getUserInfo()
      } catch (error) {
        return Promise.reject(error)
      }
    },

    //  Get user's information
    async getUserInfo(): Promise<UserInfo | null> {
      if (!this.getSysToken) return null
      const userInfo = await getUserInfo()
      const { roles = [] } = userInfo
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.value) as RoleEnum[]
        this.setRoleList(roleList)
      } else {
        userInfo.roles = []
        this.setRoleList([])
      }
      this.setUserInfo(userInfo)
      return userInfo
    },

    // Logout
    async logout() {
      await doLogout()

      this.resetInfo()
      clearToken()
      removeRouteListener()
    },
  },
})

export default useUserStore
