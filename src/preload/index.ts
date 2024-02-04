import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI, ElectronAPI } from '@electron-toolkit/preload'

const api = {
  openGameDetails: (gameId: string): Promise<unknown> => ipcRenderer.invoke('open-game-details', gameId),
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}

interface api {
  openGameDetails: (gameId: string) => Promise<unknown>
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: api
  }
}