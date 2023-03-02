import { Notification } from 'electron'
import { fetchNotice } from '../sdk'
import store from '../db/store'

export const noticeService = async () => {
  const notice = (await fetchNotice()) as { id: number; title: string; body: string }
  if (!notice) return

  const lastNoticeID = store.get('lastNoticeID', null)
  if (lastNoticeID === notice.id) return
  console.info('noticeService:notice update', notice)
  store.set('lastNoticeID', notice.id)

  const notification = new Notification(notice)
  notification.show()
}
