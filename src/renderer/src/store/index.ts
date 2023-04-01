import { configureStore } from '@reduxjs/toolkit'

import baseSlicer from './features/baseSlice'
import accountSlicer from './features/accountSlice'
import netInfoSlicer from './features/netInfoSlice'
import hostSlicer from './features/hostSlice'
import centerSlicer from './features/centerSlice'

const store = configureStore({
  reducer: {
    base: baseSlicer,
    account: accountSlicer,
    netInfo: netInfoSlicer,
    host: hostSlicer,
    center: centerSlicer
  } // 仓库数据
})

export default store

export * from './features'
