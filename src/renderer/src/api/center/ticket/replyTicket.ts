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
  (id: TicketState['id']) => Promise<unknown>,
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
    if (!socket) return
    socket.connect()
    socketRef.current = socket
    return () => {
      socket.disconnect()
      if (socketRef.current) socketRef.current.disconnect()
    }
  }, [])

  useEffect(() => {
    const socket = socketRef.current
    if (!socket) return
    socket.on('send', (data: ServerTicket) => {
      onReceive?.({
        status: 'success',
        data
      })
    })
    return () => {
      socket.off('send')
    }
  }, [socketRef.current, onReceive])

  const join = async (id: number | string | null) => {
    return new Promise((resolve, reject) => {
      if (!id || !socketRef.current) return null
      socketRef.current.emit('join', id, (res) => {
        if (res.status !== 'ok') {
          onError?.(res)
          reject(res)
        }
        setState((state) => ({ ...state, id }))
        resolve(res)
      })
      return socketRef.current
    })
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
