import { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { useMailStorage } from '@renderer/hooks'
import { SmallScreen } from '@renderer/components'
import { useTicketList } from '@renderer/api'

import TicketCard from './TicketCard'

import MailCard from './MailCard'
import styles from './index.module.scss'

const MessagePage = () => {
  const history = useHistory()
  const mailConfig = useMailStorage()
  const [list, next, { status }] = useTicketList()

  const handleMailCardClick = () => {
    history.push('mail_config')
  }

  const handleBottom = () => {
    next()
  }

  const ele =
    list.length === 0
      ? null
      : list.map((page, index) => (
          <Fragment key={index}>
            {page.map((ticket) => (
              <TicketCard key={ticket.id} className="mb-3 whitespace-pre mr-2" ticket={ticket} />
            ))}
          </Fragment>
        ))

  return (
    <div className={`${styles.container} main`}>
      <div className={`w-[300px] flex flex-col h-full`}>
        <div className="flex-row mb-3">
          <MailCard
            className={`w-[255px] max-w-[255px]`}
            mail={mailConfig?.mail ?? null}
            onClick={handleMailCardClick}
          />
        </div>
        <SmallScreen w={300} onBottom={handleBottom} status={status}>
          {ele}
        </SmallScreen>
      </div>
    </div>
  )
}

export default MessagePage
