import got from 'got'

import type { FetchNoticeFunction } from './type'

const fetchNotice: FetchNoticeFunction = () => {
  const url = `https://jihulab.com/GrinZero/sztunethelper-json/-/raw/main/notice.json`
  return got
    .get(url, {
      responseType: 'json'
    })
    .json()
}

export { fetchNotice }
