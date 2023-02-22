import { Fragment, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMailStorage, useDrawer } from '@renderer/hooks'
import { SmallScreen } from '@renderer/components'
import {
  useTicketList,
  useCurrentDuty,
  TicketListItem,
  AddTicketParams,
  addTicket,
  readTicket,
  closeTicket,
  deleteTicket,
  TicketStatus
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
    if (ticket.id === currentTicket?.id) {
      setCurrentTicket(null)
      return
    }
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
          } else {
            Message.error(data?.msg ?? 'unknown: read ticket error')
          }
        })
        .catch((err) => {
          console.error(err)
        })
  }
  const handleConsultClick = () => setDrawer(true)
  const handleCloseTicket = async () => {
    if (!currentTicket || currentTicket.status === TicketStatus.close) return
    closeTicket(currentTicket.id)
      .then((res) => {
        const { data } = res
        if (data.msg === 'ok') {
          setTickList((prev) => {
            const newList = prev.map((page) =>
              page.map((item) => {
                if (item.id === currentTicket?.id) {
                  return {
                    ...item,
                    status: TicketStatus.close
                  }
                }
                return item
              })
            )
            return newList
          })
          setCurrentTicket(null)
        } else if (data.state < 0) {
          Message.error(data.msg)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
  const handleDeleteTicket = async (ticket) => {
    if (!ticket || ticket.status === TicketStatus.delete) return
    deleteTicket(ticket.id)
      .then((res) => {
        const { data } = res
        if (data.msg === 'ok') {
          setTickList((prev) => {
            const newList = prev.map((page) => page.filter((item) => item.id !== ticket?.id))
            return newList
          })
          setCurrentTicket(null)
        } else if (data.state < 0) {
          Message.error(data.msg)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const headerEle = currentTicket ? (
    <MessageHeader
      className={styles['header-card']}
      ticket={currentTicket}
      avatar={null}
      onClose={handleCloseTicket}
      disabled={currentTicket.status === TicketStatus.close}
    />
  ) : (
    <HeaderCard
      className={styles['header-card']}
      data={duty}
      onClick={handleConsultClick}
      disabled={!duty}
    />
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
                onDelete={handleDeleteTicket}
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
