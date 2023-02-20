import React, { useEffect, useRef } from 'react'
import { Message } from '@arco-design/web-react'
import { MessageEditor } from '@renderer/components'
import { useTicketInfos, IMMessage, Ticket, useTicketSocket, TicketContent } from '@renderer/api'
import type { ComponentProps } from '@renderer/types'
import styles from './index.module.scss'

import MessageCard from '../MessageCard'

export interface MessageModuleProps extends ComponentProps {
  type: 'socket' | 'mail' | 'image'
  currentTicket?: null | Ticket
  sender: string | null
}
export interface SendingMessage extends IMMessage {
  index: number
}

const MessageModule: React.FC<MessageModuleProps> = ({ className = '', currentTicket, sender }) => {
  const [ticketInfos, nextInfos, { status: infoStatus }, setTicketInfos, resetInfos] =
    useTicketInfos()

  useEffect(() => {
    if (!currentTicket) return
    resetInfos()
    nextInfos(currentTicket.id)
  }, [currentTicket?.id])

  const sendingList = useRef<SendingMessage[]>([])
  const [joinRoom, sendMsg] = useTicketSocket({
    onSend: ({ status, data }) => {
      switch (status) {
        case 'sending':
          setTicketInfos((prev) => {
            sendingList.current.push({
              ...(data as IMMessage),
              index: prev.length
            })
            const mockTicket = {
              status: 0,
              ticketID: currentTicket?.id,
              sender: sender,
              content: (data as IMMessage).data,
              type: (data as IMMessage).type
            }
            return [mockTicket as TicketContent, ...prev]
          })
          break
        case 'error':
          Message.error('发送失败')
          break
      }
    },
    onReceive: ({ status, data }) => {
      switch (status) {
        case 'success':
          {
            const localID = (data as { localID: string | number }).localID
            const index = sendingList.current.findIndex((item) => item.id === localID)
            if (index === -1) {
              setTicketInfos((prev) => {
                return [data as TicketContent, ...prev]
              })
            } else {
              setTicketInfos((item) => {
                return item.map((subItem) => {
                  if (subItem.id === localID) {
                    return {
                      ...subItem,
                      id: (data as { id: number }).id
                    }
                  }
                  return subItem
                })
              })
            }
          }
          break
        case 'error':
          Message.error('接收失败')
          break
      }
    }
  })

  useEffect(() => {
    if (!currentTicket) return
    joinRoom(currentTicket.id)
  }, [currentTicket])

  const handleSumbit = (msg: IMMessage) => {
    const localID = Date.now() + Math.random()
    sendMsg({
      ...msg,
      id: localID
    })
  }

  return (
    <div className={`${styles.container} h-full ${className}`}>
      <MessageCard
        screenProps={{
          h: '53vh',
          w: '100%',
          status: infoStatus !== 'done' ? (currentTicket ? 'ok' : infoStatus) : infoStatus
        }}
        messageList={ticketInfos as Partial<TicketContent>[]}
        sender={sender}
        onTop={() => nextInfos(currentTicket?.id)}
      />
      <MessageEditor className={`pt-3 h-[30%]`} onSend={handleSumbit} />
    </div>
  )
}

export default MessageModule
