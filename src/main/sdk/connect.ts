import got from 'got'
import iconv from 'iconv-lite'
// import { baseGot } from './base';

import type { Account } from './type'

const connect = async ({ username, password }: Account) => {
  let fetchQQHome
  try {
    fetchQQHome = await got.get(`http://www.qq.com/?time=${Date.now()}`, {
      hooks: {
        beforeRedirect: [
          (options) => {
            if (options.url.href.startsWith('https://www.qq.com/')) {
              throw '200'
            }
          }
        ]
      }
    })
  } catch (error: any) {
    if (error?.code === 'ERR_GOT_REQUEST_ERROR') {
      return {
        msg: 'had login',
        code: 200
      }
    }
  }
  const content = iconv.decode(fetchQQHome.rawBody, 'gbk')

  const re = /(?=form id="_wifi_login")[\s\S]*?(?=<\/form>)/gs
  const store: any = {}
  content.replace(re, (match) => {
    match.replace(/<input[\s\S]*?">/gs, (item) => {
      const name = item.split('name="')[1]?.split?.('"')?.[0] ?? ''
      const value = item.split('value="')[1]?.split?.('"')?.[0] ?? ''
      store[name] = value
      return ''
    })
    return ''
  })

  store.usrname = username
  store.passwd = password
  store.treaty = 'on'

  // await baseGot.post(
  //   'lfradius/libs/portal/unify/portal.php/login/Panabit_login',
  //   {
  //     form: store,
  //   },
  // );

  const mainLoginResult = await got.post('http://10.99.99.99:8010/cgi-bin/webauth/ajax_webauth', {
    form: {
      action: 'login',
      user: store.usrname,
      pwd: store.passwd,
      usrmac: store.usrmac,
      ip: store.usrip,
      success: store.success,
      fail: store.fail
    }
  })

  const loginResult = iconv.decode(mainLoginResult.rawBody, 'gbk')
  if (loginResult.includes('SUCCESS')) {
    return {
      msg: 'login success',
      code: 200
    }
  }

  return {
    msg: 'login fail',
    code: -1
  }
}

export { connect }
