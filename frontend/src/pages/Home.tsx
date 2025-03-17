import MessageContainer from "../components/messages/MessageContainer"
import Sidebar from "../components/sidebar/Sidebar"

const Home = () => {

	return (
		<div className='chat-container w-full md:max-w-screen-lg rounded-lg overflow-hidden bg-gray-900/60 bg-clip-padding backdrop-blur-sm'>
			<MessageContainer />
      <Sidebar />
		</div>
	)
}

export default Home