import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import type { BaseInputProps } from '../BaseInput'
import BaseInput from '../BaseInput'
import './index.scss'

interface CoreInputProps extends BaseInputProps {
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => unknown
  inputClassName?: string
}

const CoreInput: React.ForwardRefRenderFunction<HTMLInputElement | null, CoreInputProps> = (
  { className = '', inputClassName = '', onFocus, onBlur, ...rest },
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
    <label className={`core-input w-full core-input__${focus} ${className}`}>
      <BaseInput
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${inputClassName}`}
        {...rest}
      />
    </label>
  )
}

export default forwardRef(CoreInput)
