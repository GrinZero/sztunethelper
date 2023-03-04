import Electron from 'electron'
export interface Account {
  username: string
  password: string
}

/* 连接校园网 */
export interface ConnectResult {
  msg: 'had login' | 'login success' | 'login fail'
  code: 200 | -1
}
export type ConnectFunction = (account: Account) => Promise<ConnectResult>

/* 登录校园网 */
export interface LoginResult {
  code: number
  error?: unknown
  cookies?: string | null
  data?: string
}
export type LoginFunction = (account: Account, Cookie?: string) => Promise<LoginResult>

/* 获取公告 */
export type NoticeResult = Electron.NotificationConstructorOptions
export type FetchNoticeFunction = () => Promise<NoticeResult>

/* 获取在线设备列表 */
export interface Platform {
  name?: string
  id: string
  nasIP: string
  user: string
  ip: string
  startTime: string
  endTime: string | null
  flow: string
  link: string
}
export type FetchPlatformListFunction = (Cookie: string) => Promise<Platform[]>

/* 下线设备 */
export interface OfflineResult {
  content: string
  statusCode: number
}
export type OfflinePlatformFunction = (link: string, Cookie: string) => Promise<OfflineResult>
