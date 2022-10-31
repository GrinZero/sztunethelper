import React from 'react'
import type { BaseElementProps } from '../types'
import styles from './index.module.scss'

const Title: React.FC<BaseElementProps> = ({ className = '', children, ...rest }) => {
  return (
    <span className={`${styles['base-element__title']} ${className}`} {...rest}>
      {children}
    </span>
  )
}

export default Title
