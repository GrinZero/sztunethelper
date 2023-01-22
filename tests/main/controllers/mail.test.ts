import { sendMail } from '@controllers/mail/index'
import { it, expect } from 'vitest'
import { sender, senderPass as pass } from '../../../.test.env'

it('sendMail', async () => {
  const result = await sendMail({
    sender,
    receiver: '774175136@qq.com',
    pass,
    subject: 'test',
    text: 'test',
    html: 'test'
  })
  expect(result).not.toBeNull()
})
