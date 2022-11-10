import { apiStore } from '@api/index'

import { expect, it } from 'vitest'

it('saveHosts without access', async () => {
  const result = await apiStore.use('saveHosts')
  const { code } = result
  expect(code).toBe(403)
})
