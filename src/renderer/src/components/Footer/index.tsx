// Footer.tsx
import React from 'react'
import './Footer.scss'

const Footer = () => {
  return (
    <div className="footer">
      <button className="footer-button">
        {/* <img src="/path-to-play-icon.png" alt="Play" className="footer-icon" /> */}
        <span>Play</span>
      </button>
      <button className="footer-button">
        {/* <img src="/path-to-details-icon.png" alt="Details" className="footer-icon" /> */}
        <span>Details</span>
      </button>
      <button className="footer-button">
        {/* <img src="/path-to-game-options-icon.png" alt="Game Options" className="footer-icon" /> */}
        <span>Game Options</span>
      </button>
      <button className="footer-button">
        {/* <img src="/path-to-search-icon.png" alt="Search" className="footer-icon" /> */}
        <span>Search</span>
      </button>
      <button className="footer-button">
        {/* <img src="/path-to-filter-icon.png" alt="Filter" className="footer-icon" /> */}
        <span>Filter</span>
      </button>
    </div>
  )
}

export default Footer
