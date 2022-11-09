import React from 'react'
import { BaseElement, BasePopover, BaseList } from '@renderer/components'
const { Title } = BaseElement
import type { ComponentProps } from '@renderer/types'
import type { Host } from '@renderer/api'

import HostRow from '../HostRow'

import styles from './index.module.scss'

export type HostItem = Host

export interface HostListProps extends ComponentProps {
  data: HostItem[] | null
  current?: string | null
  onClick?: (host: HostItem) => void
  onSwitch?: (host: HostItem, val: boolean) => void
  onEdit?: (host: HostItem) => void
}

const HostList: React.FC<HostListProps> = ({
  className = '',
  data,
  current,
  onClick,
  onSwitch,
  onEdit
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <Title className="flex flex-row items-center">
        <BasePopover
          position="right"
          content="通过修改hosts的方式帮你快速上网，助力解决莫名其妙的无法连接内网"
        >
          <svg className="icon mr-1 cursor-help">
            <use xlinkHref="#icon-m-hosts"></use>
          </svg>
        </BasePopover>
        <span>魔法HOSTS</span>
      </Title>
      <BaseList>
        {data?.map((item) => (
          <HostRow
            className={`cursor-pointer ${current === item.name ? styles['row-current'] : ''}`}
            key={item.name}
            onClick={() => onClick?.(item)}
            onSwitch={(val) => onSwitch?.(item, Boolean(val))}
            onEdit={() => onEdit?.(item)}
            defaultValue={item.open}
            type={item.type}
            name={item.name}
            mode={item.mode}
          />
        )) ?? 'empty'}
      </BaseList>
    </div>
  )
}

export default HostList
