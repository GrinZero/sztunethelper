import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import type { IMMessage } from './type'

export interface SocketData {
  type: string
  data: any
}
export interface SocketMessage {
  msg: string
  data?: any
  status: 'ok' | 'error'
}

export interface ServerTicket {
  id: number
  ticketID: string | number
  content: string
  type: 'text' | 'image' | 'file'
  status: number
  createTime: number
  updateTime: number
  sender: any
}
export interface ServerToClientEvents {
  dispatch: (data: SocketData) => void
  onmessage: (data: SocketData) => void
  send: (data: ServerTicket, callback?: (msg: SocketMessage) => void) => void
}

export type TicketMessage = IMMessage
export interface ClientToServerEvents {
  join: (roomID: string | number, callback?: (msg: SocketMessage) => void) => void
  send: (
    roomID: string | number,
    data: TicketMessage,
    callback?: (msg: SocketMessage) => void
  ) => void
  dispatch: (data: SocketData) => void
  onmessage: (data: SocketData) => void
}

export type SocketClient = Socket<ServerToClientEvents, ClientToServerEvents>

export const createSocket = () => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('No token found in localStorage')
  const socket: SocketClient = io('ws://localhost:3001', {
    auth: {
      token: `Bearer ${token}`
    },
    autoConnect: false
  })
  return socket
}
export default createSocket
