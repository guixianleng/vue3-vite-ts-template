/*
 * @Description: 请求类枚举
 * @Author: LenGxin
 * @Date: 2022-04-24 17:36:29
 * @LastEditors: LenGxin
 * @LastEditTime: 2022-04-24 17:36:30
 */
/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = 1,
  TIMEOUT = 401,
  TYPE = 'success',
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentTyp
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
