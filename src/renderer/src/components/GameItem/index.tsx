import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './GameItem.scss'

interface GameItemProps {
  selected: boolean
  image: {
    id: string
    image?: string
  }
}

const GameItem: React.FC<GameItemProps> = ({ selected, image }) => {
  const navigate = useNavigate();

  const handleKeyPress = useCallback(
    (event) => {
      // if the user presses Esc, go back to home dash
      if (event.key === 'Escape') {
        navigate('/')
        window.location.reload();
      }
    }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <div className={`game-item-inner ${selected ? 'selected' : ''}`} >
      <img
        src={image.image ? image.image : '/default.png'}
        alt="Game"
        className={selected ? 'selected' : ''}
      />
    </div>
  )
}

export default GameItem
