import apiClient from '../apiClient'
import type { ApiResult } from '../type'
import type { Host } from './fetchHosts'

const saveHosts = async (payload: Host[]) => {
  const res = await apiClient.send<ApiResult<Host[]>>('saveHosts', payload)
  return res
}

export { saveHosts }
