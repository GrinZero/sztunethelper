export interface ApiResult<T = unknown> {
  code: number
  data: T
  msg?: unknown
}
