import React from 'react'
import { ComponentProps } from '@renderer/types'
import { SmallScreen } from '@renderer/components'
import styles from './index.module.scss'

interface MessageCardProps extends ComponentProps {
  type: 'socket' | 'mail' | 'image'
}

const MessageCard: React.FC<MessageCardProps> = ({ className = '' }) => {
  return (
    <div className={`${styles.container} h-full ${className}`}>
      <SmallScreen h={'70%'} />
      <SmallScreen className={`mt-3`} h={'27%'} />
    </div>
  )
}

export default MessageCard
