import { ElectronAPI } from '@electron-toolkit/preload'
import { api } from './index'

declare global {
  interface Window {
    electron: ElectronAPI
    bridge: typeof api
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
  }
}
