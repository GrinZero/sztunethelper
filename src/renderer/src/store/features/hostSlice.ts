import { createSlice } from '@reduxjs/toolkit'
import { Host } from '@renderer/api'

export interface HostState {
  hosts: Host[]
  host: Host | null
}
export interface HostReducer {
  setHosts: (state: HostState, action: { payload: Host[] }) => void
  setHost: (state: HostState, action: { payload: Host | null }) => void
  [key: string]: any
}

const initialState: HostState = {
  hosts: [],
  host: null
}

export const hostSlice = createSlice<HostState, HostReducer, 'host'>({
  name: 'host',
  initialState,
  reducers: {
    setHosts: (state, action) => {
      state.hosts = action.payload
    },
    setHost: (state, action) => {
      state.host = action.payload
    }
  }
})
export const { setHosts, setHost } = hostSlice.actions

// 默认导出
export default hostSlice.reducer
