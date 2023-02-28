import React from 'react'
import { ThemeSwitch } from 'magic-design-react'
import { useHistory } from 'react-router-dom'
import { IconUser } from '@arco-design/web-react/icon'

import styles from './index.module.scss'
import { MoreInfo } from '@renderer/components'
import type { MoreInfoProps } from '@renderer/components'

import type { ComponentProps } from '@renderer/types'

interface HeaderRightBoxProps extends ComponentProps {
  src?: string
  onChange?: (value: string) => unknown
  theme?: 'dark' | 'light'
  mornInfoProps?: MoreInfoProps
}

const HeaderRightBox: React.FC<HeaderRightBoxProps> = ({
  onChange,
  className = '',
  theme,
  mornInfoProps,
  src
}) => {
  const history = useHistory()
  const inWebClassName = window.bridge
    ? ''
    : 'cursor-not-allowed filter-grayscale opacity-50 pointer-events-none'

  const accountEle = (
    <div
      className={`p-[9px] cursor-pointer app-no-drag ${inWebClassName}`}
      onClick={() => history.push('/login')}
    >
      {src ? (
        <img className={`w-8 h-8 rounded-[50%] object-cover ${styles.img}`} src={src} />
      ) : (
        <div className={`w-8 h-8 rounded-[50%] ${styles.img}`}>
          <IconUser />
        </div>
      )}
    </div>
  )
  const moreInfoLength = mornInfoProps?.infoList?.length || 0
  return (
    <div className={`min-w-[120px] flex flex-row items-center ${className}`}>
      <ThemeSwitch defaultTheme={'dark'} onChange={onChange} theme={theme} />
      <div className="p-[9px] cursor-pointer app-no-drag" onClick={() => history.push('/message')}>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="24"
        >
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"></path>
        </svg>
      </div>
      <div
        className={`p-[9px] cursor-pointer app-no-drag ${inWebClassName}`}
        onClick={() => history.push('/setting')}
      >
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
            d="M960 414.72l-81.92-18.432c-6.144-20.48-14.848-39.936-24.576-58.88l44.544-74.24c16.384-26.624 25.088-65.536 0-90.624l-45.056-45.056c-12.288-11.776-28.16-17.92-45.056-17.408-16.896 0-34.304 5.632-47.616 14.336l-72.192 46.08c-18.944-9.728-38.4-17.92-58.368-24.576l-18.432-82.944C605.696 32.768 579.072 0 543.744 0H479.744c-35.328 0-56.832 33.28-64 64l-20.48 81.92c-21.504 6.656-42.496 15.872-62.464 26.112l-73.728-47.104c-13.824-9.216-30.72-14.336-47.616-14.336-16.896-0.512-32.768 5.632-45.056 17.408l-45.056 45.056c-25.088 25.088-16.384 64 0 90.624l46.592 77.824c-8.704 17.92-16.384 35.84-22.528 54.784l-81.92 18.432C32.768 420.352 0 446.976 0 482.304v64c0 35.328 33.28 56.832 64 64l82.944 20.48c5.632 17.408 12.8 34.304 20.992 51.2l-46.592 77.824c-16.384 26.624-25.088 65.536 0 90.624l45.056 45.056c12.288 12.288 28.672 17.408 45.056 17.408 16.896 0 34.304-5.632 47.616-14.336l73.728-47.104c19.968 10.752 40.96 19.456 62.464 26.112l20.48 81.92c7.168 30.72 28.672 64 64 64h64c35.328 0 61.952-32.768 67.584-63.488l18.432-83.456c19.968-6.656 39.424-14.848 57.856-24.064l72.192 46.08c12.8 8.704 30.208 14.336 47.616 14.336 16.896 0.512 33.28-5.632 45.056-17.408l45.056-45.056c25.088-25.088 16.384-64 0-90.624l-44.544-74.24c8.704-17.408 16.896-35.84 23.04-54.784l82.944-20.48c30.72-7.168 64-28.672 64-64V482.304c0.512-35.328-32.768-61.952-62.976-67.584z m-447.488 251.904c-85.504 0-154.624-69.12-154.624-154.112 0-85.504 69.12-154.624 154.624-154.624s154.624 69.12 154.624 154.624c0 84.992-69.12 154.112-154.624 154.112z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      {moreInfoLength > 0 ? (
        <MoreInfo trigger={'hover'} customTrigger={accountEle} {...mornInfoProps} />
      ) : (
        accountEle
      )}
    </div>
  )
}

export default HeaderRightBox
