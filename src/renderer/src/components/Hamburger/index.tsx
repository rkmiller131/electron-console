import { useState } from 'react'
import './HamburgerMenu.scss' // Ensure this points to your SCSS file

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`burger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
      <div className="bun top" />
      <div className="bun middle" />
      <div className="bun bottom" />
    </div>
  )
}

export default HamburgerMenu
