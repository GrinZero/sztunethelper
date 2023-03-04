import got from 'got'

import type { FetchNoticeFunction } from './type'

const fetchNotice: FetchNoticeFunction = () => {
  const url = `https://gitlab.com/GrinZero/nethelper-json/-/raw/main/notice.json`
  return got
    .get(url, {
      responseType: 'json'
    })
    .json()
}

export { fetchNotice }
