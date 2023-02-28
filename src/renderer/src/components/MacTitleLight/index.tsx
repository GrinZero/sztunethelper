import React from 'react'

import styles from './index.module.scss'

import type { ComponentProps } from '@renderer/types'
import { useWindowFocus, useWindowMaxify } from '@renderer/hooks'

const MacButtonGroup: React.FC<ComponentProps> = ({ className = '' }) => {
  const [isFocused] = useWindowFocus()
  const [isMaxify] = useWindowMaxify()

  const sendMessage = window?.bridge?.sendMessage ?? (() => {})

  const handleClose = () => sendMessage('titleBar', { type: 'close' })
  const handleMinify = () => sendMessage('titleBar', { type: 'minimize' })
  const handleMaxify = () => {
    sendMessage('titleBar', { type: 'maximize', data: !isMaxify })
  }

  const content = (
    <>
      <div className={styles['mac-button__close']} onClick={handleClose}>
        <svg className="icon hidden group-hover:flex">
          <use xlinkHref="#icon-cross"></use>
        </svg>
      </div>

      <div className={styles['mac-button__showify']} onClick={handleMinify}>
        <svg className="icon hidden group-hover:flex">
          <use xlinkHref="#icon-minus"></use>
        </svg>
      </div>
      <div className={styles['mac-button__sizeify']} onClick={handleMaxify}>
        <svg className="icon hidden group-hover:flex">
          <use xlinkHref={`#${isMaxify ? 'icon-minimize' : 'icon-maximize'}`}></use>
        </svg>
      </div>
    </>
  )
  return (
    <div
      className={`flex flex-row items-center group ${
        isFocused ? styles['mac-button__active'] : ''
      } ${styles['mac-button']} ${className}`}
    >
      {content}
    </div>
  )
}

export default MacButtonGroup
