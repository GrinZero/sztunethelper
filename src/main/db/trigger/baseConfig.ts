import store from '../store'
import { app } from 'electron'
import type { BaseConfig } from 'src/main/config'

store.onDidChange('baseConfig', async (_props: unknown, _oldProps: unknown) => {
  console.info('setBaseConfig', _props)
  if (!_props) return
  const props = _props as BaseConfig
  const changeProps = !_oldProps
    ? props
    : Object.keys(props).reduce((acc, key) => {
        if (props[key] !== (_oldProps as BaseConfig)[key]) {
          acc[key] = props[key]
        }
        return acc
      }, {} as BaseConfig)

  if (changeProps.neverOffline) {
    const neverOffline = await import('../../controllers/tasks/neverOffline')
    neverOffline.default()
  }

  if (changeProps.autoStart && app.isPackaged) {
    app.setLoginItemSettings({
      openAtLogin: true,
      openAsHidden: true,
      path: app.getPath('exe'),
      args: ['--hidden']
    })
  }

  if (changeProps.autoUpdate) {
    const checkUpdate = await import('../../controllers/update/index')
    checkUpdate.default()
  }

  if (changeProps.noticeService) {
    const noticeService = await import('../../controllers/tasks/noticeService')
    noticeService.default()
  }
})
