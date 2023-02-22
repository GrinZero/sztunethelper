import React from 'react'
import { BaseCard, BaseButton } from '@renderer/components'
import { IconUser } from '@arco-design/web-react/icon'
import { Tag } from '@arco-design/web-react'
import { ComponentProps } from '@renderer/types'
import type { TicketListItem } from '@renderer/api'

import { ContactTypeStore } from '../constants'

import styles from './index.module.scss'

export interface MessageHeaderProps extends ComponentProps {
  ticket: TicketListItem
  avatar: string | null
  onClose?: () => void
  disabled?: boolean
}

const MessageHeader: React.FC<MessageHeaderProps> = ({
  className = '',
  ticket,
  onClose,
  disabled = false
}) => {
  const { contactType, other, title, id } = ticket
  return (
    <BaseCard title={null} scale="1" border={false} className={`${className}`}>
      <div className={`w-full flex flex-row items-center justify-between`}>
        <div className="flex flex-row items-center">
          <div className={`w-8 h-8 rounded-[50%] mr-2 ${styles.img}`}>
            <IconUser />
          </div>
          <div className={`mr-2`}>
            <div className={`font-bold flex flex-row items-center`}>
              <span className="select-text">{other}</span>
              <Tag
                className={'ml-1'}
                bordered
                size="small"
                color={ContactTypeStore[contactType ?? 'other'][1]}
              >
                {ContactTypeStore[contactType ?? 'other'][0]}
              </Tag>
            </div>
            <div className={'opacity-60 select-text'}>{`【${id}】${title}`}</div>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <BaseButton disabled={disabled} theme="danger" size="middle" onClick={onClose}>
            关闭工单
          </BaseButton>
        </div>
      </div>
    </BaseCard>
  )
}

export default MessageHeader
