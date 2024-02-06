import { useState } from 'react'
import { Provider } from 'react-redux'
import Footer from './components/Footer'
import { Header } from './components/Header'
import Carousel from './components/Carousel'
import VideoLoader from './components/LoadingScreens/VideoLoader'
import { store } from './redux/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { selectGameList, selectGameStatus, fetchGames } from './redux/gameSlice'
import { fetchApps, selectAppList, selectAppStatus } from './redux/dashboardSlice'


function App(): JSX.Element {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = ():void => {
    setVideoEnded(true)
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        {!videoEnded ? (
          <VideoLoader onEnd={handleVideoEnd} />
        ) : (
          <main className='main-container'>
            <Header />
            {/* background video that plays behind the carousel */}
            <video
              id="homepage-video"
              className="video-loader"
              preload="auto"
              loop
              autoPlay
              src={'/homepage.mp4'}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Carousel
                  dataList={selectAppList}
                  dataStatus={selectAppStatus}
                  fetchData={fetchApps}
                />
                }
              />
              {/* <Route
                path="/game/:id"
                element={<GameDetails />}
              /> */}
              <Route
                path="/games"
                element={
                  <Carousel
                    dataList={selectGameList}
                    dataStatus={selectGameStatus}
                    fetchData={fetchGames}
                  />
                }
              />
            </Routes>
            <Footer />
          </main>
        )}
      </BrowserRouter>
    </Provider>
  )
}

export default App