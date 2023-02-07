import updateRemote from './updateRemote'
import store from '../../db/store'
import type { BaseConfig } from '../../config'

export const taskController = async () => {
  /* Hosts: UpdateRemote */
  updateRemote()

  /* Connect: NeverOffline */
  const baseConfig = store.get('baseConfig') as BaseConfig

  if (baseConfig && baseConfig.neverOffline) {
    const neverOffline = await import('./neverOffline')
    neverOffline.default()
  }

  /* Update: CheckUpdate */
  if (baseConfig && baseConfig.autoUpdate) {
    const checkUpdate = await import('../update/index')
    checkUpdate.default()
  }
}

export { updateRemote }
export default taskController
