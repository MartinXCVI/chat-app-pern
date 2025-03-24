import { createContext } from "react"
import { ISocketContext } from "../interfaces/ISocketContext"

export const SocketContext = createContext<ISocketContext | undefined>(undefined)