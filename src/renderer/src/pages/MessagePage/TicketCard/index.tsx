import React from 'react'
import type { ComponentProps } from '@renderer/types'
import { Tag } from '@arco-design/web-react'
import { TicketStatus, Ticket } from '@renderer/api'
import { formatUsefulTime } from '@renderer/utils'

import styles from './index.module.scss'

export interface TicketCardProps extends ComponentProps {
  ticket: Ticket
}

const tagStore = {
  网络问题: 'red'
}
const statusStore = {
  [TicketStatus.open]: styles['open'],
  [TicketStatus.close]: styles['close'],
  [TicketStatus.delete]: styles['delete']
}

const TicketCard: React.FC<TicketCardProps> = ({
  className = '',
  ticket: { title, type, to, createTime, status, read, adminName }
}) => {
  const nameFirst = (adminName[0] ?? '-').toUpperCase()
  return (
    <div className={`${styles['container']} ${statusStore[status]} cursor-pointer ${className}`}>
      <div className="flex flex-row items-center mb-2">
        <div className={`${styles['name']} mr-2`}>{nameFirst}</div>
        <div className={`flex flex-col ${styles['header']}`}>
          <div>{title}</div>
          <span>{to}</span>
        </div>
      </div>
      <div className="flex flex-row items-center w-full justify-between font-mono text-xs opacity-85">
        <Tag
          bordered
          className={`mr-2 ${styles['tag']}`}
          color={tagStore[type] || 'blue'}
          size={'small'}
        >
          {type}
        </Tag>
        <div className="flex flex-row items-center">
          {!read && <span className={`${styles.new}`}>New</span>}
          <span className="ml-2 opacity-70">{formatUsefulTime(createTime)}</span>
        </div>
      </div>
    </div>
  )
}

export default TicketCard
