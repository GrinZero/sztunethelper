import React from 'react'
import type { ComponentProps } from '@renderer/types'

export interface TicketCardProps extends ComponentProps {
  to: string
  from: string
  title: string
  type: string
}

const TicketCard: React.FC<TicketCardProps> = ({ className = '', to, from, title, type }) => {
  return (
    <div className={`${className}`}>
      <div>{to}</div>
      <div>{from}</div>
      <div>{title}</div>
      <div>{type}</div>
    </div>
  )
}

export default TicketCard
