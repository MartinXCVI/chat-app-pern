export type MessageType = {
  id: string;
  body: string;
  senderId: string;
  createdAt: string;
  shouldShake?: boolean;
}