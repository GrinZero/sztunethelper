import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface BaseConfig {
  autoUpdate: boolean
  autoLaunch: boolean
  autoTheme: boolean
  neverCannelNet: boolean
}
export interface BaseState {
  theme: 'dark' | 'light'
  config: BaseConfig | null
}
export interface BaseReducer {
  setTheme: (state: BaseState, action: { payload: 'dark' | 'light' }) => void
  setConfig: (state: BaseState, action: { payload: BaseConfig }) => void
  [key: string]: any
}

const initialState: BaseState = {
  theme: 'dark',
  config: null
}

const fetchConfig = createAsyncThunk('base/fetchBaseConfig', async () => {
  const defaultConfig = {
    autoUpdate: true,
    autoLaunch: true,
    autoTheme: true,
    neverCannelNet: false
  }
  const baseConfig = await window.storage.get<BaseConfig>('baseConfig', defaultConfig)
  if (!baseConfig) {
    return defaultConfig
  }
  return baseConfig
})

export const baseSlice = createSlice<BaseState, BaseReducer, 'base'>({
  name: 'base',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    setConfig: (state, action) => {
      state.config = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.config = action.payload
      })
      .addCase(fetchConfig.rejected, (state) => {
        console.error('fetchConfig rejected')
        state.config = {
          autoUpdate: true,
          autoLaunch: true,
          autoTheme: true,
          neverCannelNet: false
        }
      })
  }
})
export const { setTheme, setConfig } = baseSlice.actions
export { fetchConfig }

// 默认导出
export default baseSlice.reducer
