import { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMailStorage } from '@renderer/hooks'
import { SmallScreen } from '@renderer/components'
import { useTicketList, useCurrentDuty, Ticket, Duty } from '@renderer/api'
import { Drawer, DrawerProps } from '@arco-design/web-react'

import TicketCard from './TicketCard'
import MailCard from './MailCard'
import HeaderCard from './HeaderCard'
import MessageCard from './MessageCard'
import ConsultForm from './ConsultForm'

import styles from './index.module.scss'

export const useDrawer = (
  props: DrawerProps
): [React.ReactElement, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [visible, setVisible] = useState(false)

  const ele = (
    <Drawer
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      {...props}
    ></Drawer>
  )

  return [ele, setVisible]
}

const MessagePage = () => {
  const history = useHistory()
  const duty = useCurrentDuty()
  const mailConfig = useMailStorage()
  const [list, next, { status }] = useTicketList()

  const [drawer, setDrawer] = useDrawer({
    title: '发起咨询',
    placement: 'bottom',
    height: '75vh',
    maskClosable: false,
    children: (
      // 包含标题、简要内容、咨询类型这三个表单
      <ConsultForm />
    )
  })

  const handleMailCardClick = () => history.push('mail_config')
  const handleTicketCardClick = (ticket: Ticket) => {
    console.log(ticket)
  }

  const handleConsultClick = (duty?: Duty | null) => {
    if (!duty) return
    setDrawer(true)
  }

  const ele =
    list.length === 0
      ? null
      : list.map((page, index) => (
          <Fragment key={index}>
            {page.map((ticket) => (
              <TicketCard
                key={ticket.id}
                className="mb-3 whitespace-pre mr-1"
                ticket={ticket}
                onClick={handleTicketCardClick}
              />
            ))}
          </Fragment>
        ))

  return (
    <div className={`${styles.container} main`}>
      <div className={`w-[300px] flex flex-col h-full flex-shrink-0`}>
        <div className="flex-row mb-3">
          <MailCard
            className={`w-[255px] max-w-[255px]`}
            mail={mailConfig?.mail ?? null}
            onClick={handleMailCardClick}
          />
        </div>
        <SmallScreen w={300} onBottom={next} status={status} overflow="scroll">
          {ele}
        </SmallScreen>
      </div>
      <div className={`w-full flex flex-col ml-1`}>
        <HeaderCard data={duty} onClick={handleConsultClick} />
        <MessageCard className={`mt-3`} type="mail" />
      </div>
      {drawer}
    </div>
  )
}

export default MessagePage
