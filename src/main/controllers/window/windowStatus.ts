import { app } from 'electron'

const windowStatusController = (): void => {
  app.on('browser-window-focus', (event: Electron.Event) => {
    event.sender.send('window-focus')
  })
  app.on('browser-window-blur', (event: Electron.Event) => {
    event.sender.send('window-blur')
  })
}

export default windowStatusController
