import apiClient from '../apiClient'
import type { ApiResult } from '../type'

import type { Account } from '@renderer/types'

export interface LoginResult {
  code: number
  error?: unknown
  cookies?: string | null
  data?: string
}

const login = async ({ username, password }: Account) =>
  apiClient.send<ApiResult<LoginResult>>('login', { username, password }, 3000)

export { login }
