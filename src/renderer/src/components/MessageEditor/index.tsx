import React, { useRef } from 'react'
import { Input, Upload } from '@arco-design/web-react'
import type { RefInputType } from '@arco-design/web-react/es/Input/interface'
const { TextArea } = Input

import { BaseButton } from '@renderer/components'
import type { ComponentProps } from '@renderer/types'
import type { IMMessage } from '@renderer/api'

import styles from './index.module.scss'

export interface MessageEditorProps extends ComponentProps {
  enterType?: 'ctrlEnter'
  onSend?: (msg: IMMessage) => Promise<void> | void
  //TODO:'enter'下次再做
}

export const MessageEditor: React.FC<MessageEditorProps> = ({
  className = '',
  onSend,
  enterType = 'ctrlEnter'
}) => {
  const valueRef = useRef('')
  const textAreaRef = useRef<RefInputType>(null)

  const handlePressEnter = (e) => {
    const content = e.target.value
    valueRef.current = content
    if (content && enterType === 'ctrlEnter' && e.ctrlKey) {
      onSend?.({ type: 'text', data: content })
      valueRef.current = ''
      textAreaRef.current!.dom.value = ''
      textAreaRef.current!.focus()
    }
  }
  const handleButtonClick = () => {
    const content = valueRef.current
    if (content) {
      onSend?.({ type: 'text', data: content })
      valueRef.current = ''
      textAreaRef.current!.dom.value = ''
      textAreaRef.current!.focus()
    }
  }

  return (
    <div className={`h-full flex flex-col ${className}`}>
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
          >
            <svg>
              <use xlinkHref="#icon-filesimg" />
            </svg>
          </Upload>
        </div>
        <div className={`-m-[1px]`}>
          <Upload
            action="/"
            className={'flex items-center justify-center'}
            showUploadList={false}
            limit={3}
            accept={`application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/zip, application/x-rar-compressed, application/x-7z-compressed, application/x-tar, application/x-gzip, application/x-bzip2, application/x-bzip, application/x-zip-compressed, application/x-compress, application/x-compressed, application/octet-stream, application/vnd.rar, application/x-rar,video/*,audio/*`}
          >
            <svg>
              <use xlinkHref="#icon-folder" />
            </svg>
          </Upload>
        </div>
      </div>
      <div className="flex-1">
        <TextArea
          className={`${styles.textarea}`}
          placeholder={enterType === 'ctrlEnter' ? '按Ctrl+Enter发送' : '按Enter发送'}
          ref={textAreaRef}
          maxLength={1000}
          onPressEnter={handlePressEnter}
          onChange={(v) => (valueRef.current = v)}
        />
      </div>
      <div className="flex flex-row-reverse w-full mt-2">
        <BaseButton theme="primary" onClick={handleButtonClick}>
          发送
        </BaseButton>
      </div>
    </div>
  )
}

export default MessageEditor
