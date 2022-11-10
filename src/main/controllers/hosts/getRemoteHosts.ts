import got from 'got'
import type { OptionsOfTextResponseBody } from 'got'

export const getRemoteHosts = async (url: string, options?: OptionsOfTextResponseBody) => {
  return (
    await got.get(url, {
      timeout: 30000,
      ...options
    })
  ).body
}

export default getRemoteHosts
