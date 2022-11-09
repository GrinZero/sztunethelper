import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CodeEditor, BaseLine } from '@renderer/components'

import HostModule from './HostModule'
import SettingModule from './SettingModule'

import styles from './index.module.scss'
import { Host } from '@renderer/api'

const Setting = () => {
  const { theme } = useSelector((store: any) => store.base)

  const [host, setHost] = useState<Host>()
  const handleHostChange = (val?: Host) => setHost(val)
  const handleEditorChange = (val?: string) => {
    console.log(val)
  }

  return (
    <div className={`main ${styles.container}`}>
      <div className={`w-[240px] flex flex-col pr-4 ${styles.left}`}>
        <HostModule className={'mb-4'} onChange={handleHostChange} current={host?.name ?? null} />
        <BaseLine className={'mb-4 mt-2'} />
        <SettingModule className={'w-[240px]'} />
      </div>
      <div className="flex flex-col flex-grow rounded-lg overflow-hidden">
        <CodeEditor
          height={'100%'}
          theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
          value={host?.content}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  )
}

export default Setting
