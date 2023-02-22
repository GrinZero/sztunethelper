import nodemailer from 'nodemailer'
import { mailOptionsStore } from './constants'
import type { SendMailOptions } from 'nodemailer'

export interface SendMailProps extends SendMailOptions {
  sender: string
  receiver: string
  pass: string
  subject: string
  text: string
  html?: string
  extension?: 'ArrayBuffer'
}

export const sendMail = async ({
  sender,
  receiver,
  pass,
  subject,
  text,
  html,
  ...rest
}: SendMailProps) => {
  const form = {
    from: sender,
    to: receiver,
    subject,
    text,
    html,
    ...rest
  }
  const url = sender.split('@')[1]
  const smtp = mailOptionsStore[url].smtp
  if (!smtp) {
    throw new Error('邮箱地址错误')
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.sslPort || smtp.port,
    secure: !!smtp.sslPort,
    auth: {
      user: sender,
      pass
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const info = await transporter.sendMail(form)
  return info
}
