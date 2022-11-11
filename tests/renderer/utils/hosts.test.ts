import { getHostsContent } from '@renderer/utils/index'
import { it, expect } from 'vitest'

import type { Host } from '@renderer/api'

it('getContent(getHostsContent)', () => {
  const hosts: Host[] = [
    {
      type: 'system',
      mode: 'readonly',
      name: '系统',
      content: '#system hosts is readonly#',
      open: true
    },
    {
      type: 'local',
      mode: 'edit',
      name: '内网',
      content: `10.1.20.133 gym.sztu.edu.cn`,
      open: true
    },
    {
      type: 'local',
      mode: 'edit',
      name: 'xxx',
      content: `10.1.20.133 xxxxxx`,
      open: false
    }
  ]

  expect(getHostsContent(hosts)).toBe(
    `#system hosts is readonly#\n# --- NET_HELPER-START ---\n\n# --- 内网  ---\n10.1.20.133 gym.sztu.edu.cn\n`
  )
})
