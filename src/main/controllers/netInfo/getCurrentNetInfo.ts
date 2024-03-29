import getWifiName from 'wifi-name'
import * as si from 'systeminformation'
import getDnsServer from './getDnsServer'
import { checkProxy } from './checkProxy'

export interface IpInfo {
  address: string | null
  netmask: string | null
}

export interface NetInfoType {
  mac: string
  ipv4: IpInfo
  ipv6: IpInfo
  dnsServer: string[]
  dhcp: boolean
  speed: number | null
  wifiName: string | null
  isProxy: boolean
}

const getCurrentNetInfo = async (): Promise<NetInfoType | null> => {
  const netInfos = (await si.networkInterfaces()) as si.Systeminformation.NetworkInterfacesData[]
  const [wifiInfo] = await si.wifiInterfaces()
  const netInfo = (() => {
    const info = netInfos.find((item) => item.mac === wifiInfo.mac)
    if (info?.ip4 !== '') return info
    return netInfos.find((item) => item.ip4 !== '' && item.mac !== '')
  })()

  let wifiName = null
  try {
    wifiName = await getWifiName()
  } catch (error) {
    console.warn('Warn: Could not get SSID')
  }
  if (!netInfo) {
    return null
  }

  const dnsServer = getDnsServer()

  const isProxy = await checkProxy()

  const result = {
    mac: wifiInfo.mac,
    ipv4: {
      address: netInfo.ip4,
      netmask: netInfo.ip4subnet
    },
    ipv6: {
      address: netInfo.ip6,
      netmask: netInfo.ip6subnet
    },
    dnsServer,
    dhcp: netInfo.dhcp,
    speed: netInfo.speed,
    wifiName,
    isProxy
  }

  return result
}

export default getCurrentNetInfo
