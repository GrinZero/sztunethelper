import apiStore from '../apiStore'

import { getCurrentNetInfo } from '../../controllers'

import type { ApiResult } from '../type'

type NetInfoStatusType = 'success' | 'fail' | 'normal'
export interface NetInfoModal {
  ip: {
    value: null | string
    type: NetInfoStatusType
  }
  dns: {
    value: string[]
    type: NetInfoStatusType
  }
  dhcp: {
    value: string | null
    type: NetInfoStatusType
  }
  wifiName: {
    value: string | null
    type: NetInfoStatusType
  } | null
  mac: {
    value: string | null
  }
  speed: {
    value: number | null
  }
  proxy: {
    value: boolean
  }
}

apiStore.add('getNetInfo', async (): ApiResult<NetInfoModal> => {
  const netInfo = await getCurrentNetInfo()
  const ip = (() => {
    const value = netInfo?.ipv4.address ?? ''
    const type: NetInfoStatusType = value.startsWith('10.') ? 'success' : 'fail'
    return { value, type }
  })()

  const dns = (() => {
    const value = netInfo?.dnsServer ?? []
    console.info('get dns: maybe value[1] should be 114.114.114.114', value)
    const type: NetInfoStatusType =
      value[0] === '10.1.20.30' || value[0] === '172.17.127.2' ? 'success' : 'fail'
    return { value, type }
  })()

  const dhcp = (() => {
    const value = netInfo?.dhcp ? '开启' : '关闭'
    const type: NetInfoStatusType = netInfo?.dhcp ? 'success' : 'fail'
    return { value, type }
  })()

  const wifiName = (() => {
    if (!netInfo?.wifiName) return null
    const value = netInfo.wifiName
    const type: NetInfoStatusType = value === 'SZTU-student' ? 'success' : 'fail'
    return { value, type }
  })()

  return {
    code: 200,
    data: {
      ip,
      dns,
      dhcp,
      wifiName,
      mac: {
        value: netInfo?.mac ?? null
      },
      speed: {
        value: netInfo?.speed ?? null
      },
      proxy: {
        value: netInfo?.isProxy ?? false
      }
    }
  }
})
