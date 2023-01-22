import nodemailer from 'nodemailer'
import { mailOptionsStore } from './constants'

interface SendMailProps {
  sender: string
  receiver: string
  pass: string
  subject: string
  text: string
  html: string
}

export const sendMail = async ({ sender, receiver, pass, subject, text, html }: SendMailProps) => {
  const form = {
    from: sender,
    to: receiver,
    subject,
    text,
    html
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
    }
  })

  const info = await transporter.sendMail(form)

  console.log('info', info)

  return info
}
