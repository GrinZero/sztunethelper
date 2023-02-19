import React from 'react'
import { SmallScreen, MessageEditor } from '@renderer/components'
import type { IMMessage } from '@renderer/api'
import type { ComponentProps } from '@renderer/types'
import styles from './index.module.scss'

interface MessageCardProps extends ComponentProps {
  type: 'socket' | 'mail' | 'image'
  onSend?: (msg: IMMessage) => Promise<void> | void
}

const MessageCard: React.FC<MessageCardProps> = ({ className = '', onSend }) => {
  const handleSumbit = (content: IMMessage) => onSend?.(content)

  return (
    <div className={`${styles.container} h-full ${className}`}>
      <SmallScreen h={'70%'} />
      <MessageEditor className={`pt-3 h-[30%]`} onSend={handleSumbit} />
    </div>
  )
}

export default MessageCard
