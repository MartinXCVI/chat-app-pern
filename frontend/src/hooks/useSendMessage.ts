import { useState } from "react"
import useConversation from "../store/useConversation"
import { apiRequest } from "../helpers/apiRequest"
import { handleError } from "../helpers/handleError"

const useSendMessage = () => {

	const [loading, setLoading] = useState(false)
	const { messages, setMessages, selectedConversation } = useConversation()

	const sendMessage = async (message: string) => {
		if (!selectedConversation) return;
		setLoading(true)
		// Attempting to send the message
		try {
			const data = await apiRequest(
				`/api/messages/send/${selectedConversation.id}`,
				"POST",
				{ message }
			)
			console.log("Message data:", data)
			if (data.error) throw new Error(data.error)
			
			setMessages([...messages, data])
		} catch (error: unknown) {
			handleError(error)
		} finally {
			setLoading(false)
		}
	}

	return { sendMessage, loading }
}

export default useSendMessage;