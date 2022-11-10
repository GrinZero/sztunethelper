import { HOST_PATH, CONTENT_START } from './contants'
import * as fs from 'fs'

const getSysHosts = async (base = true) => {
  if (!fs.existsSync(HOST_PATH)) {
    return ''
  }
  const content = await fs.promises.readFile(HOST_PATH, 'utf-8')
  if (base && content.includes(CONTENT_START)) {
    return content.split(CONTENT_START)[0]
  }
  return content
}

export default getSysHosts
