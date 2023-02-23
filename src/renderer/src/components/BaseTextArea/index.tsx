import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import styles from './index.module.scss'
import type { HTMLTextAreaProps } from '@renderer/types'

export interface BaseTextAreaProps extends HTMLTextAreaProps {
  onFinished?: (val: string, from: 'blur') => unknown
  onBlur?: (val: React.FocusEvent) => unknown
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => unknown
}

const BaseTextArea: React.ForwardRefRenderFunction<
  HTMLTextAreaElement | null,
  BaseTextAreaProps
> = ({ className = '', onKeyDown, onFinished, onBlur, ...rest }, ref) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  useImperativeHandle(ref, () => inputRef.current!)

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const stop = onBlur?.(e)
    // onBlur返回true会停止触发onFinished
    if (stop) {
      return
    }
    const inputVal = e.target.value
    onFinished?.(inputVal, 'blur')
  }
  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const stop = onKeyDown?.(e)
    if (stop) {
      return
    }
    const { key } = e
    if (key === 'Enter') {
      inputRef.current?.blur()
    }
  }

  return (
    <textarea
      ref={inputRef}
      className={`${styles['base-textarea']} w-full ${className}`}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      {...rest}
    />
  )
}

export default forwardRef(BaseTextArea)
