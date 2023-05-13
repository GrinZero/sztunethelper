import { useSelector, useDispatch } from 'react-redux'
import { CodeEditor, BaseLine } from '@renderer/components'

import HostModule from './HostModule'
import SettingModule from './SettingModule'

import styles from './index.module.scss'
import { Host } from '@renderer/api'
import { HostState, setHost, setHosts } from '@renderer/store'
import { submitSave } from './helpers'

import { debounce, getHostsContent } from '@renderer/utils'
import { useUpdateKey } from '@renderer/hooks'
// import { Message } from '@arco-design/web-react'

const Setting = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((store: any) => store.base)
  const { hosts, host } = useSelector<any, HostState>((store: any) => store.host)
  const [key, update] = useUpdateKey()

  const handleHostChange = (val?: Host) => {
    if (val === host) {
      return
    }
    dispatch(setHost(val ?? null))
    update()
  }
  const onEditorChange = debounce(async (val?: string) => {
    const newHosts = hosts.map((item) => {
      if (item.name === host?.name) {
        return { ...item, content: val ?? '' }
      }
      return item
    })

    const result = await submitSave(newHosts)
    if (result) {
      dispatch(setHosts(result))
      dispatch(setHost(!host ? null : { ...host, content: val ?? '' }))
    }
  }, 500)

  const handleEditorSave = async (val?: string) => {
    if (host?.type === 'system') {
      return
    }
    onEditorChange(val)
  }

  const content = host?.type === 'system' ? getHostsContent(hosts) : host?.content ?? ''

  return (
    <div className={`main ${styles.container}`}>
      <div className={`w-[240px] flex flex-col pr-4 ${styles.left}`}>
        <HostModule
          className={'mb-4'}
          onChange={handleHostChange}
          onHostsChange={() => {
            if (host?.type === 'system') {
              update()
            }
          }}
          current={host?.name ?? null}
        />
        <BaseLine className={'mb-4 mt-2'} />
        <SettingModule className={'w-[240px]'} />
      </div>
      <div
        className={`relative flex flex-col flex-grow rounded-lg overflow-hidden ${
          host?.mode === 'edit' ? '' : styles['not-allow-edit']
        }`}
      >
        <CodeEditor
          key={`${host?.name}-${key}`}
          height={'100%'}
          theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
          defaultValue={String(content)}
          onChange={handleEditorSave}
        />
      </div>
    </div>
  )
}

export default Setting
