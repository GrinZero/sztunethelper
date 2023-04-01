import { app, shell, BrowserWindow } from 'electron'
import * as path from 'path'
import { is } from '@electron-toolkit/utils'
import { windowMessageController } from './index'
import { WindowConfig } from '../../config'

export function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow(WindowConfig)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    if (process.platform === 'darwin') {
      app.dock.show()
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
  const closeMsg = windowMessageController(mainWindow)
  mainWindow.on('closed', () => {
    console.info('mainWindow closed')
    closeMsg!()
  })
  return mainWindow
}
