import React, { useState } from 'react'
import { Button, Carousel, Modal } from '@arco-design/web-react'
import type { CarouselProps } from '@arco-design/web-react'
import styles from './index.module.scss'
import { UseModalProps, useModal } from '@renderer/hooks'

type UseTutorialHanlder = (props: {
  children: React.ReactElement | React.ReactElement[]
  position?: 'absolute' | 'relative'
  buttonClassName?: string
  className?: string
  carouselProps?: CarouselProps
  modalProps?: UseModalProps
}) => [React.ReactElement, (visible: boolean) => void, (index: number) => void]

export const useTutorial: UseTutorialHanlder = ({
  children,
  position = 'absolute',
  buttonClassName = '',
  className = '',
  carouselProps = {},
  modalProps = {}
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const [ele, setVisible] = useModal({
    className: `${className}`,
    children: (
      <>
        <Carousel
          indicatorType="slider"
          currentIndex={currentIndex}
          onChange={setCurrentIndex}
          {...carouselProps}
        >
          {children}
        </Carousel>
        <Button
          type="primary"
          className={`${styles['button-' + position]} right-0 bottom-0 ${buttonClassName} ${
            currentIndex === (Array.isArray(children) ? children : [children]).length - 1
              ? 'visible'
              : 'invisible'
          }`}
          onClick={() => {
            setVisible(false)
            setCurrentIndex(0)
          }}
        >
          确定
        </Button>
      </>
    ),
    closable: false,
    ...modalProps
  })

  return [ele, setVisible, setCurrentIndex]
}

const Tutorial = () => {
  return (
    <Modal visible={false}>
      <Carousel></Carousel>
    </Modal>
  )
}

export default Tutorial
