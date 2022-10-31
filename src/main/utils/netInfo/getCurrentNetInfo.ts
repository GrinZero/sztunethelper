import os from 'os'

import getDnsServer from './getDnsServer'

export interface IpInfo {
  address: string | null
  netmask: string | null
  cidr: string | null
}

export interface NetInfoType {
  mac: string
  ipv4: IpInfo
  ipv6: IpInfo
  dnsServer: string[]
}

const getCurrentNetInfo = (): NetInfoType | null => {
  const osType = os.type()
  const netInfo = os.networkInterfaces()

  const dnsServer = getDnsServer()

  const baseInfo = (() => {
    switch (osType) {
      case 'Darwin':
        return netInfo.en1
      case 'Windows_NT':
        return netInfo.WLAN || netInfo['以太网'] || netInfo['本地连接']
      default:
        return null
    }
  })()

  if (!baseInfo) {
    return null
  }

  const [ipv6Info, ipv4Info] = baseInfo

  const result = {
    mac: ipv6Info.mac,
    ipv4: {
      address: ipv4Info.address,
      netmask: ipv4Info.netmask,
      cidr: ipv4Info.cidr
    },
    ipv6: {
      address: ipv6Info.address,
      netmask: ipv6Info.netmask,
      cidr: ipv6Info.cidr
    },
    dnsServer
  }

  return result
}

export default getCurrentNetInfo
