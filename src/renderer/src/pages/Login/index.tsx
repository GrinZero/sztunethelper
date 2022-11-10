// import styles from './index.module.scss';
import { useHistory } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { Message, Modal } from '@arco-design/web-react'
import { useSelector, useDispatch } from 'react-redux'

import LoginForm from './LoginForm'
import type { LoginFormRef } from './LoginForm'
import AccountStore from './AccountStore'
import type { AccountInStore } from './AccountStore'
import { pushAccount, deleteAccount, setCurrentAccount } from '@renderer/store'

import { login } from '@renderer/api'
import { Account } from '@renderer/types'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const formRef = useRef<LoginFormRef>(null)

  const [username, setUserName] = useState('')

  useEffect(() => {
    const init = async () => {
      const username = await window.storage.get<string>('username')
      setUserName(username || '')
    }
    init()
  }, [])

  const { accountStore, currentAccount } = useSelector((store: any) => store.account) as {
    accountStore: AccountInStore[]
    currentAccount: Account
  }

  const [formStatus, setFormStatus] = useState<'normal' | 'loading'>('normal')
  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      setFormStatus('loading')
      const result = await login(values)

      if (result.code !== 200) {
        throw result
      }
      Message.success('登陆成功')
      if (!accountStore.find((item) => item.username === values.username)) {
        dispatch(pushAccount({ ...values, packageData: String(result.data.data) }))
      }
      dispatch(setCurrentAccount(values))
      setTimeout(() => {
        history.push('/index?refresh')
      }, 0)
    } catch (error: any) {
      if (error?.code === 502 && error?.data?.code === -1 && error?.data?.cookies === null) {
        Message.error('登录失败，请检查账号密码是否正确')
      } else {
        Message.error(String(error?.data?.message ?? error?.code ?? error))
      }
    } finally {
      setFormStatus('normal')
    }
  }
  const handleChoose = (account: AccountInStore) => {
    if (!formRef.current) {
      return
    }
    dispatch(setCurrentAccount(account))
    setUserName(account.username)
    if (formRef.current.password) {
      formRef.current.password.value = account.password
    }
    if (formRef.current.username) {
      formRef.current.username.value = account.username
    }
  }
  const handleDelete = (account: AccountInStore) => {
    Modal.confirm({
      title: '删除提示',
      content: `确认删除${account.username}吗？`,
      onOk: () => {
        dispatch(deleteAccount(account))
      }
    })
  }

  return (
    <div className={`main flex-col items-center`}>
      <LoginForm
        className={'w-[60%] mt-16 flex-shrink-0'}
        onSubmit={handleSubmit}
        status={formStatus}
        defaultUserName={currentAccount.username}
        defaultPassword={currentAccount.password}
        ref={formRef}
      />
      {accountStore.length > 0 && (
        <AccountStore
          onChoose={handleChoose}
          onDelete={handleDelete}
          current={username}
          data={accountStore}
          className={`mt-12 w-[85%] min-h-[180px]`}
        />
      )}
    </div>
  )
}

export default Login
