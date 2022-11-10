import apiStore, { RequestResult } from '../apiStore'
import db from '../../db'
import store from '../../db/store'
import type { Host } from '../../db'

import { checkAccess } from '../../controllers'

apiStore.add('saveHosts', async (list: Host[]): RequestResult => {
  const access = await checkAccess()
  if (!access) {
    const sudo = await store.get('sudo')
    if (!sudo) {
      return {
        code: 403,
        data: 'Permission denied'
      }
    }
  }
  return {
    code: 200,
    data: []
  }
})
