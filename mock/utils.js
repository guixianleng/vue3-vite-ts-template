export function resultSuccess(data, { message = 'success' } = {}) {
  return {
    status: 0,
    data,
    message,
    traceId: null,
  }
}

// 分页计算
export function pagination(pageNo, pageSize, array = []) {
  const offset = (pageNo - 1) * Number(pageSize)
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize))
  return ret
}

// 列表分页请求
export function resultPageSuccess(page, pageSize, list = [], { message = 'success' } = {}) {
  debugger
  const pageData = pagination(page, pageSize, list)

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length,
    }),
    message,
  }
}
