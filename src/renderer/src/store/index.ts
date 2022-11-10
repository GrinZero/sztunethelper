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

import type { AccountInStore } from '../pages/Login/AccountStore'
;(async () => {
  const username = await window.storage.get<string>('username')
  const password = await window.storage.get<string>('password')
  const accountStore = (await window.storage.get<AccountInStore[]>('accountStore')) ?? []
  store.dispatch({ type: 'account/init', payload: { accountStore, username, password } })
})()

export default store

export * from './features'
