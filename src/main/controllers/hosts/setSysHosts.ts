import { HOST_PATH } from './contants'
import * as fs from 'fs'

const setSysHosts = async (content: string) => {
  if (!fs.existsSync(HOST_PATH)) {
    throw new Error('Hosts file not found')
  }
  return fs.promises.writeFile(HOST_PATH, content, 'utf-8')
}

export default setSysHosts
