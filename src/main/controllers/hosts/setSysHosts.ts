import { HOST_PATH } from './contants'
import * as fs from 'fs'
import * as path from 'path'
import os from 'os'
import { exec } from 'child_process'

const setSysHosts = async (content: string, sudo?: string) => {
  if (!fs.existsSync(HOST_PATH)) {
    throw new Error('Hosts file not found')
  }
  if (['linux', 'darwin'].includes(process.platform)) {
    return new Promise((resolve, reject) => {
      const tmpFn = path.join(os.tmpdir(), `nethelper_${new Date().getTime()}_${Math.random()}.txt`)
      fs.writeFileSync(tmpFn, content, 'utf-8')

      const cmd = [
        `echo '${sudo}' | sudo -S chmod 777 ${HOST_PATH}`,
        `cat "${tmpFn}" > ${HOST_PATH}`,
        `echo '${sudo}' | sudo -S chmod 644 ${HOST_PATH}`
      ].join(' && ')

      exec(cmd, (err) => {
        if (err) {
          reject(err.message)
        }
        if (fs.existsSync(tmpFn)) {
          fs.unlinkSync(tmpFn)
        }
        resolve(true)
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      fs.writeFile(HOST_PATH, content, 'utf-8', (err) => {
        if (err) {
          reject(err.message)
        }
        resolve(true)
      })
    })
  }
}

export default setSysHosts
