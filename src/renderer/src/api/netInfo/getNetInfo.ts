import apiClient from '../apiClient'
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
  wifiName?: {
    value: string | null
    type: NetInfoStatusType
  }
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
async function getNetInfo() {
  return apiClient.send<ApiResult<NetInfoModal>>('getNetInfo')
}

export { getNetInfo }
