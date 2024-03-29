import apiClient from '../apiClient'
import type { ApiResult } from '../type'
import type { SendMailOptions } from 'nodemailer'

export interface SendMailProps extends SendMailOptions {
  sender?: string
  receiver: string
  pass?: string
  subject: string
  text?: string
  html?: string
}

const sendMail = async (props: SendMailProps) => {
  const res = await apiClient.send<ApiResult<unknown>>('sendMail', props)
  return res
}

const verifyMail = async (sender: string, pass: string) => {
  if (!window.bridge) {
    return true
  }
  const props = {
    sender,
    receiver: sender,
    pass,
    subject: 'sztunethelper(VerifyMail)',
    text: '收到本邮箱代表SMTP测试通过，验证OK！'
  }
  return sendMail(props)
}

export { sendMail, verifyMail }
