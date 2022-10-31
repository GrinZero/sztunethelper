import apiStore, { RequestResult } from '../apiStore'

import { getCurrentNetInfo } from '../../utils'

type NetInfoStatusType = 'success' | 'fail' | 'normal'
interface NetInfoModal {
  ip: {
    value: null | string
    type: NetInfoStatusType
  }
  dns: {
    value: string[]
    type: NetInfoStatusType
  }
  randomMac: {
    value: string | null
    type: NetInfoStatusType
  }
  mac: {
    value: string | null
  }
}

apiStore.add('getNetInfo', async (): RequestResult<NetInfoModal> => {
  const netInfo = getCurrentNetInfo()
  const ip = (() => {
    const value = netInfo?.ipv4.address ?? ''
    const type: NetInfoStatusType = value.startsWith('10.161') ? 'success' : 'fail'
    return { value, type }
  })()

  const dns = (() => {
    const value = netInfo?.dnsServer ?? []
    const type: NetInfoStatusType =
      (value[0] === '10.1.20.30' && value[1] === '114.114.114.114') || value[0] === '172.17.127.2'
        ? 'success'
        : 'fail'
    return { value, type }
  })()

  const randomMac = (() => {
    const value = 'OK'
    const type: NetInfoStatusType = 'success'
    return { value, type }
  })()

  return {
    code: 200,
    data: {
      ip,
      dns,
      randomMac,
      mac: {
        value: netInfo?.mac ?? null
      }
    }
  }
})
