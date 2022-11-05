import { getCurrentNetInfo, getPublicIP } from '@controllers/netInfo/index'

import { it, expect } from 'vitest'

it('getCurrentNetInfo', async () => {
  const result = await getCurrentNetInfo()
  expect(result).not.toBe(null)
  expect(result?.dhcp).toBeTypeOf('boolean')
  expect(result?.mac).toBeTypeOf('string')
  expect(result?.ipv4).toHaveProperty('address')
  expect(result?.ipv4).toHaveProperty('netmask')
  expect(result?.dnsServer).not.toHaveLength(0)
})

it('getPublicIP', async () => {
  expect(await getPublicIP()).not.toBe(null)
})
