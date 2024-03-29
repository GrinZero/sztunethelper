import React from 'react'

import BaseLoading from '../BaseLoading'

import './index.scss'
import type { HTMLButtonProps } from '@renderer/types'

export interface BaseButtonProps extends HTMLButtonProps {
  children?: React.ReactNode
  theme?: 'normal' | 'primary' | 'danger' | 'transparent'
  size?: 'small' | 'middle' | 'large'
  round?: 'round' | 'square' | 'circle' | 'none'
  status?: 'normal' | 'loading'
  color?: string
}

const BaseButton: React.FC<BaseButtonProps> = ({
  theme = 'primary',
  round = 'round',
  size = 'small',
  status = 'normal',
  className = '',
  color,
  children,
  ...rest
}) => {
  return (
    <button
      className={`flex base-button ${`base-button__${theme}`} ${`base-button__${round}`} ${`base-button__${size}`} ${className}`}
      style={{ '--base-color': color } as any}
      {...rest}
    >
      {status === 'loading' ? <BaseLoading size={size} /> : children}
    </button>
  )
}

export default BaseButton
