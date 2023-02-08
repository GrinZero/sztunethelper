import { dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import path from 'path'

export const checkUpdate = async () => {
  autoUpdater.updateConfigPath = path.resolve(__dirname, '../../../../dev-app-update.yml')
  autoUpdater.checkForUpdates()
  autoUpdater.autoDownload = false
  autoUpdater.on('error', (error) => {
    console.error('autoUpdater check error', error)
  })

  autoUpdater.on('update-available', (info) => {
    console.info('检查到有更新，开始下载新版本', info)
    autoUpdater.downloadUpdate()
  })

  autoUpdater.on('update-not-available', (info) => {
    console.info('没有更新', info)
  })

  autoUpdater.on('update-downloaded', (info) => {
    console.info('下载完成', info)
    dialog
      .showMessageBox({
        type: 'info',
        title: '更新提示',
        message: '检测到新版本，是否立即更新？',
        buttons: ['是', '否']
      })
      .then((result) => {
        if (result.response === 0) {
          autoUpdater.quitAndInstall()
        }
      })
  })
}

export default checkUpdate
