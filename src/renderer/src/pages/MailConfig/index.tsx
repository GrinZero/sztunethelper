import { useHistory } from 'react-router'
import { Modal, Message } from '@arco-design/web-react'
import { HistoryCrumb, VerifyCodeInput, BaseCard } from '@renderer/components'
import MailForm from './MailForm'
import { verifyMail, auth, sendVeirfyCode } from '@renderer/api'
import { useModal } from '@renderer/hooks'

import styles from './index.module.scss'
import { useRef } from 'react'

const MailConfig = () => {
  const history = useHistory()
  const formRef = useRef<{ mail: string | null; pass: string | null }>({ mail: null, pass: null })

  const handleDone = async (v: string) => {
    const { mail, pass } = formRef.current
    if (!(mail && pass)) {
      throw new Error("Why don' have mail?")
    }
    const result = await auth(mail, v)
    if (result.data?.error) {
      Message.error(String(result.data.error))
      throw new Error(result.data.error)
    }
    await window.storage.set('local-mail', { mail, pass }).catch((err) => {
      console.error('local-mail: set error', err)
    })

    history.push('/message')
  }
  const [modalEle, setModalVisible] = useModal({
    children: (
      <BaseCard title="请查收邮箱并输入邮箱验证码" scale="1">
        <VerifyCodeInput type="number" onDone={handleDone} count={6} />
      </BaseCard>
    ),
    className: `max-w-[390px] overflow-hidden ${styles['modal']}`
  })

  const handleSubmit = async ({ mail, pass }) => {
    const result = await verifyMail(mail, pass).catch((error) => {
      console.error('verifyMail:error', error)
      Modal.error({
        title: '提示',
        content: '邮箱或授权码错误，请重新输入'
      })
    })
    if (!result) {
      return
    }

    const instance = Modal.confirm({
      title: '提示',
      content: `已向您的邮箱${mail}发送了一封验证邮件，请前往邮箱查看。如您确认收到，点击继续`,
      okText: '继续',
      onOk: async () => {
        formRef.current.mail = mail
        formRef.current.pass = pass
        instance.update({
          confirmLoading: true
        })
        try {
          await sendVeirfyCode(mail)
          Message.success({
            content: '邮箱验证码发送成功，请接收！'
          })
          setModalVisible(true)
        } catch (error) {
          Modal.error({
            content: '邮箱验证码发送失败：' + String(error)
          })
        } finally {
          instance.update({
            confirmLoading: false
          })
        }
      }
    })
  }

  return (
    <div className={`main flex-col items-center justify-center`}>
      <MailForm className={`w-[600px] mb-[144px]`} onSubmit={handleSubmit} />
      <HistoryCrumb />
      {modalEle}
    </div>
  )
}

export default MailConfig
