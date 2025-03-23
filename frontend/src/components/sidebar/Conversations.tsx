import useGetConversations from "../../hooks/useGetConversations"
import Conversation from "./Conversation"
import LoadingSpinner from "../LoadingSpinner"

const Conversations = () => {

	const { conversations, loading } = useGetConversations()

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{
				conversations.map((conversation) => (
					<Conversation key={conversation.id} conversation={conversation} />
				))
			}
			{ loading ? (<LoadingSpinner spinnerClass="mx-auto" />) : null}
		</div>
	)
}

export default Conversations