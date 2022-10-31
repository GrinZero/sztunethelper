import React from 'react'
import { Popover, PopoverProps } from '@arco-design/web-react'

export type BasePopoverProps = PopoverProps & { children: React.ReactNode }

/**
 * 和arco-design的Popover一模一样的用法，区别是强制选中了挂载节点
 * @date 2022-09-04
 * @param {any} {...rest}
 * @returns {any}
 */
const BasePopover: React.FC<BasePopoverProps> = ({ children, ...rest }) => {
  return (
    <Popover getPopupContainer={() => document.getElementById('root') as HTMLElement} {...rest}>
      {children}
    </Popover>
  )
}

export default BasePopover
