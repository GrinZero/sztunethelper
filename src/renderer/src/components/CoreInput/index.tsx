import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import type { BaseInputProps } from '../BaseInput'
import { IconEye, IconEyeInvisible } from '@arco-design/web-react/icon'
import BaseInput from '../BaseInput'
import './index.scss'

interface CoreInputProps extends BaseInputProps {
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => unknown
  inputClassName?: string
  prefixNode?: React.ReactNode | string
  suffixNode?: React.ReactNode | string
}

const CoreInput: React.ForwardRefRenderFunction<HTMLInputElement | null, CoreInputProps> = (
  { className = '', inputClassName = '', onFocus, onBlur, prefixNode, suffixNode, type, ...rest },
  ref
) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => inputRef.current!)
  const [focus, setFocus] = useState('blur')

  const handleBlur = (e: React.FocusEvent<Element, Element>) => {
    setFocus('blur')
    onBlur?.(e)
  }
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus('focus')
    onFocus?.(e)
  }
  return (
    <label className={`core-input w-full flex flex-row core-input__${focus} ${className}`}>
      {prefixNode}
      <BaseInput
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${inputClassName}`}
        type={type}
        {...rest}
      />
      {type === 'password' && (
        <div
          className="p-2 text-xl h-full flex flex-col justify-center items-center cursor-pointer"
          onClick={() => {
            inputRef.current!.type = inputRef.current!.type === 'password' ? 'text' : 'password'
          }}
        >
          {inputRef.current?.type === 'password' ? <IconEyeInvisible /> : <IconEye />}
        </div>
      )}
      {suffixNode}
    </label>
  )
}

export default forwardRef(CoreInput)
