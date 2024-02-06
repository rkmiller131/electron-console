import React from 'react'
import ReactDOM from 'react-dom/client'
import GameDetailPage from './GameDetailPage'

import './assets/main.scss'
import './details_main'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GameDetailPage />
  </React.StrictMode>
)