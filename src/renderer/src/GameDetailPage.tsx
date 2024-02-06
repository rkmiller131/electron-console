import React, { useState, useEffect, useCallback } from 'react'
import GameLaunchLoader from '../src/components/LoadingScreens/GameLaunchLoader'

import '../src/components/GameDetails/GameDetails.scss'

const GameDetailPage: React.FC = () => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleGameId = (_event: Electron.IpcRendererEvent, gameId: string): void => {
      setGameId(gameId);
    };

    window.electron.ipcRenderer.on('game-id', handleGameId);

    return () => {
      window.electron.ipcRenderer.removeAllListeners('game-id');
    };

  }, [gameId]);

  const openSteamGame = useCallback(() => {
    setTimeout(() => {
      setLoading(true)
      // window.electron.ipcRenderer.send('open-steam-game', gameId)
    }, 0)
  }, [])

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
                <span className="span-78">{gameId}</span>
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
  );
};

export default GameDetailPage;
