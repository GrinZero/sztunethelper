import React from 'react'
import { useRef, useImperativeHandle, forwardRef } from 'react'
import { Message } from '@arco-design/web-react'
import styles from './index.module.scss'
import { CoreInput, BaseElement, BaseButton } from '@renderer/components'
import { ComponentProps } from '@renderer/types'

const { Title } = BaseElement

export interface LoginFormProps extends ComponentProps {
  onSubmit: (values: any) => void
  status?: 'normal' | 'loading'
  defaultUserName?: string | null
  defaultPassword?: string | null
}

export interface LoginFormRef {
  username: HTMLInputElement | null
  password: HTMLInputElement | null
}

const LoginForm: React.ForwardRefRenderFunction<LoginFormRef, LoginFormProps> = (
  { className = '', onSubmit, status = 'normal', defaultUserName, defaultPassword },
  ref
) => {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    username: usernameRef.current,
    password: passwordRef.current
  }))

  const handleConfirm = () => {
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value
    if (username && password) {
      onSubmit({ username, password })
    } else {
      Message.warning('用户名或密码不能为空')
    }
  }
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e
    if (key === 'Enter') {
      handleConfirm()
    }
  }

  return (
    <div className={`flex-col flex justify-center items-center ${className}`}>
      <Title className={`font-bold text-[72px] ${styles.title}`}>邮箱设置</Title>
      <CoreInput
        className="my-4"
        inputClassName={'py-4'}
        placeholder="邮箱"
        ref={usernameRef}
        defaultValue={defaultUserName ?? ''}
      />
      <CoreInput
        inputClassName={'py-4'}
        placeholder="授权码"
        type="password"
        ref={passwordRef}
        onKeyDown={handleEnter}
        defaultValue={defaultPassword ?? ''}
      />
      <BaseButton
        round="square"
        theme="transparent"
        size="large"
        className={'w-full mt-4'}
        onClick={handleConfirm}
        status={status}
      >
        提交
      </BaseButton>
    </div>
  )
}

export default forwardRef(LoginForm)
