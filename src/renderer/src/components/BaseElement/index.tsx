import React from 'react'

import { BaseElementProps } from './types'

import Title from './Title'

const BaseElement: React.FC<BaseElementProps> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>
}

const _BaseElement = BaseElement as React.FC<BaseElementProps> & {
  Title: typeof Title
}
_BaseElement.Title = Title

export default _BaseElement
export * from './types'
