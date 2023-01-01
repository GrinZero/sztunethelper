import React from 'react'
import type { ComponentProps } from '@renderer/types'
import type { StatusIconProps } from '@renderer/components'

interface CheckRowProps extends ComponentProps, StatusIconProps {
  onClick?: (...rest: any[]) => void
}

import { StatusIcon } from '@renderer/components'

const CheckRow: React.FC<CheckRowProps> = ({ children, className = '', type, onClick }) => {
  return (
    <div
      className={`flex items-center justify-between p-3 w-full cursor-pointer ${className}`}
      onClick={() => onClick?.(children)}
    >
      <span>{children}</span>
      <StatusIcon type={type} />
    </div>
  )
}

export default CheckRow
