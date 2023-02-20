import React from 'react'
import type { ComponentProps } from '@renderer/types'

import { StatusIcon } from '@renderer/components'
import type { StatusIconProps } from '@renderer/components'

interface NetCardRowProps extends ComponentProps, StatusIconProps {
  name: string | React.ReactNode
  value: string | React.ReactNode
}

const NetCardRow: React.FC<NetCardRowProps> = ({ name, value, type }) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center font-bold">
        <StatusIcon className="mr-1" type={type} />
        <span className="mr-1 mt-[1px] text-xs select-text">{name}</span>
      </div>
      <span className="opacity-80 hover:opacity-100 transition-opacity select-text">{value}</span>
    </div>
  )
}

export default NetCardRow
