import apiClient from '../apiClient'

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
  randomMac: {
    value: string | null
    type: NetInfoStatusType
  }
  mac: {
    value: string | null
  }
}

async function getNetInfo() {
  return apiClient.send<NetInfoModal>('getNetInfo')
}

export { getNetInfo }
