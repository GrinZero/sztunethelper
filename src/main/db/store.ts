import Store from 'electron-store'
import type { Host } from './model'
import getSysHosts from '../controllers/hosts/getSysHosts'
import { BaseConfig } from '../config'

export interface StoreType {
  hosts?: Host[]
  sudo?: string
  'local-mail'?: {
    mail: string
    pass: string
  }
  username?: string
  password?: string
  baseConfig?: BaseConfig
  netStatus?: string
  lastNoticeID?: string
  currentPlatform?: {
    link: string
    user: string
    nasIP: string
    id: string
    ip: string
    startTime: string
    endTime: string | null
    flow: string
  }
}
const store = new Store<StoreType>()

const defaultDNS = `
10.1.20.133 gym.sztu.edu.cn
10.1.12.148 nbw.sztu.edu.cn
`

;(async () => {
  if (store.has('hosts')) {
    return
  }
  const sysHosts = await getSysHosts()
  const defaultHosts: StoreType['hosts'] = [
    {
      type: 'system',
      mode: 'readonly',
      name: '系统',
      content: sysHosts,
      open: true
    },
    {
      type: 'local',
      mode: 'edit',
      name: '内网',
      content: defaultDNS,
      open: true
    },
    {
      type: 'remote',
      mode: 'edit',
      name: 'GitHub',
      content: '',
      open: false,
      autoUpdate: 'never',
      url: 'https://gitlab.com/ineo6/hosts/-/raw/master/next-hosts'
    }
  ]
  store.set('hosts', defaultHosts)
})()

export default store
