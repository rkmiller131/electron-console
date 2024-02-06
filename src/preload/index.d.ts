import { ElectronAPI } from '@electron-toolkit/preload'

interface api {
  openGameDetails: (gameId: string) => Promise<unknown>
  ping: () => Promise<string>
  send: (channel, data) => void
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: api
  }
}
