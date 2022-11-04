import { login, getPlatformList, connect } from '@sdk/index'
import { it, expect } from 'vitest'

const username = '201906010227'
const password = 'xxxxxx'

let cookies = ''
it('login', async () => {
  const result = await login({ username, password })

  expect(result.code).toBe(1)
  expect(result.cookies).not.toBeNull()
  expect(result.data).not.toBeNull()
  cookies = result.cookies as string
})

it('getPlatformList', async () => {
  const res = await getPlatformList(cookies)
  expect(res.length).not.toBeUndefined()
})

it('connect', async () => {
  const result = await connect({ username, password })
  expect(result).not.toBeNull()
})
