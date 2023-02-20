import { useEffect, useRef, useState } from 'react'
import {
  createSocket,
  SocketClient,
  TicketMessage,
  SocketMessage,
  ServerTicket
} from '../../socket'
import type { IMMessageCummunication } from '../../type'

export interface TicketSocketHookProps {
  onError?: (err: any) => void
  onSend?: (message: IMMessageCummunication) => void
  onReceive?: (message: IMMessageCummunication) => void
}
export interface TicketState {
  id: number | string | null
}
export type TicketSocketHook = (
  props?: TicketSocketHookProps
) => [
  (id: TicketState['id']) => SocketClient | null,
  (message: TicketMessage) => void,
  TicketState['id'],
  SocketClient | null
]

export const useTicketSocket: TicketSocketHook = (props = {}) => {
  const { onError, onSend, onReceive } = props
  const socketRef = useRef<SocketClient | null>(null)
  const [state, setState] = useState<TicketState>({
    id: null
  })

  useEffect(() => {
    if (socketRef.current) socketRef.current.disconnect()
    const socket = createSocket()
    socket.connect()
    socketRef.current = socket
    socket.on('send', (data: ServerTicket) => {
      onReceive?.({
        status: 'success',
        data
      })
    })
    return () => {
      socket.disconnect()
      if (socketRef.current) socketRef.current.disconnect()
    }
  }, [])

  const join = (id: number | string | null) => {
    if (!id || !socketRef.current) return null
    socketRef.current.emit('join', id, (res: string) => {
      if (res !== 'ok') {
        onError?.(res)
      }
      setState((state) => ({ ...state, id }))
    })
    return socketRef.current
  }

  const send = (message: TicketMessage) => {
    if (!state.id) throw new Error('socket is not init')
    if (!socketRef.current) throw new Error('socket is not init')
    onSend?.({
      status: 'sending',
      data: message
    })
    socketRef.current.emit('send', state.id, message, (msg: SocketMessage) => {
      if (msg.status !== 'ok') {
        onSend?.({
          status: 'error',
          data: msg
        })
        onError?.(msg)
      }
      onSend?.({
        status: 'success',
        data: msg.data
      })
    })
  }

  return [join, send, state.id, socketRef.current]
}
