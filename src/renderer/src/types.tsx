import React from 'react'

export interface ComponentProps {
  className?: string | string[]
  children?: Array<React.ReactNode> | React.ReactNode
}

export type DataStatus = 'ok' | 'error' | 'loading' | 'update' | 'empty'

export interface Account {
  username: string
  password: string
}

export type HTMLDivProps = ComponentProps & React.HTMLAttributes<HTMLDivElement>

export type HTMLInputProps = ComponentProps & React.InputHTMLAttributes<HTMLInputElement>

export type HTMLButtonProps = ComponentProps & React.ButtonHTMLAttributes<HTMLButtonElement>
