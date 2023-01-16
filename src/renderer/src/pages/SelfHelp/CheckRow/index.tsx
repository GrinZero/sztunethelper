import React from 'react'
import type { ComponentProps } from '@renderer/types'
import type { StatusIconProps } from '@renderer/components'
import { IconRightCircle } from '@arco-design/web-react/icon'

interface CheckRowProps extends ComponentProps, StatusIconProps {
  onClick?: (...rest: any[]) => void
  onGo?: (...rest: any[]) => void
}

import { StatusIcon } from '@renderer/components'

const CheckRow: React.FC<CheckRowProps> = ({ children, className = '', type, onClick, onGo }) => {
  return (
    <div
      className={`flex items-center justify-between relative p-3 w-full cursor-pointer ${
        type === 'success' ? 'group' : ''
      } ${className}`}
      onClick={() => onClick?.(children)}
    >
      <span>{children}</span>
      <StatusIcon type={type} />
      <i
        className="p-2 absolute right-8 opacity-0 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation()
          onGo?.(children)
        }}
      >
        <IconRightCircle />
      </i>
    </div>
  )
}

export default CheckRow
