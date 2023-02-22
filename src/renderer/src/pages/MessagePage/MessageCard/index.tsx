import React from 'react'
import { SmallScreen, SmallScreenProps, BaseLoading } from '@renderer/components'
import { TicketInfo } from '@renderer/api'

import MessageItem from '../MessageItem'

export interface MessageCardProps {
  screenProps?: SmallScreenProps
  messageList?: null | Partial<TicketInfo>[]
  sender: string | null
  onTop?: () => void
}

const MESSAGE_ID_PREFIX = 'message-'

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
              createTime: messageList[messageList.length - 1].createTime ?? Date.now()
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
