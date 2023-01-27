import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMailStorage } from '@renderer/hooks'
import { SmallScreen } from '@renderer/components'
import MailCard from './MailCard'
import styles from './index.module.scss'

const useTicketList = () => {
  const [list, setList] = useState([])
  useEffect(() => {})
}

const MessagePage = () => {
  const history = useHistory()
  const mailConfig = useMailStorage()

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
        <SmallScreen w={300}></SmallScreen>
      </div>
    </div>
  )
}

export default MessagePage
