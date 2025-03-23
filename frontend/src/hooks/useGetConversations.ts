import { useEffect, useState } from "react"
import { handleError } from "../helpers/handleError"


const useGetConversations = (): { loading: boolean, conversations: ConversationType[] } => {
  const [loading, setLoading] = useState(false)
  const [conversations, setConversation] = useState<ConversationType[]>([])

  useEffect(()=> {
    const getConversations = async ()=> {
      setLoading(true)
      try {
        const res = await fetch("/api/messages/conversations-list")
        const data = await res.json()
        if(data.error) {
          throw new Error(data.error)
        }
        setConversation(data.users)
      } catch(error: unknown) {
        handleError(error)
      } finally {
        setLoading(false)
      }
    }
    getConversations()
  }, [])

  return { loading, conversations }
}

export default useGetConversations