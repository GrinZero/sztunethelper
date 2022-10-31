import React from 'react'
import styles from './index.module.scss'
import type { ComponentProps } from '@renderer/types'

interface MenuItemProps extends ComponentProps {
  children: React.ReactNode
  active?: boolean
  [x: string]: unknown
}

const MenuItem: React.FC<MenuItemProps> = ({
  className = '',
  children,
  active = false,
  ...rest
}) => {
  return (
    <div
      className={`${styles['menu-item']} ${active ? styles['menu-item__active'] : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

export default MenuItem
