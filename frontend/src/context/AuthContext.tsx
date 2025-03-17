import { createContext } from "react"
import { AuthContextType } from "../types/AuthContextType";


export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: ()=> {},
  isLoading: true,
})