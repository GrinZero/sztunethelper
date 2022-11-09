import React, { useState } from 'react'
import HostList from '../HostList'
import type { HostItem } from '../HostList'
import { useEffect } from 'react'
import { Drawer, Form, Input, Checkbox, Select } from '@arco-design/web-react'
const { Option } = Select
import styles from './index.module.scss'

import { fetchHosts } from '@renderer/api'
import { ComponentProps } from '@renderer/types'

const HostModule: React.FC<ComponentProps> = ({ className = '' }) => {
  const [visible, setVisible] = useState(false)
  const [hosts, setHosts] = useState<HostItem[]>([])
  const [host, setHost] = useState<HostItem>()

  const handleHostSwitch = (host: HostItem, val: boolean) => {
    const newHosts = hosts.map((item) => {
      if (item.name === host.name) {
        return { ...item, open: val }
      }
      return item
    })
    setHosts(newHosts)
  }
  const handleHostEdit = (host: HostItem) => {
    setHost(host)
    console.log(host)
    setVisible(true)
  }

  useEffect(() => {
    async function init() {
      const result = await fetchHosts()
      if (result.code === 200) {
        console.log(result.data)
        setHosts(result.data)
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
              </Form.Item>
            </>
          )}
        </Form>
      </Drawer>
    </>
  )
}

export default HostModule
