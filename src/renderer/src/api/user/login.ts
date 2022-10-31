import apiClient from '../apiClient'

import type { Account } from '@renderer/types'

export interface LoginResult {
  code: number
  error?: unknown
  cookies?: string | null
  data?: string
}

const login = async ({ username, password }: Account) =>
  apiClient.send<LoginResult>('login', { username, password })

export { login }
