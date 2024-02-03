import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { CarouselItem } from '../components/Carousel'

export interface Game extends CarouselItem {
  id: string
  image: string
}

export interface GamesState {
  games: Game[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// Async thunk for fetching games data
export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  const response = await fetch('/games.json');
  const games = (await response.json());
  return games;
})

const initialState: GamesState = {
  games: [],
  status: 'idle',
  error: null,
}

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchGames.fulfilled, (state, action: PayloadAction<Game[]>) => {
        state.status = 'succeeded'
        state.games = action.payload
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? null
      })
  }
})

export const selectGameList = (state: { games: GamesState }): Game[] => state.games.games;
export const selectGameStatus = (state: { games: GamesState }): string => state.games.status;
// entire game state in case needed for debugging (the games, status, and error)
export const selectGameState = (state: { games: GamesState }): GamesState => state.games;

export default gamesSlice.reducer
