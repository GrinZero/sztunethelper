import { ComponentProps } from '@renderer/types'
import React from 'react'
import './index.scss'

interface BaseLineProps extends ComponentProps {
  layout?: 'horizontal' | 'vertical'
}

const BaseLine: React.FC<BaseLineProps> = ({ className = '', layout = 'horizontal' }) => {
  return <span className={`base-line base-line__${layout} ${className}`}></span>
}

export default BaseLine
