import apiClient from '../apiClient'

export interface Platform {
  name?: string
  id: string
  nasIP: string
  user: string
  ip: string
  startTime: string
  endTime: string | null
  flow: string
  link: string
}
const fetchPlatformList = async (cookie: string) => {
  const res = await apiClient.send<{ list: Platform[] }>('fetchPlatformList', {
    cookie
  })
  const nameStore = JSON.parse(localStorage.getItem('nameStore') || '{}')
  res.data.list.forEach((item) => {
    const nameFromID = nameStore[item.id]
    const nameFromIP = nameStore[item.ip]
    if (!nameFromID && !nameFromIP) {
      return
    }
    if (nameFromID === nameFromIP) {
      item.name = nameFromID
      return
    }
    if (nameFromIP) {
      item.name = nameFromIP
    }
  })
  return res
}

const offlinePlatform = async (link: string, cookie: string) =>
  apiClient.send<{ code: number; data: string }>('offlinePlatform', {
    link,
    cookie
  })

export { fetchPlatformList, offlinePlatform }
