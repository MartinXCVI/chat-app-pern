import { MessageType } from "../types/MessageType";

export interface ConversationState {
  selectedConversation: ConversationType | null;
  messages: MessageType[];
  setSelectedConversation: (conversation: ConversationType | null)=> void;
  setMessages: (messages: MessageType[])=> void;
}