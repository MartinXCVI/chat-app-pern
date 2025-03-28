import { FormEvent, useState } from "react"
import { Search } from "lucide-react"
import useConversation from "../../store/useConversation"
import useGetConversations from "../../hooks/useGetConversations"
import toast from "react-hot-toast"


const SearchInput = () => {

	const [search, setSearch] = useState("")
	const { setSelectedConversation } = useConversation()
	const { conversations } = useGetConversations()

	const handleSubmit = (event: FormEvent<HTMLFormElement>)=> {
		event.preventDefault()
		if(!search) return;
		if(search.length < 3) {
			return toast.error("Search term must be at least 3 characters long")
		}

		const conversation = conversations.find(
			(conversation: ConversationType)=> {
				return conversation.fullName.toLowerCase().includes(search.toLowerCase())
			}
		)
		
		if(!conversation) {
			toast.error("No such user found!")
		} else {
			setSelectedConversation(conversation)
			setSearch("")
		}
	}

	return (
		<form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Search…'
				className='input-sm md:input input-bordered rounded-full sm:rounded-full w-full'
				value={search}
				onChange={(event)=> setSearch(event.target.value)}
			/>
			<button type='submit' className='btn md:btn-md btn-sm btn-circle bg-emerald-500 text-white  '>
				<Search className='w-4 h-4 md:w-6 md:h-6 outline-none' />
			</button>
		</form>
	)
}

export default SearchInput