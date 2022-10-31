import React from 'react'

import './index.scss'
import type { ComponentProps } from '@renderer/types'

export interface BaseListProps extends ComponentProps {
  children?: React.ReactNode
  autoHeight?: boolean
  theme?: 'normal' | 'primary'
}

const BaseList: React.FC<BaseListProps> = ({
  className = '',
  children,
  autoHeight,
  theme = 'normal'
}) => {
  const childList = Array.isArray(children) ? children : [...(children ? [children] : [])]
  return (
    <div className={`flex flex-col rounded-xl base-list ${`base-list__${theme}`} ${className}`}>
      {childList.map((item, index) => (
        <div
          className={`flex flex-row items-center base-list__item ${
            autoHeight ? 'h-[inherit]' : ''
          }`}
          key={item.key ?? `default-${index}`}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

export default BaseList
