import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface BaseConfig {
  autoUpdate: boolean
  autoStart: boolean
  autoTheme: boolean
  neverOffline: boolean
  noticeService: boolean
}
export interface BaseState {
  theme: 'dark' | 'light'
  config: BaseConfig | null
}

export interface BaseReducer {
  setTheme: (state: BaseState, action: { payload: 'dark' | 'light' }) => void
  setConfig(state: BaseState, action: { payload: Partial<BaseConfig> }): void
  [key: string]: any
}

const initialState: BaseState = {
  theme: (localStorage.getItem('defaultTheme') as 'dark' | 'light') || 'dark',
  config: null
}

const defaultBaseConfig: BaseConfig = {
  autoUpdate: true,
  autoStart: false,
  autoTheme: true,
  neverOffline: false,
  noticeService: true
}
const fetchConfig = createAsyncThunk('base/fetchBaseConfig', async () => {
  const baseConfig = await window.storage.get<BaseConfig>('baseConfig', defaultBaseConfig)
  if (!baseConfig) {
    return defaultBaseConfig
  }
  return baseConfig
})

export const baseSlice = createSlice<BaseState, BaseReducer, 'base'>({
  name: 'base',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      localStorage.setItem('defaultTheme', action.payload)
      state.theme = action.payload
    },
    setConfig: (state, action) => {
      if (action.payload) {
        state.config = { ...state.config, ...action.payload } as BaseConfig
      } else {
        state.config = null
      }
      console.info('setConfig:base', state.config)
      window.storage.set('baseConfig', state.config)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.config = action.payload
      })
      .addCase(fetchConfig.rejected, (state) => {
        console.error('fetchConfig rejected')
        state.config = defaultBaseConfig
      })
  }
})
export const { setTheme, setConfig } = baseSlice.actions
export { fetchConfig }

// 默认导出
export default baseSlice.reducer
