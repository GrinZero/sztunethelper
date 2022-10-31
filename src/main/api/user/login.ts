import apiStore, { RequestResult } from '../apiStore'

import { login, LoginResult, Account } from '../../sdk'

type LoginModal = LoginResult
apiStore.add('login', async ({ username, password }: Account): RequestResult<LoginModal> => {
  const res = await login({ username, password })
  if (res.code === 1) {
    return {
      code: 200,
      data: res
    }
  } else {
    return {
      code: 502,
      data: res
    }
  }
})
