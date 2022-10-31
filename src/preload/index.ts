/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
export const api = {
  sendMessage: (type = 'message', message: any): void => ipcRenderer.send(type, message),
  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: any): ((_: any, data: unknown) => any) => {
    const listener = (_: any, data: unknown) => callback(data)
    ipcRenderer.on(channel, listener)
    return listener
  },
  off: (channel: string, listener: any) => {
    ipcRenderer.removeListener(channel, listener)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('bridge', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.bridge = api
}
