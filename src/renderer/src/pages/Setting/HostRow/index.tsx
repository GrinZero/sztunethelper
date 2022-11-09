import React from 'react'

import { Switch } from '@arco-design/web-react'
import { useControlled } from '@renderer/hooks'
import { IconFile, IconCloud, IconEdit, IconDesktop } from '@arco-design/web-react/icon'
import type { HTMLDivProps } from '@renderer/types'
import styles from './index.module.scss'

export interface HostRowProps extends Omit<HTMLDivProps, 'defaultValue'> {
  type: 'local' | 'remote' | 'system'
  mode: 'readonly' | 'edit'
  name: string
  onSwitch?: (value: boolean | undefined) => void
  onEdit?: (val: string) => unknown
  value?: boolean
  defaultValue?: boolean
}

const HostRow: React.FC<HostRowProps> = (props) => {
  const { type, mode, name, className = '', onSwitch, onEdit, defaultValue, ...rest } = props
  const [checked, setChecked] = useControlled(props, 'value', onSwitch, { defaultValue })

  return (
    <div className={`flex flex-row items-center w-full p-4 group ${className}`} {...rest}>
      {type === 'local' ? <IconFile /> : type === 'remote' ? <IconCloud /> : <IconDesktop />}
      <div className="pl-2 w-[70%] flex items-center">
        <span>{name}</span>
        {mode === 'readonly' && <span className={styles.readonly}>只读</span>}
      </div>
      <div
        className={`px-2 cursor-pointer invisible ${mode === 'edit' ? 'group-hover:visible' : ''}`}
      >
        <IconEdit
          onClick={(e) => {
            e.stopPropagation()
            onEdit?.(name)
          }}
        />
      </div>
      <Switch
        checked={checked}
        onChange={(val, e) => {
          setChecked?.(val)
          e.stopPropagation()
        }}
      />
    </div>
  )
}

export default HostRow
