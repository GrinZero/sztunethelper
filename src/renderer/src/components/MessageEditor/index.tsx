import React, { useState, useRef } from 'react'
import { Input, Upload, Image } from '@arco-design/web-react'
import type { UploadItem } from '@arco-design/web-react/es/Upload/interface'
import type { RefInputType } from '@arco-design/web-react/es/Input/interface'
import { IconClose } from '@arco-design/web-react/icon'

const { TextArea } = Input

import { BaseButton, FileIcon } from '@renderer/components'
import type { ComponentProps } from '@renderer/types'
import type { IMMessage } from '@renderer/api'

import styles from './index.module.scss'

export interface MessageEditorProps extends ComponentProps {
  disable?: boolean
  enterType?: 'ctrlEnter'
  //TODO:'enter'下次再做
  onSend?: (msg: { type: IMMessage['type']; data: string | UploadItem[] }) => Promise<void> | void
}

export const MessageEditor: React.FC<MessageEditorProps> = ({
  className = '',
  disable = false,
  onSend,
  enterType = 'ctrlEnter'
}) => {
  const valueRef = useRef('')
  const textAreaRef = useRef<RefInputType>(null)

  const [imageList, setImageList] = useState<UploadItem[]>([])
  const [fileList, setFileList] = useState<UploadItem[]>([])

  const imageEle =
    imageList.length === 0 ? null : (
      <div className="flex flex-row h-[72px]">
        <Image.PreviewGroup>
          {imageList.map((item, index) => {
            return (
              <div className={'relative'} key={index}>
                <Image
                  width={72}
                  height={72}
                  src={item.url}
                  key={index}
                  className={styles['image-item']}
                  alt={item.name}
                />
                <div
                  className={`absolute flex  items-center justify-center ${styles['icon-close']}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setImageList(imageList.filter((_, i) => i !== index))
                  }}
                >
                  <IconClose />
                </div>
              </div>
            )
          })}
        </Image.PreviewGroup>
      </div>
    )

  const fileEle =
    fileList.length === 0 ? null : (
      <div className="flex flex-row h-[72px] flex-wrap">
        {fileList.map((item, index) => {
          return (
            <FileIcon
              showName={true}
              className={`select-text whitespace-nowrap mr-[3px] ${styles['file-item']}`}
              fileName={item.name}
              key={index}
            >
              <div
                className={`absolute flex items-center justify-center ${styles['icon-close']} ${styles['file-icon-close']}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setFileList(fileList.filter((_, i) => i !== index))
                }}
              >
                <IconClose />
              </div>
            </FileIcon>
          )
        })}
      </div>
    )

  const handlePressEnter = (e) => {
    const content = e.target.value
    valueRef.current = content
    if (!(content && enterType === 'ctrlEnter' && e.ctrlKey)) {
      return
    }
    onSend?.({ type: 'text', data: content })
    valueRef.current = ''
    textAreaRef.current!.dom.value = ''
    textAreaRef.current!.focus()
  }
  const handleButtonClick = () => {
    const content = valueRef.current
    if (content) {
      onSend?.({ type: 'text', data: content })
      valueRef.current = ''
      textAreaRef.current!.dom.value = ''
      textAreaRef.current!.focus()
      return
    }

    if (imageList.length > 0) {
      onSend?.({ type: 'image', data: imageList })
      setImageList([])
      return
    }

    if (fileList.length > 0) {
      onSend?.({ type: 'file', data: fileList })
      setFileList([])
      return
    }
  }
  const handleImageUpload = (e: UploadItem[]) => {
    const newList = e.map((item) => {
      return {
        ...item,
        url: window.URL.createObjectURL(item.originFile as Blob)
      }
    })
    setImageList(newList)
  }

  const handleFileUpload = (e: UploadItem[]) => {
    setFileList(e)
  }

  return (
    <div
      className={`h-full flex flex-col ${
        disable ? 'opacity-50 pointer-events-none' : ''
      } ${className}`}
    >
      <div className={`flex flex-row mb-2 ${styles['tools']}`}>
        <svg className={`${styles['clock-svg']}`}>
          <use xlinkHref="#icon-clock" />
        </svg>
        <div className={`-m-[1px]`}>
          <Upload
            action="/"
            className={'flex items-center justify-center'}
            showUploadList={false}
            limit={3}
            accept={`image/*`}
            autoUpload={false}
            onChange={handleImageUpload}
            fileList={imageList}
          >
            <svg>
              <use xlinkHref="#icon-filesimg" />
            </svg>
          </Upload>
        </div>
        <div className={`-m-[1px]`}>
          <Upload
            action="/"
            autoUpload={false}
            className={'flex items-center justify-center'}
            showUploadList={false}
            limit={3}
            fileList={fileList}
            onChange={handleFileUpload}
            accept={`application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/zip, application/x-rar-compressed, application/x-7z-compressed, application/x-tar, application/x-gzip, application/x-bzip2, application/x-bzip, application/x-zip-compressed, application/x-compress, application/x-compressed, application/octet-stream, application/vnd.rar, application/x-rar,video/*,audio/*`}
          >
            <svg>
              <use xlinkHref="#icon-folder" />
            </svg>
          </Upload>
        </div>
      </div>
      <div className={`flex-1 ${styles['center-container']}`}>
        {imageEle || fileEle || (
          <TextArea
            className={`${styles.textarea}`}
            placeholder={enterType === 'ctrlEnter' ? '按Ctrl+Enter发送' : '按Enter发送'}
            ref={textAreaRef}
            maxLength={1000}
            onPressEnter={handlePressEnter}
            onChange={(v) => (valueRef.current = v)}
          />
        )}
      </div>
      <div className="flex flex-row-reverse w-full my-2">
        <BaseButton theme="primary" onClick={handleButtonClick}>
          发送
        </BaseButton>
      </div>
    </div>
  )
}

export default MessageEditor
