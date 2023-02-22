import React from 'react'
import styles from './index.module.scss'
import { HTMLDivProps } from '@renderer/types'

export interface FileIconProps extends HTMLDivProps {
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
    <div
      className={`flex relative items-center justify-center ${styles['file-type']} ${
        styles[`file-type-${fileType}`]
      } ${className}`}
      {...rest}
    >
      {name}
      {children}
    </div>
  )
}

export default FileIcon
