import { getCurrentNetInfo } from '@utils/netInfo/index'

import { it, expect } from 'vitest'

it('getCurrentNetInfo', async () => {
  expect(await getCurrentNetInfo()).not.toBe(null)
})
