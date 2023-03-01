import axiosClient from '@renderer/api/axiosClient'
import { Ticket } from './ticketList'
import { sendMail } from '@renderer/api/mail'

export interface AddTicketParams {
  title: string
  type: string
  content: string
  contactType: Ticket['contactType']
  toID: number
  toMail: string
}
export const addTicket = async (form: AddTicketParams) => {
  const url = '/api/addTicket'
  const result = await axiosClient.post(url, form)
  const { data: req } = result
  if (req.msg === 'ok' && window.bridge) {
    await sendMail({
      receiver: form.toMail,
      subject: `sztunethelper(新工单):【${req.data.id}】【${form.type}】${form.title}`,
      text: `工单内容：\n${form.content}`
    })
  }

  return result
}
