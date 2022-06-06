/*
 * @Description: 存储缓存信息
 * @Author: LenGxin
 * @Date: 2022-04-24 09:51:22
 * @LastEditors: LenGxin
 * @LastEditTime: 2022-05-07 14:14:35
 */
const TOKEN_KEY = 'x-admin_token'

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY)
}

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY) || ''
}

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export { isLogin, getToken, setToken, clearToken }
