import { CoreInput } from '@renderer/components'

import { Input, Select } from '@arco-design/web-react'
const { TextArea } = Input

import styles from './index.module.scss'

const ConsultForm = () => {
  return (
    <div className={`flex flex-col h-full`}>
      <CoreInput placeholder="标题" inputClassName={'p-3'} />
      <div>
        <Select
          className={`${styles.select} mt-3`}
          placeholder="咨询类型"
          options={[
            {
              label: '咨询类型1',
              value: '咨询类型1'
            },
            {
              label: '咨询类型2',
              value: '咨询类型2'
            }
          ]}
        />
      </div>
      <TextArea className={`${styles.textarea} mt-3`} placeholder="内容" />
    </div>
  )
}

export default ConsultForm
