import React, { FocusEventHandler, KeyboardEventHandler, useRef, useImperativeHandle } from 'react'

import styles from './index.module.scss'
import type { ComponentProps } from '@renderer/types'

interface SearchBoxProps extends ComponentProps {
  onFinished?: (val: string) => void
  onBlur?: (val: React.FocusEvent) => void
  [x: string]: unknown
}

type SearchBoxRef = HTMLInputElement | null

const SearchBox: React.ForwardRefRenderFunction<SearchBoxRef, SearchBoxProps> = (
  { className = '', onFinished, onBlur, ...rest },
  ref
) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => inputRef.current!)

  const handleFinished: FocusEventHandler<HTMLInputElement> = (e) => {
    const inputVal = e.target.value
    onFinished?.(inputVal)
    onBlur?.(e)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const { key } = e
    if (key === 'Enter') {
      inputRef.current?.blur()
    }
  }

  return (
    <div
      className={`flex flex-row items-center h-10 rounded pl-4 ${styles['search-box']} ${className}`}
    >
      <input
        placeholder="Search"
        onBlur={handleFinished}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        className={`w-full h-full border-none outline-none rounded transition-shadow duration-[.36s]`}
        {...rest}
      />
    </div>
  )
}

export default React.forwardRef(SearchBox)
