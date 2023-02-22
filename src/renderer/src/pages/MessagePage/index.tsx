import { Fragment, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMailStorage, useDrawer } from '@renderer/hooks'
import { SmallScreen } from '@renderer/components'
import {
  useTicketList,
  useCurrentDuty,
  TicketListItem,
  Duty,
  AddTicketParams,
  addTicket,
  readTicket
} from '@renderer/api'
import { Message } from '@arco-design/web-react'

import TicketCard from './TicketCard'
import MailCard from './MailCard'
import HeaderCard from './HeaderCard'
import MessageHeader from './MessageHeader'
import MessageModule from './MessageModule'
import ConsultForm from './ConsultForm'

import styles from './index.module.scss'

const MessagePage = () => {
  const history = useHistory()
  const duty = useCurrentDuty()
  const mailConfig = useMailStorage()
  const [list, next, { status }, setTickList] = useTicketList()

  const [currentTicket, setCurrentTicket] = useState<TicketListItem | null>(null)

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
      toID: duty.id,
      toMail: duty.mail
    }

    const result = await addTicket(addConsultFormRef.current as AddTicketParams).catch((err) => {
      Message.error(err.message)
      console.error(err)
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
      setTimeout(() => {
        setCurrentTicket(mockData)
      }, 500)
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
  const handleTicketCardClick = (ticket: TicketListItem) => {
    if (ticket.id === currentTicket?.id) return
    setCurrentTicket(ticket)

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

  const headerEle = currentTicket ? (
    <MessageHeader className={styles['header-card']} ticket={currentTicket} avatar={null} />
  ) : (
    <HeaderCard className={styles['header-card']} data={duty} onClick={handleConsultClick} />
  )

  const ele =
    !list || list.length === 0
      ? null
      : list.map((page, index) => (
          <Fragment key={index}>
            {(page as TicketListItem[]).map((ticket) => (
              <TicketCard
                key={ticket.id}
                className={`mb-3 whitespace-pre mr-1 ${
                  currentTicket?.id === ticket.id ? styles.active : ''
                }`}
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
      <div className={`w-full flex flex-col ml-1 flex-1 ${styles['right-box']}`}>
        {headerEle}
        <MessageModule
          type="mail"
          currentTicket={currentTicket}
          sender={mailConfig?.mail ?? null}
        />
      </div>
      {drawer}
    </div>
  )
}

export default MessagePage
