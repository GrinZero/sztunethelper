import apiStore, { RequestResult } from '../apiStore'

import { getPlatformList, offlinePlatform } from '../../sdk'
import type { Platform } from '../../sdk'

interface PlatformListModal {
  list: Platform[]
}

apiStore.add(
  'fetchPlatformList',
  async ({ cookie }: { cookie: string }): RequestResult<PlatformListModal> => {
    const res = await getPlatformList(cookie)
    return {
      code: 200,
      data: { list: res }
    }
  }
)

apiStore.add(
  'offlinePlatform',
  async ({ link, cookie }: { link: string; cookie: string }): RequestResult => {
    const res = await offlinePlatform(link, cookie)
    return {
      code: res.statusCode,
      data: res.content
    }
  }
)
