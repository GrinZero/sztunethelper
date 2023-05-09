import type { HostItem } from '../HostList'
import { Message, Modal } from '@arco-design/web-react'
import { Host, saveHosts } from '@renderer/api'
import { CoreInput } from '@renderer/components'

const submitSave = async (
  newHosts: HostItem[],
  onSuccess?: (value: Host[]) => void
): Promise<false | HostItem[]> =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve) => {
    if (!newHosts) resolve(false)
    try {
      const res = await saveHosts(newHosts)
      onSuccess?.(res.data)
      resolve(res.data)
      return
    } catch (error: any) {
      console.error('submitSave', error)
      if (error?.code === 403) {
        Message.error('没有写入Hosts文件的权限')
        const handleFinish = async (modalInstance: any) => {
          const sudo = (document.getElementById('sudo') as HTMLInputElement).value
          if (!sudo) return
          await window.storage.set('sudo', sudo)
          modalInstance.close()
          setTimeout(() => {
            resolve(submitSave(newHosts, onSuccess))
          }, 0)
        }
        const modalInstance = Modal.confirm({
          title: '请输入你的登陆密码（sudo密码）',
          content: (
            <CoreInput
              id="sudo"
              className="flex"
              inputClassName={'py-2'}
              autoFocus={true}
              type="password"
            />
          ),
          onOk: () => handleFinish(modalInstance)
        })
        return
      }
      resolve(false)
    }
  })

export { submitSave }
