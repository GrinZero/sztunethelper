import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Drawer, Form, Input, Checkbox, Select, Message } from '@arco-design/web-react'
const { Option } = Select

import { fetchHosts, Host, updateRemoteHost } from '@renderer/api'
import type { ComponentProps } from '@renderer/types'

import HostList from '../HostList'
import styles from './index.module.scss'
import { submitSave } from '../helpers'
import { setHosts, setHost } from '@renderer/store'
import type { HostState } from '@renderer/store'

interface HostModuleProps extends ComponentProps {
  onChange?: (host: Host | undefined) => void
  onHostsChange?: (hosts: Host[]) => void
  current: string | null
}

const HostModule: React.FC<HostModuleProps> = ({
  className = '',
  current,
  onChange,
  onHostsChange
}) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [remoteLoading, setRemoteLoading] = useState(false)

  const [form] = Form.useForm()
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
      onHostsChange?.(result)
    }
  }
  const handleHostEdit = async (host: Host) => {
    dispatch(setHost(host))
    onChange?.(host)
    setVisible(true)
  }
  const handleUpdateRemote = async (host: Host) => {
    setRemoteLoading(true)
    try {
      const { data } = await updateRemoteHost(host)
      const result = await submitSave(data, () => Message.success('操作成功'))
      if (result) {
        dispatch(setHosts(result))
        onHostsChange?.(result)
        const newHost = result.find((item) => item.name === host.name)
        if (newHost) {
          dispatch(setHost(newHost))
          onChange?.(newHost)
        }
      }
    } catch (error: any) {
      console.error('handleUpdateRemote', error)
      if (error === 'request timeout') {
        Message.error('请求超时')
      } else {
        Message.error(error?.message)
      }
    }
    setRemoteLoading(false)
  }
  const handleOnOk = async () => {
    form.validate().then(async (val) => {
      setVisible(false)
      const newHost = { ...host, ...val }
      const newHosts = hosts?.map((item) => {
        if (item.name === host?.name) {
          return newHost
        }
        return item
      })

      if (JSON.stringify(hosts) === JSON.stringify(newHosts)) {
        return
      }
      const result = await submitSave(newHosts, () => Message.success('操作成功'))
      if (result) {
        dispatch(setHost(newHost))
        dispatch(setHosts(result))
        onHostsChange?.(result)
        onChange?.(newHost)
      }
    })
  }

  useEffect(() => {
    async function init() {
      const result = await fetchHosts()
      if (result.code === 200) {
        dispatch(setHosts(result.data))
        // onHostsChange?.(result.data)
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
        className={styles.drawer}
        title={'编辑Hosts'}
        width={'calc(100vw - 240px - 2rem)'}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleOnOk}
        key={host?.name}
      >
        <Form
          layout="vertical"
          className={`${styles.form}`}
          form={form}
          initialValues={host ?? {}}
          validateMessages={{
            string: {
              match: '请输入正确的链接'
            }
          }}
        >
          <Form.Item label="Host类型" field="type">
            <div className="flex flex-row">
              <Checkbox checked={host?.type === 'local'} disabled>
                本地
              </Checkbox>
              <Checkbox className={'ml-4'} checked={host?.type === 'remote'} disabled>
                远程
              </Checkbox>
            </div>
          </Form.Item>
          <Form.Item
            label="名称"
            field="name"
            defaultValue={host?.name ?? ''}
            rules={[{ required: true }, { maxLength: 10 }]}
          >
            <Input defaultValue={host?.name ?? ''} />
          </Form.Item>
          {host?.type === 'remote' && (
            <>
              <Form.Item
                label="URL"
                field="url"
                required
                rules={[
                  {
                    match: /[a-zA-z]+:\/\/[^\s]*/
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="自动更新" field="autoUpdate" required>
                <Select>
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
              <div className={styles.info}>
                <span>
                  最后更新：
                  {host?.updateTime
                    ? new Date(host.updateTime).format('yyyy-MM-dd hh:mm:ss')
                    : '从未'}
                </span>
                <span
                  className={`ml-2 font-bold ${
                    remoteLoading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                  }`}
                  onClick={() => {
                    handleUpdateRemote(host)
                  }}
                >
                  手动更新
                </span>
              </div>
            </>
          )}
        </Form>
      </Drawer>
    </>
  )
}

export default HostModule
