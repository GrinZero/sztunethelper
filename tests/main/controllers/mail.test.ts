import { sendMail } from '@controllers/mail/index'
import { it, expect } from 'vitest'
import { sender, senderPass as pass } from '../../../.test.env'

it('sendMail', async () => {
  const result = await sendMail({
    sender,
    receiver: sender,
    pass,
    subject: 'SendMail-test',
    text: '收到本邮箱代表测试通过'
  })
  expect(result).not.toBeNull()
})
