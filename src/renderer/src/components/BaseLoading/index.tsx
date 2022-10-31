import React from 'react'
import { ComponentProps } from '@renderer/types'
import './index.scss'

interface BaseLoadingProps extends ComponentProps {
  size?: 'small' | 'middle' | 'large'
}

const BaseLoading: React.FC<BaseLoadingProps> = ({ className = '', size = 'middle' }) => {
  return (
    <div className={`base-loading__spinner base-loading__${size} ${className}`}>
      <div className="base-loading__spinner-container base-loading__container1">
        <div className="base-loading__circle1"></div>
        <div className="base-loading__circle2"></div>
        <div className="base-loading__circle3"></div>
        <div className="base-loading__circle4"></div>
      </div>
      <div className="base-loading__spinner-container base-loading__container2">
        <div className="base-loading__circle1"></div>
        <div className="base-loading__circle2"></div>
        <div className="base-loading__circle3"></div>
        <div className="base-loading__circle4"></div>
      </div>
      <div className="base-loading__spinner-container base-loading__container3">
        <div className="base-loading__circle1"></div>
        <div className="base-loading__circle2"></div>
        <div className="base-loading__circle3"></div>
        <div className="base-loading__circle4"></div>
      </div>
    </div>
  )
}

export default BaseLoading
