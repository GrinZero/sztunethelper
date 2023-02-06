import { ElectronAPI } from '@electron-toolkit/preload'
import { api } from './index'

declare global {
  interface Window {
    electron: ElectronAPI
    bridge: typeof api
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
    storage: {
      get<T = unknown>(key: string, defaultValue?: T): Promise<T>
      set: (key: string, value: unknown) => Promise<void>
      has: (key: string) => Promise<boolean>
      delete: (key: string) => Promise<void>
      store: () => Promise<Record<string, unknown>>
    }
  }
}
