import { ipcMain, BrowserWindow } from 'electron'

import { apiStore } from '../api'

const titleBarOnMessage = () => {
  ipcMain.on('titleBar', (_, { type, data }) => {
    const window = BrowserWindow.fromWebContents(_.sender)
    if (!window) {
      console.error('titleBar: window is null')
      return
    }
    switch (type) {
      case 'close':
        window.close()
        break
      case 'maximize':
        if (data) {
          window.maximize()
        } else {
          window.unmaximize()
        }
        break
      case 'minimize':
        window.minimize()
        break
      default:
        break
    }
  })
}

const themeChangeOnMessage = () => {
  ipcMain.on('themeChange', (_, theme) => {
    const window = BrowserWindow.fromWebContents(_.sender)
    if (!window) {
      console.error('themeChange: window is null')
    }
    window?.setVibrancy(theme === 'dark' ? 'dark' : 'light')
  })
}

const windowMessageController = (win: BrowserWindow | null) => {
  titleBarOnMessage()
  themeChangeOnMessage()

  if (!win) {
    console.warn('windowMessageController: without window')
    return
  }
  ipcMain.on('api', async (_, { name, payload, id }) => {
    if (!win) {
      console.error('api: window is null')
    }
    try {
      const result = await apiStore.use(name, payload)
      win.webContents.send('api', { result, id })
    } catch (error) {
      win.webContents.send('api', {
        result: {
          code: -1,
          data: error
        },
        id
      })
    }
  })

  win.on('maximize', () => {
    win.webContents.send('window-maxify', true)
  })
  win.on('unmaximize', () => {
    win.webContents.send('window-maxify', false)
  })
}
export default windowMessageController
