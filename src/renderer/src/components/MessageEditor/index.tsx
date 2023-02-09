import React from 'react'
import { Input } from '@arco-design/web-react'
const { TextArea } = Input

import { BaseButton } from '@renderer/components'
import type { ComponentProps } from '@renderer/types'

import styles from './index.module.scss'

interface MessageEditorProps extends ComponentProps {
  onSubmit?: (content: string) => void | Promise<void>
}

export const MessageEditor: React.FC<MessageEditorProps> = ({ className = '' }) => {
  return (
    <div className={`h-full flex flex-col ${className}`}>
      <div className={`flex flex-row mb-2 ${styles['tools']}`}>
        <svg>
          <use xlinkHref="#icon-clock" />
        </svg>
        <svg>
          <use xlinkHref="#icon-filesimg" />
        </svg>
        <svg>
          <use xlinkHref="#icon-folder" />
        </svg>
      </div>
      <TextArea className={`${styles.textarea}`} />
      <div className="flex flex-row-reverse w-full">
        <BaseButton className={`mt-2`} theme="primary">
          发送
        </BaseButton>
      </div>
    </div>
  )
}

export default MessageEditor
