import { apiStore } from '@api/index'
import type { ApiResult } from '@api/type'

import { expect, it } from 'vitest'

it('getNetInfo', async () => {
  const result = await apiStore.use<ApiResult<unknown>>('getNetInfo')

  const { data, code } = result

  expect(code).toBe(200)
  expect(data).toMatchObject({
    ip: {},
    dns: {},
    dhcp: {},
    mac: {},
    speed: {},
    wifiName: {}
  })
})
