import React from 'react'

import { Tooltip } from '@arco-design/web-react'
import styles from './index.module.scss'
import { BaseInput } from '@renderer/components'

import type { ComponentProps } from '@renderer/types'

export interface IpRowOnChangeValue {
  val: string
  id: string
  ip: string
}

export interface IpRowProps extends ComponentProps {
  beforeNode?: string | React.ReactNode | null
  afterNode?: string | React.ReactNode | null
  id: string
  ip: string
  name?: string | null
  startTime: number | string
  endTime?: string | null
  onChange?: (value: IpRowOnChangeValue) => unknown
  current?: boolean | null
}

const IpRow: React.FC<IpRowProps> = ({
  ip,
  name,
  startTime,
  endTime,
  beforeNode,
  afterNode,
  className = '',
  id,
  onChange,
  current
}) => {
  const start = new Date(startTime).getTime()
  const end = (endTime ? new Date(endTime) : new Date()).getTime()

  const usedTime = end - start
  const days = Math.floor(usedTime / (24 * 3600 * 1000))
  const leave1 = usedTime % (24 * 3600 * 1000)
  const hours = Math.floor(leave1 / (3600 * 1000))
  const leave2 = leave1 % (3600 * 1000)
  const minutes = Math.floor(leave2 / (60 * 1000))

  const inline = days > 0 ? `${days}d ${hours}h ${minutes}min` : `${hours}h ${minutes}min`

  return (
    <div
      className={`flex flex-row w-full py-[10px] px-[18px] justify-between items-center ${className}`}
    >
      {beforeNode}
      <span className="w-[135px]">
        {current !== undefined && (
          <Tooltip content="本机">
            <span
              className={`mr-2 transition-all cursor-default ${current ? 'visible' : 'invisible'}`}
            >
              ▶
            </span>
          </Tooltip>
        )}
        {ip}
      </span>

      <BaseInput
        className="w-[120px] mr-[15px] overflow-hidden text-clip"
        defaultValue={name ?? ''}
        placeholder="输入设备名"
        onFinished={(val: string) => onChange?.({ val, id, ip })}
      />
      <span className="w-[175px] select-text">{startTime}</span>
      <span className={`w-[70px] ${styles['ip-row-status']}`} data-status={!endTime}>
        {endTime ? '离线' : '在线'}
      </span>
      <span className="w-[144px]">{inline}</span>
      {afterNode}
    </div>
  )
}

export default IpRow
