import React from 'react'
import type { ComponentProps } from '@renderer/types'

import styles from './index.module.scss'

interface SmallScreenProps extends ComponentProps {
  w?: string | number
  h?: string | number
  emptyText?: string
  onBottom?: () => void
}

const SmallScreen: React.FC<SmallScreenProps> = ({
  w,
  h,
  onBottom,
  children,
  className = '',
  emptyText = '暂无数据'
}) => {
  const style = { width: w, height: h }
  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const { clientHeight, scrollHeight, scrollTop } = e.target as HTMLElement
    if (clientHeight + scrollTop === scrollHeight) {
      onBottom?.()
    }
  }

  if (!children) {
    return (
      <div style={style} className={`${styles.empty} ${className}`} onScroll={handleScroll}>
        {emptyText}
      </div>
    )
  }
  return (
    <div style={style} className={`${styles.container} ${className}`} onScroll={handleScroll}>
      {children}
    </div>
  )
}

export default SmallScreen
