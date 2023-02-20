import { BaseCard, BaseButton } from '@renderer/components'
import { IconUser } from '@arco-design/web-react/icon'
import styles from './index.module.scss'
import { Duty } from '@renderer/api'
import React from 'react'
import { Tag } from '@arco-design/web-react'

interface HeaderCardProps {
  data: Duty | null
  onClick?: (duty?: Duty | null) => void
}

const contactTypeStore = {
  socket: ['在线', 'rgb(34 197 94)'],
  mail: ['邮件', 'rgb(59 130 246)'],
  image: ['如图', 'rgb(234 179 8)'],
  other: ['其他', 'rgb(107 114 128)']
}

const HeaderCard: React.FC<HeaderCardProps> = ({ data, onClick }) => {
  return (
    <BaseCard title={null} scale="1" border={false}>
      <div className={`w-full flex flex-row items-center justify-between`}>
        <div className="flex flex-row items-center">
          <div className={`w-8 h-8 rounded-[50%] mr-2 ${styles.img}`}>
            <IconUser />
          </div>
          <div className={`mr-2`}>
            <div className={`font-bold flex flex-row items-center`}>
              <span className="select-text">{data?.name}</span>
              <Tag
                className={'ml-1'}
                bordered
                size="small"
                color={contactTypeStore[data?.contactType ?? 'other'][1]}
              >
                {contactTypeStore[data?.contactType ?? 'other'][0]}
              </Tag>
            </div>
            <div className={'opacity-60 select-text'}>{data?.contact ?? '-'}</div>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <BaseButton theme="transparent" size="middle" onClick={() => onClick?.(data)}>
            咨询
          </BaseButton>
        </div>
      </div>
    </BaseCard>
  )
}

export default HeaderCard
