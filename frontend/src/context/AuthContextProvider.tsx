import { ReactNode, useEffect } from "react"
import { useState } from "react"
import { AuthUserType } from "../types/AuthUserType"
import { AuthContext } from "./AuthContext"
import toast from "react-hot-toast"


export const AuthContextProvider = ( { children }: { children: ReactNode } ) => {
  
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  const fetchAuthUser = async ()=> {
    try {
      const res = await fetch(
        "/api/auth/me",
        // { credentials: "include" }
      )
      const data = await res.json()
      if(!res.ok) {
        throw new Error(data.message)
      }
      setAuthUser(data)
    } catch(error: unknown) {
      if(error instanceof Error) {
        console.error(`Error fetching auth user: ${error.message}`)
      } else {
        console.error(`Error fetching auth user: ${error}`)
        toast.error(String(error))
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(()=> {
    fetchAuthUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isLoading,
        setAuthUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}