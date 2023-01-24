import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Modal, Button } from '@arco-design/web-react'
import styles from './index.module.scss'

// 第一步，查询是否设置了本地邮箱地址、授权码、服务器等信息
//   - 没有，跳转邮箱设置页面

const useMailStorage = () => {
  const history = useHistory()
  const [state] = useState()
  useEffect(() => {
    window.storage
      .get<string>('local-mail')
      .then((result) => {
        if (result === null) {
          // 跳转到邮箱设置页面
          Modal.confirm({
            title: '提示',
            content: '请先设置本地邮箱信息',
            escToExit: false,
            maskClosable: false,
            simple: true,
            closable: false,
            footer: (
              <Button
                type="primary"
                size="large"
                long
                onClick={() => {
                  history.push('/mail_config')
                  Modal.destroyAll()
                }}
              >
                去设置
              </Button>
            )
          })
        }
      })
      .catch((err) => {
        console.error('useMailStorage', err)
      })
  }, [])
  return state
}

const MessagePage = () => {
  useMailStorage()
  return <div className={`${styles.container} main`}>开发中敬请谅解期待</div>
}

export default MessagePage
