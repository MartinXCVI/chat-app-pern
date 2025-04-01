import { useState, useEffect } from "react"
import useConversation from "../store/useConversation"
import { handleError } from "../helpers/handleError"

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()

  useEffect(()=> {
    const getMessages = async ()=> {
      if(!selectedConversation) return;
      setLoading(true)
      setMessages([])
      // Attempting to fetch the messages
      try {
        const res = await fetch(`/api/messages/${selectedConversation.id}`)
        const data = await res.json()
        if(!res.ok) throw new Error(data.error || "An unexpected error ocurred")
        setMessages(data.messages)
      } catch(error: unknown) {
        handleError(error)
      } finally {
        setLoading(false)
      }
    }
    getMessages()
  }, [selectedConversation, setMessages])
  
  return { messages, loading }
}

export default useGetMessages