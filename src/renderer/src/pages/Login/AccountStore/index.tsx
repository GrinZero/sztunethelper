import React from 'react'
import { IconClose } from '@arco-design/web-react/icon'
import styles from './index.module.scss'

import type { ComponentProps, Account } from '@renderer/types'
import { BaseCard } from '@renderer/components'

export interface AccountInStore extends Account {
  packageData: string
}
export interface AccountStoreProps extends ComponentProps {
  data: AccountInStore[]
  onChoose?: (val: AccountInStore) => void
  onDelete?: (val: AccountInStore) => void
  current?: string | null
}

const AccountStore: React.FC<AccountStoreProps> = ({
  className = '',
  onChoose,
  onDelete,
  current,
  data
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {data.map((item) => {
        return (
          <BaseCard
            className={`cursor-pointer mr-3 min-w-[160px] flex-shrink-0 ${styles.base} ${
              current === item.username ? styles.current : ''
            }`}
            title={item.username}
            key={item.username}
            itemClassName={`flex-grow`}
            listClassName={`flex-grow`}
            titleClassName={styles.title}
            onClick={() => onChoose?.(item)}
            border={false}
          >
            <div className="w-full flex-grow h-full rounded-lg">{item.packageData}</div>
            <div
              className={`absolute bottom-4 -translate-x-1/2 left-1/2 hidden items-center justify-center ${styles['icon-close']}`}
              onClick={(e) => {
                e.stopPropagation()
                onDelete?.(item)
              }}
            >
              <IconClose />
            </div>
          </BaseCard>
        )
      })}
    </div>
  )
}

export default AccountStore
