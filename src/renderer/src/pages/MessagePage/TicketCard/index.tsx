import React from 'react'
import type { ComponentProps } from '@renderer/types'
import { Tag, Popconfirm } from '@arco-design/web-react'
import { TicketStatus, TicketListItem } from '@renderer/api'
import { formatUsefulTime } from '@renderer/utils'
import { IconClose } from '@arco-design/web-react/icon'

import styles from './index.module.scss'

export interface TicketCardProps extends ComponentProps {
  ticket: TicketListItem
  onDelete?: (val: TicketListItem) => void
  onClick?: (val: TicketListItem) => void
}

const tagStore = {
  网络问题: 'red'
}
const statusStore = {
  [TicketStatus.open]: styles['open'],
  [TicketStatus.close]: styles['close'],
  [TicketStatus.delete]: styles['delete']
}

const TicketCard: React.FC<TicketCardProps> = ({ className = '', ticket, onDelete, onClick }) => {
  const { title, type, other, createTime, status, read, adminName } = ticket
  const nameFirst = (adminName[0] ?? '-').toUpperCase()

  return (
    <div
      className={`${styles['container']} ${statusStore[status]} group cursor-pointer ${className}`}
      onClick={() => {
        onClick?.(ticket)
      }}
    >
      <div className="flex flex-row items-center mb-2 overflow-hidden">
        <div className={`${styles['name']} mr-2 flex-shrink-0`}>{nameFirst}</div>
        <div className={`flex flex-col ${styles['header']}`}>
          <div className={`w-[78%] overflow-hidden text-ellipsis`}>{title}</div>
          <span>{other}</span>
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
        {status === TicketStatus.close && <span>已关闭</span>}
        <div className="flex flex-row items-center">
          {!read && <span className={`${styles.new}`}>New</span>}
          <span className="ml-2 opacity-70">{formatUsefulTime(createTime)}</span>
        </div>
      </div>
      <Popconfirm
        title="你确认要删除工单么？"
        onOk={() => {
          onDelete?.(ticket)
        }}
        position="right"
      >
        <div
          className={`absolute hidden opacity-70 hover:opacity-100 ${
            status === TicketStatus.close ? 'group-hover:flex' : ''
          }  items-center justify-center ${styles['icon-close']}`}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <IconClose />
        </div>
      </Popconfirm>
    </div>
  )
}

export default TicketCard
