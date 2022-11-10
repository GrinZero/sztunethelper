import db from '../../db'

import taskStore, { updateRemoteHostTask } from '../../tasks'

const updateRemote = async () => {
  const hosts = db.get('hosts').value()

  const updateRemoteHosts = hosts.filter(
    (host) => host !== null && host.type === 'remote' && host.open && host.autoUpdate !== 'never'
  )
  updateRemoteHosts.forEach(async (host) => {
    const { name } = host
    const job = taskStore.hosts[name]
    if (job) {
      job.cancel()
    }
    const instance = await updateRemoteHostTask(host)
    if (instance) {
      taskStore.hosts[name] = instance
    }
  })
}

export default updateRemote
