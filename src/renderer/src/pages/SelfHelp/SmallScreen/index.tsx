import React from 'react'
import type { ComponentProps } from '@renderer/types'

import styles from './index.module.scss'

interface SmallScreenProps extends ComponentProps {
  w?: string | number
  h?: string | number
  emptyText?: string
}

const SmallScreen: React.FC<SmallScreenProps> = ({
  w,
  h,
  children,
  className = '',
  emptyText = '暂无数据'
}) => {
  const style = { width: w, height: h }
  if (!children) {
    return (
      <div style={style} className={`${styles.empty} ${className}`}>
        {emptyText}
      </div>
    )
  }
  return (
    <div style={style} className={`${styles.container} ${className}`}>
      {children}
    </div>
  )
}

export default SmallScreen
