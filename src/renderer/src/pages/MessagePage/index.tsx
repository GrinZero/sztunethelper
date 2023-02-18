import { Fragment, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useMailStorage, useDrawer } from '@renderer/hooks'
import { SmallScreen } from '@renderer/components'
import {
  useTicketList,
  useCurrentDuty,
  Ticket,
  Duty,
  AddTicketParams,
  addTicket,
  readTicket
} from '@renderer/api'
import { Message } from '@arco-design/web-react'

import TicketCard from './TicketCard'
import MailCard from './MailCard'
import HeaderCard from './HeaderCard'
import MessageCard from './MessageCard'
import ConsultForm from './ConsultForm'

import styles from './index.module.scss'

const MessagePage = () => {
  const history = useHistory()
  const duty = useCurrentDuty()
  const mailConfig = useMailStorage()
  const [list, next, { status }, setTickList] = useTicketList()

  const addConsultFormRef = useRef<Partial<AddTicketParams>>({})
  const handleAddConsultSubmit = async () => {
    const { title, type, content } = addConsultFormRef.current
    if (!title || !type || !content) {
      Message.error('请填写完整信息')
      return false
    }
    if (!duty) {
      Message.error('值班人员未在线呢～')
      return false
    }
    addConsultFormRef.current = {
      ...addConsultFormRef.current,
      contactType: duty.contactType,
      toID: duty.id
    }

    const result = await addTicket(addConsultFormRef.current as AddTicketParams).catch((err) => {
      Message.error(err.message)
    })
    if (!result) return false

    const { data: req } = result
    if (req.msg !== 'ok') {
      Message.error(req.msg)
      return false
    }

    setTickList((prev) => {
      const mockData = {
        ...req.data,
        title,
        type,
        contactType: duty.contactType
      }
      return [[mockData], ...prev]
    })

    return true
  }

  const [drawer, setDrawer] = useDrawer({
    title: '发起咨询',
    placement: 'bottom',
    height: '75vh',
    maskClosable: false,
    children: (
      <ConsultForm
        options={[
          {
            label: '网络问题',
            value: '网络问题'
          }
        ]}
        onChange={(values) =>
          (addConsultFormRef.current = {
            ...addConsultFormRef.current,
            ...values
          })
        }
      />
    ),
    onOk: handleAddConsultSubmit
  })

  const handleMailCardClick = () => history.push('mail_config')
  const handleTicketCardClick = (ticket: Ticket) => {
    !ticket.read &&
      readTicket(ticket.id)
        .then((res) => {
          const { data } = res
          if (data.msg === 'ok') {
            setTickList((prev) => {
              const newList = prev.map((page) =>
                page.map((item) => {
                  if (item.id === ticket.id) {
                    return {
                      ...item,
                      read: true
                    }
                  }
                  return item
                })
              )
              return newList
            })
          }
        })
        .catch((err) => {
          console.error(err)
        })
  }
  const handleConsultClick = (duty?: Duty | null) => {
    if (!duty) return
    setDrawer(true)
  }

  const ele =
    list.length === 0
      ? null
      : list.map((page, index) => (
          <Fragment key={index}>
            {page.map((ticket) => (
              <TicketCard
                key={ticket.id}
                className="mb-3 whitespace-pre mr-1"
                ticket={ticket}
                onClick={handleTicketCardClick}
              />
            ))}
          </Fragment>
        ))

  return (
    <div className={`${styles.container} main`}>
      <div className={`w-[300px] flex flex-col h-full flex-shrink-0`}>
        <div className="flex-row mb-3">
          <MailCard
            className={`w-[255px] max-w-[255px]`}
            mail={mailConfig?.mail ?? null}
            onClick={handleMailCardClick}
          />
        </div>
        <SmallScreen w={300} onBottom={next} status={status} overflow="scroll">
          {ele}
        </SmallScreen>
      </div>
      <div className={`w-full flex flex-col ml-1`}>
        <HeaderCard data={duty} onClick={handleConsultClick} />
        <MessageCard className={`mt-3`} type="mail" />
      </div>
      {drawer}
    </div>
  )
}

export default MessagePage
