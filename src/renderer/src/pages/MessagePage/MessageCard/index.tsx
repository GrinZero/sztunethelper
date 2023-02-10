import React from 'react'
import { ComponentProps } from '@renderer/types'
import { SmallScreen, MessageEditor } from '@renderer/components'
import styles from './index.module.scss'

interface MessageCardProps extends ComponentProps {
  type: 'socket' | 'mail' | 'image'
}

const MessageCard: React.FC<MessageCardProps> = ({ className = '' }) => {
  const handleSumbit = (content: string) => {
    console.log(content)
  }

  return (
    <div className={`${styles.container} h-full ${className}`}>
      <SmallScreen h={'70%'} />
      <MessageEditor className={`pt-3 h-[30%]`} onSubmit={handleSumbit} />
    </div>
  )
}

export default MessageCard
