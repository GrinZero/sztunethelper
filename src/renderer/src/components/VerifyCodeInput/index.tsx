import React, { useMemo, useRef, useState, useImperativeHandle } from 'react'
import styles from './index.module.scss'

export interface VerifyCodeInputProps {
  count: number
  onChange?: (value: string) => void
  onDone?: (value: string) => void | Promise<void>
  inputClassName?: string
  type?: 'text' | 'number'
}
export interface VerifyCodeInputRef {
  parentRef: HTMLDivElement | null
  valueRef: string[]
}

const VerifyCodeInput: React.ForwardRefRenderFunction<
  VerifyCodeInputRef | null,
  VerifyCodeInputProps
> = ({ count, inputClassName = '', onChange, onDone, type = 'text' }, ref) => {
  const parentRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<string[]>([])
  useImperativeHandle(ref, () => ({
    parentRef: parentRef.current,
    valueRef: valueRef.current
  }))

  const [status, setStatus] = useState<'normal' | 'error' | 'success'>('normal')

  const finish = async () => {
    const outputValue = valueRef.current.join('')
    if (!onDone) {
      return
    }

    const result = onDone(outputValue)
    if (!result?.then) {
      return
    }

    result
      .then(() => {
        setStatus('success')
      })
      .catch(() => {
        setStatus('error')
        const children = parentRef.current!.children
        for (let index = 0; index < children.length; index++) {
          const element = children[index] as HTMLInputElement
          element.value = ''
        }
      })
      .finally(() => {
        setTimeout(() => setStatus('normal'), 300)
      })
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === ' ') {
      e.target.value = ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const index = Number(e.target.dataset?.index)
    onChange?.(value)
    valueRef.current[index] = value

    if (value === '') {
      return
    }

    if (index === count - 1) {
      e.target.blur()
      finish()
      return
    }

    const parentNode = e.target.parentNode
    const nextNode = parentNode!.children[index + 1] as HTMLInputElement
    nextNode.focus()
  }

  const handleKeydown = (
    e: React.KeyboardEvent<HTMLInputElement> & {
      target: { value: string; blur: () => void }
    }
  ) => {
    const { value } = e.target

    if (!value) {
      return
    }

    if (e.key === 'Backspace') {
      e.target.value = ''
    } else if (e.key.length === 1 && e.code !== 'Space') {
      switch (type) {
        case 'text':
          e.target.value = e.key
          break
        case 'number': {
          if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
            e.target.value = e.key
            break
          }
          return
        }
        default:
          break
      }
    } else if (e.key === 'Enter') {
      e.target.blur()
      finish()
      return
    } else if (e.code === 'Space') {
      e.stopPropagation()
      return
    }
    handleChange({ target: e.target } as unknown as React.ChangeEvent<HTMLInputElement>)
  }

  const ele = useMemo(() => {
    return new Array(count).fill(0).map((_, index) => {
      return (
        <input
          className={`${styles['input-item']} ${inputClassName} ${styles['input-item__' + status]}`}
          key={index}
          type="text"
          maxLength={1}
          data-index={index}
          onChange={handleChange}
          onKeyDown={handleKeydown}
          onInput={handleInput}
          required
        />
      )
    })
  }, [count, handleChange, handleKeydown, inputClassName, status])

  return (
    <div className={`whitespace-nowrap flex flex-row`} ref={parentRef}>
      {ele}
    </div>
  )
}

export default React.forwardRef(VerifyCodeInput)
