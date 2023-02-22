import { UploadItem } from '@arco-design/web-react/es/Upload'
import { uploadFile, UPLOAD_DOMAIN, UploadFileResult } from '@renderer/api/cos'
import { sendMail } from '@renderer/api/mail'

export interface SendTicketAttachmentsParams {
  toMail: string
  id: number
  title: string
  type: string
  sender: string
  attachments: UploadItem[]
}

export const sendTicketAttachments = async ({
  toMail,
  id,
  title,
  type,
  sender,
  attachments
}: SendTicketAttachmentsParams) => {
  const newAttachments = attachments.map((item) => ({
    filename: item.name,
    path: item.originFile?.path,
    cid: item.uid
  }))

  const mailOptions = {
    receiver: toMail,
    subject: `sztunethelper(工单附件):【${id}】【${type}】${title}`,
    text: `工单附件：\n${attachments.map((item) => item.name).join('\n')}`,
    attachments: newAttachments
  }

  const uploadTasks = attachments.map((item) =>
    uploadFile(item!.originFile as File, {
      filename: item.name as string,
      id: id,
      username: sender
    })
  )

  await sendMail(mailOptions)
  const uploadResults = (await Promise.all(uploadTasks)).map((item, i) => {
    const res = item as UploadFileResult
    return {
      url: UPLOAD_DOMAIN + res.key,
      filename: attachments[i].name,
      ...res
    }
  })

  return uploadResults
}
