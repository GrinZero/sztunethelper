import React from 'react'
import { useHistory } from 'react-router-dom'
import type { ComponentProps } from '@renderer/types'
import { IconLeft } from '@arco-design/web-react/icon'
import styles from './index.module.scss'

export interface HistoryCrumbProps extends ComponentProps {
  position?: 'fixed' | 'relative'
  type?: 'button' | 'link'
}

export const HistoryCrumb: React.FC<HistoryCrumbProps> = ({
  position = 'fixed',
  type = 'button'
}) => {
  const history = useHistory()

  const ele = (() => {
    switch (type) {
      case 'button':
        return (
          <button onClick={() => history.goBack()}>
            <IconLeft />
          </button>
        )
      default:
        return null
    }
  })()

  return (
    <div
      className={`${styles['history-crumb-container']} ${
        styles['history-crumb-container__' + position]
      }`}
    >
      {ele}
    </div>
  )
}

export default HistoryCrumb
