import { create } from "zustand"
import { ConversationState } from "../interfaces/ConversationState"


const useConversation = create<ConversationState>((set)=> ({
  selectedConversation: null,
  setSelectedConversation: (conversation)=> set({ selectedConversation: conversation }),
  messages: [],
  setMessages: (messages)=> set({ messages: messages })
}))

export default useConversation