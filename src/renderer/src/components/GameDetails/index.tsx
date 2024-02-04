import { useCallback, useState } from 'react'
import GameLaunchLoader from '../LoadingScreens/GameLaunchLoader'

import './GameDetails.scss'

interface indexProps {
  id?: string
}
const index = ({ id }: indexProps): JSX.Element => {
  const [loading, setLoading] = useState(false)

  const openSteamGame = useCallback(() => {
    setTimeout(() => {
      setLoading(true)
      // window.electron.ipcRenderer.send('open-steam-game', 1604890)
    }, 0)
  }, [])

  console.log('game is ', id);
  return (
    <div className="main-container">
      {loading && <GameLaunchLoader />}

      <div className="frame">
        <span className="refactor-games">Refactor Games</span>
        <div className="main-info">
          <div className="group">
            <span className="football-simulator">Football Simulator</span>
            <div className="subheader">
              <button className="button-frame">
                <span className="action-adventure"># Action & Adventure</span>
              </button>
              <button className="button-frame-1">
                <span className="sport"># Sport</span>
              </button>
              <div className="divider"></div>
              <div className="rating">
                <div className="rating-2">
                  <div className="star"></div>
                  <div className="star-3"></div>
                  <div className="star-4"></div>
                  <div className="star-5"></div>
                  <div className="star-6"></div>
                </div>
                <span className="span-78">78</span>
              </div>
            </div>
            <span className="span-moddable-physics-football-game">
              Moddable physics football game where you can struggle through and break tackles for
              first downs, juggle tipped passes and make diving interceptions. You can also be the
              cinematographer and create your own videos using the replay system or go on
            </span>
          </div>
          <div className="buttons">
            <button onClick={openSteamGame} className="button-text">
              <span className="span-play">Play</span>
            </button>
            <div className="button-icon">
              <div className="button-icon-7"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="base-game-background" />
      <div className="overlay" />
    </div>
  )
}

export default index;