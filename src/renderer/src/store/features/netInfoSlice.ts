import { createSlice } from '@reduxjs/toolkit'
import type { NetInfoModal } from '@renderer/api'

export type NetInfoState = NetInfoModal
export interface NetInfoReducer {
  setNetInfo: (state: NetInfoState, action: { payload: NetInfoModal }) => void
  [key: string]: any
}

const initialState: NetInfoModal = {
  ip: {
    value: '-',
    type: 'fail'
  },
  dns: {
    value: ['-', '-'],
    type: 'fail'
  },
  dhcp: {
    value: '-',
    type: 'fail'
  },
  mac: {
    value: null
  },
  speed: {
    value: null
  },
  wifiName: {
    value: '-',
    type: 'fail'
  },
  proxy: {
    value: false
  }
}

export const netInfoSlice = createSlice<NetInfoState, NetInfoReducer, 'netInfo'>({
  name: 'netInfo',
  initialState,
  reducers: {
    setNetInfo: (state, action) => {
      state.dhcp = action.payload.dhcp
      state.dns = action.payload.dns
      state.ip = action.payload.ip
      state.mac = action.payload.mac
      state.speed = action.payload.speed
      state.wifiName = action.payload.wifiName
    }
  }
})
export const { setNetInfo } = netInfoSlice.actions

// 默认导出
export default netInfoSlice.reducer
