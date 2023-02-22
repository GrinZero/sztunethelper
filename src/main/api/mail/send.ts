import apiStore from '../apiStore'

import { sendMail } from '../../controllers/mail'
import type { SendMailProps } from '../../controllers/mail'
import store from '../../db/store'

import type { ApiResult } from '../type'

type SendMailApi = SendMailProps

apiStore.add('sendMail', async (props: SendMailApi): ApiResult<unknown> => {
  const options = { ...props }
  if (props.sender === undefined || props.pass === undefined) {
    const mail = store.get('local-mail', null) as { mail: string; pass: string } | null
    if (!mail) {
      throw new Error('未设置本地邮箱')
    }
    options.sender = mail.mail
    options.pass = mail.pass
  }
  if (props.attachments && props.extension === 'ArrayBuffer') {
    options.attachments = props.attachments.map((item) => {
      return {
        filename: item.filename,
        content: Buffer.from(item.content as ArrayBuffer)
      }
    })
  }

  console.info('sendMail', { ...options, pass: '******' })
  const res = await sendMail(options as SendMailProps)
  return {
    code: 200,
    data: res
  }
})
