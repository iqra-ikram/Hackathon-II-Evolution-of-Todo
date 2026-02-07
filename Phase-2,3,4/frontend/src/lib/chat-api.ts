import { fetchClient } from "./api";
import { ChatResponse, Conversation, Message } from "@/types/chat";

export const chatApi = {
  sendMessage: async (userId: string, message: string, conversationId?: number): Promise<ChatResponse> => {
    return fetchClient(`/${userId}/chat`, {
      method: 'POST',
      body: JSON.stringify({ message, conversation_id: conversationId }),
    });
  },

  getConversations: async (userId: string): Promise<Conversation[]> => {
    return fetchClient(`/${userId}/conversations`, {
      method: 'GET',
    });
  },

  getMessages: async (userId: string, conversationId: number): Promise<Message[]> => {
    return fetchClient(`/${userId}/conversations/${conversationId}/messages`, {
      method: 'GET',
    });
  }
};
