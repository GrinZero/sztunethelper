// import { useSelector } from 'react-redux'
import styles from './index.module.scss'
import { BaseList } from '@renderer/components'
import CheckRow from './CheckRow'

import type { StatusIconProps } from '@renderer/components'
interface CheckRowProps {
  type: StatusIconProps['type']
  command: 'ping' | 'traceroute' | 'ipconfig'
  title: string
  value: string
}

const initList: CheckRowProps[] = [
  {
    type: 'init',
    title: '检测内网网关',
    value: '内网网关',
    command: 'ping'
  },
  {
    type: 'init',
    title: '检测校园网网络服务器',
    value: 'ping 10.99.99.99',
    command: 'ping'
  },
  {
    type: 'init',
    title: '检测校园网宿舍认证服务器',
    value: 'ping 47.98.217.39',
    command: 'ping'
  },
  {
    type: 'init',
    title: '检测本地TCP/IP协议',
    value: 'ping 127.0.0.1',
    command: 'ping'
  },
  {
    type: 'init',
    title: '检测外网网络(114.114.114.114)',
    value: 'ping 114.114.114.114',
    command: 'ping'
  },
  {
    type: 'init',
    title: '检测DNS是否正常解析',
    value: 'ping www.baidu.com',
    command: 'ping'
  },
  {
    type: 'init',
    title: '检测本地hosts文件是否正常',
    value: 'ping localhost',
    command: 'ping'
  },
  {
    type: 'init',
    title: '获取网络报告',
    value: '47.98.217.39',
    command: 'ipconfig'
  }
]

const SelfHelp = () => {
  // const netInfo = useSelector((store: any) => store.netInfo)

  return (
    <div className={`${styles.container} main`}>
      <BaseList className={`w-[300px]`}>
        {initList.map((item, index) => {
          return (
            <CheckRow
              key={index}
              type={item.type}
              onClick={() => {
                console.log('click')
              }}
            >
              {item.title}
            </CheckRow>
          )
        })}
      </BaseList>
    </div>
  )
}

export default SelfHelp
