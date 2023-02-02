import { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { useMailStorage, useSetState } from '@renderer/hooks'
import { SmallScreen } from '@renderer/components'
import type { DataStatus } from '@renderer/types'

import { fetchTicketList, Ticket } from '@renderer/api'

import TicketCard from './TicketCard'

import MailCard from './MailCard'
import styles from './index.module.scss'

interface PageState {
  page: number
  status: DataStatus
  pageSize: number
}
function useTicketList(): [Ticket[][], () => Promise<void>, PageState] {
  const [list, setList] = useState<Ticket[][]>([])
  const [state, setState] = useSetState<PageState>({
    page: -1,
    status: 'empty',
    pageSize: 10
  })

  const next = async () => {
    if (['loading', 'done', 'error'].includes(state.status)) {
      return
    }

    const page = state.page + 1
    setState({ page, status: 'loading' })
    const result = await fetchTicketList(page).catch((err) => {
      console.error('useTicketList', err)
      setState({ status: 'error' })
    })
    if (!result) {
      return
    }

    if (result.data.length < state.pageSize) {
      setState({ status: 'done' })
    } else {
      setState({ status: 'ok' })
    }

    setList((prevList) => [...prevList, result.data])
  }
  useEffect(() => {
    next()
  }, [])

  return [list, next, state]
}

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
