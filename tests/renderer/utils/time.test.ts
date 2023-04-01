import { formatUsefulTime } from '@renderer/utils/index'
import { it, expect } from 'vitest'

it('format time', () => {
  expect(formatUsefulTime(new Date())).toBe('Just now')
})
