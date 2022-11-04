import { apiStore } from '@api/index'

import { expect, it } from 'vitest'

it('getNetInfo', async () => {
  const result = await apiStore.use('getNetInfo')

  const { data, code } = result

  expect(code).toBe(200)
  expect(data).toMatchObject({
    ip: {},
    dns: {},
    randomMac: {},
    mac: {}
  })
})
