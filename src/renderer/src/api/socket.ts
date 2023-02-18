import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

interface ServerToClientEvents {
  connect: () => void
  emit: (event: string, ...args: any[]) => void
}

interface ClientToServerEvents {
  connect: () => void
  emit: (event: string, ...args: any[]) => void
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('ws://localhost:3001')
export default socket
