import React, { useState, useEffect } from 'react';

const GameDetailPage: React.FC = () => {
  const [gameId, setGameId] = useState<string | null>(null);

  useEffect(() => {
    const handleGameId = (event: Event): void => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        setGameId(customEvent.detail);
      }
    };

    window.addEventListener('game-id', handleGameId);

    return () => {
      window.removeEventListener('game-id', handleGameId);
    };

  }, []);

  return (
    <div>
      <h2>{`The selected game id is: ${gameId}`}</h2>
      {/* Display other game details */}
    </div>
  );
};

export default GameDetailPage;