import React from 'react'
import './GameItem.scss'

interface GameItemProps {
  selected: boolean
  image: {
    id: string
    image?: string
  }
}

const GameItem: React.FC<GameItemProps> = ({ selected, image }) => {

  // const openSteamGame = useCallback(() => {
  //   if (selected) {
  //     setTimeout(() => {
  //       window.electron.ipcRenderer.send('open-steam-game', image.id)
  //     }, 3000)
  //   }
  // }, [selected, image.id])

  // const handleKeyPress = useCallback(
  //   (event) => {
  //     if (event.key === 'Enter') {
  //       navigate('/game/:' + image.id)
  //       // openSteamGame()
  //     }
  //   },
  //   [openSteamGame]
  // )

  // useEffect(() => {
  //   document.addEventListener('keydown', handleKeyPress)

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyPress)
  //   }
  // }, [handleKeyPress])

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
