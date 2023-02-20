import React from 'react'
import { SmallScreen, SmallScreenProps } from '@renderer/components'
import { TicketContent } from '@renderer/api'

import styles from './index.module.scss'

export interface MessageCardProps {
  screenProps?: SmallScreenProps
  messageList?: null | Partial<TicketContent>[]
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
          <div
            className={`w-full mt-2 flex ${
              item.sender === sender ? styles.sender : styles.receiver
            }`}
            key={item.id}
            id={`${MESSAGE_ID_PREFIX}${item.id}`}
          >
            <span className={`${styles.message}`}>{item.content}</span>
          </div>
        )
      })

  return (
    <SmallScreen
      className={'flex flex-col-reverse'}
      overflow="scroll"
      onTop={onTop}
      {...screenProps}
    >
      {ele}
    </SmallScreen>
  )
}

export default MessageCard
