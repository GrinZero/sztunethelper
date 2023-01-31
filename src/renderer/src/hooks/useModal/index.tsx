import { useState, useMemo } from 'react'
import styles from './index.module.scss'
import { Modal, ModalProps } from '@arco-design/web-react'

interface UseModalProps extends ModalProps {
  className?: string
  children: React.ReactElement | React.ReactElement[]
}
type UseModalHandler = (props: UseModalProps) => [React.ReactElement, (visible: boolean) => void]

const useModal: UseModalHandler = ({ className = '', children, ...rest }) => {
  const [visible, setVisible] = useState(false)

  const ele = useMemo(
    () => (
      <Modal
        visible={visible}
        maskClosable={false}
        footer={null}
        className={`${styles['modal']} ${className}`}
        onCancel={() => setVisible(false)}
        {...rest}
      >
        {children}
      </Modal>
    ),
    [visible, children]
  )

  return [ele, setVisible]
}

export { useModal }
