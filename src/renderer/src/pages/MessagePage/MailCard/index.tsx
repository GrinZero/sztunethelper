import React from 'react'
import { BaseCard } from '@renderer/components'
import type { BaseCardProps } from '@renderer/components'
import { IconEmail, IconEdit } from '@arco-design/web-react/icon'

interface MailCardProps extends BaseCardProps {
  mail: string | null
}

const MailCard: React.FC<MailCardProps> = ({ mail, className = '', ...rest }) => {
  return (
    <BaseCard
      className={`${className} group cursor-pointer`}
      itemClassName="flex flex-row items-center"
      border={false}
      {...rest}
    >
      <>
        <IconEmail className={`flex-shrink-0 mr-2`} />
        <div className={` whitespace-nowrap overflow-hidden text-ellipsis`}>{mail}</div>
        <div>
          <IconEdit className={`flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100`} />
        </div>
      </>
    </BaseCard>
  )
}

export default MailCard
