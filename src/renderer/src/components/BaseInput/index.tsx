import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import styles from './index.module.scss'
import type { HTMLInputProps } from '@renderer/types'

export interface BaseInputProps extends HTMLInputProps {
  onFinished?: (val: string, from: 'blur') => unknown
  onBlur?: (val: React.FocusEvent) => unknown
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => unknown
}

const BaseInput: React.ForwardRefRenderFunction<HTMLInputElement | null, BaseInputProps> = (
  { className = '', onKeyDown, onFinished, onBlur, ...rest },
  ref
) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => inputRef.current!)

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const stop = onBlur?.(e)
    // onBlur返回true会停止触发onFinished
    if (stop) {
      return
    }
    const inputVal = e.target.value
    onFinished?.(inputVal, 'blur')
  }
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
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
    <input
      ref={inputRef}
      className={`${styles['base-input']} w-full ${className}`}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      {...rest}
    />
  )
}

export default forwardRef(BaseInput)
