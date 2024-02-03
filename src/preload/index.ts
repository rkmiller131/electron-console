import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  openGameDetails: (): Promise<unknown> => ipcRenderer.invoke('open-game-details'),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electron', {
      shell: require('electron').shell,
      ipcRenderer: {
        send: (channel, data) => {
          // whitelist channels
          const validChannels = ['open-steam-game']
          if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data)
          }
        }
      }
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
