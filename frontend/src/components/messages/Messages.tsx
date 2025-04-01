import useGetMessages from "../../hooks/useGetMessages"
import Message from "./Message"
import MessageSkeleton from "../skeletons/MessageSkeleton"
import useListenMessages from "../../hooks/useListenMessages"
import useChatScroll from "../../hooks/useChatScroll"
import { RefObject } from "react"

const Messages = () => {

	const { loading, messages } = useGetMessages()
	useListenMessages()

	const ref = useChatScroll(messages) as RefObject<HTMLDivElement>

	return (
		<div className='w-full px-4 flex-1 overflow-auto' ref={ref}>
			{loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}

			{!loading && messages.map((message) => <Message key={message.id} message={message} />)}

			{!loading && messages.length === 0 && (
				<p className='text-center text-white'>Send a message to start the conversation</p>
			)}
		</div>
	);
}

export default Messages