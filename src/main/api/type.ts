export type ApiResult<T> = Promise<{
  code: number
  data?: T
}>
