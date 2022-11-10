import * as path from 'path'
import { app } from 'electron'

import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

import type { Host } from './model'

import getSysHosts from '../controllers/hosts/getSysHosts'

const USER_DATA_PATH = app?.getPath('userData') ?? '../../../tests/db/data/'

type DBData = {
  hosts: Host[]
  config: {
    autoUpdate: boolean
    foreverConnect: boolean
    autoLaunch: boolean
    autoTheme: boolean
  }
}

const adapter = new FileSync<DBData>(path.join(USER_DATA_PATH, 'db.json'))
const db = low(adapter)

;(async () => {
  const sysHosts = await getSysHosts()
  const defaultState: DBData = {
    hosts: [
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
        content: `10.1.20.133 gym.sztu.edu.cn`,
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
    ],
    config: {
      autoUpdate: true,
      foreverConnect: false,
      autoLaunch: false,
      autoTheme: true
    }
  }
  db.defaults(defaultState).write()
  // 打开下边这句话会重置数据库db
  // db.setState(defaultState).write()
})()

export default db
export * from './model'
export { default as store } from './store'
