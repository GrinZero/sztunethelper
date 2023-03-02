import { app } from 'electron'

import apiStore from '../apiStore'
import type { ApiResult } from '../type'
import type { BaseConfig } from 'src/main/config'

apiStore.add('setBaseConfig', async (props: BaseConfig): ApiResult<unknown> => {
  console.info('setBaseConfig: api', props)
  if (!props) {
    return {
      code: 400,
      data: null
    }
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

  return {
    code: 200,
    data: null
  }
})
