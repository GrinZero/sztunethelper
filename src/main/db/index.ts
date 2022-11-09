import * as path from 'path'
import { app } from 'electron'

import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

import type { Host } from './model'

import getSysHosts from '../controllers/hosts/getSysHosts'

const USER_DATA_PATH = app?.getPath('userData') ?? '../../../tests/db/data/'

type DBData = {
  hosts: Host[]
}

const adapter = new FileSync<DBData>(path.join(USER_DATA_PATH, 'db.json'))
const db = low(adapter)
;(async () => {
  const sysHosts = await getSysHosts()
  db.defaults({
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
        content: '',
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
  }).write()
})()

export default db
