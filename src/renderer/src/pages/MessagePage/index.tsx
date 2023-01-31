import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMailStorage, useSetState } from '@renderer/hooks'
import { BaseCard, SmallScreen } from '@renderer/components'

import { fetchTicketList, Ticket } from '@renderer/api'

import MailCard from './MailCard'
import styles from './index.module.scss'

interface PageState {
  page: number
  status: 'empty' | 'loading' | 'ok' | 'error'
}
function useTicketList(): [Ticket[][], () => Promise<void>, PageState] {
  const [list, setList] = useState<Ticket[][]>([])
  const [state, setState] = useSetState<PageState>({
    page: -1,
    status: 'empty'
  })

  const next = async () => {
    const page = state.page + 1
    setState({ page, status: 'loading' })
    const result = await fetchTicketList(page).catch((err) => {
      console.error('useTicketList', err)
      setState({ status: 'error' })
    })
    if (!result) {
      return
    }

    setState({ status: 'ok' })
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
  const [list] = useTicketList()

  const handleMailCardClick = () => {
    history.push('mail_config')
  }

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
        <SmallScreen w={300}>
          {list.map((page, index) => (
            <div key={index} className="flex flex-col">
              {page.map((ticket) => (
                <BaseCard key={ticket.id} className="mb-3">
                  {ticket.to}
                </BaseCard>
              ))}
            </div>
          ))}
        </SmallScreen>
      </div>
    </div>
  )
}

export default MessagePage
