import apiStore, { RequestResult } from '../apiStore'
import { store } from '../../db'
import type { Host } from '../../db'

import { checkAccess, getHostsContent, setSysHosts, updateRemote } from '../../controllers'

apiStore.add('saveHosts', async (list: Host[]): RequestResult => {
  const access = await checkAccess()
  const sudo = store.get('sudo')
  if (!access && !sudo) {
    return {
      code: 403,
      data: 'Permission denied'
    }
  }
  const content = getHostsContent(list)

  try {
    await setSysHosts(content, sudo!)
    store.set('hosts', list)
    updateRemote()
  } catch (error) {
    return {
      code: 403,
      data: 'Permission denied'
    }
  }
  return {
    code: 200,
    data: list
  }
})
