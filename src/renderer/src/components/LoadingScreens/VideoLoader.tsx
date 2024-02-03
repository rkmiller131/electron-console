import React, { useEffect } from 'react'
import './VideoLoader.scss'
import introVideo from '/intro.mov'

interface VideoLoaderProps {
  onEnd: () => void
}

const VideoLoader: React.FC<VideoLoaderProps> = ({ onEnd }) => {
  useEffect(() => {
    const videoElement = document.getElementById('intro-video') as HTMLVideoElement | null;

    if (videoElement) {
      videoElement.addEventListener('ended', onEnd);
      videoElement.addEventListener('error', (event: Event) => {
      console.error('Video loading or playback error:', (event.target as HTMLVideoElement).error);
      });
      videoElement.play();
    } else {
      console.error('Video element not found.');
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', onEnd);
        videoElement.removeEventListener('error', (event: Event) => {
        console.error('Video loading or playback error:', (event.target as HTMLVideoElement).error);
        });
      }
    };
  }, [onEnd]);

  return (
    <div className="video-loader-container">
      <video id="intro-video" className="video-loader" preload="auto" autoPlay src={introVideo} />
    </div>
  )
}

export default VideoLoader
