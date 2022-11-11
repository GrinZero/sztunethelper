import { getRemoteHosts } from '../controllers/hosts'
import db from '../db'
import type { Host } from '../db/model'
import { scheduleJob, RecurrenceRule, Range } from 'node-schedule'

export const updateRemoteHost = async (host: Host) => {
  if (!host.url) {
    throw new Error('url is required')
  }
  const content = await getRemoteHosts(host.url)
  const hosts = db.get('hosts').value()
  const index = hosts.findIndex((item) => item.name === host.name)
  if (index > -1) {
    hosts[index].content = content
    hosts[index].updateTime = new Date().getTime()
    db.set('hosts', hosts).write()
  }
}

const task = async (host: Host, quick = false) => {
  if (quick) {
    await updateRemoteHost(host)
  }
  if (host.autoUpdate === 'never' || !host.autoUpdate) {
    return null
  }
  const rule = new RecurrenceRule()
  const time = host.autoUpdate.split('')
  const unit = time.pop()
  const num = Number(time.join(''))
  switch (unit) {
    case 'm':
      rule.minute = new Range(0, 59, num)
      break
    case 'h':
      rule.hour = new Range(0, 23, num)
      break
    case 'd':
      rule.date = new Range(1, 31, num)
      break
    default:
      break
  }

  return scheduleJob(rule, () => {
    updateRemoteHost(host)
  })
}

export default task
