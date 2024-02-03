import React, { useEffect } from 'react'
import './VideoLoader.scss'
import introVideo from '/intro.mov'

const VideoLoader: React.FC<{ onEnd: () => void }> = ({ onEnd }) => {
  useEffect(() => {
    const videoElement = document.getElementById('intro-video') as HTMLVideoElement

    videoElement.addEventListener('ended', onEnd)
    videoElement.play()

    return () => {
      videoElement.removeEventListener('ended', onEnd)
    }
  }, [onEnd])

  return (
    <div className="video-loader-container">
      <video id="intro-video" className="video-loader" preload="auto" autoPlay src={introVideo} />
    </div>
  )
}

export default VideoLoader
