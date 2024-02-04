// import { contextBridge, ipcRenderer } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload'

// // Custom APIs for renderer
// const api = {
//   openGameDetails: (gameId) => ipcRenderer.invoke('open-game-detail', gameId),
//   ping: () => ipcRenderer.send('ping'),
// }

// if (process.contextIsolated) {
//   try {
//     contextBridge.exposeInMainWorld('electron', electronAPI)
//     contextBridge.exposeInMainWorld('api', api)
//   } catch (error) {
//     console.error(error)
//   }
// } else {
//   window.electron = electronAPI
//   window.api = api
// }

// interface api {
//   openGameDetails: (gameId: string) => Promise<unknown>
// }
// declare global {
//   interface Window {
//     electron: ElectronAPI
//     api: api
//   }
// }

import { contextBridge, ipcRenderer } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload'

// Assuming electronAPI does not conflict and is necessary
// contextBridge.exposeInMainWorld('electron', electronAPI)

contextBridge.exposeInMainWorld('api', {
  openGameDetails: (gameId) => {
    ipcRenderer.invoke('open-game-detail', gameId)
  },
  fetchGameDetails: (appid) => {
    ipcRenderer.send('fetch-game-details', appid)
  },
  receiveGameDetails: (callback) => {
    ipcRenderer.on('game-details-response', (_, arg) => {
      callback(arg)
    })
  },
  removeGameDetailsListener: () => {
    ipcRenderer.removeAllListeners('game-details-response')
  }
})