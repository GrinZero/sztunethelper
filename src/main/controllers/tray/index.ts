import { BrowserWindow, Tray, Menu, nativeImage, nativeTheme, MenuItem } from 'electron'
import { createWindow } from '../window/create'
import { connectClick } from './connectClick'

import whiteIcon from '../../../../project/icon/white-tran/icon_16x16.png?asset'
import blackIcon from '../../../../project/icon/black-tran/icon_16x16.png?asset'
import store from '../../db/store'
import type { BaseConfig } from 'src/main/config'

export const createTray = (_win: Electron.BrowserWindow | null) => {
  let win = _win
  const appIcon = nativeTheme.shouldUseDarkColors ? whiteIcon : blackIcon
  const tray = new Tray(nativeImage.createFromPath(appIcon))

  const buildContextMenu = () => {
    return Menu.buildFromTemplate([
      {
        label: '打开',
        click: () => {
          if (BrowserWindow.getAllWindows().length === 0) {
            win = createWindow()
            console.info('createWindow', win)
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

  store.onDidChange('baseConfig', (_newBaseConfig: unknown) => {
    console.info('baseConfig changed', _newBaseConfig)
    if (!_newBaseConfig) return
    const newBaseConfig = _newBaseConfig as BaseConfig
    const { neverOffline } = newBaseConfig
    const menu = buildContextMenu()

    const neverOfflineItem = menu.getMenuItemById('neverOffline') as MenuItem
    neverOfflineItem.checked = neverOffline

    const autoStartItem = menu.getMenuItemById('autoStart') as MenuItem
    autoStartItem.checked = newBaseConfig.autoStart

    const autoUpdateItem = menu.getMenuItemById('autoUpdate') as MenuItem
    autoUpdateItem.checked = newBaseConfig.autoUpdate
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

  tray.setToolTip('nethelper - lives')
  tray.setTitle('offline', {
    fontType: 'monospacedDigit'
  })
  tray.setContextMenu(contextMenu)

  nativeTheme.on('updated', () => {
    const appIcon = nativeTheme.shouldUseDarkColors ? whiteIcon : blackIcon
    tray.setImage(nativeImage.createFromPath(appIcon))
  })

  return tray
}

export const trayController = (win: BrowserWindow | null) => {
  if (!win) {
    console.warn('trayController: without window')
    return null
  }
  const tray = createTray(win)
  return tray
}
export default trayController
