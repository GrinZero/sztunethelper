import React from 'react'
import type { ComponentProps, DataStatus } from '@renderer/types'
import { debounce } from 'lodash-es'
import { BaseLoading } from '@renderer/components'

import styles from './index.module.scss'

interface SmallScreenProps extends ComponentProps {
  w?: string | number
  h?: string | number
  status?: DataStatus
  onBottom?: () => void
  baseContainerClassName?: string
  scrollBottomPx?: number
  emptyNode?: React.ReactNode | null
  loadNode?: React.ReactNode | null
  nomoreNode?: React.ReactNode | null
}

const SmallScreen: React.FC<SmallScreenProps> = ({
  w,
  h,
  status = 'ok',
  onBottom,
  children,
  className = '',
  emptyNode = '暂无数据',
  scrollBottomPx = 50,
  baseContainerClassName = '',
  loadNode = (
    <div className="w-full flex justify-center items-center h-[50px]">
      <BaseLoading size="large" />
    </div>
  ),
  nomoreNode = (
    <div className="w-full flex justify-center items-center h-[24px]">
      <span className="text-[12px] text-gray-400">没有更多了</span>
    </div>
  )
}) => {
  const style = { width: w, height: h }
  const handleScroll: React.UIEventHandler<HTMLDivElement> = debounce((e) => {
    const { clientHeight, scrollHeight, scrollTop } = e.target as HTMLElement
    if (clientHeight + scrollTop + scrollBottomPx >= scrollHeight) {
      onBottom?.()
    }
  }, 200)

  if (status === 'loading' && !children)
    return (
      <div
        style={style}
        className={`${styles['base-container']} %{baseContainerClassName} ${className}`}
      >
        {loadNode}
      </div>
    )

  if (status === 'empty' || !children) {
    return (
      <div
        style={style}
        className={`${styles['base-container']} ${baseContainerClassName} ${styles.empty} ${className}`}
      >
        {emptyNode}
      </div>
    )
  }

  return (
    <div style={style} className={`${styles.container} ${className}`} onScroll={handleScroll}>
      {children}
      {status !== 'done' ? loadNode : nomoreNode}
    </div>
  )
}

export default SmallScreen
