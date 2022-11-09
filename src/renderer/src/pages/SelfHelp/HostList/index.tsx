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
  onClick?: (host: HostItem) => void
  onSwitch?: (host: HostItem, val: boolean) => void
  onEdit?: (host: HostItem) => void
}

const HostList: React.FC<HostListProps> = ({ className = '', data, onClick, onSwitch, onEdit }) => {
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
        {data?.map(({ autoUpdate, ...item }) => (
          <HostRow
            className={'cursor-pointer'}
            key={item.name}
            onClick={() => onClick?.({ autoUpdate, ...item })}
            onSwitch={(val) => onSwitch?.({ autoUpdate, ...item }, Boolean(val))}
            onEdit={() => onEdit?.({ autoUpdate, ...item })}
            defaultValue={item.open}
            {...item}
          />
        ))}
      </BaseList>
    </div>
  )
}

export default HostList
