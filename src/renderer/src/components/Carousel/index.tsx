import { AppDispatch, RootState } from '@renderer/redux/store'
import { useCallback, useEffect, useRef, useState, lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AsyncThunk } from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { useNavigate } from 'react-router-dom'
import GameLaunchLoader from '../LoadingScreens/GameLaunchLoader'

import './Carousel.scss'

const LazyGameItem = lazy(() => import('../GameItem'))

type CarouselItemType = 'game' | 'app';
export interface CarouselItem {
  id: string
  image: string
  type: CarouselItemType
  route: string
}

interface CarouselProps<T extends CarouselItem> {
  dataList: (state: RootState) => T[]
  dataStatus: (state: RootState) => string
  fetchData: AsyncThunk<unknown, void, AsyncThunkConfig>
}

export default function Carousel<T extends CarouselItem>({
  dataList,
  dataStatus,
  fetchData
}: CarouselProps<T>): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const list = useSelector(dataList)
  const currentStatus = useSelector(dataStatus)
  const navigate = useNavigate()

  const [selectedIndex, setSelectedIndex] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const itemWidth = 400

  // sound to play when navigating the carousel
  const playNavigationSound = useCallback(() => {
    const audio = new Audio('/navigation.wav')
    audio.play().catch((e) => console.error('Failed to play sound:', e))
  }, [])

  // update the transform 'push' of the carousel from item to item
  const updateContainerTransform = useCallback(() => {
    const transformValue = -selectedIndex * itemWidth
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${transformValue}px)`
    }
  }, [selectedIndex, itemWidth])

  // if the current data slice is idle (initial state), fetch the data list
  useEffect(() => {
    if (currentStatus === 'idle') {
      dispatch(fetchData());
    }
  }, [currentStatus, dispatch, fetchData])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      setSelectedIndex((prevIndex) => (prevIndex === 0 ? list.length - 1 : prevIndex - 1));
      playNavigationSound();
    } else if (event.key === 'ArrowRight') {
      setSelectedIndex((prevIndex) => (prevIndex === list.length - 1 ? 0 : prevIndex + 1));
      playNavigationSound();
    } else if (event.key === 'Enter') {
      if (list[selectedIndex].type === 'app') {
        // would be nice to play a selected sound here
        navigate(list[selectedIndex].route);
      } else if (list[selectedIndex].type === 'game') {
        // open steam details page (new browser window process).
        const gameId = list[selectedIndex].id;
        // navigate('/game/' + gameId)
        // window.api.openGameDetails(gameId);
        window.electron.ipcRenderer.send('open-game-detail', gameId)
      }
    }
  }, [list.length, playNavigationSound])

  useEffect(() => {
    const animationFrame = requestAnimationFrame(updateContainerTransform)
    return () => cancelAnimationFrame(animationFrame)
  }, [updateContainerTransform])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <Suspense fallback={<GameLaunchLoader />}>
      <div>
        <div className="scroll-window">
          <div className="scroll-container" ref={containerRef}>
            {list?.map((game, index) => (
              <div className="game-item" key={index}>
                <LazyGameItem selected={index === selectedIndex} image={game} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
