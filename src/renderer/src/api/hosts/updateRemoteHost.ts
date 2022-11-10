import apiClient from '../apiClient'
import type { ApiResult } from '../type'
import type { Host } from './fetchHosts'

const updateRemoteHost = async (payload: Host) => {
  const res = await apiClient.send<ApiResult<Host[]>>('updateRemoteHost', payload, 40000)
  return res
}

export { updateRemoteHost }
