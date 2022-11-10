import apiStore, { RequestResult } from '../apiStore'

import { getPlatformList, offlinePlatform } from '../../sdk'
import type { Platform } from '../../sdk'

import type { ApiResult } from '../type'
interface PlatformListModal {
  list: Platform[]
}

apiStore.add(
  'fetchPlatformList',
  async ({ cookie }: { cookie: string }): ApiResult<PlatformListModal> => {
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
