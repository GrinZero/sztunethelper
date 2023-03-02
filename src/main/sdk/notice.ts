import got from 'got'

const fetchNotice = () => {
  const url = `https://gitlab.com/GrinZero/nethelper-json/-/raw/main/notice.json`
  return got
    .get(url, {
      responseType: 'json'
    })
    .json()
}

export { fetchNotice }
