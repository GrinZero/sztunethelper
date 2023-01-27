import { useHistory } from 'react-router'
import { Modal } from '@arco-design/web-react'
import { HistoryCrumb, VerifyCodeInput } from '@renderer/components'
import MailForm from './MailForm'
import { verifyMail } from '@renderer/api'
import { useModal } from '@renderer/hooks'

const MailConfig = () => {
  const history = useHistory()

  const handleDone = async (v: string) => {
    console.log(v)
  }
  const [modalEle, setModalVisible] = useModal({
    children: (
      <div>
        <VerifyCodeInput type="number" onDone={handleDone} count={6} />
      </div>
    ),
    className: '',
    visible: true
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

    const handleOk = async () => {
      setModalVisible(true)

      window.storage
        .set('local-mail', { mail, pass })
        .then(() => {
          history.push('/mail_config')
        })
        .catch((err) => {
          console.error('local-mail: set error', err)
        })
    }

    Modal.confirm({
      title: '提示',
      content: `已向您的邮箱${mail}发送了一封验证邮件，请前往邮箱查看。如您确认收到，点击继续`,
      okText: '继续',
      onOk: handleOk
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
