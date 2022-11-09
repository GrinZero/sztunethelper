import { useCallback, useMemo, useState, useEffect } from 'react'
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Message } from '@arco-design/web-react'

import { AccountInStore } from '../Login/AccountStore'
import styles from './index.module.scss'
import PlatformList from './PlatformList'
import NetInfoCard from './NetInfoCard'

import { login, getNetInfo, fetchPlatformList, offlinePlatform, connect } from '@renderer/api'
import type { Platform } from '@renderer/api'
import { BaseCard } from '@renderer/components'
import { Account } from '@renderer/types'
import { setNetInfo } from '@renderer/store'

const offlinePlatfromLine = async (link: string, account: Account) => {
  const res = await login(account)
  await offlinePlatform(link, res.data?.cookies ?? '')
}

const Main = () => {
  const dispatch = useDispatch()

  const history = useHistory()
  const match = useRouteMatch(['/index'])
  const location = useLocation()
  const hidden = match === null

  const [platformList, setPlatformList] = useState<Platform[] | null>([])

  const [status, setStatus] = useState('offline')
  const netInfo = useSelector((store: any) => store.netInfo)

  const init = async (type?: 'normal' | 'refresh') => {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    console.info('login:username', username)
    if (!username || !password) {
      history.push('/login')
      return
    }
    const getCookie = async () => {
      console.info('init#getCookie:start')
      const cookie = sessionStorage.getItem('cookie')
      if (cookie && type !== 'refresh') {
        setStatus('connect')
        return
      }
      const res = await login({ username, password })
      if (res.code === 200) {
        sessionStorage.setItem('cookie', (res.data as any).cookies)
        setStatus('connect')
      } else {
        setStatus('offline')
      }
      console.info('init#getCookie:end')
    }
    const getNetInfomation = async () => {
      try {
        const res = await getNetInfo()
        if (res.code === 200) {
          dispatch(setNetInfo(res.data))
          return res.data
        }
      } catch (error) {
        console.error(error)
      }
      return null
    }
    const getPlatformList = async (cookie: string | null, currentIP: string | null | undefined) => {
      if (cookie === null) {
        return
      }
      try {
        setPlatformList(null)
        const res = await fetchPlatformList(cookie)
        setPlatformList(res.data.list)

        const currentPlatform = res.data.list.find((item) => item.ip === currentIP)
        if (!currentPlatform) {
          return
        }
        localStorage.setItem('currentPlatform', JSON.stringify(currentPlatform))
      } catch (error) {
        console.error(error)
      }
    }
    const connectToNet = async (cookie: string, currentIP: string | null | undefined) => {
      const currentPlatform = JSON.parse(localStorage.getItem('currentPlatform') || 'null')
      if (currentPlatform && currentPlatform.user !== username) {
        // 必须使用原本的cookie
        const accountStore = JSON.parse(localStorage.getItem('accountStore') ?? '[]')
        await offlinePlatfromLine(currentPlatform.link, {
          username: currentPlatform.user,
          password: accountStore.find(
            (item: AccountInStore) => item.username === currentPlatform.user
          )?.password
        })
      }

      try {
        const connectResult = await connect({ username, password })
        if (connectResult.code === 200) {
          setStatus('success')
          if (connectResult.msg === 'login success') {
            await getPlatformList(cookie, currentIP)
          }
        } else {
          setStatus('offline')
        }
      } catch (error) {
        console.error(error)
      }
    }

    try {
      await getCookie()
      const cookie = sessionStorage.getItem('cookie')
      const netInfomation = await getNetInfomation()
      await getPlatformList(cookie, netInfomation?.ip?.value)
      connectToNet(cookie as string, netInfomation?.ip?.value)
    } catch (error: any) {
      if (error?.code === 502 && error?.data?.code === -1 && error?.data?.cookies === null) {
        Message.error({
          content: '登录失败，请检查账号密码是否正确'
        })
        history.push('/login')
        setStatus('offline')
      }
    }
  }

  const handleMainCardClick = useCallback(() => {
    if (status === 'offline') {
      setStatus('logging')
      init()
    }
  }, [status])
  const handleOffline = (platform: Platform) => {
    Modal.confirm({
      title: '确认下线',
      content: `确认下线${platform.ip}吗？`,
      onOk: async () => {
        offlinePlatform(platform.link, sessionStorage.getItem('cookie') ?? '')
        if (platform.ip === netInfo.ip.value) {
          setStatus('offline')
        }
        setPlatformList(
          platformList?.map((item) => {
            if (item.link === platform.link) {
              return {
                ...item,
                endTime: new Date().format('yyyy-MM-dd hh:mm:ss')
              }
            }
            return item
          }) ?? null
        )
      }
    })
  }
  const handleNameChange = ({ val, id, ip }: { val: string; id: string; ip: string }) => {
    const nameStore = JSON.parse(localStorage.getItem('nameStore') || '{}')
    setPlatformList(
      platformList?.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name: val
          }
        }
        return item
      }) ?? null
    )
    nameStore[id] = val
    nameStore[ip] = val
    localStorage.setItem('nameStore', JSON.stringify(nameStore))
  }

  const mainCard = useMemo(() => {
    const content = (() => {
      switch (status) {
        case 'offline':
          return status
        case 'logging':
          return 'login...'
        case 'connect':
          return 'connecting...'
        default:
          return status
      }
    })()

    return (
      <div
        className={`w-full min-h-[380px] h-full mt-6 rounded-[15px] ${
          styles['main__background-card']
        } ${styles[`main__background-card__${status}`]}`}
        onClick={handleMainCardClick}
      >
        <div className={`w-full h-full flex items-center justify-center text-[45px]`}>
          {content}
        </div>
      </div>
    )
  }, [status, handleMainCardClick])

  useEffect(() => {
    init()
  }, [])
  useEffect(() => {
    if (location.search === '?refresh') {
      init('refresh')
    }
  }, [location])

  return (
    <div className={`main ${hidden ? 'main-hidden' : ''}`}>
      <div className="flex flex-grow-0 flex-shrink-0 w-full h-full">
        <div className="flex flex-col h-full max-w-[220px]">
          <NetInfoCard className="min-w-[220px]" netInfo={netInfo} />
          <BaseCard
            className="mt-4 h-full"
            title="知心客服"
            itemClassName="w-full h-full"
            listClassName="w-full h-full"
          >
            <img
              className="w-full h-full object-cover rounded-[9px]"
              src="https://grinzero.github.io/code-shared-awesome/_next/static/media/rili_bg.15455e2d.png"
            />
          </BaseCard>
        </div>
        <div className="flex flex-col ml-6 w-full h-full">
          <PlatformList
            platformList={platformList}
            currentIP={netInfo.ip.value}
            onOffline={handleOffline}
            onNameChange={handleNameChange}
          />
          {mainCard}
        </div>
      </div>
    </div>
  )
}

export default Main
