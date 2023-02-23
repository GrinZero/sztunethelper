import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { Upload, Image } from '@arco-design/web-react'
import type { UploadItem } from '@arco-design/web-react/es/Upload/interface'
import { IconClose } from '@arco-design/web-react/icon'

import { BaseButton, FileIcon, BaseTextArea } from '@renderer/components'
import type { ComponentProps } from '@renderer/types'
import type { IMMessage } from '@renderer/api'

import styles from './index.module.scss'

export interface MessageEditorProps extends ComponentProps {
  disable?: boolean
  enterType?: 'ctrlEnter'
  //TODO:'enter'下次再做
  onSend?: (msg: {
    type: IMMessage['type']
    data: string | UploadItem[]
  }) => Promise<boolean | void> | void
}

export interface MessageEditorRef {
  focus: () => void
  blur: () => void
  clear: () => void
  current: HTMLTextAreaElement | null
}

export const MessageEditor: React.ForwardRefRenderFunction<
  MessageEditorRef | null,
  MessageEditorProps
> = ({ className = '', disable = false, onSend, enterType = 'ctrlEnter' }, ref) => {
  const valueRef = useRef('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [imageList, setImageList] = useState<UploadItem[]>([])
  const [fileList, setFileList] = useState<UploadItem[]>([])

  const [dragging, setDragging] = useState(false)

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

  const _onSend = async (msg: { type: IMMessage['type']; data: string | UploadItem[] }) => {
    const result = onSend?.(msg)
    if (result?.then) {
      const res = await result
      if (res && msg.type === 'text') {
        valueRef.current = ''
        textAreaRef.current!.value = ''
        textAreaRef.current!.focus()
      }
      return false
    }
    return true
  }

  const handlePressEnter = async (e) => {
    const content = e.target.value
    valueRef.current = content
    if (!(content && enterType === 'ctrlEnter' && e.ctrlKey)) {
      return
    }
    const result = await _onSend?.({ type: 'text', data: content })
    if (result) {
      valueRef.current = ''
      textAreaRef.current!.value = ''
      textAreaRef.current!.focus()
    }
  }
  const handleButtonClick = async () => {
    const content = valueRef.current
    if (content) {
      const result = await _onSend?.({ type: 'text', data: content })
      if (result) {
        valueRef.current = ''
        textAreaRef.current!.value = ''
        textAreaRef.current!.focus()
      }
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

  const handleFileUpload = setFileList
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)

    const df = e.dataTransfer
    const files = df.files
    const thisFileList = Array.from(files).map((file) => {
      return {
        name: file.name,
        url: window.URL.createObjectURL(file),
        originFile: file,
        uid: `${Date.now()}${Math.random()}`
      }
    })

    const imgList = thisFileList.filter((item) => item.originFile.type.startsWith('image/'))
    const otherList = thisFileList.filter((item) => !item.originFile.type.startsWith('image/'))
    if (imgList.length + imageList.length <= 3) {
      setImageList([...imageList, ...imgList])
    }
    if (otherList.length + fileList.length <= 3) {
      setFileList([...fileList, ...otherList])
    }
  }

  const countRef = useRef(0)
  const onFileDrop = (e) => {
    if (e.type === 'dragover') {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    if (e.type === 'drop') {
      handleDrop(e)
      return
    }
    if (e.type === 'dragenter') {
      countRef.current++
      if (countRef.current % 2) {
        console.info('enter'), setDragging(true)
      }
      return
    }
    if (e.type === 'dragleave') {
      countRef.current--
      if (countRef.current % 2) {
        console.info('level'), setDragging(false)
        countRef.current = 0
      }
      return
    }
  }

  const drapEle = dragging ? (
    <div
      className="cursor-grab h-full rounded-[14px] w-full inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center animate__animated animate__fadeIn animate__faster"
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">松开鼠标</div>
        <div className="text-gray-500">将文件拖拽到此处</div>
      </div>
    </div>
  ) : null

  useImperativeHandle(ref, () => ({
    clear: () => {
      setImageList([])
      setFileList([])
      textAreaRef.current!.value = ''
    },
    focus: () => {
      textAreaRef.current!.focus()
    },
    blur: () => {
      textAreaRef.current!.blur()
    },
    current: textAreaRef.current
  }))

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
      <div
        className={`flex-1 relative ${styles['center-container']}`}
        onDrop={onFileDrop}
        onDragLeave={onFileDrop}
        onDragEnter={onFileDrop}
        onDragOver={onFileDrop}
      >
        {drapEle || imageEle || fileEle || (
          <BaseTextArea
            className={`${styles.textarea}`}
            placeholder={enterType === 'ctrlEnter' ? '按Ctrl+Enter发送' : '按Enter发送'}
            ref={textAreaRef}
            maxLength={1000}
            onFinished={handlePressEnter}
            onChange={(v) => (valueRef.current = v.target.value)}
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

export default forwardRef(MessageEditor)
