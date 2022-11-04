import React from 'react'

import { BaseCard } from '@renderer/components'
import NetCardRow from '../NetCardRow'
import type { NetInfoModal } from '@renderer/api'
import type { ComponentProps } from '@renderer/types'

interface NetInfoCardProps extends ComponentProps {
  netInfo: NetInfoModal
}

const NetInfoCard: React.FC<NetInfoCardProps> = ({ netInfo, className = '' }) => {
  return (
    <BaseCard title="网络信息" className={`${className}`}>
      <NetCardRow name="IP" value={netInfo.ip.value} type={netInfo.ip.type} />
      <NetCardRow name="DNS" value={netInfo.dns.value[0] ?? ''} type={netInfo.dns.type} />
      {netInfo.dns.value[1] && (
        <NetCardRow name="" value={netInfo.dns.value[1] ?? ''} type="normal" />
      )}
      {netInfo.wifiName && (
        <NetCardRow name="WIFI" value={netInfo.wifiName.value} type={netInfo.wifiName.type} />
      )}
      <NetCardRow name="DHCP" value={netInfo.dhcp.value} type={netInfo.dhcp.type} />
    </BaseCard>
  )
}

export default NetInfoCard
