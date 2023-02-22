import { useCurrentDuty } from '@renderer/api'
import { BaseCard, BaseElement } from '@renderer/components'
const { Title } = BaseElement
import { Rate, Image } from '@arco-design/web-react'

const DutyCard = () => {
  const currentDuty = useCurrentDuty()
  return (
    <div className="flex flex-col mt-4">
      <Title className="ml-3">当前值班{currentDuty?.name ? `：${currentDuty?.name}` : ''}</Title>
      <BaseCard
        className="mt-1 h-full"
        title={''}
        itemClassName="w-full h-full mt-0"
        listClassName="w-full h-full"
      >
        <div className="flex flex-col items-center justify-evenly max-h-full h-full">
          <p>{currentDuty?.desc}</p>
          <Rate allowHalf readonly value={currentDuty?.rate ?? 0} />
          <Image
            className="object-cover rounded-[9px] mt-3 select-none overflow-hidden"
            width={180}
            height={180}
            src={currentDuty?.avatarUrl ?? ''}
          />
        </div>
      </BaseCard>
    </div>
  )
}

export default DutyCard
