import React from 'react'
import { FileIcon, DownLoad } from '@renderer/components'
import { TicketInfo } from '@renderer/api'
import { HTMLDivProps } from '@renderer/types'
import { formatSendTime, jsonParse } from '@renderer/utils'
import { Image } from '@arco-design/web-react'

import styles from './index.module.scss'

export interface MessageItemProps extends HTMLDivProps {
  data: Partial<TicketInfo>
  sender: string | null
}

const MaxImageWidth = 200
const MaxImageHeight = 600
const getImageSize = (width: number, height: number) => {
  let w = width
  let h = height
  if (width > MaxImageWidth) {
    w = MaxImageWidth
    h = (height * MaxImageWidth) / width
  }
  if (h > MaxImageHeight) {
    h = MaxImageHeight
    w = (width * MaxImageHeight) / height
  }
  return {
    width: w,
    height: h
  }
}

const MessageItem: React.FC<MessageItemProps> = ({ data, sender, className = '', ...rest }) => {
  const { type, content, sender: dataSender, createTime } = data
  const renderContent = (child: React.ReactNode, _className = '') => {
    return (
      <div
        className={`w-full mt-2 flex animate__animated animate__fadeIn ${
          styles['message-container']
        } ${dataSender === sender ? styles.sender : styles.receiver} ${_className} ${className}`}
        {...rest}
      >
        {child}
      </div>
    )
  }

  if (type === 'text') {
    return renderContent(<span className={`select-text ${styles.message}`}>{content}</span>)
  }

  if (type === 'time') {
    return (
      <div className={`w-full my-4 flex justify-center text-xs ${className}`} {...rest}>
        <span className={`${styles.time}`}>{formatSendTime(createTime!)}</span>
      </div>
    )
  }

  const result = jsonParse(content as string)
  if (type === 'image') {
    const src = result?.url ?? content
    const styleProps = result?.w ? getImageSize(result.w, result.h) : {}
    return renderContent(<Image className={styles.image} src={src} alt="image" {...styleProps} />)
  }

  if (type === 'file') {
    return renderContent(
      <FileIcon
        showName={true}
        className={`select-text whitespace-nowrap mr-[3px] ${styles['file-item']}`}
        fileName={result?.filename ?? content}
      >
        <DownLoad
          url={result?.url ?? content}
          fileName={result?.filename ?? content}
          visible={false}
        />
      </FileIcon>
    )
  }

  return null
}

export default MessageItem
