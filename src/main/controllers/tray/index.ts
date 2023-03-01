import { BrowserWindow, Tray, Menu, nativeImage, MenuItem } from 'electron'
import { createWindow } from '../window/create'
import { connectClick } from './connectClick'

import templateIcon from '../../../../project/public/tray/trayTemplate.png?asset'
import baseIcon from '../../../../build/icons/icon_16x16.png?asset'
import store from '../../db/store'
import type { BaseConfig } from 'src/main/config'

export const createTray = () => {
  const appIcon = process.platform === 'darwin' ? templateIcon : baseIcon
  const tray = new Tray(nativeImage.createFromPath(appIcon))

  const buildContextMenu = () => {
    return Menu.buildFromTemplate([
      {
        label: '打开',
        click: () => {
          const winList = BrowserWindow.getAllWindows()
          if (winList.length === 0) {
            createWindow()
          } else {
            winList.forEach((w) => {
              w.show()
            })
          }
        },
        id: 'open'
      },
      { label: '---', type: 'separator' },
      {
        label: '快速联网',
        click: (menuitem) => {
          tray.popUpContextMenu()
          connectClick(tray, menuitem)
        },
        id: 'connect'
      },
      { label: '---', type: 'separator' },
      {
        label: '设置',
        type: 'submenu',
        submenu: [
          {
            label: '自动联网',
            type: 'checkbox',
            id: 'neverOffline',
            click: (menuitem) => {
              store.set('baseConfig.neverOffline', menuitem.checked)
            }
          },
          {
            label: '开机自启',
            type: 'checkbox',
            id: 'autoStart',
            click: (menuitem) => {
              store.set('baseConfig.autoStart', menuitem.checked)
            }
          },
          {
            label: '自动更新',
            type: 'checkbox',
            id: 'autoUpdate',
            click: (menuitem) => {
              store.set('baseConfig.autoUpdate', menuitem.checked)
            }
          }
        ]
      },
      { label: '退出', role: 'quit' }
    ])
  }

  const contextMenu = buildContextMenu()
  tray.setToolTip('nethelper - lives')
  tray.setTitle('offline', {
    fontType: 'monospacedDigit'
  })
  tray.setContextMenu(contextMenu)
  tray.on('double-click', () => {
    console.info('double click')
    const winList = BrowserWindow.getAllWindows()
    if (winList.length === 0) {
      createWindow()
    } else {
      winList.forEach((w) => {
        w.show()
      })
    }
  })

  const updateMenuByBaseConfig = (newBaseConfig: BaseConfig) => {
    const menu = buildContextMenu()

    const neverOfflineItem = menu.getMenuItemById('neverOffline') as MenuItem
    neverOfflineItem.checked = newBaseConfig.neverOffline

    const autoStartItem = menu.getMenuItemById('autoStart') as MenuItem
    autoStartItem.checked = newBaseConfig.autoStart

    const autoUpdateItem = menu.getMenuItemById('autoUpdate') as MenuItem
    autoUpdateItem.checked = newBaseConfig.autoUpdate
    tray.setContextMenu(menu)
  }

  const baseConfig = store.get('baseConfig') as BaseConfig | null
  if (baseConfig) {
    updateMenuByBaseConfig(baseConfig)
  }

  store.onDidChange('baseConfig', (_newBaseConfig: unknown) => {
    if (!_newBaseConfig) return
    const newBaseConfig = _newBaseConfig as BaseConfig
    updateMenuByBaseConfig(newBaseConfig)
    const winList = BrowserWindow.getAllWindows()
    winList.forEach((w) => {
      w.webContents.send('baseConfigChange', newBaseConfig)
    })
  })
  store.onDidChange('netStatus', (newNetStatus: unknown) => {
    console.info('netStatus changed', newNetStatus)
    if (!newNetStatus) return
    if (newNetStatus === 'success') {
      tray.setTitle('online')
      return
    }
    tray.setTitle(newNetStatus as string)
  })

  return tray
}

export const trayController = () => {
  const tray = createTray()
  return tray
}
export default trayController
