export enum MessageRole {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system"
}

export interface Message {
  id: number;
  role: MessageRole;
  content: string;
  created_at: string;
  conversation_id: number;
}

export interface Conversation {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface ChatResponse {
  response: string;
  conversation_id: number;
}
