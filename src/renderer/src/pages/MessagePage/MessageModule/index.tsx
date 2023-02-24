import React, { useEffect, useRef } from 'react'
import { Message } from '@arco-design/web-react'
import { MessageEditor, MessageEditorRef } from '@renderer/components'
import { useSelector } from 'react-redux'
import { CenterState } from '@renderer/store'
import {
  useTicketInfos,
  IMMessage,
  Ticket,
  useTicketSocket,
  TicketContent,
  sendTicketAttachments,
  Duty,
  SocketMessage,
  IMMessageCummunication
} from '@renderer/api'
import type { ComponentProps } from '@renderer/types'
import styles from './index.module.scss'

import MessageCard from '../MessageCard'
import { UploadItem } from '@arco-design/web-react/es/Upload'

export interface MessageModuleProps extends ComponentProps {
  type: 'socket' | 'mail' | 'image'
  currentTicket?: null | Ticket
  sender: string | null
  onStartChat?: (ticket: Ticket) => void
}
export interface SendingMessage extends IMMessage {
  index: number
}

const MessageModule: React.FC<MessageModuleProps> = ({
  className = '',
  currentTicket,
  sender,
  onStartChat
}) => {
  const editorRef = useRef<MessageEditorRef>(null)
  const [
    ticketInfos,
    nextInfos,
    { status: infoStatus },
    setTicketInfos,
    resetInfos,
    setInfosStatus
  ] = useTicketInfos()

  useEffect(() => {
    resetInfos()
    if (!currentTicket) {
      return
    }
    setTicketInfos([])
    nextInfos(currentTicket.id)
  }, [currentTicket?.id])

  const sendingList = useRef<SendingMessage[]>([])
  const handleReceive = ({ status, data }: IMMessageCummunication) => {
    switch (status) {
      case 'success':
        {
          const localID = (data as { localID: string | number }).localID
          const index = sendingList.current.findIndex((item) => item.id === localID)
          if ((ticketInfos?.length ?? 0) === 0) {
            setInfosStatus({ status: 'done' })
          }
          if (index === -1) {
            setTicketInfos((prev) => {
              return [data as TicketContent, ...prev]
            })
          } else {
            setTicketInfos((item) => {
              return item.map((subItem) => {
                if (subItem.id === localID) {
                  sendingList.current = sendingList.current.filter((item) => item.id !== localID)
                  return {
                    ...subItem,
                    ...(data as TicketContent)
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

  const [joinRoom, sendMsg] = useTicketSocket({
    onSend: ({ status, data }) => {
      switch (status) {
        case 'sending': {
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
              type: (data as IMMessage).type,
              id: (data as IMMessage).id
            }
            return [mockTicket as TicketContent, ...prev]
          })
          break
        }
        case 'error':
          Message.error('发送失败')
          break
      }
    },
    onReceive: handleReceive
  })

  useEffect(() => {
    if (!currentTicket) return
    joinRoom(currentTicket.id)
      .then((res) => {
        const result = res as SocketMessage
        const { uploadToken } = result.data
        sessionStorage.setItem('uploadToken', uploadToken as string)
        onStartChat?.(currentTicket)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [currentTicket])

  const { currentDuty } = useSelector((state: any) => state.center) as CenterState

  const screenStatus = (() => {
    if (ticketInfos?.length === 0) {
      return 'done'
    }
    if (infoStatus !== 'done' && currentTicket) {
      return 'ok'
    }
    return infoStatus
  })()

  const handleSumbit = async (msg: { type: IMMessage['type']; data: string | UploadItem[] }) => {
    const localID = Date.now() + Math.random()
    if (msg.type === 'text') {
      sendMsg({
        ...msg,
        id: localID
      } as IMMessage)
      return true
    }
    const { id, title, type } = currentTicket!
    const toMail = (currentDuty as Duty)!.mail
    const attachments = msg.data as UploadItem[]
    const options = { id, title, type, sender: sender!, attachments, toMail }
    const result = await sendTicketAttachments(options)
    const sendMsgTasks = result.map((item) => {
      const taskLocalID = Date.now() + Math.random()
      return sendMsg({
        ...msg,
        data: JSON.stringify(item),
        id: taskLocalID
      })
    })
    await Promise.all(sendMsgTasks)
    return true
  }
  const editorEle = (
    <MessageEditor
      className={`pt-3 h-[32%]`}
      onSend={handleSumbit}
      disable={!currentTicket}
      ref={editorRef}
    />
  )

  return (
    <div className={`${styles.container} h-full ${className}`}>
      <MessageCard
        screenProps={{
          h: '51vh',
          w: '100%',
          status: screenStatus
        }}
        messageList={ticketInfos as Partial<TicketContent>[] | null}
        sender={sender}
        onTop={() => nextInfos(currentTicket?.id)}
      />
      {editorEle}
    </div>
  )
}

export default MessageModule
