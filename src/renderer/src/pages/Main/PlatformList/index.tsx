import React, { useMemo, useState } from 'react'
import IpRow, { IpRowOnChangeValue } from '../IpRow'
import {
  BaseList,
  BaseElement,
  BasePopover,
  BaseButton,
  BaseEmpty,
  MoreInfo
} from '@renderer/components'
const { Title } = BaseElement
import { IconLoading, IconSync } from '@arco-design/web-react/icon'

import type { Platform } from '@renderer/api'
import styles from './index.module.scss'

interface PlatformListProps {
  platformList: Platform[] | null
  currentIP: string | null
  onOffline: (platform: Platform) => void
  onNameChange: (value: IpRowOnChangeValue) => unknown
  onFlush: () => Promise<void>
}

const PlatformList: React.FC<PlatformListProps> = ({
  platformList,
  currentIP,
  onOffline,
  onNameChange,
  onFlush
}) => {
  const platformListCard = useMemo(() => {
    if (platformList === null) {
      return (
        <div className="flex justify-center items-center w-full h-[140px]">
          <IconLoading spin />
        </div>
      )
    }

    if (platformList.length === 0) {
      return (
        <div className="flex justify-center items-center w-full h-[140px]">
          <BaseEmpty />
        </div>
      )
    }

    return platformList.map((platform) => (
      <IpRow
        key={platform.id}
        current={platform.ip === currentIP}
        afterNode={
          <>
            <BaseButton
              className="ml-6 whitespace-nowrap"
              theme="danger"
              onClick={() => onOffline(platform)}
              disabled={platform.endTime !== null}
            >
              下线
            </BaseButton>
            <MoreInfo triggerClassName={`ml-3`} infoList={[platform.id, platform.nasIP]} />
          </>
        }
        onChange={onNameChange}
        {...platform}
      />
    ))
  }, [platformList])

  const [isFlushing, setIsFlushing] = useState(false)
  const handleFlush = () => {
    const id = setTimeout(() => {
      setIsFlushing(true)
    }, 200)
    onFlush().finally(() => {
      clearTimeout(id)
      setIsFlushing(false)
    })
  }

  return (
    <>
      <Title className={`mb-2 ml-1 flex flex-row items-center`}>
        <BasePopover
          position="right"
          content={
            '基于IP和会话ID是否相同判断是否为同一设备，暂时无法规避IP变动导致自定义设备名称丢失的情况'
          }
        >
          <svg className="icon mr-1 cursor-help">
            <use xlinkHref="#icon-xiangmu"></use>
          </svg>
        </BasePopover>
        <span>设备列表</span>
        {/* 刷新按钮 */}
        <div onClick={handleFlush}>
          <IconSync className="ml-2 cursor-pointer" spin={isFlushing} />
        </div>
      </Title>
      <BaseList className={`min-h-[145px] ${styles['platform-list']}`} autoHeight={true}>
        {platformListCard}
      </BaseList>
    </>
  )
}

export default PlatformList
