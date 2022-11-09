import React from 'react'
import { Switch } from '@arco-design/web-react'
import type { ComponentProps } from '@renderer/types'

import styles from './index.module.scss'

const options = [
  {
    name: '自动更新'
  },
  {
    name: '永不断网'
  },
  {
    name: '开机自启'
  },
  {
    name: '自动主题'
  }
]

const SettingModule: React.FC<ComponentProps> = ({ className = '' }) => {
  return (
    <div className={`${className}`}>
      {options.map((item, index) => (
        <label
          key={index}
          className={`flex flex-row items-center justify-between mb-1 px-4 py-2 ${styles.row}`}
        >
          <div className={`${styles.name}`}>{item.name}</div>
          <Switch />
        </label>
      ))}
    </div>
  )
}

export default SettingModule
