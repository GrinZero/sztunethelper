import React, { useEffect, useState, useRef } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Message, Modal } from '@arco-design/web-react'
import type { AccountInStore } from '../Login/AccountStore'
import styles from './index.module.scss'
import HeaderRightBox from './HeaderRightBox'
import { useWindowTheme } from '@renderer/hooks'
import { MacTitleLight, HeaderMenu, SearchBox } from '@renderer/components'
import { setTheme, setCurrentAccount } from '@renderer/store'

import { Account } from '@renderer/types'

interface TopBarProps {
  type: 'mac' | 'window'
}

const options = [
  {
    name: '基本功能',
    key: '基本功能',
    value: '/index'
  },
  {
    name: '自助排障',
    key: '自助排障',
    value: '/self_help'
  },
  {
    name: '关于我们',
    key: '关于我们',
    value: '/about_us'
  }
]

const TopBar: React.FC<TopBarProps> = ({ type }) => {
  const history = useHistory()
  const match = useRouteMatch(options.map((item) => item.value))

  const dispatch = useDispatch()
  // 监听系统主题变化
  const { theme, config } = useSelector((store: any) => store.base)
  const [systemTheme] = useWindowTheme()
  useEffect(() => {
    if (!config) {
      return
    }
    if (config.autoTheme) {
      dispatch(setTheme(systemTheme))
    }
  }, [systemTheme, config])
  const handleThemeChange = (newTheme: string) => dispatch(setTheme(newTheme as 'light' | 'dark'))

  const [focus, setFocus] = useState(false)
  const handleSearchBoxFocus = () => setFocus(true)
  const handleSearchBoxBlur = () => setFocus(false)

  const menuRef = useRef<{ setCurrent: (i: number) => void }>(null)
  useEffect(() => {
    if (!match) {
      menuRef.current?.setCurrent(-1)
      return
    }
    const i = options.findIndex((item) => item.value === match.path)
    menuRef.current?.setCurrent(i)
  }, [match])

  const { accountStore, currentAccount } = useSelector((store: any) => store.account) as {
    accountStore: AccountInStore[]
    currentAccount: Account
  }
  const handleChooseAccount = (username: string) => {
    if (username === currentAccount.username) {
      return
    }
    Modal.confirm({
      title: '切换账号',
      content: `是否切换到账号 ${username}？`,
      onOk: () => {
        const account = accountStore.find((item) => item.username === username)
        if (account) {
          dispatch(setCurrentAccount(account))
          history.push('/index?refresh')
        } else {
          Message.error('切换失败')
        }
      }
    })
  }

  return (
    <div
      className={`${styles.container} flex items-center w-full flex-row shrink-0 sticky top-0 left-0 z-50`}
    >
      {type === 'mac' && <MacTitleLight className="ml-6" />}
      {!focus && (
        <HeaderMenu
          className="ml-36 flex-shrink-0"
          options={options}
          onChange={(route: string) => history.push(route)}
          ref={menuRef}
        />
      )}
      <SearchBox
        className={
          focus
            ? 'w-full max-w-[600px] m-auto transition-[max-width] duration-[.36s]'
            : 'w-full max-w-[375px] transition-none'
        }
        onFocus={handleSearchBoxFocus}
        onBlur={handleSearchBoxBlur}
      />

      {!focus && (
        <HeaderRightBox
          theme={theme}
          onChange={handleThemeChange}
          className={`ml-auto flex-shrink-0 pl-[5em] pr-9 ${styles.headerRightBox}`}
          mornInfoProps={{
            infoList: accountStore.map((item) => item.username),
            currentInfo: currentAccount.username,
            infoClassName: 'cursor-pointer',
            onChoose: handleChooseAccount
          }}
        />
      )}
    </div>
  )
}
export default TopBar
