import React, { useMemo } from 'react'
import { IconLoading, IconObliqueLine } from '@arco-design/web-react/icon'

import styles from './index.module.scss'
import type { ComponentProps } from '@renderer/types'

export interface StatusIconProps extends ComponentProps {
  type: 'success' | 'normal' | 'fail' | 'loading' | 'init'
}

const StatusIcon: React.FC<StatusIconProps> = ({ type, className = '' }) => {
  const icon = useMemo(() => {
    switch (type) {
      case 'success':
        return (
          <use xlinkHref="#icon-zhengque" className={`${styles['status-icon__success']}`}></use>
        )
      case 'fail':
        return <use xlinkHref="#icon-cuowu" className={`${styles['status-icon__fail']}`}></use>
      case 'loading':
        return <IconLoading className={`${className}`} />
      case 'init':
        return <IconObliqueLine className={`${className}`} />
      default:
        return null
    }
  }, [type])

  return ['loading', 'init'].includes(type) ? (
    icon
  ) : (
    <svg className={`icon ${className}`} aria-hidden="true">
      {icon}
    </svg>
  )
}

export default StatusIcon
