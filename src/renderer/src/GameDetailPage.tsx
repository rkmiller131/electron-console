import React, { useState, useEffect } from 'react';

const GameDetailPage: React.FC = () => {
  const [gameId, setGameId] = useState<string | null>(null);

  useEffect(() => {
    const handleGameId = (_event: Electron.IpcRendererEvent, gameId: string): void => {
      setGameId(gameId);
    };

    window.electron.ipcRenderer.on('game-id', handleGameId);

    return () => {
      window.electron.ipcRenderer.removeAllListeners('game-id');
    };

  }, [gameId]);

  return (
    <div>
      <h2>{`The selected game id is: ${gameId}`}</h2>
      {/* Display other game details */}
    </div>
  );
};

export default GameDetailPage;