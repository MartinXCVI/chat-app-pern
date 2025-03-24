import { useContext } from "react"
import { SocketContext } from "../context/SocketContext"
import { ISocketContext } from "../interfaces/ISocketContext"

export const useSocketContext = (): ISocketContext => {
  const context = useContext(SocketContext)
  if(context === undefined) {
    throw new Error("useSocketContext must be used within a SocketContextProvider")
  }
  return context
}