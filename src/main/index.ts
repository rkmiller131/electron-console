import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
// import fs from 'fs'
import path from 'path'
// import https from 'https'

// Nazarii's paths
// const steamAppsPath = 'C:\\Program Files (x86)\\Steam\\steamapps'
// const libraryCachePath = 'C:\\Program Files (x86)\\Steam\\appcache\\librarycache'
// const publicPath = 'C:\\Users\\Nazarii\\Desktop\\Portal\\src\\renderer\\public'

// // Rachel's paths
// // const steamAppsPath = 'D:\\SteamLibrary\\steamapps'
// // const publicPath = 'C:\\Users\\Nazarii\\Desktop\\Portal\\portalapp\\src\\renderer\\public'

// // Get all appmanifest files
// const appManifestFiles = fs
//   .readdirSync(steamAppsPath)
//   .filter((file) => file.startsWith('appmanifest_'))

// // // Extract IDs from the filenames
// const ids = appManifestFiles.map((file) => file.split('_')[1].split('.')[0])

// Get all library cache files
// const libraryCacheFiles = fs
//   .readdirSync(libraryCachePath)
//   .filter((file) => file.endsWith('_library_600x900.jpg'))

// // Filter library cache files by the extracted IDs
// const matchingFiles = libraryCacheFiles.filter((file) => {
//   const id = file.split('_')[0]
//   return ids.includes(id)
// })

// Copy matching files to public folder and prepare data for games.json

// function fetchGameDetails(appId) {
//   return new Promise((resolve, reject) => {
//     const url = `https://store.steampowered.com/api/appdetails?appids=${appId}`
//     const request = net.request(url)

//     request.on('response', (response) => {
//       let rawData = ''
//       response.on('data', (chunk) => {
//         rawData += chunk
//       })

//       response.on('end', () => {
//         try {
//           const result = JSON.parse(rawData)
//           if (result[appId].success) {
//             resolve(result[appId].data)
//           } else {
//             reject(new Error(`Request to Steam API for appid ${appId} was not successful`))
//           }
//         } catch (e) {
//           reject(e)
//         }
//       })
//     })

//     request.on('error', (error) => {
//       reject(error)
//     })

//     request.end()
//   })
// }

// function extractDescription(html) {
//   const match = html.match(/<p class="header-description".*?>([\s\S]*?)<\/div>/)
//   return match ? match[1].replace(/<[^>]+>/g, '').trim() : '' // Remove HTML tags and trim
// }

// // Update your gamePromises to also fetch the game descriptions
// const gamePromises = ids.map((id) => {
//   return new Promise((resolve, reject) => {
//     const imageUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/library_600x900_2x.jpg`
//     const targetPath = path.join(publicPath, `${id}_library_600x900_2x.jpg`)
//     let gameData = { id, image: '', description: '', type: 'game'}

//     // Download image
//     const imageRequest = https.get(imageUrl, (response) => {
//       if (response.statusCode !== 200) {
//         gameData.image = '/default.png'
//         resolve(gameData)
//       } else {
//         response.pipe(fs.createWriteStream(targetPath)).on('finish', () => {
//           gameData.image = `/${id}_library_600x900_2x.jpg`
//           // Fetch the game description
//           const descriptionUrl = `https://steamdb.info/app/${id}/info/`
//           const request = net.request(descriptionUrl)

//           request.on('response', (response) => {
//             let html = ''
//             response.on('data', (chunk) => {
//               html += chunk.toString()
//             })

//             response.on('end', () => {
//               gameData.description = extractDescription(html)
//               resolve(gameData)
//             })
//           })

//           request.end()
//         })
//       }
//     })

//     imageRequest.on('error', (error) => {
//       console.error(`Error downloading image for game ${id}:`, error)
//       gameData.image = '/default.png'
//       reject(gameData)
//     })
//   })
// })

// // // Write games data to games.json
// Promise.all(gamePromises)
//   .then((gamesData) => {
//     fs.writeFileSync(path.join(publicPath, 'games.json'), JSON.stringify(gamesData, null, 2))
//     console.log('Games data written to games.json')
//   })
//   .catch((error) => {
//     console.error('Error:', error)
//   })

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    frame: false,
    fullscreen: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
    }
  })

  // mainWindow.webContents.session.clearCache().then(() => {
  //   console.log('Cache cleared.')
  // })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // mainWindow.webContents.setWindowOpenHandler((details) => {
  //   shell.openExternal(details.url)
  //   return { action: 'deny' }
  // })

  // Load the index.html of the app.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// app.disableHardwareAcceleration();

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.handle('open-game-detail', async (_event, gameId) => {
    const gameDetailWindow = new BrowserWindow({
      fullscreen: true,
      frame: false,
      webPreferences: {
        preload: path.join(__dirname, '../preload/index.js'),
        sandbox: false,
      }
    })

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      gameDetailWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/details_index.html`)
    } else {
      gameDetailWindow.loadFile(join(__dirname, '../renderer/details_index.html'))
    }
    // gameDetailWindow.loadURL(`file://${path.join(__dirname, '../renderer/windows/GameDetailPage/index.html')}`);
    // gameDetailWindow.loadURL(join(__dirname, '../renderer/details_index.html'));
    gameDetailWindow.webContents.on('did-finish-load', () => {
      // Send the game ID to the new BrowserWindow
      gameDetailWindow.webContents.send('game-id', gameId);
    });

    // await gameDetailWindow.webContents.executeJavaScript('document.readyState')
    // .then(readyState => {
    //   while (readyState !== 'complete') {
    //     console.log('waiting!')
    //   }
    // })

    // ipcMain.once('ready', () => {
    //   console.log('ready was sent');
    //   gameDetailWindow.webContents.send('game-id', gameId);
    // })

    // gameDetailWindow.webContents.send('game-id', gameId);

    // gameDetailWindow.loadURL(`file://${__dirname}/../renderer/index.html#/game/${gameId}`)
    // gameDetailWindow.loadFile(path.join(__dirname, '../renderer/index.html#game/1604890'));
    // Load the HTML file and pass the gameId to the renderer process
    // gameDetailWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
    // if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    //   gameDetailWindow.loadURL(`http://localhost:5173/game/${gameId}`);
    // } else {
    //   gameDetailWindow.loadURL(`file://${__dirname}/../renderer/index.html#/game/${gameId}`)
    // }
  })
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('open-steam-game', (_event, gameId) => {
  shell.openExternal(`steam://run/${gameId}`)
})

