import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch } from '@arco-design/web-react'
import type { ComponentProps } from '@renderer/types'
import { BaseConfig, setConfig } from '@renderer/store'

import styles from './index.module.scss'

const defaultOptions: {
  name: string
  field: keyof BaseConfig
}[] = [
  {
    name: '自动更新',
    field: 'autoUpdate'
  },
  {
    name: '永不断网',
    field: 'neverOffline'
  },
  {
    name: '开机自启',
    field: 'autoStart'
  },
  {
    name: '自动主题',
    field: 'autoTheme'
  }
]

const SettingModule: React.FC<ComponentProps> = ({ className = '' }) => {
  const dispatch = useDispatch()
  const { config } = useSelector((store: any) => store.base)

  const options = useMemo(() => {
    if (!config) {
      return defaultOptions.map((item) => ({
        ...item,
        value: false
      }))
    }
    return defaultOptions.map((item) => {
      return {
        ...item,
        value: config[item.field]
      }
    })
  }, [defaultOptions, config])

  return (
    <div className={`${className}`}>
      {options.map((item, index) => (
        <label
          key={index}
          className={`flex flex-row items-center justify-between mb-1 px-4 py-2 ${styles.row}`}
        >
          <div className={`${styles.name}`}>{item.name}</div>
          <Switch
            checked={item.value}
            onChange={(v) => {
              dispatch(setConfig({ [item.field]: v }))
            }}
          />
        </label>
      ))}
    </div>
  )
}

export default SettingModule
