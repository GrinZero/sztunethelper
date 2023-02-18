import { CoreInput } from '@renderer/components'
import React, { useRef } from 'react'
import type { ComponentProps } from '@renderer/types'

import { Form, Input, Select } from '@arco-design/web-react'
const { TextArea } = Input
const { Item: FormItem } = Form

import styles from './index.module.scss'

export interface CosultFormValue {
  title: string
  type: string
  content: string
}
export interface ConsultFormProps extends ComponentProps {
  onChange?: (values: CosultFormValue) => unknown
  options: {
    label: string
    value: string
  }[]
  defaultSelectValue?: string
}

const ConsultForm: React.FC<ConsultFormProps> = ({
  className = '',
  options,
  defaultSelectValue,
  onChange
}) => {
  const _defaultSelectValue = defaultSelectValue ?? options[0].value
  const formValRef = useRef<CosultFormValue>({
    title: '',
    type: _defaultSelectValue,
    content: ''
  })

  const handleValueChange = (values: Partial<CosultFormValue>) => {
    if (!formValRef.current) return
    formValRef.current = { ...formValRef.current, ...values }
    onChange?.(formValRef.current)
  }

  return (
    <Form
      className={`flex flex-col w-full h-full ${className}`}
      onValuesChange={handleValueChange}
      initialValues={{
        type: _defaultSelectValue ?? '',
        content: ''
      }}
    >
      <CoreInput
        placeholder="标题"
        inputClassName={'p-3'}
        onChange={(e) => {
          const val = e.target.value
          if (!formValRef.current) return
          formValRef.current.title = val
          onChange?.(formValRef.current)
        }}
        maxLength={18}
      />
      <FormItem noStyle field={'type'}>
        <Select placeholder="咨询类型" className={`${styles.select} mt-3`} options={options} />
      </FormItem>
      <FormItem noStyle field={'content'}>
        <TextArea className={`${styles.textarea} mt-3`} placeholder="内容" maxLength={300} />
      </FormItem>
    </Form>
  )
}

export default ConsultForm
