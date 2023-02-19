import { useRef } from 'react'
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
  (id: number | string) => void,
  (message: TicketMessage) => void,
  TicketState['id'],
  SocketClient | null
]

export const useTicketSocket: TicketSocketHook = (props = {}) => {
  const { onError, onSend, onReceive } = props
  const socketRef = useRef<SocketClient | null>(null)
  const dataRef = useRef<TicketState>({
    id: null
  })

  const init = (id: number | string) => {
    const socket = createSocket()
    socketRef.current = socket
    socket.emit('join', id, (res: string) => {
      if (res !== 'ok') {
        onError?.(res)
      }
      dataRef.current.id = id
    })
    socket.on('send', (data: ServerTicket) => {
      onReceive?.({
        status: 'success',
        data
      })
    })
  }

  const send = (message: TicketMessage) => {
    if (!dataRef.current.id) throw new Error('socket is not init')
    if (!socketRef.current) throw new Error('socket is not init')
    onSend?.({
      status: 'sending'
    })
    socketRef.current.emit('send', dataRef.current.id, message, (msg: SocketMessage) => {
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

  return [init, send, dataRef.current.id, socketRef.current]
}
