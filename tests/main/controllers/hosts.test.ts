import { getSysHosts, checkAccess, getHostsContent } from '@controllers/index'
import { it, expect } from 'vitest'
import type { Host } from '@db/model'

it('getSysHosts', async () => {
  const result = await getSysHosts()
  expect(result).not.toBe(null)
})

it('checkAccess: for hosts --fail', async () => {
  if (process.platform === 'win32') {
    // windows不测
    expect(null).toBe(null)
  } else {
    const result = await checkAccess()
    expect(result).toBe(false)
  }
})

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
