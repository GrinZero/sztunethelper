import * as fs from 'fs'
import { HOST_PATH } from './contants'

const checkAccess = async (fn = HOST_PATH): Promise<boolean> => {
  try {
    await fs.promises.access(fn, fs.constants.W_OK)
    return true
  } catch (e) {
    // console.log(e)
  }
  return false
}

export default checkAccess
