import apiStore from '../apiStore'

import { CheckNetTaskList } from '../../config'
import { ifconfig, ping, netstat, arp, tracert } from '../../controllers/netInfo/command'

import type { CheckNetTask } from '../../config'
import type { ApiResult } from '../type'

apiStore.add('getNetTasks', async (): ApiResult<CheckNetTask[]> => {
  return {
    code: 200,
    data: CheckNetTaskList.map((task) => {
      return {
        ...task,
        type: 'init'
      }
    })
  }
})

apiStore.add(
  'runNetTask',
  async ({ id, data }: { id: CheckNetTask['id']; data: any }): ApiResult<string> => {
    const task = CheckNetTaskList.find((item) => item.id === id)
    if (!task) {
      return {
        code: 404,
        data: '任务不存在'
      }
    }
    const { command, args } = task

    return {
      code: 200,
      data: await (async () => {
        switch (command) {
          case 'ping': {
            if (args[0] === '内网网关') {
              return await ping(data)
            }
            return await ping(args[0])
          }
          case 'ifconfig':
            return await ifconfig()
          case 'netstat': {
            const result = await netstat()
            return result
          }
          case 'arp':
            return await arp()
          case 'tracert':
            return await tracert(args[0])
          default:
            return '未知命令'
        }
      })()
    }
  }
)
