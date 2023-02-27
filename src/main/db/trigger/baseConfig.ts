import store from '../store'
import { app } from 'electron'
import type { BaseConfig } from 'src/main/config'

store.onDidChange('baseConfig', async (_props: unknown) => {
  console.info('setBaseConfig', _props)
  if (!_props) return
  const props = _props as BaseConfig
  if (!props) {
    return
  }
  if (props.neverOffline) {
    const neverOffline = await import('../../controllers/tasks/neverOffline')
    neverOffline.default()
  }

  if (props.autoStart && app.isPackaged) {
    app.setLoginItemSettings({
      openAtLogin: true,
      openAsHidden: true,
      path: app.getPath('exe'),
      args: ['--hidden']
    })
  }

  if (props.autoUpdate) {
    const checkUpdate = await import('../../controllers/update/index')
    checkUpdate.default()
  }
})
