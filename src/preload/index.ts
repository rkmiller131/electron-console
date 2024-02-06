import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI, ElectronAPI } from '@electron-toolkit/preload'

const api = {
  openGameDetails: (gameId: string): Promise<unknown> => ipcRenderer.invoke('open-game-detail', gameId),
  send: (channel, data): void => ipcRenderer.send(channel, data),
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
  send: (channel, data) => void
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: api
  }
}