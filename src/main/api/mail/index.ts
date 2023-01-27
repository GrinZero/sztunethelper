import apiStore from '../apiStore'

import { sendMail } from '../../controllers/mail'
import type { SendMailProps } from '../../controllers/mail'
import store from '../../db/store'

import type { ApiResult } from '../type'

interface SendMailApi extends Pick<SendMailProps, 'receiver' | 'subject' | 'text' | 'html'> {
  sender?: string
  pass?: string
}

apiStore.add('sendMail', async (props: SendMailApi): ApiResult<unknown> => {
  const options = { ...props }
  if (props.sender === undefined || props.pass === undefined) {
    const mail = store.get('local-mail', null) as { sender: string; pass: string } | null
    if (!mail) {
      throw new Error('未设置本地邮箱')
    }
    options.sender = mail.sender
    options.pass = mail.pass
  }
  const res = await sendMail(options as SendMailProps)
  return {
    code: 200,
    data: res
  }
})
