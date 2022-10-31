import React, { useState, forwardRef, useImperativeHandle, useCallback } from 'react'
import MenuItem from './MenuItem'

import type { HeaderRefProps, HeaderMenuProps } from './types'

const HeaderMenu: React.ForwardRefRenderFunction<HeaderRefProps, HeaderMenuProps<any>> = (
  { className = '', options, onChange },
  ref
) => {
  const [current, setCurrent] = useState(0)
  useImperativeHandle(ref, () => ({ setCurrent }))

  const handleCurrentChange = useCallback((e: any) => {
    const index = Number(e.target.dataset.index)
    setCurrent(index)
    onChange?.(options[index].value ?? options[index].name, index, options[index])
  }, [])
  return (
    <div className={`flex flex-row relative ${className}`}>
      {/* <div className="app-drag w-full h-full absolute z-10"></div> */}
      {options.map((item, index) => (
        <MenuItem
          key={item.key}
          active={current === index}
          onClick={handleCurrentChange}
          data-index={index}
        >
          {item.name}
        </MenuItem>
      ))}
    </div>
  )
}

// HeaderMenu.prototype.MenuItem = MenuItem

export default forwardRef(HeaderMenu)
