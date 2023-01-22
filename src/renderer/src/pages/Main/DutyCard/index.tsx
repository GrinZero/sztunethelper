import { useEffect, useState } from 'react'
import { fetchCurrentDuty } from '@renderer/api'
import type { Duty } from '@renderer/api'
import { BaseCard, BaseElement } from '@renderer/components'
const { Title } = BaseElement
import { Rate } from '@arco-design/web-react'

const useFetchDuty = () => {
  const [currentDuty, setCurrentDuty] = useState<Duty>()
  useEffect(() => {
    const main = async () => {
      const res = await fetchCurrentDuty()
      const data = res.data?.data
      if (data) {
        setCurrentDuty(data)
      }
    }
    main()
  }, [])
  return currentDuty
}

const DutyCard = () => {
  const currentDuty = useFetchDuty()
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
          <Rate allowHalf readonly defaultValue={currentDuty?.rate ?? 0} />
          <img
            className="object-cover rounded-[9px] mt-3 select-none"
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
