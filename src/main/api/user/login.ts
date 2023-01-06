import apiStore from '../apiStore'

import type { ApiResult } from '../type'

import { login, LoginResult, Account } from '../../sdk'

type LoginModal = LoginResult

apiStore.add('login', async ({ username, password }: Account): ApiResult<LoginModal> => {
  const res = await login({ username, password })
  if (res.code === 1) {
    return {
      code: 200,
      data: res
    }
  }
  return {
    code: 502,
    data: res
  }
})
