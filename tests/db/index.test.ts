import { it, expect } from 'vitest'
import db from '@db/index'

it('db init', async () => {
  expect(db.get('hosts').value()).not.toBe(null)
})
