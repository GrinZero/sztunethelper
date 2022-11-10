import apiStore, { RequestResult } from '../apiStore'
import db from '../../db'
import store from '../../db/store'
import type { Host } from '../../db'

import { checkAccess, getHostsContent, setSysHosts, updateRemote } from '../../controllers'

apiStore.add('saveHosts', async (list: Host[]): RequestResult => {
  const access = await checkAccess()
  const sudo = await store.get('sudo')
  if (!access && !sudo) {
    return {
      code: 403,
      data: 'Permission denied'
    }
  }
  const content = getHostsContent(list)

  try {
    await setSysHosts(content, sudo as string)
    db.set('hosts', list).write()
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
