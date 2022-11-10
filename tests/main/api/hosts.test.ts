import { apiStore } from '@api/index'
import type { ApiResult } from '@api/type'

import { expect, it } from 'vitest'

it('saveHosts without access', async () => {
  const result = await apiStore.use<ApiResult<unknown>>('saveHosts')
  const { code } = result
  expect(code).toBe(403)
})
