import iconv from 'iconv-lite'
import { baseGot } from './base'

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

async function getPlatformList(cookie: string) {
  const res = await baseGot.get('lfradius/home.php/user/online', {
    headers: {
      Cookie: cookie
    }
  })
  const results: Platform[] = []

  const content = iconv.decode(res.rawBody, 'gbk')
  const re = /(?=table-condensed)[\s\S]*?(?=<\/table>)/gs
  content.replace(re, (match) => {
    match.replace(/<tr>[\s\S]*?<\/tr>/gs, (item) => {
      if (item.includes('序号')) {
        return ''
      }
      const tdRe = /(?<=<td>)[\s\S]*?(?=<\/td>)/gs
      let i = 0
      const obj = {} as Platform
      item.replace(tdRe, (td) => {
        switch (i++) {
          case 1:
            {
              const link = td?.split?.("'/")?.[1]?.split?.("'")?.[0] ?? ''
              obj.link = link
              const list = link.split('/')
              obj.user = list[7]
              obj.nasIP = list[9]
              obj.id = list[11]
              obj.ip = list[13]
            }
            break
          case 2:
            obj.startTime = td
            break
          case 3:
            obj.endTime = td === '在线' ? null : td
            break
          case 5:
            obj.flow = td
            break
          default:
            break
        }
        return ''
      })
      results.push(obj)
      return ''
    })
    return ''
  })
  return results.filter((item) => item.endTime === null)
}

async function offlinePlatform(link: string, cookie: string) {
  const res = await baseGot.get(link, {
    headers: {
      Cookie: cookie
    }
  })
  const content = iconv.decode(res.rawBody, 'gbk')
  return { content, statusCode: res.statusCode }
}

export { getPlatformList, offlinePlatform }
