import { MenuItem, Tray } from 'electron'
import { connectNet } from '../../helper'

export const connectClick = (tray: Tray, menuitem: MenuItem) => {
  const id = setTimeout(() => {
    menuitem.enabled = false
    menuitem.label = '连接中'
    tray.setTitle('connect')
  }, 200)
  connectNet()
    .then(() => {
      tray.setTitle('online')
      menuitem
    })
    .catch(() => {
      tray.setTitle('offline')
    })
    .finally(() => {
      clearTimeout(id)
      menuitem.enabled = true
    })
}
