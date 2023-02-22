import { HTMLAnchorProps } from '@renderer/types'
import React from 'react'
import styles from './index.module.scss'

export interface DownLoadProps extends HTMLAnchorProps {
  children?: React.ReactNode
  url: string
  visible: boolean
  fileName: string
}
const DownLoad: React.FC<DownLoadProps> = ({
  className = '',
  children,
  url,
  visible,
  fileName,
  ...rest
}) => {
  return (
    <a
      href={url}
      download={fileName}
      className={`${visible ? '' : styles['invisible']} ${className}`}
      target="_blank"
      rel="noreferrer"
      {...rest}
    >
      {children}
    </a>
  )
}

export default DownLoad
