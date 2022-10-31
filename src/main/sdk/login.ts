import iconv from 'iconv-lite'

import { baseGot } from './base'

import type { Account } from './type'

export interface LoginResult {
  code: number
  error?: unknown
  cookies?: string | null
  data?: string
}

const login = async ({ username, password }: Account, Cookie?: string): Promise<LoginResult> => {
  const getCookie = async () => {
    const postResponse = await baseGot.post('lfradius/home.php?a=userlogin&c=login', {
      body: `username=${username}&password=${password}`
    })
    return postResponse?.headers['set-cookie']?.join()?.replace(/path=\/(,|)/g, '') ?? null
  }

  try {
    const _Cookie = (await getCookie()) ?? Cookie ?? ''
    const showRightResponse = await baseGot.get('lfradius/home.php/login/showright', {
      headers: {
        Cookie: _Cookie
      }
    })
    const re = new RegExp('log_money')
    if (!re.test(showRightResponse.body)) {
      // 密码不正确
      return {
        code: -1,
        cookies: null
      }
    }
    const content = iconv.decode(showRightResponse.rawBody, 'gbk')
    const packageData =
      content.split('当前套餐')[1]?.split?.('<td>')?.[1]?.split?.('</td')?.[0] ?? 'Not found'
    return {
      code: 1,
      cookies: _Cookie,
      data: packageData
    }
  } catch (error) {
    return {
      code: -10056,
      error
    }
  }
}
export { login }
