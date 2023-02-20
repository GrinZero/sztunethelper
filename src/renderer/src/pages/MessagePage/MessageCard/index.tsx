import React from 'react'
import { SmallScreen, SmallScreenProps, BaseLoading } from '@renderer/components'
import { TicketInfo } from '@renderer/api'
import { formatSendTime } from '@renderer/utils'

import styles from './index.module.scss'
import { HTMLDivProps } from '@renderer/types'

export interface MessageCardProps {
  screenProps?: SmallScreenProps
  messageList?: null | Partial<TicketInfo>[]
  sender: string | null
  onTop?: () => void
}

const MESSAGE_ID_PREFIX = 'message-'

export interface MessageItemProps extends HTMLDivProps {
  data: Partial<TicketInfo>
  sender: string | null
}

const MessageItem: React.FC<MessageItemProps> = ({ data, sender, className = '', ...rest }) => {
  const { type, content, sender: dataSender, createTime } = data
  if (type === 'text') {
    return (
      <div
        className={`w-full mt-2 flex ${
          dataSender === sender ? styles.sender : styles.receiver
        } ${className}`}
        {...rest}
      >
        <span className={`${styles.message}`}>{content}</span>
      </div>
    )
  }

  if (type === 'time') {
    return (
      <div className={`w-full my-4 flex justify-center text-xs ${className}`} {...rest}>
        <span className={`${styles.time}`}>{formatSendTime(createTime!)}</span>
      </div>
    )
  }

  return null
}

const MessageCard: React.FC<MessageCardProps> = ({
  screenProps = {},
  messageList,
  sender,
  onTop
}) => {
  const ele = !messageList
    ? null
    : messageList.map((item) => {
        return (
          <MessageItem
            data={item}
            sender={sender}
            key={item.id}
            id={`${MESSAGE_ID_PREFIX}${item.id}`}
          />
        )
      })

  return (
    <SmallScreen
      className={'flex flex-col-reverse'}
      overflow="scroll"
      onTop={onTop}
      nomoreNode={
        // 用时间类型的消息作为最开始的节点
        messageList && messageList[messageList.length - 1] ? (
          <MessageItem
            data={{
              type: 'time',
              createTime: messageList[messageList.length - 1].createTime
            }}
            sender={sender}
          />
        ) : null
      }
      {...(messageList && messageList.length === 0
        ? {
            loadNode: (
              <div className="w-full h-full flex justify-center items-center">
                <BaseLoading size="large" />
              </div>
            )
          }
        : {})}
      {...screenProps}
    >
      {ele}
    </SmallScreen>
  )
}

export default MessageCard
