import { getSysHosts } from '@controllers/index'
import { it, expect } from 'vitest'

it('getSysHosts', async () => {
  const result = await getSysHosts()
  console.log(result)
  expect(result).not.toBe(null)
})
