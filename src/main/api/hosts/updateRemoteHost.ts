import apiStore from '../apiStore'
import db from '../../db'

import type { Host } from '../../db/model'
import type { ApiResult } from '../type'

import taskStore, { updateRemoteHostTask } from '../../tasks'

apiStore.add('updateRemoteHost', async (host: Host): Promise<ApiResult<Host[]>> => {
  const { name } = host
  const job = taskStore.hosts[name]
  if (job) {
    job.cancel()
  }
  const startTime = Date.now()
  console.info('updateRemote:start')
  const instance = await updateRemoteHostTask(host, true)
  console.info('updateRemote:end', Date.now() - startTime)
  if (instance) {
    taskStore.hosts[name] = instance
  }

  const hosts = db.get('hosts').value()
  return {
    code: 200,
    data: hosts
  }
})
