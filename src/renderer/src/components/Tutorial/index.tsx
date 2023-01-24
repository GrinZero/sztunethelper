import React, { useMemo, useState } from 'react'
import { Button, Carousel, Modal } from '@arco-design/web-react'
import type { CarouselProps } from '@arco-design/web-react'
import styles from './index.module.scss'

type UseTutorialHanlder = (props: {
  children: React.ReactElement | React.ReactElement[]
  position?: 'absolute' | 'relative'
  buttonClassName?: string
  className?: string
  carouselProps?: CarouselProps
}) => [React.ReactElement, (visible: boolean) => void, (index: number) => void]

export const useTutorial: UseTutorialHanlder = ({
  children,
  position = 'absolute',
  buttonClassName = '',
  className = '',
  carouselProps = {}
}) => {
  const [visible, setVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const hidden = () => {
    setVisible(false)
    setCurrentIndex(0)
  }

  const ele = useMemo(
    () => (
      <Modal
        visible={visible}
        closable={false}
        onOk={hidden}
        maskClosable={false}
        footer={null}
        className={`${styles['modal']} ${className}`}
      >
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
          onClick={hidden}
        >
          确定
        </Button>
      </Modal>
    ),
    [visible, children, currentIndex]
  )

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
