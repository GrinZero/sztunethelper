import React from 'react'
import type { ComponentProps, DataStatus } from '@renderer/types'
import { debounce } from 'lodash-es'
import { BaseLoading, BaseEmpty } from '@renderer/components'

import styles from './index.module.scss'

interface SmallScreenProps extends ComponentProps {
  w?: string | number
  h?: string | number
  status?: DataStatus
  onBottom?: () => void
  overflow?: 'auto' | 'scroll'

  baseContainerClassName?: string
  scrollBottomPx?: number
  emptyNode?: React.ReactNode | null
  loadNode?: React.ReactNode | null
  nomoreNode?: React.ReactNode | null
}

const SCROLL_BAR_WIDTH = '8px'

const SmallScreen: React.FC<SmallScreenProps> = ({
  w,
  h,
  status = 'ok',
  onBottom,
  children,
  className = '',
  emptyNode = <BaseEmpty />,
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
  ),
  overflow = 'auto'
}) => {
  const style = { width: w, height: h }
  if (overflow === 'scroll') {
    style['overflowY'] = 'scroll'
  } else {
    style['overflow'] = 'auto'
  }
  const handleScroll: React.UIEventHandler<HTMLDivElement> = debounce((e) => {
    const { clientHeight, scrollHeight, scrollTop } = e.target as HTMLElement
    if (clientHeight + scrollTop + scrollBottomPx >= scrollHeight) {
      onBottom?.()
    }
  }, 200)

  const renderBaseContaienr = (child: React.ReactNode, moreClassName = '') => {
    if (overflow === 'scroll') {
      style['width'] = `calc(${typeof w === 'number' ? w + 'px' : w} - ${SCROLL_BAR_WIDTH})`
    }
    return (
      <div
        style={style}
        className={`${styles['base-container']} ${baseContainerClassName} ${moreClassName} ${className}`}
      >
        {child}
      </div>
    )
  }

  if (status === 'loading' && !children) return renderBaseContaienr(loadNode)
  if (status === 'empty' || !children) return renderBaseContaienr(emptyNode, styles['empty'])

  return (
    <div style={style} className={`${styles.container} ${className}`} onScroll={handleScroll}>
      {children}
      {status !== 'done' ? loadNode : nomoreNode}
    </div>
  )
}

export default SmallScreen
