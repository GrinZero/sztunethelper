import React from 'react'
import BaseElement from '../BaseElement'
import styles from './index.module.scss'
import type { HTMLDivProps } from '@renderer/types'

const { Title } = BaseElement

export interface BaseCardProps extends Omit<HTMLDivProps, 'title'> {
  title?: string | React.ReactNode
  children?: React.ReactNode
  titleClassName?: string
  itemClassName?: string
  listClassName?: string
  border?: boolean
  scale?: string
}

const BaseCard: React.FC<BaseCardProps> = ({
  className = '',
  titleClassName = '',
  itemClassName = '',
  listClassName = '',
  scale = '1.02',
  border = true,
  title,
  children,
  ...rest
}) => {
  const childList = Array.isArray(children) ? children : [...(children ? [children] : [])]
  return (
    <div
      className={`flex ${styles.card} ${
        border ? styles.card__border : styles['card__border-none']
      } ${className}`}
      style={{ '--scale': scale } as any}
      {...rest}
    >
      <div className={`flex flex-col w-full p-5 ${styles['base-card']}`}>
        {title ? (
          <Title className={`text-[18px] mb-2 ${styles['base-card__title']} ${titleClassName}`}>
            {title}
          </Title>
        ) : (
          ''
        )}
        <div className={`flex flex-col ${listClassName}`}>
          {childList
            .filter((item) => item !== null && item !== void 0)
            .map((child, index) => {
              return (
                <div key={child.key ?? `default${index}`} className={`${itemClassName} mt-1`}>
                  {child}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default BaseCard
