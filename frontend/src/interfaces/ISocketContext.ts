import { Socket } from "socket.io-client"

export interface ISocketContext {
  socket: Socket | null;
  onlineUsers: string[];
}