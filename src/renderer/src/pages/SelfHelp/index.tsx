import { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'

import { BaseElement, BasePopover, BaseButton, BaseCard, SmallScreen } from '@renderer/components'
const { Title } = BaseElement

import NetTaskList from './NetTaskList'

import { getNetTasks, runNetTask } from '@renderer/api'
import type { NetTask } from '@renderer/api'

import styles from './index.module.scss'

const initList: NetTask[] = []

interface NetTaskResult {
  id: NetTask['id']
  content: string
  title: string
}

const SelfHelp = () => {
  const match = useRouteMatch(['/self_help'])
  const hidden = match === null

  const [netTaskList, setNetTaskList] = useState<NetTask[]>(initList)
  const [netTaskResult, setNetTaskResult] = useState<NetTaskResult[] | null>(null)

  useEffect(() => {
    //TODO:该请求必定成功，所以最快写法，忽略了status，但是可以修补
    getNetTasks().then((res) => {
      setNetTaskList(res.data)
    })
  }, [])

  const handleGo = (item: NetTask) => {
    if (item.type !== 'success') {
      return
    }
    const id = `netTaskResult-${item.id}`
    const ele = document.getElementById(id)
    if (ele) {
      ele.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  //该函数被setTimeout调用，要注意陷阱
  const handleClick = async (item: NetTask) => {
    const setNetTaskStatus = (id: NetTask['id'], type: NetTask['type']) => {
      setNetTaskList((prev) => {
        return prev.map((task) => {
          if (task.id === id) {
            task.type = type
          }
          return task
        })
      })
    }

    setNetTaskStatus(item.id, 'loading')
    const result = await runNetTask(item.id).catch((err) => {
      setNetTaskStatus(item.id, 'fail')
      console.error('runNetTask:error', err, item)
    })
    if (!result) return
    setNetTaskResult((prev) => {
      if (prev === null) {
        return [{ id: item.id, content: result.data, title: item.title }]
      }
      if (prev.some((task) => task.id === item.id)) {
        return prev.map((task) => {
          if (task.id === item.id) {
            task.content = result.data
          }
          return task
        })
      }
      return [...prev, { id: item.id, content: result.data, title: item.title }]
    })
    setNetTaskStatus(item.id, 'success')
    setTimeout(() => {
      handleGo({ ...item, type: 'success' })
    }, 100)
  }

  return (
    <div className={`${styles.container} main ${hidden ? 'main-hidden' : ''}`}>
      <div className="flex flex-row w-full flex-1">
        <div className={`w-[270px] min-w-[270px] flex flex-col flex-none`}>
          <Title className={`mb-2 ml-1 flex flex-row items-center justify-between`}>
            <BasePopover
              position="right"
              content="自助服务为您提供了本机网络环境的检测，帮助您快速将网络诊断报告输出"
            >
              <div className={`flex flex-row items-center`}>
                <svg className="icon mr-1 mt-0.5 cursor-help">
                  <use xlinkHref="#icon-project"></use>
                </svg>
                <span>自助服务</span>
              </div>
            </BasePopover>
            <BaseButton
              onClick={() => {
                setNetTaskList(
                  netTaskList.map((task) => {
                    return {
                      ...task,
                      type: 'loading'
                    }
                  })
                )
                netTaskList.forEach((item, i) => {
                  setTimeout(() => {
                    handleClick(item)
                  }, i * 100 + 1000)
                })
              }}
            >
              全部输出
            </BaseButton>
          </Title>
          <NetTaskList list={netTaskList} onClick={handleClick} onGo={handleGo} />
        </div>
        <div className="flex flex-col w-full ml-4 overflow-hidden">
          <SmallScreen
            h={450}
            className={`flex flex-col items-center w-full`}
            status={'done'}
            nomoreNode={null}
          >
            {netTaskResult &&
              netTaskResult.map((result) => {
                return (
                  <BaseCard
                    scale="1"
                    title={result.title}
                    className={`w-[97.5%] mb-3`}
                    key={result.id}
                    id={`netTaskResult-${result.id}`}
                    itemClassName={`overflow-hidden elipsis`}
                  >
                    <span className="opacity-80 whitespace-pre-wrap">{result.content}</span>
                  </BaseCard>
                )
              })}
          </SmallScreen>
          <div className="flex flex-row mt-4">1234</div>
        </div>
      </div>
    </div>
  )
}

export default SelfHelp
