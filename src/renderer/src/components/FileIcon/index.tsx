import React from 'react'
import styles from './index.module.scss'
import { HTMLSpanProps } from '@renderer/types'

export interface FileIconProps extends HTMLSpanProps {
  fileName?: string
  type?: 'pdf' | 'doc' | 'ppt' | 'xls' | 'zip' | 'txt'
  showName?: boolean
}

export const FileIcon: React.FC<FileIconProps> = ({
  type,
  fileName,
  showName = false,
  className = '',
  children,
  ...rest
}) => {
  const fileType = type || fileName?.split('.').pop()
  const name = showName ? fileName : fileType?.toUpperCase()
  return (
    <span
      className={`flex relative items-center justify-center ${styles['file-type']} ${
        styles[`file-type-${fileType}`]
      } ${className}`}
      {...rest}
    >
      {children}
      {name}
    </span>
  )
}

export default FileIcon
