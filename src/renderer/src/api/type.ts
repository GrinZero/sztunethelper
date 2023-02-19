export interface ApiResult<T = unknown> {
  code: number
  data: T
  msg?: unknown
}

export interface IMMessage {
  type: 'text' | 'image' | 'file'
  data: string
  time?: number
}
export interface IMMessageCummunication<T = unknown> {
  status: 'sending' | 'success' | 'error'
  data?: T
}
