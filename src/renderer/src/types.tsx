import React from 'react'

export interface ComponentProps {
  className?: string | string[]
  children?: Array<React.ReactNode> | React.ReactNode
}

export type DataStatus = 'ok' | 'error' | 'loading' | 'update' | 'empty' | 'done'

export interface Account {
  username: string
  password: string
}

export type HTMLDivProps = ComponentProps & React.HTMLAttributes<HTMLDivElement>
export type HTMLSpanProps = ComponentProps & React.HTMLAttributes<HTMLSpanElement>
export type HTMLAnchorProps = ComponentProps & React.HTMLAttributes<HTMLAnchorElement>

export type HTMLInputProps = ComponentProps & React.InputHTMLAttributes<HTMLInputElement>
export type HTMLTextAreaProps = ComponentProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export type HTMLButtonProps = ComponentProps & React.ButtonHTMLAttributes<HTMLButtonElement>
