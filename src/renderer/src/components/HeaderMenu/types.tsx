import type { ComponentProps } from '@renderer/types'

export interface MenuItemOption<T> {
  name: string
  key: string | number
  value?: T
}
export type MenuItemOptions<T> = MenuItemOption<T>[]

export interface HeaderMenuProps<T> extends ComponentProps {
  options: MenuItemOptions<T>
  onChange?: (value?: T, index?: number, option?: MenuItemOption<T>) => void
}
export interface HeaderRefProps {
  setCurrent: (val: number) => void
}
