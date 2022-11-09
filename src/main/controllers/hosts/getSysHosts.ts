import { HOST_PATH } from './contants'
import * as fs from 'fs'

const getSysHosts = async () => {
  if (!fs.existsSync(HOST_PATH)) {
    return ''
  }
  return fs.promises.readFile(HOST_PATH, 'utf-8')
}

export default getSysHosts
