import { getSysHosts } from '@controllers/index'
import { it, expect } from 'vitest'

it('getSysHosts', async () => {
  const result = await getSysHosts()
  expect(result).not.toBe(null)
})
