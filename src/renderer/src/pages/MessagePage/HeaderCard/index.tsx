import { BaseCard, BaseButton } from '@renderer/components'
import { IconUser } from '@arco-design/web-react/icon'
import styles from './index.module.scss'
import { Duty } from '@renderer/api'
import React from 'react'

interface HeaderCardProps {
  data: Duty | null
  onClick?: () => void
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
            <div className={`font-bold`}>{data?.name}</div>
            <div className={'opacity-60'}>{data?.contact ?? '-'}</div>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <BaseButton theme="transparent" size="middle" onClick={() => onClick?.()}>
            咨询
          </BaseButton>
        </div>
      </div>
    </BaseCard>
  )
}

export default HeaderCard
