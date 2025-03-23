import useAuthContext from "../../hooks/useAuthContext"
import useConversation from "../../store/useConversation"
import { MessageType } from "../../types/MessageType"
import { extractTime } from "../../utils/extractTime"

const Message = ({ message }: { message: MessageType }) => {

	const { authUser } = useAuthContext()
	const { selectedConversation } = useConversation()

	const fromMe = message?.senderId === authUser?.id
	const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic
	const chatClass = fromMe ? "chat-end" : "chat-start"

	const bubbleBg = fromMe ? "bg-emerald-500" : ""
  
	return (
		<div className={`chat ${chatClass}`}>
			<div className='hidden md:block chat-image avatar'>
				<div className='w-6 md:w-10 rounded-full'>
					<img
						alt='Message chat bubble'
						src={img}
					/>
				</div>
			</div>
			<p className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}>
				{message.body}
			</p>
			<span className='message-hour chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>
				{extractTime(message.createdAt)}
			</span>
		</div>
	)
}
export default Message