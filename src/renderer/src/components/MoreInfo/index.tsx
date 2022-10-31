import React, { useMemo } from 'react'
import { PopoverProps } from '@arco-design/web-react'
import BaseList from '../BaseList'
import BasePopover from '../BasePopover'
import styles from './index.module.scss'
import type { ComponentProps } from '@renderer/types'

export interface MoreInfoProps extends ComponentProps, PopoverProps {
  children?: NonNullable<React.ReactNode>
  infoList?: string[]
  infoClassName?: string
  currentInfo?: string | null
  onChoose?: (val: string) => void
  triggerClassName?: string | string[]
  customTrigger?: React.ReactNode
  trigger?: 'hover' | 'click'
}

const MoreInfo: React.FC<MoreInfoProps> = ({
  className = '',
  infoClassName = '',
  trigger = 'click',
  triggerClassName = '',
  currentInfo,
  onChoose,
  children,
  infoList,
  customTrigger,
  ...rest
}) => {
  const content = useMemo(() => {
    if (children) {
      return children
    }
    if (infoList) {
      return (
        <BaseList className="w-full" theme="primary">
          {infoList.map((info) => (
            <div
              className={`px-2 py-3 text-[12px] ${infoClassName} ${
                currentInfo === info ? styles['more-info__current'] : ''
              }`}
              key={`${info}`}
              onClick={() => {
                onChoose?.(info)
              }}
            >
              {info}
            </div>
          ))}
        </BaseList>
      )
    }

    return ''
  }, [children, infoList])
  return (
    <BasePopover
      trigger={trigger}
      content={content}
      className={`${styles['more-info__popover']} ${className}`}
      position="br"
      {...rest}
    >
      {customTrigger ? (
        customTrigger
      ) : (
        <div
          className={`flex flex-row items-center p-[6px] rounded-xl ${styles['more-infor']} ${triggerClassName}`}
        >
          <svg className="icon">
            <use xlinkHref="#icon-qita"></use>
          </svg>
        </div>
      )}
    </BasePopover>
  )
}

export default MoreInfo
