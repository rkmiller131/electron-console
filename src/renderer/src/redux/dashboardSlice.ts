import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { CarouselItem } from '../components/Carousel'
export interface AppCard extends CarouselItem {
  id: string
  image: string
}

export interface AppCardState {
  apps: AppCard[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

export const fetchApps = createAsyncThunk('apps/fetchApps', async () => {
  const response = await fetch('/apps.json');
  const apps = (await response.json());
  return apps;
})

const initialState: AppCardState = {
  apps: [],
  status: 'idle',
  error: null
}

const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApps.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchApps.fulfilled, (state, action: PayloadAction<AppCard[]>) => {
        state.status = 'succeeded'
        state.apps = action.payload
      })
      .addCase(fetchApps.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? null
      })
  }
})

export const selectAppList = (state: { apps: AppCardState }): AppCard[] => state.apps.apps;
export const selectAppStatus = (state: { apps: AppCardState }): string => state.apps.status;
// entire app state in case needed for debugging (the games, status, and error)
export const selectAppState = (state: { apps: AppCardState }): AppCardState => state.apps;

export default appsSlice.reducer