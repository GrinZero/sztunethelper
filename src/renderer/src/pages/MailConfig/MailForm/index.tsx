import React from 'react'
import { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { Message, Select } from '@arco-design/web-react'
import { IconQuestionCircle } from '@arco-design/web-react/icon'
import styles from './index.module.scss'
import { CoreInput, BaseElement, BaseButton, useTutorial } from '@renderer/components'
import { ComponentProps } from '@renderer/types'

const { Title } = BaseElement

export interface MailFormProps extends ComponentProps {
  onSubmit: (values: any) => void | Promise<void>
  status?: 'normal' | 'loading'
  defaultUserName?: string | null
  defaultPassword?: string | null
  defaultSelect?: string
}

export interface MailFormRef {
  mail: HTMLInputElement | null
  pass: HTMLInputElement | null
}

const imageSrc = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp'
]

const MailForm: React.ForwardRefRenderFunction<MailFormRef, MailFormProps> = (
  { className = '', onSubmit, status, defaultUserName, defaultPassword, defaultSelect = 'qq.com' },
  ref
) => {
  const [tutorial, setTutorialVisible] = useTutorial({
    children: imageSrc.map((src, index) => (
      <div key={index} style={{ width: '100%' }}>
        <img src={src} style={{ width: '100%' }} />
      </div>
    )),
    buttonClassName: styles['tutorial-button'],
    className: 'overflow-hidden'
  })

  const mailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<{ value: string }>({ value: defaultSelect })

  const [statusState, setStatus] = useState(status || 'normal')

  useImperativeHandle(ref, () => ({
    mail: mailRef.current,
    pass: passRef.current,
    select: selectRef.current
  }))

  const handleConfirm = async () => {
    const mail = mailRef.current?.value
    const pass = passRef.current?.value
    const suffix = selectRef.current.value
    if (mail && pass) {
      const result = onSubmit({ mail: `${mail}@${suffix}`, pass })
      if (result?.then) {
        setStatus('loading')
        result.finally(() => {
          setStatus('normal')
        })
      }
    } else {
      Message.warning('邮箱、授权码或者平台密码不能为空')
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
        className="mt-4"
        inputClassName={'py-4'}
        placeholder="邮箱"
        ref={mailRef}
        defaultValue={defaultUserName ?? ''}
        suffixNode={
          <div className={`${styles['mail-select__container']}`}>
            <Select
              className={styles['mail-select']}
              defaultValue="qq.com"
              showSearch
              onChange={(value) => {
                selectRef.current.value = value
              }}
            >
              <Select.Option value="qq.com">qq.com</Select.Option>
              <Select.Option value="163.com">163.com</Select.Option>
              <Select.Option value="foxmail.com">foxmail.com</Select.Option>
              <Select.Option value="gmail.com">gmail.com</Select.Option>
              <Select.Option value="mail.aliyun.com">mail.aliyun.com</Select.Option>
            </Select>
          </div>
        }
      />
      <CoreInput
        className={'mt-4'}
        inputClassName={'py-4'}
        placeholder="授权码"
        type="password"
        ref={passRef}
        onKeyDown={handleEnter}
        defaultValue={defaultPassword ?? ''}
        suffixNode={
          <div
            className="p-2 text-xl h-full flex flex-col justify-center items-center cursor-pointer"
            onClick={() => setTutorialVisible(true)}
          >
            <IconQuestionCircle />
          </div>
        }
      />
      <BaseButton
        round="square"
        theme="transparent"
        size="large"
        className={'w-full mt-4'}
        onClick={handleConfirm}
        status={status || statusState}
      >
        提交
      </BaseButton>
      {tutorial}
    </div>
  )
}

export default forwardRef(MailForm)
