import { useEffect, useState } from 'react'
import HamburgerMenu from '../Hamburger'
import './Header.scss' // Ensure this points to your SCSS file

export const Header = () => {
  useEffect(() => {
    const audio = new Audio('/background.mp3') // Replace with the path to your music file
    audio.loop = true
    audio.play().catch((e) => console.error('Failed to play music:', e))

    // Cleanup function to stop the music when the component unmounts
    return () => {
      audio.pause()
    }
  }, []) // Empty dependency array means this effect runs once on mount

  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date()
      const timeString = now
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        .replace(' ', '')
      setCurrentTime(timeString)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="header">
      <div className="header-content">
        <img className="header-logo" alt="Logo" src="logo.png" />
        <div className="divider-line" />
        <img className="header-image" alt="Hospital" src="hospital.png" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '80px' }}>
        <p id="time">{currentTime}</p>
        <HamburgerMenu />
      </div>
    </div>
  )
}
