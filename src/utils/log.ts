/*
 * @Description: 输出错误日志
 * @Author: LenGxin
 * @Date: 2022-04-24 18:28:01
 * @LastEditors: LenGxin
 * @LastEditTime: 2022-04-24 18:28:02
 */
const projectName = import.meta.env.VITE_GLOB_APP_TITLE

export function warn(message: string) {
  console.warn(`[${projectName} warn]:${message}`)
}

export function error(message: string) {
  throw new Error(`[${projectName} error]:${message}`)
}
