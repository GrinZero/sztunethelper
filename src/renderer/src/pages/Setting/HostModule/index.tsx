import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Drawer, Form, Input, Checkbox, Select, Message } from '@arco-design/web-react'
const { Option } = Select

import { fetchHosts, Host } from '@renderer/api'
import type { ComponentProps } from '@renderer/types'

import HostList from '../HostList'
import styles from './index.module.scss'
import { submitSave } from '../helpers'
import { setHosts, setHost } from '@renderer/store'
import type { HostState } from '@renderer/store'

interface HostModuleProps extends ComponentProps {
  onChange?: (host: Host | undefined) => void
  current: string | null
}

const HostModule: React.FC<HostModuleProps> = ({ className = '', current, onChange }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const { hosts, host } = useSelector<any, HostState>((store: any) => store.host)

  const handleHostSwitch = async (host: Host, val: boolean) => {
    const newHosts =
      hosts?.map((item) => {
        if (item.name === host.name) {
          return { ...item, open: val }
        }
        return item
      }) ?? []
    const result = await submitSave(newHosts, () => Message.success('操作成功'))
    if (result) {
      dispatch(setHosts(result))
    }
  }
  const handleHostEdit = async (host: Host) => {
    dispatch(setHost(host))
    setVisible(true)
  }
  const handleUpdateRemote = async (host: Host) => {
    console.log(host)
  }

  useEffect(() => {
    async function init() {
      const result = await fetchHosts()
      if (result.code === 200) {
        dispatch(setHosts(result.data))
        onChange?.(result.data[0])
      }
    }
    init()
  }, [])
  return (
    <>
      <HostList
        className={className}
        data={hosts}
        onSwitch={handleHostSwitch}
        onEdit={handleHostEdit}
        onClick={(_host) => onChange?.(_host)}
        current={current}
      />
      <Drawer
        title={'编辑Hosts'}
        width={'calc(100vw - 240px - 2rem)'}
        visible={visible}
        onCancel={() => setVisible(false)}
        key={host?.name}
      >
        <Form layout="vertical" className={`${styles.form}`}>
          <Form.Item label="Host类型">
            <div className="flex flex-row">
              <Checkbox checked={host?.type === 'local'} disabled>
                本地
              </Checkbox>
              <Checkbox className={'ml-4'} checked={host?.type === 'remote'} disabled>
                远程
              </Checkbox>
            </div>
          </Form.Item>
          <Form.Item label="名称">
            <Input defaultValue={host?.name ?? ''} />
          </Form.Item>
          {host?.type === 'remote' && (
            <>
              <Form.Item label="URL">
                <Input defaultValue={host?.url ?? ''} />
              </Form.Item>
              <Form.Item label="自动更新">
                <Select defaultValue={host?.autoUpdate}>
                  <Option value="never">从不</Option>
                  <Option value="1m">1分钟</Option>
                  <Option value="5m">5分钟</Option>
                  <Option value="15m">15分钟</Option>
                  <Option value="30m">30分钟</Option>
                  <Option value="1h">1小时</Option>
                  <Option value="1d">1天</Option>
                  <Option value="7d">7天</Option>
                </Select>
                <div className={styles.info}>
                  <span>
                    最后更新：
                    {host?.updateTime
                      ? new Date(host.updateTime).format('yyyy-MM-dd hh:mm:ss')
                      : '从未'}
                  </span>
                  <span
                    className="ml-2 font-bold cursor-pointer"
                    onClick={() => {
                      handleUpdateRemote(host)
                    }}
                  >
                    手动更新
                  </span>
                </div>
              </Form.Item>
            </>
          )}
        </Form>
      </Drawer>
    </>
  )
}

export default HostModule
