import React from 'react'

import { BaseList } from '@renderer/components'
import CheckRow from '../CheckRow'
import type { NetTask } from '@renderer/api'

interface NetTaskListProps {
  onClick?: (item: NetTask) => void
  onGo?: (item: NetTask) => void
  list: NetTask[]
}

const NetTaskList: React.FC<NetTaskListProps> = ({ onClick, onGo, list }) => {
  return (
    <BaseList>
      {list.map((item, index) => {
        return (
          <CheckRow
            key={index}
            type={item.type}
            onClick={() => {
              onClick?.(item)
            }}
            onGo={() => {
              onGo?.(item)
            }}
          >
            {item.title}
          </CheckRow>
        )
      })}
    </BaseList>
  )
}

export default NetTaskList
