import React, { useState } from 'react'
import { Drawer, DrawerProps } from '@arco-design/web-react'

export const useDrawer = (
  props: Omit<DrawerProps, 'onOk' | 'onCancel'> & {
    onOk?: () => boolean | void | Promise<void | boolean>
    onCancel?: () => boolean | void | Promise<void | boolean>
  }
): [React.ReactElement, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [visible, setVisible] = useState(false)

  const { onOk, onCancel } = props
  props.onOk = () => {
    const result = onOk?.()
    if (typeof result === 'object' && result.then) {
      result.then((res) => {
        res !== false && setVisible(false)
      })
      return
    }
    result !== false && setVisible(false)
  }
  props.onCancel = () => {
    const result = onCancel?.()
    if (typeof result === 'object' && result.then) {
      result.then((res) => {
        res !== false && setVisible(false)
      })
      return
    }
    result !== false && setVisible(false)
  }

  const ele = <Drawer visible={visible} {...props}></Drawer>

  return [ele, setVisible]
}
