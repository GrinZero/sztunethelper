import { configureStore } from '@reduxjs/toolkit'

import baseSlicer from './features/baseSlice'
import accountSlicer from './features/accountSlice'
import netInfoSlicer from './features/netInfoSlice'

const store = configureStore({
  reducer: {
    base: baseSlicer,
    account: accountSlicer,
    netInfo: netInfoSlicer
  } // 仓库数据
})
export default store

export * from './features'
